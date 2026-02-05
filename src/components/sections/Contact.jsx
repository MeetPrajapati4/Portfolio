import { useState } from "react"
import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Button } from "@/components/ui/button"
import { Send, Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import "./Contact.css"

export function Contact() {
    const [result, setResult] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()
        setResult("Sending...")

        const formData = new FormData(event.target)
        formData.append("access_key", "feb280e1-723d-435b-bb96-c65ba84540dc")

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            })

            const data = await response.json()
            if (data.success) {
                setResult("Message sent 🚀")
                event.target.reset()
            } else {
                setResult("Something went wrong 😬")
            }
        } catch {
            setResult("Network error 💀")
        }
    }

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <Reveal width="100%">
                    <div className="contact-header">
                        <h2 className="contact-title">
                            Let's Work <span className="contact-title-highlight">Together</span>
                        </h2>
                        <p className="contact-subtitle">
                            Have a project in mind or just want to say hi? I'm always open to new ideas and opportunities.
                        </p>
                    </div>
                </Reveal>

                <div className="contact-grid">
                    {/* Left Column: Social Dock & Info */}
                    <div className="contact-info-wrapper">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="contact-status-card glass-card"
                        >
                            <div className="status-indicator">
                                <span className="status-dot"></span>
                                <span className="status-ripple"></span>
                            </div>
                            <div className="status-text">
                                <p className="status-label">Availability</p>
                                <p className="status-value">Open to Work</p>
                            </div>
                        </motion.div>

                        <div className="social-dock-container">
                            <h3 className="social-dock-title">Connect with me</h3>
                            <div className="social-dock">
                                {[
                                    { icon: Mail, label: "Email", href: "mailto:chadotaramit45@gmail.com", color: "#EF4444" },
                                    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/chadotara-mit-0412004md", color: "#0077B5" },
                                    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/mit_chadotara_412", color: "#E4405F" },
                                    { icon: Phone, label: "WhatsApp", href: "https://wa.me/919023614970", color: "#25D366" },
                                    { icon: MapPin, label: "Location", href: null, color: "#F59E0B" }
                                ].map((item, idx) => (
                                    <motion.a
                                        key={idx}
                                        href={item.href}
                                        target={item.href ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="social-dock-item glass"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{ "--hover-color": item.color }}
                                    >
                                        <item.icon className="social-icon" />
                                        <span className="tooltip">{item.label}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="contact-form-wrapper"
                    >
                        <div className="form-glow" />
                        <div className="contact-form-container glass-card">
                            <form className="contact-form" onSubmit={onSubmit}>
                                <div className="contact-form-grid">
                                    <div className="contact-field-group">
                                        <label className="contact-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            className="contact-input glass-input"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="contact-field-group">
                                        <label className="contact-label">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            className="contact-input glass-input"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="contact-field-group">
                                    <label className="contact-label">Message</label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        required
                                        className="contact-input glass-input resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <Button className="contact-submit-btn" size="lg" type="submit">
                                    Send Message <Send className="ml-2 h-4 w-4" />
                                </Button>

                                {result && (
                                    <p className="contact-result-text">
                                        {result}
                                    </p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
