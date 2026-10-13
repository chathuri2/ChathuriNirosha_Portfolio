"use client"

import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "MOODMATE",
    description:
      "A full-stack Real-time emotion detection and voice recognition with virtual companion to support mental well-being",
    image: "/project1.jpg",
    tech: ["Python", "TensorFlow", "OpenCV", "Flask"],
    liveUrl:
      "https://www.linkedin.com/posts/chathuri-nirosha-a9155b249_mentalhealthtech-ai-machinelearning-activity-7408207882518896641-eHPe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD178U0BIdjyPCdUbL0SpJAnLx-8wCzdsx8",
    liveLabel: "Case Study",
    githubUrl: "https://github.com/chathuri2/Moodmate",
  },
  {
    title: "CrickInfo",
    description: "Sri Lankan Cricket Squad Selection Using Machine Learning.",
    image: "/project2.png",
    tech: ["Next.js", "Python", "Scikit-learn", "RandomForest", "Flask"],
    githubUrl: "https://github.com/chathuri2/CrickInfo",
  },
  {
    title: "Sri Lankan NIC Decoder Mobile Application",
    description: "Built a cross-platform mobile UI to decode Sri Lankan NIC details.",
    image: "/project3.png",
    tech: ["Flutter", "Dart"],
    githubUrl: "https://github.com/chathuri2/find_nicdecode",
  },
  {
    title: "The Novel Store",
    description: "Simple Book Store application built with Flutter and Dart.",
    image: "/project6.png",
    tech: ["Flutter", "Dart"],
    githubUrl: "https://github.com/chathuri2/The_novel_Store",
  },
  {
    title: "Brewed Cafe UI Design",
    description: "Simple UI Design for a cafe.",
    image: "/project8.png",
    tech: ["Figma", "UI/UX Design"],
    behanceUrl: "https://www.behance.net/gallery/240111895/Brewed-Cafe-Coffee-shop/modules/1383011031",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollButtons = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    updateScrollButtons()
    window.addEventListener("resize", updateScrollButtons)
    return () => window.removeEventListener("resize", updateScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth
    const newScrollLeft =
      direction === "left" ? scrollRef.current.scrollLeft - scrollAmount : scrollRef.current.scrollLeft + scrollAmount

    scrollRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    })

    setTimeout(() => updateScrollButtons(), 300)
  }

  return (
    <section id="projects" ref={ref} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Featured Projects</h2>
            <p className="text-muted-foreground text-lg">Some of my recent work that I&apos;m proud of</p>
          </div>

          <div className="relative">
            {/* Navigation Buttons */}
            <div className="flex justify-center gap-2 mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="rounded-full"
                aria-label="Scroll projects left"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="rounded-full"
                aria-label="Scroll projects right"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Scrollable Projects */}
            <div
              ref={scrollRef}
              onScroll={updateScrollButtons}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            >
              {projects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  whileHover={{ y: -12, transition: { duration: 0.3 } }}
                  className="flex-shrink-0 w-full md:w-[500px] snap-center group"
                >
                  <div className="relative h-full backdrop-blur-md bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative">
                      {/* Project Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, 500px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      </div>

                      {/* Project Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-2xl font-semibold text-balance">{project.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1 text-sm bg-primary/10 text-primary rounded-full">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          {project.liveUrl && (
                            <Button variant="outline" size="sm" className="group/btn bg-transparent" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                                {project.liveLabel ?? "Live Demo"}
                              </a>
                            </Button>
                          )}
                          {project.behanceUrl && (
                            <Button variant="outline" size="sm" className="group/btn bg-transparent" asChild>
                              <a href={project.behanceUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform" />
                                Behance
                              </a>
                            </Button>
                          )}
                          {project.githubUrl && (
                            <Button variant="outline" size="sm" className="group/btn bg-transparent" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                                Code
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
