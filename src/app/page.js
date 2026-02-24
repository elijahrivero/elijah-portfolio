"use client";
import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiDownload,
  FiZap,
  FiCircle,
  FiStar,
  FiAward,
  FiCode,
  FiGlobe,
  FiSmartphone,
  FiDatabase,
  FiArrowRight,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiBook,
  FiExternalLink,
  FiLayers
} from "react-icons/fi";
import { FaRocket } from "react-icons/fa";

// Enhanced skills data with categories
const skillCategories = {
  "Frontend": ["Next.js", "React.js", "Tailwind CSS", "HTML5", "CSS", "JavaScript (ES6+)"],
  "Backend": ["PHP (Laravel)", "Filament PHP", "MySQL", "Python", "JavaScript", "Node.js"],
  "Tools & Platforms": ["GitHub", "VS Code", "Vercel", "Canva", "MS Excel", "Figma"]
};

// Experience timeline
const experience = [
  {
    year: "2025-2026",
    title: "Junior Developer",
    company: "LiftFront",
    description: "Contributed to web applications using Next.js, Tailwind CSS, and Node.js. Collaborated with senior developers in planning, testing, and implementation. Supported backend integration and API handling.",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "API Integration"]
  },
  {
    year: "2024",
    title: "Full Stack Developer",
    company: "Freelance",
    description: "Building modern web applications with Next.js, React, and Node.js. Specializing in AI integration and responsive design.",
    technologies: ["Next.js", "React", "Node.js", "AI APIs"]
  },
  {
    year: "2022-Present",
    title: "BS Information Technology",
    company: "Polytechnic University of the Philippines",
    description: "Pursuing degree in Information Technology at PUP Lopez, Quezon.",
    technologies: ["Web Development", "Database Systems", "Programming"]
  }
];

// Projects data
const projects = [
  {
    id: 1,
    title: "PUP Guidance Center",
    description: "A web-based platform built to digitize and enhance the services of the Polytechnic University of the Philippines Guidance Center, facilitating better communication between counselors and students while providing 24/7 access to wellness resources.",
    url: "https://pup-guidance-center.vercel.app",
    category: "Web Application",
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    featured: true,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Palette of Eternity",
    description: "A curated digital platform celebrating 30 works of human expression across Literary, Visual, and Performing Arts. Developed as a centralized hub to explore the connections between different artistic storytelling formats.",
    url: "https://elijahriverooooo.wixsite.com/palette-of-eternit-2",
    category: "Digital Gallery",
    technologies: ["Wix", "Web Design", "UI/UX", "Content Curation"],
    featured: false,
    gradient: "from-violet-500 to-purple-500"
  },
  {
    id: 3,
    title: "Elijah Gallery",
    description: "A custom-built digital gallery platform featuring curated photographic albums, built with a focus on performance and clean aesthetics.",
    url: "https://elijahgallery.vercel.app",
    category: "Photography Platform",
    technologies: ["Next.js", "React", "Vercel", "Image Optimization"],
    featured: false,
    gradient: "from-cyan-500 to-teal-500"
  }
];

