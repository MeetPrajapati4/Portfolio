import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Globe, Cpu } from "lucide-react"
import "./About.css"

const stats = [
    { icon: Code, label: "Frontend", value: "Modern React" },
    { icon: Database, label: "Backend", value: "Node & SQL" },
    { icon: Globe, label: "Web3", value: "Smart Contracts" },
    { icon: Cpu, label: "AI", value: "GenAI Integration" },
]

export function About() {
    return (
        <section id="about" className="about-section">
            {/* Background Gradients */}
            <div className="about-bg-gradient" />
            <div className="about-bg-blur" />

            <div className="about-container">
                <Reveal width="100%">
                    <div className="about-header">
                        <h2 className="about-title">
                            About <span className="about-title-highlight">Me</span>
                        </h2>
                        <p className="about-subtitle">
                            Passionate Full Stack Developer with a Master's in Computer Applications (MCA). <br />
                            I specialize in building scalable, user-centric web solutions and <br />
                            bridging the gap between design and technology.
                        </p>
                    </div>
                </Reveal>

                <div className="about-content-grid">
                    {/* Biography Text */}
                    <Reveal variant="skew">
                        <div className="about-bio">
                            <p className="about-text">
                                My journey in tech started with a curiosity for how things work on the web.
                                Fast forward to today, and I've worked on numerous projects ranging from
                                simple landing pages to complex enterprise-grade applications.
                            </p>
                            <p className="about-text">
                                I believe in writing <span className="about-highlight">clean, properly maintainable code</span> and am constantly exploring
                                new technologies like AI and Blockchain to stay ahead of the curve.
                            </p>
                            <div className="about-quote-container">
                                <div className="about-quote-box">
                                    <p className="about-quote-text"
                                        style={{ color: 'gold' }}>
                                        "Quality is an Luxury Market, Not easy to Get/Buy"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                </div>

                {/* Stats Grid - Moved outside to span full width */}
                <div className="about-stats-container">
                    <Reveal variant="scale" delay={0.2}>
                        <div className="about-stats-grid">
                            {stats.map((stat, idx) => (
                                <Card key={idx} className="about-stat-card group">
                                    <CardContent className="about-stat-content">
                                        <div className="about-stat-icon-wrapper">
                                            <stat.icon className="about-stat-icon" />
                                        </div>
                                        <div className="about-stat-info">
                                            <div className="about-stat-label">{stat.label}</div>
                                            <div className="about-stat-value">{stat.value}</div>
                                        </div>
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
