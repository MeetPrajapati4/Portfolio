import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"

const skillsData = {
    Frontend: ["ReactJS", "TailwindCss", "Bootstrap", "CSS", "UI Libraries"],
    Backend: ["NodeJS(Basic)", "Javascript", "MySQL", "PHP", "Java", "API Integration(Basic)"]
}

export function Skills() {
    return (
        <section id="skills" className="py-24 bg-secondary/20">
            <div className="container px-6 mx-auto">
                <Reveal width="100%">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Arsenal</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">The tools and technologies I use to bring ideas to life.</p>
                    </div>
                </Reveal>

                <div className="space-y-12">
                    {Object.entries(skillsData).map(([category, skills], catIndex) => (
                        <Reveal key={category} delay={catIndex * 0.15} variant="scale" width="100%">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-6 flex items-center">
                                    <span className="w-2 h-8 bg-primary rounded-full mr-3" />
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-4">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            className="px-6 py-3 rounded-full bg-card/80 border border-white/5 shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all cursor-default"
                                        >
                                            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 hover:from-blue-400 hover:to-purple-500 transition-all duration-300">
                                                {skill}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
