'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiUser, FiGrid, FiMail, FiMenu, FiX, FiAward } from "react-icons/fi";
import InteractiveBg from "./InteractiveBg";

const navLinks = [
  { href: "#home", label: "Home", icon: <FiHome /> },
  { href: "#work", label: "Work", icon: <FiGrid /> },
  { href: "#about", label: "About", icon: <FiUser /> },
  { href: "#certifications", label: "Certifications", icon: <FiAward /> },
  { href: "#contact", label: "Contact", icon: <FiMail /> },
];

export default function Navigation({ children }) {
  const [active, setActive] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRefs = useRef([]);
  const pillRef = useRef(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 28 });

  // Get the index of the active link
  const activeIndex = navLinks.findIndex(link => link.href === active);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Get all sections and their positions
      const sections = navLinks.map(link => {
        const section = document.querySelector(link.href);
        return {
          href: link.href,
          top: section ? section.offsetTop - 100 : 0, // Adjust for earlier activation
          bottom: section ? section.offsetTop + section.offsetHeight : 0
        };
      });

      // Find which section we're currently in
      let current = "#home";
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (scrollY >= section.top - 50) { // Earlier activation with 50px buffer
          current = section.href;
        }
      }

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function updateUnderline() {
      const activeRef = navRefs.current[activeIndex];
      if (activeRef && pillRef.current) {
        const underlineWidth = 28;
        const iconLeft = activeRef.offsetLeft;
        const iconWidth = activeRef.offsetWidth;
        const left = iconLeft + iconWidth / 2 - underlineWidth / 2;
        setUnderlineProps({ left, width: underlineWidth });
      }
    }
    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateUnderline, 50);
    window.addEventListener('resize', updateUnderline);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateUnderline);
    };
  }, [active, activeIndex]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <InteractiveBg />
      
      {/* Main Navigation Header */}
      <motion.header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="grid grid-cols-3 items-center">
            
            {/* Logo/Brand removed per request */}
            <div />

            {/* Desktop Navigation - pill bar with icon links */}
            <div className="hidden md:flex items-center justify-self-center">
              <div ref={pillRef} className={`relative flex items-center gap-6 px-6 h-14 rounded-full border ${scrolled ? 'border-white/10 shadow-xl' : 'border-white/5 shadow-lg'} bg-[#1b1f27]/90 backdrop-blur-xl`}>
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    ref={el => navRefs.current[index] = el}
                    className={`relative flex items-center justify-center w-10 h-10 transition-colors duration-300 ${
                      active === link.href ? 'text-cyan-200' : 'text-secondary hover:text-cyan-200'
                    }`}
                    onClick={() => setActive(link.href)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label={link.label}
                    title={link.label}
                  >
                    <span className="text-xl">{link.icon}</span>
                  </motion.a>
                ))}
                {/* Active underline - shows for all sections */}
                <motion.span
                  className="absolute bottom-2 h-1 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                  animate={{ left: underlineProps.left, width: underlineProps.width }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              </div>
            </div>
      
            {/* Email Link - Desktop */}
            <div className="hidden lg:flex items-center justify-self-end">
              <motion.a
                href="mailto:riveroelijah5@gmail.com"
                className="group relative w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-secondary transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_24px_rgba(34,211,238,0.4)]"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Email"
                title="Email"
              >
                <FiMail className="text-[20px]" />
                <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 bg-background/80 backdrop-blur-md border border-white/10 text-secondary/90 text-[11px] px-2 py-1 rounded-md whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                  Email
                </span>
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden col-start-3 justify-self-end w-10 h-10 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-300 rounded-xl flex items-center justify-center text-secondary hover:text-cyan-200 transition-all duration-300"
              onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-0 right-0 bg-background/85 backdrop-blur-xl border-b border-cyan-400/20 shadow-2xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="px-6 py-6">
                {/* Mobile Navigation Links */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      className={`flex items-center justify-center w-12 h-12 rounded-xl font-medium transition-all duration-300 border ${
                        active === link.href
                          ? 'text-cyan-200 bg-white/5 border-cyan-400/30 shadow-[0_0_18px_rgba(34,211,238,0.25)]'
                          : 'text-secondary border-transparent hover:text-cyan-200 hover:bg-white/5 hover:border-cyan-400/30 hover:shadow-[0_0_14px_rgba(34,211,238,0.18)]'
                      }`}
                      onClick={() => {
                        setActive(link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={link.label}
                      title={link.label}
                    >
                      <span className="text-xl">{link.icon}</span>
                    </motion.a>
                  ))}
                </div>

                {/* Mobile Email Link */}
                <div className="flex items-center justify-center pt-4 border-t border-white/10">
                  <motion.a
                    href="mailto:riveroelijah5@gmail.com"
                    className="w-10 h-10 bg-white/5 hover:bg-cyan-400/20 border border-white/10 hover:border-cyan-300 rounded-xl flex items-center justify-center text-secondary hover:text-cyan-200 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Email"
                  >
                    <FiMail />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-6 min-h-screen">
        {children}
      </main>
    </>
  );
} 