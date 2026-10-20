"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "MongoDB", "SQL", "REST APIs"],
  },
  {
    category: "Mobile Development",
    items: ["React Native", "Flutter", "iOS", "Android"],
  },
  {
    category: "Design Tools",
    items: ["Figma", "Photoshop", "Canva", "Illustrator"],
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Docker", "CI/CD"],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" ref={ref} className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Skills & Technologies</h2>
            <p className="text-muted-foreground text-lg">Tools and technologies I work with daily</p>
          </div>

          {/* Big centered card wrapping all skill groups */}
          <div className="mx-auto w-full max-w-5xl">
            <div className="backdrop-blur-md bg-card/60 border border-border/50 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex flex-wrap justify-center gap-6">
                {skills.map((skillGroup, idx) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] h-full"
                  >
                    <div className="relative h-full backdrop-blur-md bg-card border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl" />
                      <div className="relative space-y-4">
                        <h3 className="text-xl md:text-2xl font-semibold text-primary">{skillGroup.category}</h3>
                        <ul className="space-y-2">
                          {skillGroup.items.map((skill, skillIdx) => (
                            <motion.li
                              key={skill}
                              initial={{ opacity: 0, x: -20 }}
                              animate={isInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ duration: 0.5, delay: idx * 0.1 + skillIdx * 0.05 }}
                              className="text-muted-foreground flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              {skill}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
