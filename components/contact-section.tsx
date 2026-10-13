"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, ExternalLink, Loader2 } from "lucide-react"

const socials = [
  { icon: Github, label: "GitHub", url: "https://github.com/chathuri2" },
  { icon: Linkedin, label: "LinkedIn", url: "https://www.linkedin.com/in/chathuri-nirosha-a9155b249/" },
  { icon: ExternalLink, label: "Behance", url: "https://www.behance.net/chathurinirosha" },
  { icon: Mail, label: "Email", url: "mailto:chathurinirosha112233@gmail.com" },
]

type FormStatus = "idle" | "submitting" | "success" | "error"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = () => {
    const newErrors: FormErrors = {}
    if (!name.trim()) newErrors.name = "Please enter your name"
    if (!email.trim()) {
      newErrors.email = "Please enter your email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!message.trim()) newErrors.message = "Please enter a message"
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setStatus("submitting")
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

    if (accessKey) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            name,
            email,
            message,
            subject: `Portfolio contact from ${name}`,
          }),
        })
        if (!res.ok) throw new Error("Submission failed")
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      } catch {
        setStatus("error")
      }
    } else {
      const subject = encodeURIComponent(`Portfolio contact from ${name}`)
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:chathurinirosha112233@gmail.com?subject=${subject}&body=${body}`
      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
    }
  }

  return (
    <>
      <section id="contact" ref={ref} className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Let&apos;s Work Together</h2>
              <p className="text-muted-foreground text-lg">
                Have a project in mind? Let&apos;s create something amazing together.
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
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">
                        Your Name
                      </label>
                      <Input
                        id="contact-name"
                        name="name"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className="bg-background/50"
                      />
                      {errors.name && (
                        <p id="contact-name-error" role="alert" className="text-sm text-destructive mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="sr-only">
                        Your Email
                      </label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className="bg-background/50"
                      />
                      {errors.email && (
                        <p id="contact-email-error" role="alert" className="text-sm text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="sr-only">
                        Your Message
                      </label>
                      <Textarea
                        id="contact-message"
                        name="message"
                        placeholder="Tell me about your project..."
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "contact-message-error" : undefined}
                        className="bg-background/50 resize-none"
                      />
                      {errors.message && (
                        <p id="contact-message-error" role="alert" className="text-sm text-destructive mt-1">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <Button className="w-full" size="lg" disabled={status === "submitting"}>
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                    {status === "success" && (
                      <p role="status" className="text-sm text-green-600 dark:text-green-400 text-center">
                        Message sent successfully. I&apos;ll get back to you soon!
                      </p>
                    )}
                    {status === "error" && (
                      <p role="status" className="text-sm text-destructive text-center">
                        Something went wrong. Please try again or email me directly.
                      </p>
                    )}
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
                    I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your
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
                          <a
                            href={social.url}
                            target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                            rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                          >
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
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="text-center mt-20 pt-8 pb-8 border-t border-border px-4"
      >
        <p className="text-muted-foreground text-sm" suppressHydrationWarning>
          © {new Date().getFullYear()} Chathuri Nirosha. Built with Next.js and Tailwind CSS.
        </p>
      </motion.footer>
    </>
  )
}
