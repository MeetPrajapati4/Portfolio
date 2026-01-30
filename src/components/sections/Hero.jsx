import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"
import { useLenis } from 'lenis/react'
import { Magnetic } from "@/components/ui/Magnetic"
import { TextReveal } from "@/components/ui/TextReveal"
import profileImg from "../../Images/Profile.jpg"
import resumeFile from "../../../Doc/Final_Resume.pdf"
import { useRef } from "react"

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
        <section ref={containerRef} id="hero" className="min-h-screen flex items-center justify-center pt-36 pb-12 relative overflow-hidden">
            {/* Background Parallax Elements */}
            <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

            <div className="container px-6 mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="text-center md:text-left space-y-8">
                    <div className="space-y-4">
                        <TextReveal
                            text="Building the"
                            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground/50"
                        />
                        <TextReveal
                            text="Future Web"
                            className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                        />
                    </div>

                    <motion.p
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.8 }}
                        className="text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 leading-relaxed"
                    >
                        I'm a Full Stack Developer & UI/UX enthusiast crafting accessible,
                        pixel-perfect, and performant web experiences.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1 }}
                        className="flex flex-wrap gap-6 justify-center md:justify-start"
                    >
                        <Magnetic>
                            <Button variant="premium" className="h-14 px-10 text-lg rounded-2xl group shadow-2xl shadow-primary/20" onClick={handleScrollToProjects}>
                                View Projects <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Magnetic>
                        <Magnetic>
                            <Button variant="outline" className="h-14 px-10 text-lg rounded-2xl border-white/10 hover:bg-white/5" asChild>
                                <a href={resumeFile} download="Mit_Prajapati_Resume.pdf">
                                    Download CV <Download className="ml-2 h-5 w-5" />
                                </a>
                            </Button>
                        </Magnetic>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 1.2 }}
                        className="flex items-center justify-center md:justify-start gap-8 pt-6"
                    >
                        {[
                            { Icon: Github, href: "https://github.com/MeetPrajapati4" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/chadotara-mit-0412004md" },
                            { Icon: Mail, href: "mailto:chadotaramit45@gmail.com" }
                        ].map(({ Icon, href }, i) => (
                            <Magnetic key={i}>
                                <motion.a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors p-2"
                                >
                                    <Icon className="h-7 w-7" />
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
                    className="relative order-first md:order-last mb-12 md:mb-0 px-4 md:px-0"
                >
                    <div className="relative w-full max-w-[240px] xs:max-w-[280px] md:max-w-md mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-[40px] md:blur-[100px] animate-pulse" />

                        <div className="relative bg-secondary/10 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group">
                            <img
                                src={profileImg}
                                alt="Profile"
                                className="w-full h-auto grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                            />
                        </div>

                        {/* Floating Morphing Elements */}
                        <motion.div
                            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -top-4 -left-4 xs:-top-6 xs:-left-6 md:-top-12 md:-left-12 bg-card/40 backdrop-blur-2xl border border-white/10 p-2.5 md:p-6 rounded-xl md:rounded-3xl shadow-2xl z-20"
                        >
                            <div className="font-bold text-[10px] xs:text-xs md:text-xl text-primary">Innovative</div>
                            <div className="text-[8px] md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Thinking</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-3 -right-3 xs:-top-4 xs:-right-4 md:-top-10 md:-right-10 bg-card/40 backdrop-blur-2xl border border-white/10 p-2.5 md:p-6 rounded-xl md:rounded-3xl shadow-2xl z-20"
                        >
                            <div className="font-bold text-[10px] xs:text-xs md:text-xl text-foreground">Design Expert</div>
                            <div className="text-[8px] md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Modern UI/UX</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 xs:-bottom-6 xs:-left-6 md:-bottom-10 md:-left-10 bg-card/40 backdrop-blur-2xl border border-white/10 p-2.5 md:p-6 rounded-xl md:rounded-3xl shadow-2xl z-20"
                        >
                            <div className="font-bold text-[10px] xs:text-xs md:text-xl text-foreground">Creativity</div>
                            <div className="text-[8px] md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Level High</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                            className="absolute -bottom-3 -right-3 xs:-bottom-4 xs:-right-4 md:-bottom-10 md:-right-10 bg-card/40 backdrop-blur-2xl border border-white/10 p-2.5 md:p-6 rounded-xl md:rounded-3xl shadow-2xl z-20"
                        >
                            <div className="font-bold text-[10px] xs:text-xs md:text-xl text-primary">Business</div>
                            <div className="text-[8px] md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Strategy</div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
