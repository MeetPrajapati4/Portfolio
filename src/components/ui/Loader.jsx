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

        // Ensure progress hits 100% exactly when text finishes
        const progressInterval = 20;
        const totalSteps = totalDuration / progressInterval;
        const progressIncrement = 100 / totalSteps;

        // Text timer
        const textTimer = setInterval(() => {
            setTextIndex((prev) => {
                if (prev < texts.length - 1) {
                    return prev + 1;
                }
                clearInterval(textTimer);
                return prev;
            });
        }, textDuration);

        // Progress timer
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + progressIncrement;
                if (next >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return next;
            });
        }, progressInterval);

        // Completion check
        const completionTimeout = setTimeout(() => {
            // Ensure we show 100% for a moment
            setProgress(100);
            setTimeout(onComplete, 800); // Small delay to see 100%
        }, totalDuration);

        return () => {
            clearInterval(textTimer);
            clearInterval(progressTimer);
            clearTimeout(completionTimeout);
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
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }
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
            <div className="loader-corner-tl flex items-center gap-3">
                <img src="/Logo.png" alt="Logo" className="loader-logo" />
                <span>Mit Chadotara</span>
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
