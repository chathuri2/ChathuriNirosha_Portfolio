"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "@/hooks/use-theme"
import { Moon, Sun, Download, Menu } from "lucide-react"

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact Me", href: "#contact" },
]

export function Navigation() {
  const { toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  const handleDownloadCV = () => {
    const cvUrl = "/Chathuri_Nirosha_CV.pdf"
    const link = document.createElement("a")
    link.href = cvUrl
    link.download = "Chathuri_Nirosha_CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const navHeight = 80
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
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl bg-background/30 backdrop-blur-2xl border border-border/50 ring-1 ring-white/10 rounded-2xl shadow-xl"
    >
      <div className="px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Name in Double Colors */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-3xl font-bold"
        >
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Chathuri Nirosha</span>
        </motion.div>

        {/* Center: Desktop links */}
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

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
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
                <Sun className="h-5 w-5 hidden dark:block transition-transform group-hover:rotate-45" />
                <Moon className="h-5 w-5 dark:hidden transition-transform group-hover:-rotate-12" />
              </motion.div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex items-center gap-2"
          >
            <Button
              onClick={handleDownloadCV}
              variant="default"
              size="sm"
              className="items-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" />
              Download CV
            </Button>
          </motion.div>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden rounded-full" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Chathuri Nirosha
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-all duration-200 font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
              <div className="px-4 mt-auto pb-4">
                <Button
                  onClick={() => {
                    setOpen(false)
                    handleDownloadCV()
                  }}
                  variant="default"
                  size="sm"
                  className="w-full items-center gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}
