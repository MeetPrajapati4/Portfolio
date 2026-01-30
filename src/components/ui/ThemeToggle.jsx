import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"
import { flushSync } from "react-dom"

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    const handleToggle = async (e) => {
        // Fallback for browsers that don't support View Transitions
        if (!document.startViewTransition) {
            toggleTheme()
            return
        }

        const x = e.clientX
        const y = e.clientY

        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        )

        // Circle expanding from click position
        const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
        ]

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                toggleTheme()
            })
        })

        await transition.ready

        // Animate the clip-path
        document.documentElement.animate(
            {
                clipPath: clipPath
            },
            {
                duration: 700,
                easing: "cubic-bezier(0.25, 1, 0.5, 1)", // easeOutQuart
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }

    return (
        <button
            onClick={handleToggle}
            className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "dark" ? 1 : 0,
                    rotate: theme === "dark" ? 0 : 180,
                    opacity: theme === "dark" ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute"
            >
                <Moon className="w-5 h-5 text-blue-400 fill-blue-400/20" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: theme === "light" ? 1 : 0,
                    rotate: theme === "light" ? 0 : -180,
                    opacity: theme === "light" ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute"
            >
                <Sun className="w-5 h-5 text-amber-500 fill-amber-500/20" />
            </motion.div>
        </button>
    )
}
