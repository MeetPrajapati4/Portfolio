import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onComplete }) {
    const [textIndex, setTextIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const texts = ["Mit Prajapati", "Design", "Development", "Innovation"];

    useEffect(() => {
        // Configuration
        const textDuration = 1200; // ms per word
        const totalDuration = textDuration * texts.length; // Total time to cycle all words
        const progressInterval = 20; // ms per progress update (smoother)
        const progressSteps = totalDuration / progressInterval;
        const progressIncrement = 100 / progressSteps;

        // Text timer
        const textTimer = setInterval(() => {
            setTextIndex((prev) => {
                if (prev === texts.length - 1) {
                    clearInterval(textTimer);
                    // Add a small delay after the final word before completing
                    setTimeout(onComplete, 800);
                    return prev;
                }
                return prev + 1;
            });
        }, textDuration);

        // Progress timer
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + progressIncrement;
            });
        }, progressInterval);

        return () => {
            clearInterval(textTimer);
            clearInterval(progressTimer);
        };
    }, [onComplete]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
        exit: {
            opacity: 0,
            y: -20,
            filter: "blur(10px)",
            transition: { duration: 0.5 }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 20, rotateX: 90 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { type: "spring", damping: 12, stiffness: 100 }
        },
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background text-foreground overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-[-1] opacity-20">
                <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-foreground/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            {/* Editorial Corner Elements */}
            <div className="absolute top-8 left-8 text-xs font-medium uppercase tracking-widest opacity-50 hidden md:block">
                Mit Prajapati
            </div>
            <div className="absolute bottom-8 left-8 text-xs font-medium uppercase tracking-widest opacity-50 hidden md:block">
                Loading Experience
            </div>
            <div className="absolute bottom-8 right-8 text-5xl md:text-8xl font-bold opacity-5 tracking-tighter">
                {Math.min(Math.round(progress), 100)}%
            </div>

            {/* Central Kinetic Typography */}
            <div className="relative w-full text-center px-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={textIndex}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex flex-wrap justify-center overflow-hidden"
                    >
                        {texts[textIndex].split("").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={childVariants}
                                className="text-5xl md:text-8xl font-bold tracking-tighter inline-block"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Detailed Progress Line */}
            <div className="absolute bottom-0 left-0 w-full">
                <motion.div
                    className="h-1 bg-foreground"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
}
