import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram, Phone } from "lucide-react"
import { useLenis } from 'lenis/react'
import { Magnetic } from "@/components/ui/Magnetic"
import { TextReveal } from "@/components/ui/TextReveal"
import profileImg from "../../Images/Profile.jpg"
import resumeFile from "../../../Doc/Final_Resume.pdf"
import { useRef } from "react"
import "./Hero.css"

export function Hero() {
    const lenis = useLenis()
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

    const handleScrollToProjects = () => {
        lenis?.scrollTo('#projects')
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: [0.25, 1, 0.5, 1],
            }
        }
    }

    return (
        <section ref={containerRef} id="hero" className="hero-section">
            {/* Background Parallax Elements */}
            <motion.div style={{ y, opacity }} className="hero-bg-parallax" />

            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-text-wrapper">
                        <TextReveal
                            text="Building the"
                            className="hero-title-prefix"
                        />
                        <TextReveal
                            text="Future Web"
                            className="hero-title-gradient"
                        />
                    </div>

                    <motion.p
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.8 }}
                        className="hero-description"
                    >
                        I'm a Full Stack Developer & UI/UX enthusiast crafting accessible,
                        pixel-perfect, and performant web experiences.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1 }}
                        className="hero-actions"
                    >
                        <Magnetic>
                            <Button variant="premium" className="h-14 px-10 text-lg rounded-2xl group shadow-2xl shadow-primary/20" onClick={handleScrollToProjects}>
                                View Projects <ArrowRight className="hero-btn-icon" />
                            </Button>
                        </Magnetic>
                        <Magnetic>
                            <Button variant="outline" className="h-14 px-10 text-lg rounded-2xl border-white/10 hover:bg-white/5" asChild>
                                <a href={resumeFile} download="Mit_Chadotara_Resume.pdf">
                                    Download CV <Download className="hero-btn-icon" />
                                </a>
                            </Button>
                        </Magnetic>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                        className="hero-socials"
                    >
                        {[
                            { Icon: Github, href: "https://github.com/MeetPrajapati4" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/chadotara-mit-0412004md?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                            { Icon: Instagram, href: "https://www.instagram.com/mit_chadotara_412?igsh=MWlscjA3ejNpNm00dA==" },
                            { Icon: Phone, href: "https://wa.me/919023614970" },
                            { Icon: Mail, href: "mailto:chadotaramit45@gmail.com" }
                        ].map(({ Icon, href }, i) => (
                            <Magnetic key={i}>
                                <motion.a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hero-social-link"
                                >
                                    <Icon className="hero-social-icon" />
                                </motion.a>
                            </Magnetic>
                        ))}
                    </motion.div>
                </div>

                {/* Visual Content with Parallax */}
                <motion.div
                    style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]), scale }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="hero-visual-wrapper"
                >
                    <div className="hero-profile-container">
                        <div className="hero-glow-bg" />

                        <div className="hero-img-card group">
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="hero-profile-img"
                            />
                        </div>

                        {/* Floating Morphing Elements */}
                        <motion.div
                            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="floating-card float-1"
                        >
                            <div className="float-title float-title-primary">Innovative</div>
                            <div className="float-subtitle">Thinking</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="floating-card float-2"
                        >
                            <div className="float-title float-title-foreground">Design Expert</div>
                            <div className="float-subtitle">Modern UI/UX</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="floating-card float-3"
                        >
                            <div className="float-title float-title-foreground">Creativity</div>
                            <div className="float-subtitle">Level High</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                            className="floating-card float-4"
                        >
                            <div className="float-title float-title-primary">Business</div>
                            <div className="float-subtitle">Strategy</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
