import { motion } from "framer-motion";
import "./LiquidBackground.css";

export function LiquidBackground() {
    return (
        <div className="liquid-bg-container">
            {/* Soft Overlay */}
            <div className="liquid-bg-overlay" />

            {/* Blob 1 - Purple/Blue */}
            <motion.div
                className="liquid-blob-1"
                animate={{
                    x: [0, 80, 0],
                    y: [0, 40, 0],
                    scale: [1, 1.15, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />

            {/* Blob 2 - Blue/Cyan */}
            <motion.div
                className="liquid-blob-2"
                animate={{
                    x: [0, -60, 0],
                    y: [0, 80, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />

            {/* Blob 3 - Pink/Rose */}
            <motion.div
                className="liquid-blob-3"
                animate={{
                    x: [0, 40, 0],
                    y: [0, -40, 0],
                    scale: [1, 1.25, 1],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}
