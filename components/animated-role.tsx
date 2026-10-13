"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const roles = ["Software Engineer", "Frontend Developer", "UI/UX Designer", "Mobile Application Developer"]

export function AnimatedRole() {
  const [currentRole, setCurrentRole] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-12 md:h-14 flex items-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentRole}
          aria-live="polite"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold text-primary"
        >
          {roles[currentRole]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
