import { motion } from "framer-motion"
import "./Skills.css"

const skillsData = {
    Frontend: ["ReactJS", "TailwindCss", "Bootstrap", "CSS", "UI Libraries"],
    Backend: ["NodeJS(Basic)", "Javascript", "MySQL", "PHP", "Java", "API Integration(Basic)"]
}

export function Skills() {
    return (
        <section id="skills" className="skills-section">
            <div className="skills-container">
                <div className="skills-header">
                    <h2 className="skills-title">
                        Technical <span className="skills-title-gradient">Arsenal</span>
                    </h2>
                    <p className="skills-description">The tools and technologies I use to bring ideas to life.</p>
                </div>

                <div className="skills-content-wrapper">
                    {Object.entries(skillsData).map(([category, skills], catIndex) => (
                        <div key={category} className="skills-category-mb">
                            <h3 className="skills-category-title">
                                <span className="skills-category-indicator" />
                                {category}
                            </h3>
                            <div className="skills-grid">
                                {skills.map((skill) => (
                                    <motion.div
                                        key={skill}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="skill-badge"
                                    >
                                        <span className="skill-text">
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
