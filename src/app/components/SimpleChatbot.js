'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiSend, FiX, FiCpu, FiUser } from 'react-icons/fi';

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Elijah Rivero. I'd love to tell you about my skills, projects, and experience. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Pre-programmed responses about Elijah
    const responses = {
      'skills': 'I\'m proficient in Next.js, React, Node.js, MongoDB, Tailwind CSS, and more. I specialize in full-stack development with expertise in both frontend and backend technologies.',
      'projects': 'I\'ve built several impressive projects including PUP Guidance Center (web application), RiveroBH (management system), Elijah Gallery (photography platform), and Palette of Eternity (digital gallery).',
      'experience': 'I\'m currently working as a Junior Developer at LiftFront and have freelance experience. I\'m pursuing a BS in Information Technology at Polytechnic University of the Philippines.',
      'contact': 'You can reach me through my portfolio contact section or email me at riveroelijah5@gmail.com. I\'m always open to discussing new opportunities and collaborations.',
      'education': 'I\'m studying BS Information Technology at Polytechnic University of the Philippines. I also have several certifications in cybersecurity and IT.',
      'about': 'I\'m Elijah Rivero, a passionate Full Stack Developer who loves crafting scalable applications using modern technologies. I focus on delivering efficient and user-centered solutions.',
      'hobbies': 'When I\'m not coding, I enjoy photography, exploring new technologies, and contributing to open-source projects. I\'m also interested in AI and machine learning applications.',
      'availability': 'I\'m currently open to freelance opportunities and full-time positions. I\'m particularly interested in roles involving modern web technologies and innovative projects.',
      'technologies': 'I work with a modern tech stack including Next.js, React, Node.js, MongoDB, Tailwind CSS, TypeScript, Git, Vercel, and various cloud services.',
      'background': 'I started my journey in web development during college and have since built multiple production applications. I combine academic knowledge with practical experience.',
      'goals': 'I aim to become a senior full-stack developer and eventually lead development teams. I\'m passionate about creating impactful applications that solve real-world problems.',
      'services': 'I offer web development services including custom websites, web applications, API development, database design, and technical consulting.',
      'family': 'I come from a loving family. My mother is Epifania Rivero and my father is Dante Rivero. I have a brother named David Angelo Rivero who I hold dear. They have all been supportive of my journey in technology and web development.',
      'mother': 'My mother is Epifania Rivero. She has been a wonderful source of support and encouragement throughout my educational and professional journey.',
      'father': 'My father is Dante Rivero. He has supported my passion for technology and has been proud of my achievements in web development.',
      'parents': 'My parents are Epifania Rivero and Dante Rivero. They have been incredibly supportive of my career in technology and continue to encourage my growth as a developer.',
      'brother': 'My brother is David Angelo Rivero, who I consider my favorite brother. We share a close bond and David has been supportive of my journey in web development and technology.',
      'david': 'David Angelo Rivero is my brother. We have a special relationship and David has been a source of support and encouragement in my life and career.',
      'siblings': 'I have a brother named David Angelo Rivero. We share a close relationship and David has been supportive of my pursuits in technology and web development.',
      'crush': 'That\'s my little secret! Some things are best kept mysterious, don\'t you think? 😊',
      'love': 'I believe in focusing on my career and personal growth right now. When the time is right, the right person will come along!',
      'relationship': 'I\'m currently focused on my journey as a developer and building amazing things. Relationships happen when they\'re meant to happen!'
    };

    const lowerMessage = inputValue.toLowerCase();
    let botResponse = null;

    // Check for keywords and return appropriate responses
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        botResponse = response;
        break;
      }
    }

    // Default responses for other queries
    if (!botResponse) {
      const defaultResponses = [
        "That's interesting! For more specific information about my work, you might want to check out my projects section or skills section in the portfolio.",
        "I can tell you about my skills, projects, experience, or how to contact me. What would you like to know?",
        "I have diverse experience in web development. Is there something specific about my technical skills or projects you'd like to explore?",
        "Feel free to ask about my background, my projects, or my technical expertise. I'm here to help!"
      ];
      botResponse = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    // Simulate typing delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl z-40 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <FiMessageSquare className="text-xl group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-slate-900/95 backdrop-blur-xl border border-cyan-400/20 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-400/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                  <FiCpu className="text-white text-sm" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-cyan-300 text-xs">Portfolio Assistant</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white/60 hover:text-white transition-colors"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-400' 
                        : 'bg-gradient-to-r from-purple-400 to-pink-400'
                    }`}>
                      {message.sender === 'user' ? (
                        <FiUser className="text-white text-xs" />
                      ) : (
                        <FiCpu className="text-white text-xs" />
                      )}
                    </div>
                    <div className={`px-3 py-2 rounded-2xl text-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-white'
                        : 'bg-white/10 border border-white/20 text-white/90'
                    }`}>
                      {message.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-start gap-2 max-w-[80%]">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400">
                      <FiCpu className="text-white text-xs" />
                    </div>
                    <div className="px-3 py-2 rounded-2xl text-sm bg-white/10 border border-white/20">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-white/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-white/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-white/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-cyan-400/20 p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Elijah's skills, projects..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 transition-all duration-300"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === '' || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform duration-300"
                >
                  <FiSend className="text-sm" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SimpleChatbot;
