import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Cpu } from "lucide-react"

const stats = [
    { icon: Code, label: "Frontend", value: "Modern React" },
    { icon: Database, label: "Backend", value: "Node & SQL" },
    { icon: Globe, label: "Web3", value: "Smart Contracts" },
    { icon: Cpu, label: "AI", value: "GenAI Integration" },
]

export function About() {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background pointer-events-none" />
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />

            <div className="container px-6 mx-auto relative z-10">
                <Reveal width="100%">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Me</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            I am a passionate developer who bridges the gap between design and technology.
                            With a strong foundation in computer applications (MCA), I specialize in building
                            scalable, user-centric web solutions.
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Biography Text */}
                    <Reveal variant="skew">
                        <div className="space-y-6 text-foreground/80">
                            <p className="text-lg leading-relaxed">
                                My journey in tech started with a curiosity for how things work on the web.
                                Fast forward to today, and I've worked on numerous projects ranging from
                                simple landing pages to complex enterprise-grade applications.
                            </p>
                            <p className="text-lg leading-relaxed">
                                I believe in writing <span className="text-blue-400 font-medium">clean, maintainable code</span> and am constantly exploring
                                new technologies like AI and Blockchain to stay ahead of the curve.
                            </p>
                            <div className="pt-4">
                                <div className="inline-block p-4 rounded-2xl bg-secondary/30 border border-white/5 backdrop-blur-sm">
                                    <p className="text-sm font-medium text-foreground">
                                        "Quality is not an act, it is a habit."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Stats Grid */}
                    <Reveal variant="scale" delay={0.4}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {stats.map((stat, idx) => (
                                <Card key={idx} className="border-white/10 bg-card/30 backdrop-blur-md shadow-lg hover:bg-card/50 hover:shadow-blue-500/10 hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300 group">
                                    <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                                        <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                                            <stat.icon className="h-6 w-6 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                        <div className="font-bold text-lg">{stat.label}</div>
                                        <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{stat.value}</div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
