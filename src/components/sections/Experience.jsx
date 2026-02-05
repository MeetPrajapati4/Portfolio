import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Briefcase, GraduationCap } from "lucide-react"
import "./Experience.css"

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
        <section id="experience" className="experience-section">
            <div className="experience-container">
                <Reveal width="100%">
                    <div className="experience-header">
                        <h2 className="experience-title">
                            Journey <span className="experience-title-gradient">So Far</span>
                        </h2>
                        <p className="experience-description">My academic and professional timeline.</p>
                    </div>
                </Reveal>

                <div className="timeline-wrapper">
                    {/* Timeline Line */}
                    <div className="timeline-line-container">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                            className="timeline-line-fill"
                        />
                    </div>

                    {experience.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`timeline-item ${index % 2 === 0 ? "timeline-item-even" : ""}`}
                        >
                            {/* Timeline Dot */}
                            <div className="timeline-dot" />

                            {/* Content */}
                            <div className="timeline-content-wrapper">
                                <div className={`timeline-card ${index % 2 === 0 ? "timeline-card-even" : "timeline-card-odd"}`}>
                                    {/* Arrow */}
                                    <span className={`timeline-icon-badge ${index % 2 === 0 ? "timeline-icon-even" : ""}`}>
                                        {item.type === 'work' ? <Briefcase className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                                    </span>
                                    <h3 className="timeline-role">{item.role}</h3>
                                    <div className="timeline-company">{item.company}</div>
                                    <div className="timeline-period">{item.period}</div>
                                    <p className="timeline-description">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
