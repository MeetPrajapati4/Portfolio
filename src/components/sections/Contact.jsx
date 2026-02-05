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
                            Get In{" "}
                            <span className="contact-title-highlight">
                                Touch
                            </span>
                        </h2>
                        <p className="contact-subtitle">
                            Have a project in mind or just wanna vibe?
                        </p>
                    </div>
                </Reveal>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="contact-info-title">Let's Talk</h3>
                        <p className="contact-info-desc">
                            I am Finding New Opportunities,  ReCall Anytime✨
                        </p>

                        <div className="contact-list">
                            {[
                                { icon: Mail, text: "chadotaramit45@gmail.com", href: "mailto:chadotaramit45@gmail.com" },
                                { icon: Phone, text: "+91 90236 14970", href: "https://wa.me/919023614970" },
                                { icon: MapPin, text: "Ahmedabad, Gujarat, India", href: null },
                                { icon: Instagram, text: "@mit_chadotara_412", href: "https://www.instagram.com/mit_chadotara_412?igsh=MWlscjA3ejNpNm00dA==" },
                                { icon: Linkedin, text: "Mit Chadotara", href: "https://www.linkedin.com/in/chadotara-mit-0412004md?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" }
                            ].map((item, idx) => (
                                <Card key={idx} className="contact-card group">
                                    <CardContent className="contact-card-content">
                                        {item.href ? (
                                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 w-full">
                                                <div className="contact-icon-wrapper group-hover:scale-110 transition-transform">
                                                    <item.icon className="contact-icon" />
                                                </div>
                                                <span className="contact-text group-hover:text-primary transition-colors">{item.text}</span>
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-4 w-full">
                                                <div className="contact-icon-wrapper">
                                                    <item.icon className="contact-icon" />
                                                </div>
                                                <span className="contact-text">{item.text}</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="contact-form-container"
                    >
                        <form className="contact-form" onSubmit={onSubmit}>
                            <div className="contact-field-group">
                                <label className="contact-label">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="contact-input"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="contact-field-group">
                                <label className="contact-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="contact-input"
                                    placeholder="Your email"
                                />
                            </div>

                            <div className="contact-field-group">
                                <label className="contact-label">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    className="contact-input resize-none"
                                    placeholder="Say something cool..."
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
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
