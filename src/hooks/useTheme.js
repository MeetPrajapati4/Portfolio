import { useLayoutEffect, useState } from "react"

export function useTheme() {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme")
            // Check for saved theme or system preference
            if (savedTheme) {
                return savedTheme
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        }
        return "dark"
    })

    useLayoutEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add(theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    }

    return { theme, toggleTheme }
}
