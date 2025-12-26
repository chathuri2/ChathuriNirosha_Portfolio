"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import Image from "next/image"

export function ProfileImage() {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = (e.clientX - centerX) / rect.width
      const deltaY = (e.clientY - centerY) / rect.height
      mouseX.set(deltaX)
      mouseY.set(deltaY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        {/* Glow ring */}
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-full opacity-75 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.75, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {/* Glassmorphism container */}
        <div className="relative backdrop-blur-md bg-card/30 border border-border/50 rounded-full p-2 shadow-2xl">
          <div className="relative w-74 h-74 md:w-110 md:h-110 rounded-full overflow-hidden">
            <Image src="/professional-headshot.jpg" alt="Profile" fill className="object-cover" priority />
          </div>
        </div>

        {/* Added at the bottom of the component, after the floating animation div */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-10"
        >
        <motion.div
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group cursor-pointer"
        >
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50"
          animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
          }}
       />

        {/* Label */}
        <div className="relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full shadow-lg">
          {/* Animated dot */}
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
          <span className="text-white font-semibold text-sm whitespace-nowrap">Open to Work</span>
      </div>

      {/* Hover sparkle effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white/50"
        initial={{ scale: 1, opacity: 0 }}
        whileHover={{ scale: 1.3, opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  </motion.div>  




        {/* Floating animation */}
        <motion.div
          className="absolute inset-0"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
