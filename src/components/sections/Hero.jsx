import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram, Phone, Sparkles } from "lucide-react";
import { useLenis } from 'lenis/react';
import { Magnetic } from "@/components/ui/Magnetic";
import resumeFile from "../../../Doc/Final_Resume.pdf";
import "./Hero.css";

export function Hero() {
    const lenis = useLenis();
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.2]);

    const [text, setText] = useState({ first: "Crafting Digital", second: "Experiences" });

    useEffect(() => {
        const phrases = [
            { first: "Crafting Digital", second: "Experiences" },
            { first: "Building Scalable", second: "AI Solutions" },
            { first: "Designing Future", second: "3D Interfaces" },
            { first: "Architecting Modern", second: "Full-Stack Systems" },
            { first: "Innovating Web", second: "Technologies" }
        ];
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        setText(randomPhrase);
    }, []);

    const handleScrollToProjects = () => {
        if (lenis) {
            lenis.scrollTo('#projects');
        } else {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section ref={containerRef} id="hero" className="hero-wrapper">
            <div className="hero-section">
                {/* Hero Content Header */}
                <motion.div
                    className="hero-content-side"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ y: contentY, opacity }}
                >
                    {/* Status Pill */}
                    <motion.div variants={itemVariants} className="hero-pill">
                        <span className="hero-pill-dot" />
                        <span>Mit Chadotara — Full-Stack & AI Systems</span>
                    </motion.div>

                    {/* Dynamic Main Headline */}
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
                        Full-Stack Developer and AI Engineer architecting high-performance web applications,
                        multimodal intelligence systems, and interactive 3D spatial experiences.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div variants={itemVariants} className="hero-actions">
                        <Magnetic>
                            <Button
                                variant="default"
                                className="h-12 px-7 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105"
                                onClick={handleScrollToProjects}
                            >
                                View Projects
                            </Button>
                        </Magnetic>
                        <Magnetic>
                            <Button
                                variant="outline"
                                className="h-12 px-7 rounded-full text-sm font-semibold border-border hover:bg-secondary/50 transition-all duration-300"
                                asChild
                            >
                                <a href={resumeFile} download="Mit_Chadotara_Resume.pdf">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download Resume
                                </a>
                            </Button>
                        </Magnetic>
                    </motion.div>

                    {/* Social Channels */}
                    <motion.div variants={itemVariants} className="hero-socials">
                        {[
                            { Icon: Github, href: "https://github.com/MeetPrajapati4" },
                            { Icon: Linkedin, href: "https://www.linkedin.com/in/chadotara-mit-0412004md" },
                            { Icon: Instagram, href: "https://www.instagram.com/mit_chadotara_412" },
                            { Icon: Phone, href: "https://wa.me/919023614970" },
                            { Icon: Mail, href: "mailto:mitchadotara412@gmail.com" }
                        ].map((social, i) => (
                            <Magnetic key={i}>
                                <a
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Social Link"
                                >
                                    <social.Icon size={20} />
                                </a>
                            </Magnetic>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
