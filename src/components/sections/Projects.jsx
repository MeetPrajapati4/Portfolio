import { motion, useScroll, useTransform } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useRef } from "react"
import music4uImg from "../../Images/Music4U.png"
import syntaxCoderImg from "../../Images/SyntaxCoder.png"
import "./Projects.css"

const projects = [
    {
        title: "Music4U - The Music System",
        description: "A feature-rich music streaming platform offering playlist management and high-fidelity audio playback.",
        tech: ["PHP", "JavaScript", "MySQL", "HTML/CSS"],
        live: "",
        repo: "https://github.com/MeetPrajapati4/Music4U",
        image: music4uImg
    },
    {
        title: "Syntax-Coder",
        description: "An AI-powered code converter and generator, featuring syntax highlighting and real-time execution.",
        tech: ["ReactJs", "TailwindCss", "Gemini", "Firebase"],
        live: "https://syntax-coder.vercel.app",
        repo: "https://github.com/MeetPrajapati4/SyntaxCoder",
        image: syntaxCoderImg
    }
]

function ProjectCard({ project }) {
    const cardRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    })

    const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

    return (
        <motion.div
            ref={cardRef}
            style={{ rotateX, opacity, scale, perspective: 1000 }}
            className="project-card-wrapper"
        >
            <Card className="project-card group">
                {/* Floating Glow */}
                <div className="project-card-glow" />

                <CardHeader className="project-card-header">
                    <div className="project-img-container">
                        <div className="project-img-overlay" />
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="project-img"
                            />
                        ) : (
                            <div className="project-placeholder">
                                <span className="project-placeholder-text">{project.title[0]}</span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="project-content">
                    <CardTitle className="project-title">
                        {project.title}
                    </CardTitle>
                    <CardDescription className="project-description">
                        {project.description}
                    </CardDescription>

                    <div className="project-tech-list">
                        {project.tech.map(t => (
                            <span
                                key={t}
                                className="project-tech-badge"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="project-footer">
                    {project.live && (
                        <Button variant="premium" size="lg" className="project-btn-demo" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-5 w-5" /> Demo
                            </a>
                        </Button>
                    )}
                    <Button variant="outline" size="lg" className="project-btn-repo" asChild>
                        <a href={project.repo} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-5 w-5" /> Repo
                        </a>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export function Projects() {
    return (
        <section id="projects" className="projects-section">
            {/* Editorial Grid Background */}
            <div className="projects-bg-grid" />

            <div className="projects-container">
                <div className="projects-header">
                    <Reveal variant="skew" width="100%">
                        <h2 className="projects-title">
                            Selected <span className="projects-title-gradient">Works</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2} variant="fade" width="100%">
                        <p className="projects-subtitle">
                            Pushing the boundaries of web development through bold design and precise engineering.
                        </p>
                    </Reveal>
                </div>

                <div className="projects-list">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
