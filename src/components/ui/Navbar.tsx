"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        isScrolled ? "py-4 glass border-b border-brand-blue/20" : "py-6 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="font-heading font-bold text-2xl text-gradient relative group z-50">
          SE<span className="text-foreground">.</span>
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-blue group-hover:w-full transition-all duration-300"></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="text-foreground/80 hover:text-brand-blue font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <span className="text-brand-purple mr-1 opacity-50 text-sm">0{index + 1}.</span>
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-blue to-brand-purple group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            className="px-5 py-2 rounded-md border border-brand-green text-brand-green hover:bg-brand-green/10 transition-colors font-code text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            Resume
          </motion.a>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-2xl text-foreground z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX className="text-brand-purple" /> : <HiMenuAlt3 className="text-brand-blue" />}
        </button>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center z-40"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-8 text-center items-center">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-heading font-medium text-foreground hover:text-brand-blue transition-colors"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="block text-brand-purple text-sm mb-1">0{index + 1}.</span>
                    {link.name}
                  </motion.a>
                ))}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  className="mt-8 px-8 py-3 rounded-md border border-brand-green text-brand-green hover:bg-brand-green/10 transition-colors font-code"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setIsOpen(false)}
                >
                  Resume
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
