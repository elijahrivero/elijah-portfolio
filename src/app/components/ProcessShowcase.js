"use client";

import { motion, useInView } from "framer-motion";
import {
  FiCode,
  FiMonitor,
  FiZap,
  FiCheckCircle,
  FiPlay,
  FiLayout,
  FiPenTool,
} from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function ProcessShowcase() {
  const triggerRef = useRef(null);
  const inView = useInView(triggerRef, { once: true, amount: 0.1 });
  const [buildStep, setBuildStep] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);

  // Auto-start when first seen
  useEffect(() => {
    if (inView && !hasStarted) {
      setIsBuilding(true);
      setHasStarted(true);
      setBuildStep(0);
    }
  }, [inView, hasStarted]);

  // Auto-build animation with continuous repeat (runs forever once started)
  useEffect(() => {
    if (isBuilding && !isManualMode) {
      const interval = setInterval(() => {
        setBuildStep(prev => {
          if (prev >= 5) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isBuilding, isManualMode]);

  const handleStepClick = (stepIndex) => {
    setIsManualMode(true);
    setIsBuilding(false);
    setBuildStep(stepIndex);
  };

  const resumeAutoMode = () => {
    setIsManualMode(false);
    setIsBuilding(true);
  };

  return (
    <section
      id="showcase"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={triggerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
              <FiPlay className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Live Demo</span>
            </div>
          </motion.div>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            How I Build{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Websites
            </span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience my development process in real-time. From wireframes to fully functional websites.
          </motion.p>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-800/50 border border-gray-700/50">
            <div className={`w-3 h-3 rounded-full ${isManualMode ? 'bg-blue-500' : 'bg-green-500 animate-pulse'}`}></div>
            <span className="text-gray-300 font-medium">
              {isManualMode ? 'Manual Mode - Click steps to navigate' : 'Live Development in Progress'}
            </span>
            {isManualMode && (
              <button
                onClick={resumeAutoMode}
                className="ml-3 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-full transition-colors"
              >
                Resume Auto
              </button>
            )}
          </div>
        </motion.div>

        {/* Desktop Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="hidden lg:flex w-full gap-8"
        >
          {/* Development Sidebar */}
          <motion.aside
            className="w-[280px] min-w-[260px] max-w-[300px] bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-auto min-h-[700px] overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Project Info */}
            <motion.div
              className="flex items-center gap-3 mb-6 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <FiMonitor className="w-6 h-6 text-blue-400" />
              <div>
                <div className="font-semibold text-white text-sm">Portfolio Website</div>
                <div className="text-xs text-gray-400">Client: Demo Project</div>
              </div>
            </motion.div>

            {/* Development Steps */}
            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Development Steps</h4>
              <p className="text-xs text-gray-400 mb-2">Click any step to see the demo</p>
              {[
                { step: "1", label: "Requirements Analysis", icon: FiCode, status: buildStep >= 1 ? "completed" : buildStep === 0 ? "active" : "pending" },
                { step: "2", label: "Wireframe Design", icon: FiLayout, status: buildStep >= 2 ? "completed" : buildStep === 1 ? "active" : "pending" },
                { step: "3", label: "UI/UX Design", icon: FiPenTool, status: buildStep >= 3 ? "completed" : buildStep === 2 ? "active" : "pending" },
                { step: "4", label: "Development", icon: FiCode, status: buildStep >= 4 ? "completed" : buildStep === 3 ? "active" : "pending" },
                { step: "5", label: "Final Testing", icon: FiCheckCircle, status: buildStep >= 5 ? "completed" : buildStep === 4 ? "active" : "pending" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 cursor-pointer hover:scale-105 ${
                      item.status === "completed" ? "bg-green-500/20 border border-green-500/30 hover:bg-green-500/30" :
                      item.status === "active" ? "bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30" :
                      "bg-gray-800/30 border border-gray-700/30 hover:bg-gray-700/40"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                    onClick={() => handleStepClick(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      item.status === "completed" ? "bg-green-500 text-white" :
                      item.status === "active" ? "bg-blue-500 text-white" :
                      "bg-gray-600 text-gray-400"
                    }`}>
                      {item.status === "completed" ? "✓" : item.step}
                    </div>
                    <Icon className={`w-4 h-4 ${
                      item.status === "completed" ? "text-green-400" :
                      item.status === "active" ? "text-blue-400" :
                      "text-gray-500"
                    }`} />
                    <span className={`text-sm font-medium ${
                      item.status === "completed" ? "text-green-300" :
                      item.status === "active" ? "text-blue-300" :
                      "text-gray-400"
                    }`}>
                      {item.label}
                    </span>
                    {item.status === "active" && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Technology Stack */}
            <motion.div
              className="bg-gray-800/30 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 className="font-medium text-white mb-3 text-sm">Tech Stack</h4>
              <div className="space-y-2">
                {[
                  { name: "React.js", type: "Frontend", active: buildStep >= 4 },
                  { name: "Next.js", type: "Framework", active: buildStep >= 4 },
                  { name: "Tailwind CSS", type: "Styling", active: buildStep >= 3 },
                  { name: "TypeScript", type: "Language", active: buildStep >= 4 },
                ].map((tech, i) => (
                  <motion.div
                    key={i}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all duration-500 ${
                      tech.active ? "bg-blue-500/20 border border-blue-500/30" : "bg-gray-900/50"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  >
                    <div>
                      <span className={`text-sm font-medium ${
                        tech.active ? "text-blue-300" : "text-white"
                      }`}>{tech.name}</span>
                      <div className="text-xs text-gray-400">{tech.type}</div>
                    </div>
                    {tech.active && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.aside>

          {/* Live Website Preview */}
          <motion.div
            className="flex-1 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 h-[700px] overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-xl font-bold text-white">Live Preview</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Website Demo Content */}
            <div className="bg-white rounded-lg h-[600px] overflow-hidden border border-gray-300 relative">
              {/* Browser Address Bar */}
              <div className="bg-gray-100 p-3 border-b border-gray-300">
                <div className="bg-white rounded px-3 py-1 text-sm text-gray-600">
                  https://techstore-demo.com
                </div>
              </div>

              {/* Website Content - Changes based on build step */}
              <div className="p-6 h-full bg-white overflow-y-auto">

                {/* Step 0: Requirements Analysis */}
                {buildStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">Requirements Analysis</h2>
                      <div className="max-w-md mx-auto">
                        <motion.div
                          className="bg-gray-50 rounded-lg p-4 mb-4"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <h3 className="font-semibold text-gray-700 mb-3">Project Requirements</h3>
                          <div className="space-y-2 text-left">
                            {[
                              "E-commerce platform for electronics",
                              "Product catalog with search",
                              "Shopping cart functionality",
                              "User authentication system",
                              "Payment integration",
                              "Responsive design"
                            ].map((req, i) => (
                              <motion.div
                                key={i}
                                className="flex items-center gap-2 text-sm"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + i * 0.2 }}
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-600">{req}</span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          className="bg-blue-50 rounded-lg p-4"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.8 }}
                        >
                          <h3 className="font-semibold text-blue-700 mb-2">Tech Stack Decision</h3>
                          <div className="flex flex-wrap gap-2">
                            {["React", "Next.js", "Tailwind", "TypeScript"].map((tech, i) => (
                              <motion.span
                                key={i}
                                className="px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3, delay: 2 + i * 0.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 1 & 2: Wireframe to Design Morph */}
                {(buildStep === 1 || buildStep === 2) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    {/* Header - Morphs from Wireframe to Design */}
                    <motion.div
                      className={`border-2 p-4 rounded transition-all duration-1000 ease-in-out ${
                        buildStep === 2
                          ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                          : "border-dashed border-gray-300 bg-transparent"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <motion.div
                        className={`h-6 rounded mb-2 transition-all duration-1000 ease-in-out overflow-hidden ${
                          buildStep === 2 ? "bg-transparent" : "bg-gray-200 w-32"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: buildStep === 2 ? "auto" : 128 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        {buildStep === 2 ? (
                          <motion.h1
                            className="text-xl font-bold text-white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            TechStore
                          </motion.h1>
                        ) : null}
                      </motion.div>
                      <motion.div
                        className={`h-4 rounded transition-all duration-1000 ease-in-out overflow-hidden ${
                          buildStep === 2 ? "bg-transparent" : "bg-gray-200 w-24"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: buildStep === 2 ? "auto" : 96 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        {buildStep === 2 ? (
                          <motion.p
                            className="text-blue-100 text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            Premium Electronics
                          </motion.p>
                        ) : null}
                      </motion.div>
                    </motion.div>

                    {/* Navigation - Morphs from Wireframe to Design */}
                    <motion.div
                      className={`border-2 p-3 rounded transition-all duration-1000 ease-in-out ${
                        buildStep === 2
                          ? "border-gray-200 bg-white shadow-lg"
                          : "border-dashed border-gray-300 bg-transparent"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, y: buildStep === 2 ? -2 : 0 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <div className="flex gap-4">
                        {["Home", "Products", "About", "Contact"].map((label, i) => (
                          <motion.div
                            key={i}
                            className={`h-4 rounded flex items-center justify-center transition-all duration-1000 ease-in-out overflow-hidden ${
                              buildStep === 2 ? "px-3 bg-transparent hover:bg-gray-100" : "w-16 bg-gray-200"
                            }`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, width: buildStep === 2 ? "auto" : 64 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                          >
                            <motion.span
                              className={`font-medium text-sm transition-all duration-1000 ${
                                buildStep === 2 ? "text-gray-700 opacity-100" : "opacity-0"
                              }`}
                              animate={{ opacity: buildStep === 2 ? 1 : 0, scale: buildStep === 2 ? 1 : 0.8 }}
                              transition={{ duration: 0.5, delay: buildStep === 2 ? 0.3 + i * 0.05 : 0 }}
                            >
                              {buildStep === 2 ? label : ""}
                            </motion.span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Content - Morphs from Wireframe to Design */}
                    <motion.div
                      className={`border-2 p-4 rounded transition-all duration-1000 ease-in-out ${
                        buildStep === 2
                          ? "border-gray-100 bg-gray-50"
                          : "border-dashed border-gray-300 bg-transparent"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, boxShadow: buildStep === 2 ? "0 4px 20px rgba(0,0,0,0.05)" : "none" }}
                      transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <motion.div
                        className={`h-8 rounded mb-4 flex items-center transition-all duration-1000 ease-in-out overflow-hidden ${
                          buildStep === 2 ? "bg-transparent" : "w-48 bg-gray-200"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: buildStep === 2 ? "auto" : 192 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      >
                        <motion.h2
                          className={`font-bold transition-all duration-1000 ${
                            buildStep === 2 ? "text-md text-gray-800" : "opacity-0"
                          }`}
                          animate={{ opacity: buildStep === 2 ? 1 : 0, scale: buildStep === 2 ? 1 : 0.8 }}
                          transition={{ duration: 0.5, delay: buildStep === 2 ? 0.3 : 0 }}
                        >
                          {buildStep === 2 ? "Featured Products" : ""}
                        </motion.h2>
                      </motion.div>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { title: "Smartphone Pro", price: "$999", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center" },
                          { title: "Laptop Ultra", price: "$1299", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center" },
                          { title: "Headphones X", price: "$299", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center" }
                        ].map((product, i) => (
                          <motion.div
                            key={i}
                            className={`border p-3 rounded transition-all duration-1000 ease-in-out ${
                              buildStep === 2
                                ? "border-gray-200 bg-white shadow-lg hover:shadow-xl"
                                : "border-gray-300 bg-transparent"
                            }`}
                            initial={{ scale: 0, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0, y: buildStep === 2 ? -4 : 0 }}
                            transition={{ duration: 0.5, delay: 0.8 + i * 0.2, type: "spring", stiffness: 200 }}
                          >
                            <motion.div
                              className={`w-full h-16 rounded mb-2 overflow-hidden transition-all duration-1000 ease-in-out ${
                                buildStep === 2 ? "bg-gradient-to-br from-gray-100 to-gray-200" : "bg-gray-100"
                              }`}
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1, borderRadius: buildStep === 2 ? 8 : 4 }}
                              transition={{ duration: 0.3, delay: 1 + i * 0.2 }}
                            >
                              {buildStep === 2 && (
                                <motion.img
                                  src={product.image}
                                  alt={product.title}
                                  className="w-full h-full object-cover"
                                  initial={{ opacity: 0, scale: 1.2 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.8, delay: 0.3 }}
                                />
                              )}
                            </motion.div>
                            <motion.div
                              className={`h-3 rounded mb-1 overflow-hidden transition-all duration-1000 ease-in-out ${
                                buildStep === 2 ? "bg-transparent" : "w-full bg-gray-200"
                              }`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1, width: buildStep === 2 ? "auto" : "100%" }}
                              transition={{ duration: 0.3, delay: 1.1 + i * 0.2 }}
                              style={{ transformOrigin: 'left' }}
                            >
                              {buildStep === 2 ? (
                                <motion.h3
                                  className="font-semibold text-gray-800 text-xs leading-tight"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                  {product.title}
                                </motion.h3>
                              ) : null}
                            </motion.div>
                            <motion.div
                              className={`h-3 rounded overflow-hidden transition-all duration-1000 ease-in-out ${
                                buildStep === 2 ? "bg-transparent" : "w-3/4 bg-gray-200"
                              }`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1, width: buildStep === 2 ? "auto" : "75%" }}
                              transition={{ duration: 0.3, delay: 1.2 + i * 0.2 }}
                              style={{ transformOrigin: 'left' }}
                            >
                              {buildStep === 2 ? (
                                <motion.p
                                  className="text-blue-600 font-bold text-xs"
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                  {product.price}
                                </motion.p>
                              ) : null}
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 3: Development */}
                {buildStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded shadow-lg"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h1 className="text-xl font-bold flex items-center gap-2">
                        <FiZap className="w-5 h-5" />
                        TechStore
                      </h1>
                      <p className="text-blue-100 text-sm">Premium Electronics & Gadgets</p>
                    </motion.div>

                    <motion.div
                      className="bg-white shadow-lg p-3 rounded border"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="flex gap-6">
                        {["Home", "Products", "About", "Contact"].map((item, i) => (
                          <span
                            key={i}
                            className="text-gray-700 font-medium text-sm hover:text-blue-600 cursor-pointer px-2 py-1 rounded transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-gray-50 p-4 rounded"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <h2 className="text-md font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4 text-green-500" />
                        Featured Products
                      </h2>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { title: "Smartphone Pro", price: "$999", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center", stock: "In Stock" },
                          { title: "Laptop Ultra", price: "$1299", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center", stock: "2 Left" },
                          { title: "Headphones X", price: "$299", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center", stock: "Available" }
                        ].map((product, i) => (
                          <motion.div
                            key={i}
                            className="bg-white p-3 rounded-lg shadow-lg border hover:shadow-xl transition-shadow cursor-pointer"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-full h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-2 relative overflow-hidden">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, delay: 1 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                              />
                            </div>
                            <h3 className="font-semibold text-gray-800 text-xs mb-1 leading-tight">{product.title}</h3>
                            <p className="text-blue-600 font-bold text-xs">{product.price}</p>
                            <p className="text-xs text-green-600 mb-1">{product.stock}</p>
                            <button className="w-full bg-blue-500 text-white py-1 px-2 rounded text-xs font-medium hover:bg-blue-600 transition-colors">
                              Add to Cart
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 4: Final Testing & Launch */}
                {buildStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <div className="text-center py-8">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <FiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Testing & Launch</h2>
                      </motion.div>

                      <div className="max-w-md mx-auto space-y-4">
                        <motion.div
                          className="bg-green-50 rounded-lg p-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          <h3 className="font-semibold text-green-700 mb-3">Quality Assurance</h3>
                          <div className="space-y-2">
                            {[
                              "Cross-browser testing ✓",
                              "Mobile responsiveness ✓",
                              "Performance optimization ✓",
                              "Security validation ✓"
                            ].map((test, i) => (
                              <motion.div
                                key={i}
                                className="flex items-center gap-2 text-sm text-green-600"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                              >
                                {test}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        <motion.div
                          className="bg-blue-50 rounded-lg p-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.8 }}
                        >
                          <h3 className="font-semibold text-blue-700 mb-2">Ready for Launch! 🚀</h3>
                          <p className="text-sm text-blue-600">Website deployed and live</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mobile Layout */}
        <div className="lg:hidden">

          {/* Mobile Website Preview */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-lg overflow-hidden border border-gray-300 h-[450px] flex flex-col">
              {/* Mobile Browser Bar */}
              <div className="bg-gray-100 p-2 border-b border-gray-300 text-center">
                <div className="text-xs text-gray-600">techstore-demo.com</div>
              </div>

              {/* Mobile Website Content */}
              <div className="p-4 bg-white flex-1 overflow-y-auto">
                {buildStep === 0 && (
                  <div className="text-center py-4">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm">Requirements Analysis</h3>
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <div className="space-y-1">
                        {[
                          "E-commerce platform",
                          "Product catalog",
                          "Shopping cart",
                          "User authentication"
                        ].map((req, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-2 text-xs"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 + i * 0.2 }}
                          >
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-600">{req}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded p-2">
                      <p className="text-xs text-blue-700 font-medium">Tech Stack Selected</p>
                    </div>
                  </div>
                )}

                {(buildStep === 1 || buildStep === 2) && (
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className={`border-2 p-3 rounded transition-all duration-1000 ease-in-out ${
                        buildStep === 2
                          ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                          : "border-dashed border-gray-300"
                      }`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <motion.div
                        className={`h-4 rounded mb-2 transition-all duration-1000 ease-in-out overflow-hidden ${
                          buildStep === 2 ? "bg-transparent" : "w-24 bg-gray-200"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: buildStep === 2 ? "auto" : 96 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        {buildStep === 2 ? (
                          <motion.h1
                            className="font-bold text-sm text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          >
                            TechStore
                          </motion.h1>
                        ) : null}
                      </motion.div>
                      <motion.div
                        className={`h-3 rounded transition-all duration-1000 ease-in-out overflow-hidden ${
                          buildStep === 2 ? "bg-transparent" : "w-16 bg-gray-200"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: buildStep === 2 ? "auto" : 64 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                      >
                        {buildStep === 2 ? (
                          <motion.p
                            className="text-blue-100 text-xs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            Premium Electronics
                          </motion.p>
                        ) : null}
                      </motion.div>
                    </motion.div>
                    <motion.div
                      className="border-2 border-dashed border-gray-300 p-2 rounded"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <div className="flex gap-2">
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            className="w-12 h-3 bg-gray-200 rounded"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + i * 0.1, type: "spring", stiffness: 300 }}
                          ></motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div
                      className="border-2 border-dashed border-gray-300 p-3 rounded"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <motion.div
                        className="w-32 h-5 bg-gray-200 rounded mb-3"
                        initial={{ width: 0 }}
                        animate={{ width: 128 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                      ></motion.div>
                      <div className="space-y-2">
                        {[1, 2, 3].map(i => (
                          <motion.div
                            key={i}
                            className="border border-gray-300 p-2 rounded"
                            initial={{ scale: 0, opacity: 0, rotate: -10 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 + i * 0.2, type: "spring", stiffness: 200 }}
                          >
                            <motion.div
                              className="w-full h-12 bg-gray-100 rounded mb-1"
                              initial={{ scaleY: 0 }}
                              animate={{ scaleY: 1 }}
                              transition={{ duration: 0.3, delay: 1 + i * 0.2 }}
                            ></motion.div>
                            <motion.div
                              className="w-full h-2 bg-gray-200 rounded"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.3, delay: 1.1 + i * 0.2 }}
                              style={{ transformOrigin: 'left' }}
                            ></motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {buildStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded shadow-lg"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                    >
                      <h1 className="font-bold text-sm flex items-center gap-1">
                        <FiZap className="w-3 h-3" />
                        TechStore
                      </h1>
                      <p className="text-blue-100 text-xs">Premium Electronics & Gadgets</p>
                    </motion.div>
                    <motion.div
                      className="bg-white shadow-lg p-2 rounded border"
                      initial={{ y: -5 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex gap-3 text-xs">
                        {["Home", "Products", "About"].map((item, i) => (
                          <span key={i} className="text-gray-700 hover:text-blue-600">{item}</span>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div
                      className="bg-gray-50 p-3 rounded"
                      initial={{ y: 5 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="font-bold text-gray-800 mb-2 text-sm flex items-center gap-1">
                        <FiCheckCircle className="w-3 h-3 text-green-500" />
                        Featured Products
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { title: "Smartphone Pro", price: "$999", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center", stock: "In Stock" },
                          { title: "Laptop Ultra", price: "$1299", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center", stock: "2 Left" },
                          { title: "Headphones X", price: "$299", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center", stock: "Available" }
                        ].map((product, i) => (
                          <motion.div
                            key={i}
                            className="bg-white p-3 rounded-lg shadow-lg border hover:shadow-xl transition-shadow w-full max-w-none"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            <div className="w-full h-20 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2 relative overflow-hidden">
                              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                              <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 3 }}
                              />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">{product.title}</h3>
                            <p className="text-sm text-blue-600 font-bold mb-1">{product.price}</p>
                            <p className="text-xs text-green-600 mb-2">{product.stock}</p>
                            <button className="w-full bg-blue-500 text-white py-2 px-2 rounded text-xs font-medium hover:bg-blue-600 transition-colors">
                              Add to Cart
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {buildStep === 4 && (
                  <div className="text-center py-4">
                    <FiCheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h3 className="font-bold text-gray-800 mb-2 text-sm">Testing & Launch</h3>
                    <div className="bg-green-50 rounded p-3 mb-2">
                      <div className="space-y-1">
                        {[
                          "Cross-browser testing ✓",
                          "Mobile responsiveness ✓",
                          "Performance testing ✓",
                          "Security validation ✓"
                        ].map((test, i) => (
                          <motion.div
                            key={i}
                            className="text-xs text-green-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                          >
                            {test}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded p-2">
                      <p className="text-xs text-blue-700 font-bold">🚀 Ready for Launch!</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Mobile Build Steps */}
          <motion.div
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-white font-semibold mb-2 text-sm">Build Progress</h4>
            <p className="text-xs text-gray-400 mb-4">Click any step to see the demo</p>
            <div className="space-y-2">
              {[
                { step: "1", label: "Requirements", completed: buildStep >= 1 },
                { step: "2", label: "Wireframe", completed: buildStep >= 2 },
                { step: "3", label: "Design", completed: buildStep >= 3 },
                { step: "4", label: "Development", completed: buildStep >= 4 },
                { step: "5", label: "Testing", completed: buildStep >= 5 },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-2 rounded transition-all duration-500 cursor-pointer hover:scale-105 ${
                    item.completed ? "bg-green-500/20 border border-green-500/30 hover:bg-green-500/30" : "bg-gray-800/30 hover:bg-gray-700/40"
                  }`}
                  onClick={() => handleStepClick(i)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    item.completed ? "bg-green-500 text-white" : "bg-gray-600 text-gray-400"
                  }`}>
                    {item.completed ? "✓" : item.step}
                  </div>
                  <span className={`text-sm ${item.completed ? "text-green-300" : "text-gray-400"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
