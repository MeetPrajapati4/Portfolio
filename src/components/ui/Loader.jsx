import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loader.css";

export function Loader({ onComplete }) {
    const [textIndex, setTextIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const texts = ["Mit Chadotara", "Design", "Development", "Innovation"];

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
            className="loader-container"
            initial={{ opacity: 1 }}
            exit={{
                y: "-100%",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
        >
            {/* Dynamic Background */}
            <div className="loader-bg-wrapper">
                <div className="loader-blob-1" />
                <div className="loader-blob-2" style={{ animationDelay: "1s" }} />
            </div>

            {/* Editorial Corner Elements */}
            <div className="loader-corner-tl">
                Mit Chadotara
            </div>
            <div className="loader-corner-bl">
                Loading Experience
            </div>
            <div className="loader-progress-text">
                {Math.min(Math.round(progress), 100)}%
            </div>

            {/* Central Kinetic Typography */}
            <div className="loader-text-wrapper">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={textIndex}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="loader-text-container"
                    >
                        {texts[textIndex].split("").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={childVariants}
                                className="loader-text-char"
                            >
                                {char === " " ? "\u00A0" : char}
                            </motion.span>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Detailed Progress Line */}
            <div className="loader-progress-bar-container">
                <motion.div
                    className="loader-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
}
