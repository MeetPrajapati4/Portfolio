import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Code, FolderGit2, Briefcase, Mail } from "lucide-react"
import { useLenis } from 'lenis/react'
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { cn } from "@/lib/utils"
import "./Navbar.css"

const navLinks = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: FolderGit2 },
    { name: "Experience", href: "#experience", icon: Briefcase },
    { name: "Contact", href: "#contact", icon: Mail },
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
            className={cn("navbar", scrolled && "scrolled")}
        >
            <div className="navbar-container">
                <a
                    href="#hero"
                    onClick={(e) => handleNavClick(e, '#hero')}
                    className="navbar-logo"
                >
                    Mit<span className="navbar-logo-dot">.</span>
                </a>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={cn(
                                "nav-link group",
                                activeSection === link.href.slice(1) && "active"
                            )}
                        >
                            <link.icon className="w-4 h-4" />
                            {link.name}
                            <span className="nav-link-underline" />
                        </a>
                    ))}
                    <ThemeToggle />
                </div>

                {/* Mobile Menu Button */}
                <div className="mobile-menu-btn-container">
                    <ThemeToggle />
                    <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-toggle">
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
                        className="mobile-menu-dropdown"
                    >
                        <div className="mobile-menu-links">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn(
                                        "mobile-link",
                                        activeSection === link.href.slice(1) && "active"
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
