"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun, Download } from "lucide-react"
const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact Me", href: "#contact" },
]

export function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const handleDownloadCV = () => {
    const cvUrl = "/cv.pdf"
    const link = document.createElement("a")
    link.href = cvUrl
    link.download = "Chathuri_Nirosha_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const navHeight = 80 // Height of the navigation bar
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-lg border-b border-border/20"
    >
      <div className="container mx-auto px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
        {/* Left: Name in Double Colors */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Chathuri Nirosha</span>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-200 font-medium"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Right: Theme Toggle Button */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full relative overflow-hidden group"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 transition-transform group-hover:rotate-45" />
              ) : (
                <Moon className="h-5 w-5 transition-transform group-hover:-rotate-12" />
              )}
            </motion.div>
          </Button>
        </motion.div>
      

                   {/* download button */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2"
>
            {/* Download CV Button */}
          <Button
            onClick={handleDownloadCV}
            variant="default"
            size="sm"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4" />
              Download CV
            </Button>

       
        </motion.div>
      </div>
    </motion.nav>
  )
}