// Certifications data
const certifications = [
  { year: "2026", title: "Prefering Future IT Professionals Through Enterprise Networking" },
  { year: "2026", title: "Digital Literacy Training: Introduction to Data Analytics" },
  { year: "2025", title: "Internet Media and Information Literacy Training" },
  { year: "2025", title: "10th National Research Conference on IT Education" },
  { year: "2025", title: "Role of AI in Predicting and Mitigating Cyber Threats" },
  { year: "2025", title: "Quezon Cybersecurity Conference X Chapter Activation" },
  { year: "2024", title: "Creating a Strong Foundation in Cyber Security for Filipino Students" }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const left = ((i * 137.5) % 100) + (i % 3) * 0.5;
          const top = ((i * 89.3) % 100) + (i % 5) * 0.3;
          const delay = (i * 0.1) % 2;
          const duration = 2 + (i % 3) + 0.5;
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>


      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center py-16 sm:py-20 relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile / Avatar */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <div className="avatar-container">
              <motion.div
                className="avatar-ring"
                whileHover={{ scale: 1.04, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="avatar-glow" aria-hidden="true" />
                <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-cyan-400/20 to-blue-500/20 bg-cover bg-center ring-1 ring-cyan-400/40 flex items-center justify-center">
                  <Image src="/elijah.jpg" alt="Elijah Rivero" width={200} height={200} className="w-full h-full object-cover" priority />
                </div>
              </motion.div>
              
              {/* Floating badges */}
              <motion.div
                className="floating-badge bg-gradient-to-r from-green-400 to-blue-500 -top-4 -right-4"
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓
              </motion.div>
              
              <motion.div
                className="floating-badge bg-gradient-to-r from-yellow-400 to-orange-500 -bottom-4 -left-4 w-6 h-6 text-xs"
                animate={{ 
                  y: [0, 10, 0],
                  scale: [1, 0.9, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ⭐
              </motion.div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="hero-title mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
          >
            Elijah Rivero
          </motion.h1>

          {/* Job Title */}
          <motion.h2
            className="hero-subtitle mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 120 }}
          >
            Full Stack Developer
          </motion.h2>

          {/* Tagline */}
          <motion.p
            className="hero-tagline mb-6 sm:mb-8 px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 120 }}
          >
            Building AI-powered, responsive, and scalable web apps that make a difference.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-4 sm:mb-6 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 120 }}
          >
            <motion.a
              href="#work"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto mb-4 px-2 sm:px-0"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="highlight-card"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl sm:text-2xl">💻</span>
              <span className="font-semibold text-xs sm:text-sm">5+ Projects</span>
            </motion.div>
            <motion.div
              className="highlight-card"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl sm:text-2xl">🤖</span>
              <span className="font-semibold text-xs sm:text-sm">AI Integration</span>
            </motion.div>
            <motion.div
              className="highlight-card"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-xl sm:text-2xl">🚀</span>
              <span className="font-semibold text-xs sm:text-sm">Fast & Scalable</span>
            </motion.div>
          </motion.div>

          {/* Social Icons removed per request */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* My Journey Card */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <FiBook className="text-primary text-lg sm:text-2xl" />
              My Journey
            </h3>
            
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1), type: "spring", stiffness: 150 }}
                  viewport={{ once: true }}
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full ring-4 ring-blue-500/20"></div>
                    {index < experience.length - 1 && (
                      <div className="w-0.5 flex-1 min-h-[60px] bg-gradient-to-b from-blue-500/60 to-violet-600/30"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <span className="inline-block px-2.5 py-0.5 mb-2 bg-gradient-to-r from-blue-500/20 to-violet-500/20 border border-blue-500/30 rounded-full text-blue-300 text-[10px] sm:text-xs font-semibold">
                      {exp.year}
                    </span>
                    <h4 className="font-semibold text-white mb-1 text-sm sm:text-base">{exp.title}</h4>
                    <p className="text-cyan-400 text-xs sm:text-sm mb-1">{exp.company}</p>
                    <p className="text-secondary text-xs sm:text-sm">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills & Expertise Card */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FiZap className="text-primary" />
              Skills & Expertise
            </h3>
            
            <div className="space-y-6">
              {/* Frontend Skills */}
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <FiGlobe className="text-xs sm:text-sm" />
                  Frontend
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {skillCategories["Frontend"].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-[10px] sm:text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Backend Skills */}
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <FiDatabase className="text-xs sm:text-sm" />
                  Backend
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {skillCategories["Backend"].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-violet-500/20 border border-violet-500/30 rounded-full text-violet-300 text-[10px] sm:text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Tools & Platforms */}
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <FiZap className="text-xs sm:text-sm" />
                  Tools & Platforms
                </h4>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {skillCategories["Tools & Platforms"].map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-[10px] sm:text-xs md:text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.3)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <FiAward className="text-primary text-2xl sm:text-3xl md:text-4xl" />
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
              viewport={{ once: true }}
            >
              Certifications
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <FiAward className="text-primary text-2xl sm:text-3xl md:text-4xl" />
            </motion.div>
          </div>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            Professional development and training certifications
          </motion.p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 hover:border-cyan-400/30 p-3 sm:p-4 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 150 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-[10px] sm:text-xs font-bold">
                    {cert.year}
                  </span>
                  <span className="text-white text-xs sm:text-sm font-medium">{cert.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="work" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <FiCode className="text-primary text-2xl sm:text-3xl md:text-4xl" />
            </motion.div>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 120 }}
              viewport={{ once: true }}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
              viewport={{ once: true }}
            >
              <FiCode className="text-primary text-2xl sm:text-3xl md:text-4xl" />
            </motion.div>
          </div>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            A selection of projects I&apos;ve built and contributed to
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 hover:border-cyan-400/30 overflow-hidden transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 120 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Gradient Header */}
              <div className={`h-32 sm:h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <FiExternalLink className="text-lg" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                    <FiLayers className="text-sm" />
                    {project.category}
                  </span>
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="px-2 py-1 bg-yellow-500/90 rounded-full text-black text-[10px] font-bold flex items-center gap-1">
                      <FiStar className="text-xs" />
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-secondary text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-[10px] sm:text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-secondary text-[10px] sm:text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 18 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-secondary max-w-2xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
          >
            Ready to start a project or just want to chat? Let&apos;s connect!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <motion.a
            href="mailto:riveroelijah5@gmail.com"
            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-blue-500/20 hover:border-blue-400/40 p-4 sm:p-6 text-center cursor-pointer transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <FiMail className="text-2xl sm:text-3xl text-blue-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Email</h3>
            <p className="text-secondary text-xs sm:text-sm break-all hover:text-cyan-300 transition-colors">riveroelijah5@gmail.com</p>
          </motion.a>

          <motion.div
            className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-violet-500/20 p-4 sm:p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <FiMapPin className="text-2xl sm:text-3xl text-violet-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Location</h3>
            <p className="text-secondary text-xs sm:text-sm">Lopez, Quezon</p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-green-500/20 p-4 sm:p-6 text-center col-span-2 lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 120 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <FiCalendar className="text-2xl sm:text-3xl text-green-400 mx-auto mb-2 sm:mb-3" />
            <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Availability</h3>
            <p className="text-secondary text-xs sm:text-sm">Open to opportunities</p>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 120 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="mailto:riveroelijah5@gmail.com"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm sm:text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-blue-500/25"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
            <FiArrowRight className="text-base sm:text-lg" />
          </motion.a>
        </motion.div>

        {/* Background Blur Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
      </section>
    </main>
  );
}
