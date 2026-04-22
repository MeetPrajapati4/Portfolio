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
    { name: "Journey", href: "#experience", icon: Briefcase },
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
        const targetId = href.replace('#', '')
        if (lenis) {
            if (href === "#hero") {
                lenis.scrollTo(0)
            } else {
                lenis.scrollTo(href)
            }
        } else {
            const element = document.getElementById(targetId)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setIsOpen(false)
    }

    return (
        <>
            <nav className={cn("navbar", scrolled && "scrolled")}>
                <div className="navbar-container">
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className="navbar-logo"
                    >
                        <img src="/Logo.png" alt="Logo" className="navbar-logo-img" />
                    </a>

                    {/* Desktop Menu */}
                    <div className="desktop-menu">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn("nav-link", isActive && "active")}
                                >
                                    <link.icon />
                                    {link.name}
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-indicator"
                                            className="nav-link-indicator"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </a>
                            )
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="mobile-menu-btn-container">
                        <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-toggle">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="mobile-menu-overlay"
                    >
                        <div className="mobile-menu-content">
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
                                    <link.icon />
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
