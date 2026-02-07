import { useLayoutEffect } from "react"

export function useTheme() {
    useLayoutEffect(() => {
        const root = window.document.documentElement
        root.classList.remove("light", "dark")
        root.classList.add("dark")
    }, [])

    return { theme: "dark", toggleTheme: () => { } }
}
