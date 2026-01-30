import { motion, useScroll, useTransform } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useRef } from "react"
import music4uImg from "../../Images/Music4U.png"
import syntaxCoderImg from "../../Images/SyntaxCoder.png"

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

function ProjectCard({ project, index }) {
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
            className="w-full max-w-[450px]"
        >
            <Card className="h-full flex flex-col bg-card/20 backdrop-blur-3xl border border-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 group overflow-hidden rounded-[2.5rem] relative">
                {/* Floating Glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors" />

                <CardHeader className="p-0 overflow-hidden relative">
                    <div className="h-64 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 opacity-80" />
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-secondary/50">
                                <span className="text-8xl font-black text-white/5">{project.title[0]}</span>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="flex-1 p-10 relative z-20">
                    <CardTitle className="mb-4 text-3xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                    </CardTitle>
                    <CardDescription className="mb-8 text-muted-foreground/80 text-lg leading-relaxed line-clamp-3">
                        {project.description}
                    </CardDescription>

                    <div className="flex flex-wrap gap-3">
                        {project.tech.map(t => (
                            <span
                                key={t}
                                className="px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-bold uppercase tracking-widest text-primary/80"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="p-10 pt-0 gap-6 mt-auto relative z-20">
                    {project.live && (
                        <Button variant="premium" size="lg" className="flex-1 rounded-2xl h-14 text-base font-bold" asChild>
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-5 w-5" /> Demo
                            </a>
                        </Button>
                    )}
                    <Button variant="outline" size="lg" className="flex-1 rounded-2xl h-14 text-base font-bold border-white/5 bg-white/5 hover:bg-white/10" asChild>
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
        <section id="projects" className="py-32 relative overflow-hidden bg-background">
            {/* Editorial Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container px-6 mx-auto relative z-10">
                <div className="text-center mb-24">
                    <Reveal variant="skew" width="100%">
                        <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic text-center">
                            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Works</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.2} variant="fade" width="100%">
                        <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">
                            Pushing the boundaries of web development through bold design and precise engineering.
                        </p>
                    </Reveal>
                </div>

                <div className="flex flex-col items-center gap-20">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
