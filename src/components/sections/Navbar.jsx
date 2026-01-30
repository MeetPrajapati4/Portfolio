import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLenis } from 'lenis/react'
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"

const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState("hero")
    const lenis = useLenis()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
            if (window.scrollY < 100) {
                setActiveSection("hero")
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        }

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }

        const observer = new IntersectionObserver(handleIntersection, observerOptions)

        const sections = ["hero", "about", "skills", "projects", "experience", "contact"]
        sections.forEach((id) => {
            const element = document.getElementById(id)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [])

    const handleNavClick = (e, href) => {
        e.preventDefault()
        if (lenis) {
            if (href === "#hero") {
                lenis.scrollTo(0)
            } else {
                lenis.scrollTo(href)
            }
            setIsOpen(false)
        }
    }

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out",
                scrolled
                    ? "py-2 md:py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/5"
                    : "py-3 md:py-6 bg-background/40 backdrop-blur-md border-b border-white/5"
            )}
        >
            <div className="container mx-auto flex items-center justify-between px-6 py-2 md:py-4">
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, '#hero')}
                    className="text-2xl font-bold text-foreground block tracking-tighter"
                >
                    Mit<span className="text-blue-500">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={cn(
                                "text-sm font-medium transition-colors relative group",
                                activeSection === link.href.slice(1)
                                    ? "text-primary"
                                    : "text-foreground/80 hover:text-foreground"
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute left-0 -bottom-1 h-0.5 bg-blue-500 transition-all",
                                activeSection === link.href.slice(1)
                                    ? "w-full"
                                    : "w-0 group-hover:w-full"
                            )} />
                        </a>
                    ))}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center space-x-4">
                    <ThemeToggle />
                    <button onClick={() => setIsOpen(!isOpen)} className="text-foreground p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col items-center space-y-6 py-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn(
                                        "text-lg font-medium transition-colors",
                                        activeSection === link.href.slice(1)
                                            ? "text-blue-500"
                                            : "text-foreground hover:text-blue-500"
                                    )}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
