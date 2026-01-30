import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Briefcase, GraduationCap } from "lucide-react"

const experience = [
    {
        type: "work",
        role: "Full Stack Developer Intern",
        company: "Codeveda Technologies",
        period: "June 2025 - July 2025",
        description: "Working on full-stack web applications, gaining hands-on experience with modern technologies like React, Node.js, and implementing scalable solutions."
    },
    {
        type: "education",
        role: "MCA (AI Specialization)",
        company: "Parul University",
        period: "Present",
        description: "Currently pursuing Master of Computer Applications with a specialization in Artificial Intelligence."
    },
    {
        type: "education",
        role: "BCA",
        company: "Adarsh BCA College, Botad",
        period: "Completed",
        description: "Graduated with a strong foundation in computer applications and software development principles."
    }
]

export function Experience() {
    return (
        <section id="experience" className="py-24 bg-secondary/20">
            <div className="container px-6 mx-auto">
                <Reveal width="100%">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Journey <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">So Far</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">My academic and professional timeline.</p>
                    </div>
                </Reveal>

                <div className="max-w-3xl mx-auto relative px-4">
                    {/* Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                            className="w-full bg-primary origin-top"
                        />
                    </div>

                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`relative flex items-center mb-12 md:mb-20 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-2 md:-translate-x-1/2 z-10" />

                            {/* Content */}
                            <div className="ml-14 md:ml-0 md:w-1/2 md:px-6">
                                <div className={`bg-card p-6 rounded-xl border border-border/50 shadow-sm relative hover:border-blue-500/30 transition-colors ${index % 2 === 0 ? "md:text-right" : "md:text-left"
                                    }`}>
                                    {/* Arrow (optional, tricky with responsive so omitting or simple CSS) */}
                                    <span className={`inline-flex p-2 rounded-lg bg-blue-500/10 text-blue-500 mb-3 ${index % 2 === 0 && "md:ml-auto"
                                        }`}>
                                        {item.type === 'work' ? <Briefcase className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                                    </span>
                                    <h3 className="text-xl font-bold">{item.role}</h3>
                                    <div className="text-blue-500 font-medium mb-2">{item.company}</div>
                                    <div className="text-sm text-muted-foreground mb-4">{item.period}</div>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
