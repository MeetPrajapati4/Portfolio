import { useState } from "react"
import { motion } from "framer-motion"
import { Reveal } from "@/components/ui/Reveal"
import { Button } from "@/components/ui/button"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
        } catch (error) {
            setResult("Network error 💀")
        }
    }

    return (
        <section id="contact" className="py-24">
            <div className="container px-6 mx-auto">
                <Reveal width="100%">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Get In{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                Touch
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Have a project in mind or just wanna vibe?
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
                        <p className="text-muted-foreground mb-8 text-lg">
                            I am Finding New Opportunities,  ReCall Anytime✨
                        </p>

                        <div className="space-y-6">
                            {[
                                { icon: Mail, text: "chadotaramit45@gmail.com" },
                                { icon: Phone, text: "+91 90236 14970" },
                                { icon: MapPin, text: "Ahmedabad, Gujarat, India" },
                            ].map((item, idx) => (
                                <Card key={idx} className="bg-transparent border-none shadow-none">
                                    <CardContent className="p-0 flex items-center space-x-4">
                                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                                            <item.icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-lg">{item.text}</span>
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
                        className="bg-card p-8 rounded-2xl border border-border/50 shadow-lg"
                    >
                        <form className="space-y-6" onSubmit={onSubmit}>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-md bg-background border border-input focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="Your name"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-md bg-background border border-input focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                                    placeholder="Your email"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Message</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full px-4 py-3 rounded-md bg-background border border-input focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                    placeholder="Say something cool..."
                                />
                            </div>

                            <Button className="w-full" size="lg" type="submit">
                                Send Message <Send className="ml-2 h-4 w-4" />
                            </Button>

                            {result && (
                                <p className="text-center text-sm text-muted-foreground mt-2">
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
