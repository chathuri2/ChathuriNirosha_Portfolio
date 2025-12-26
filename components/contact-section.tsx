"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Figma } from "lucide-react"

const socials = [
  { icon: Github, label: "GitHub", url: "https://github.com/chathuri2" },
  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/chathuri-nirosha-a9155b249/" },
  { icon: Figma, label: "Figma", url: "https://www.behance.net/chathurinirosha" },
  { icon: Mail, label: "Email", url: "mailto:chathurinirosha112233@gmail.com" },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Let's Work Together</h2>
            <p className="text-muted-foreground text-lg">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="backdrop-blur-md bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg">
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" className="bg-background/50" />
                  </div>
                  <div>
                    <Input type="email" placeholder="your.email@example.com" className="bg-background/50" />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="bg-background/50 resize-none"
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Socials */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Get In Touch</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                  vision.
                </p>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    chathurinirosha112233@gmail.com
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map((social, idx) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                    >
                      <Button variant="outline" className="w-full justify-start group bg-transparent" asChild>
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <social.icon className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                          {social.label}
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mt-20 pt-8 border-t border-border"
      >
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Chathuri Nirosha. Built with Next.js and Tailwind CSS.
        </p>
      </motion.div>
    </section>
  )
}
