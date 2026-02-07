import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram, Phone } from "lucide-react"
import { useLenis } from 'lenis/react'
import { Magnetic } from "@/components/ui/Magnetic"
import resumeFile from "../../../Doc/Final_Resume.pdf"
import React, { useRef, useEffect } from "react"
import "./Hero.css"

export function Hero() {
    const lenis = useLenis()
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const contentY = useTransform(scrollYProgress, [0, 1], [0, 50])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const [text, setText] = React.useState({ first: "Crafting Digital", second: "Experiences" })

    useEffect(() => {
        const phrases = [
            { first: "Crafting Digital", second: "Experiences" },
            { first: "Building Scalable", second: "Solutions" },
            { first: "Designing Future", second: "Interfaces" },
            { first: "Architecting Modern", second: "Systems" },
            { first: "Innovating Web", second: "Technologies" }
        ]
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
        setText(randomPhrase)
    }, [])

    const handleScrollToProjects = () => {
        lenis?.scrollTo('#projects')
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    }

    return (
        <section ref={containerRef} id="hero" className="hero-section">

            {/* Left: Content Side */}
            <motion.div
                className="hero-content-side"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{ y: contentY, opacity }}
            >
                {/* Main Headline */}
                <div className="hero-title-wrapper">
                    <motion.h1 variants={itemVariants} className="hero-title">
                        {text.first}
                    </motion.h1>
                    <motion.h1 variants={itemVariants} className="hero-title hero-title-highlight">
                        {text.second}
                    </motion.h1>
                </div>

                {/* Subtext */}
                <motion.p variants={itemVariants} className="hero-description">
                    I'm a Full Stack Developer & UI/UX Designer based in India.
                    I build accessible, pixel-perfect, and performant web applications
                    that solve real-world problems.
                </motion.p>

                {/* Actions - Horizontal Buttons */}
                <motion.div variants={itemVariants} className="hero-actions">
                    <Magnetic>
                        <Button
                            variant="default"
                            className="h-12 px-6 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105"
                            onClick={handleScrollToProjects}
                        >
                            Selected Works
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Magnetic>
                    <Magnetic>
                        <Button
                            variant="outline"
                            className="h-12 px-6 rounded-full text-sm font-medium border-border hover:bg-secondary/50 transition-all duration-300"
                            asChild
                        >
                            <a href={resumeFile} download="Mit_Chadotara_Resume.pdf">
                                Download CV
                                <Download className="w-4 h-4" />
                            </a>
                        </Button>
                    </Magnetic>
                </motion.div>

                {/* Socials */}
                <motion.div variants={itemVariants} className="hero-socials">
                    {[
                        { Icon: Github, href: "https://github.com/MeetPrajapati4" },
                        { Icon: Linkedin, href: "https://www.linkedin.com/in/chadotara-mit-0412004md" },
                        { Icon: Instagram, href: "https://www.instagram.com/mit_chadotara_412" },
                        { Icon: Phone, href: "https://wa.me/919023614970" },
                        { Icon: Mail, href: "mailto:chadotaramit45@gmail.com" }
                    ].map((social, i) => (
                        <Magnetic key={i}>
                            <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                            >
                                <social.Icon size={20} />
                            </a>
                        </Magnetic>
                    ))}
                </motion.div>
            </motion.div>



        </section>
    )
}
