import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "@/hooks/useTheme"
import { flushSync } from "react-dom"
import "./ThemeToggle.css"

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    const handleToggle = async (e) => {
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

        const transition = document.startViewTransition(() => {
            flushSync(() => {
                toggleTheme()
            })
        })

        // Wait for the pseudo-elements to be created
        await transition.ready

        // Animate the root's new view
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 500,
                easing: "ease-in-out",
                // Specify which pseudo-element to animate
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }

    return (
        <button
            onClick={handleToggle}
            className="theme-toggle-btn"
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
                className="theme-icon-wrapper"
            >
                <Moon className="theme-icon theme-icon-moon" />
            </motion.div>

            <motion.div
                initial={false}
                animate={{
                    scale: theme === "light" ? 1 : 0,
                    rotate: theme === "light" ? 0 : -180,
                    opacity: theme === "light" ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="theme-icon-wrapper"
            >
                <Sun className="theme-icon theme-icon-sun" />
            </motion.div>
        </button>
    )
}
