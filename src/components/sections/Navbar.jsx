import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Code, FolderGit2, Briefcase, Mail } from "lucide-react"
import { useLenis } from 'lenis/react'
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
            setScrolled(window.scrollY > 20)
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
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn("navbar", scrolled && "scrolled")}
            >
                <div className="navbar-container">
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="navbar-logo"
                    >
                        <img src="/Logo.png" alt="Logo" className="navbar-logo-img" />
                    </a>

                    {/* Desktop Menu - Gliding Glow */}
                    <div className="desktop-menu">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn(
                                        "nav-link",
                                        isActive && "active"
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-glow"
                                            className="nav-link-glow"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {link.name}
                                    </span>
                                </a>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="mobile-menu-btn-container">
                        <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-toggle">
                            {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay - Full Screen */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mobile-menu-overlay"
                    >
                        <div className="mobile-menu-content">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className={cn(
                                        "mobile-link",
                                        activeSection === link.href.slice(1) && "active"
                                    )}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
