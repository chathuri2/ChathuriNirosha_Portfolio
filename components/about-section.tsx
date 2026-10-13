"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-balance">About Me</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            I&apos;m an undergraduate Software Engineering student with a passion for Full Stack Development. Skilled in
            React, Node.js, MongoDB, and UI/UX design, I enjoy creating responsive and user-friendly web applications.
            I&apos;m a quick learner and collaborative team player, always eager to explore new technologies and build
            impactful solutions that make a difference.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            When I&apos;m not coding, you can find me exploring new technologies, contributing to open source, or sharing
            knowledge with the developer community.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
