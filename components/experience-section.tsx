"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown, Briefcase } from "lucide-react"
import Image from "next/image"

const responsibilities = [
  "Developed and refined responsive website interfaces for different web projects.",
  "Improved UI layouts, navigation, and user experience across multiple pages.",
  "Implemented interactive components and enhanced website responsiveness across devices.",
  "Collaborated on UI/UX improvements to create clean and consistent designs.",
  "Used Git and GitHub to manage code changes and support development workflows.",
  "Identified and fixed frontend issues to improve website functionality and consistency.",
]

const technologies = ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "HTML", "CSS", "Git", "GitHub", "Figma"]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openSection, setOpenSection] = useState<"responsibilities" | "tech" | null>(null)
  const [logoError, setLogoError] = useState(false)

  const toggleSection = (section: "responsibilities" | "tech") => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  return (
    <section id="experience" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Experience</h2>
            <p className="text-muted-foreground text-lg">Where I&apos;ve been working recently</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative pl-12 md:pl-16"
            >
              {/* Timeline dot */}
              <span className="absolute left-[9px] md:left-[17px] top-8 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/20" />

              {/* Card */}
              <div className="backdrop-blur-md bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-shadow">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-4">
                    {/* Company logo */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center overflow-hidden shrink-0">
                      {!logoError ? (
                        <Image
                          src="/experience/logo-red2.png"
                          alt="Softlien (Pvt) Ltd logo"
                          width={64}
                          height={64}
                          className="w-full h-full object-contain p-1"
                          onError={() => setLogoError(true)}
                        />
                      ) : (
                        <span className="text-2xl font-bold text-primary">S</span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold text-balance">Frontend Developer Intern</h3>
                      <p className="text-lg text-primary font-medium">Softlien (Pvt) Ltd</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 text-sm bg-primary/10 text-primary rounded-full whitespace-nowrap">
                    <Briefcase className="w-3.5 h-3.5" />
                    Internship
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mt-2">February 2026 – Present</p>

                <p className="text-muted-foreground leading-relaxed mt-4">
                  Working as a Frontend Developer Intern, contributing to the development of responsive, user-friendly
                  web interfaces and improving website usability through modern frontend technologies.
                </p>

                {/* Key Responsibilities (collapsible) */}
                <div className="mt-6 border border-border/50 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("responsibilities")}
                    aria-expanded={openSection === "responsibilities"}
                    aria-controls="experience-responsibilities"
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left font-medium hover:bg-accent/10 transition-colors"
                  >
                    Key Responsibilities
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 ${
                        openSection === "responsibilities" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === "responsibilities" && (
                      <motion.div
                        id="experience-responsibilities"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <ul className="px-4 pb-4 space-y-2">
                          {responsibilities.map((item) => (
                            <li key={item} className="text-muted-foreground flex items-start gap-2 text-sm leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Technologies & Tools (collapsible) */}
                <div className="mt-3 border border-border/50 rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleSection("tech")}
                    aria-expanded={openSection === "tech"}
                    aria-controls="experience-tech"
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left font-medium hover:bg-accent/10 transition-colors"
                  >
                    Technologies &amp; Tools
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform duration-300 ${
                        openSection === "tech" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openSection === "tech" && (
                      <motion.div
                        id="experience-tech"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 flex flex-wrap gap-2">
                          {technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
