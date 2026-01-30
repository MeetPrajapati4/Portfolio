import { motion } from "framer-motion";

export function LiquidBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-[120px]" />

            {/* Blob 1 - Purple/Blue */}
            <motion.div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-500/20 dark:bg-purple-600/10 rounded-full blur-[100px]"
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
                className="absolute top-[10%] right-[-10%] w-[45vw] h-[45vw] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[100px]"
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
                className="absolute bottom-[-5%] left-[15%] w-[55vw] h-[55vw] bg-pink-500/15 dark:bg-pink-600/5 rounded-full blur-[120px]"
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
