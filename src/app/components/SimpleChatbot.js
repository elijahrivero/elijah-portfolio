'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiSend, FiX, FiCpu, FiUser } from 'react-icons/fi';
import { geminiService } from '../lib/gemini';

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Elijah Joyce Rivero. I'm here to tell you about his skills, projects, and help you understand why you should hire him. How can I assist you today?",
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

    try {
      // Try to get response from Gemini API
      const geminiResponse = await geminiService.generateResponse(inputValue);
      
      const botMessage = {
        id: messages.length + 2,
        text: geminiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback to pre-programmed responses if API fails
      const lowerMessage = inputValue.toLowerCase();
      let botResponse = null;

      // Enhanced keyword matching with more context
      const messageWords = lowerMessage.split(/\s+/);
      
      // Check for keywords and return appropriate responses
      const responses = {
        'skills': 'I\'m proficient in Frontend Development (Next.js, React.js, Tailwind, HTML5, CSS, JavaScript) and Backend Development (PHP/Laravel, Filament PHP, MySQL, Python, JavaScript). I also work with GitHub, VS Code, Vercel, Canva, and MS Excel. My interests include UI/UX Design, Artistic Storytelling, and Digital Photography.',
        'projects': 'I\'ve built several impressive projects including PUP Guidance Center (web-based platform for PUP services), LiftFront Academy (gamified coding education platform), Palette of Eternity (digital arts platform), and Elijah Gallery (photographic album platform). Each project showcases different aspects of my technical and creative abilities.',
        'experience': 'I\'m currently working as a Junior Developer at LiftFront (Oct 2025 - Jan 2026) where I contribute to web applications using Next.js, Tailwind CSS, and Node.js. I collaborate with senior developers, participate in sprint planning, and handle backend integration and API development.',
        'education': 'I\'m pursuing my Bachelor of Science in Information Technology at Polytechnic University of the Philippines - Lopez, Quezon (2022 - Present). I completed my Senior High School STEM education at Lopez National Comprehensive High School (2020 - 2022).',
        'contact': 'You can reach me at riveroelijah5@gmail.com or call 09912562105. I\'m located in Lopez, Quezon. My portfolio is available at https://elijahrivero.vercel.app/ and I\'m always open to discussing new opportunities and collaborations.',
        'about': 'I\'m Elijah Joyce Rivero, a passionate Full Stack Developer who loves crafting scalable applications using modern technologies. I focus on delivering efficient and user-centered solutions while pursuing my BSIT degree at PUP and gaining professional experience at LiftFront.',
        'hobbies': 'When not coding, I enjoy UI/UX Design, Artistic Storytelling, and Digital Photography. These interests help me create more engaging and visually appealing applications that combine technical excellence with creative expression.',
        'availability': 'I\'m currently completing my BSIT degree and gaining professional experience at LiftFront. I\'m open to discussing new opportunities and collaborations that align with my skills in modern web development and creative design.',
        'technologies': 'I work with a modern tech stack including Next.js, React.js, Tailwind CSS, HTML5, CSS, JavaScript for frontend, and PHP/Laravel, Filament PHP, MySQL, Python for backend. My tools include GitHub, VS Code, Vercel, Canva, and MS Excel.',
        'background': 'I started my journey in web development during high school and am now pursuing my BSIT at PUP while gaining professional experience at LiftFront. I combine academic knowledge with practical industry experience to deliver quality solutions.',
        'goals': 'I aim to become a senior full-stack developer and eventually lead development teams. I\'m passionate about creating impactful applications that solve real-world problems while exploring the intersection of technology and creative arts.',
        'services': 'I offer full-stack web development services including custom websites, web applications, UI/UX design, database development, API integration, and technical consulting. I focus on creating efficient, user-centered solutions.',
        'family': 'I come from a loving family. My mother is Epifania Rivero and my father is Dante Rivero. I have a brother named David Angelo Rivero who I hold dear. They have all been supportive of my journey in technology and web development.',
        'mother': 'My mother is Epifania Rivero. She has been a wonderful source of support and encouragement throughout my educational and professional journey.',
        'father': 'My father is Dante Rivero. He has supported my passion for technology and has been proud of my achievements in web development.',
        'parents': 'My parents are Epifania Rivero and Dante Rivero. They have been incredibly supportive of my career in technology and continue to encourage my growth as a developer.',
        'brother': 'My brother is David Angelo Rivero, who I consider my favorite brother. We share a close bond and David has been supportive of my journey in web development and technology.',
        'david': 'David Angelo Rivero is my brother. We have a special relationship and David has been a source of support and encouragement in my life and career.',
        'siblings': 'I have a brother named David Angelo Rivero. We share a close relationship and David has been supportive of my pursuits in technology and web development.',
        'crush': 'That\'s my little secret! Some things are best kept mysterious, don\'t you think? 😊',
        'love': 'I believe in focusing on my career and personal growth right now. When the time is right, the right person will come along!',
        'relationship': 'I\'m currently focused on my journey as a developer and building amazing things. Relationships happen when they\'re meant to happen!',
        'school': 'I\'m studying at Polytechnic University of the Philippines (PUP) - Lopez, Quezon campus, pursuing my Bachelor of Science in Information Technology. I\'m proud to be a PUP student!',
        'pup': 'PUP stands for Polytechnic University of the Philippines. As a PUP student, I embody the university\'s values of excellence, service, and national pride. Go PUP! 🎓',
        'liftfront': 'I work as a Junior Developer at LiftFront where I contribute to web applications using Next.js, Tailwind CSS, and Node.js. I collaborate with senior developers, participate in sprint planning, and handle backend integration and API development.',
        'work': 'My professional experience includes working as a Junior Developer at LiftFront (Oct 2025 - Jan 2026) where I develop and maintain web applications, resolve bugs and tickets, collaborate with senior developers, and support backend integration.',
        'job': 'I\'m currently a Junior Developer at LiftFront, contributing to web applications while completing my BSIT degree. I\'m open to new opportunities that align with my skills and career goals.',
        'certifications': 'I have several certifications including "Preparing Future IT Professionals Through Enterprise Networking" (2026), "Digital Literacy Training: Introduction to Data" (2026), "Analytics under Free Wi-Fi for All" (2025), "Internet Media and Information Literacy Training" (2025), "10th National Research Conference on Information Technology Education" (2025), and "Role of Artificial Intelligence in Predicting and Mitigating Cyber Threats" (2025).',
        'seminars': 'I\'ve attended various seminars and conferences including the 10th National Research Conference on Information Technology Education (2025), and trainings on AI in cybersecurity, digital literacy, data analytics, and enterprise networking.',
        'guidance': 'The PUP Guidance Center is a web-based platform I built to digitize and enhance services of the Polytechnic University of the Philippines Guidance Center. It facilitates better communication between counselors and students while providing 24/7 access to wellness resources.',
        'academy': 'LiftFront Academy is a gamified online coding education platform I contributed to, featuring interactive browser-based lessons, a real-time code editor, XP progression, and leaderboard systems that help users learn programming.',
        'palette': 'Palette of Eternity is a curated digital platform I developed celebrating 30 works of human expression across Literary, Visual, and Performing Arts. It\'s a centralized hub to explore connections between different artistic storytelling formats.',
        'gallery': 'Elijah Gallery is my custom-built digital gallery platform featuring curated photographic albums. I built it with a focus on performance and clean aesthetics to showcase photography in an engaging way.',
        'interests': 'My interests include UI/UX Design, Artistic Storytelling, and Digital Photography. These creative pursuits complement my technical skills and help me create more engaging and visually appealing applications.', 
        'resume': 'My resume includes my work as a Junior Developer at LiftFront, my BSIT studies at PUP, projects like PUP Guidance Center and LiftFront Academy, and certifications in enterprise networking and AI. I\'m proficient in Next.js, React, PHP/Laravel, and modern web technologies.',
        'cv': 'My CV showcases my experience as a Junior Developer at LiftFront, my education at PUP, my technical skills in full-stack development, and my portfolio of web applications. I\'m available for opportunities in modern web development.',
        'qualifications': 'My qualifications include a BSIT degree from PUP (in progress), professional experience at LiftFront, proficiency in Next.js, React, PHP/Laravel, MySQL, and certifications in enterprise networking and AI technologies.',
        'strengths': 'My strengths include full-stack development skills, experience with real-world projects, ability to work in team environments, continuous learning mindset, and passion for creating user-centered solutions.',
        'weakness': 'I believe in continuous improvement and always work to enhance my skills. While I\'m confident in my abilities, I\'m always eager to learn new technologies and best practices.',
        'salary': 'I\'m open to discussing compensation that aligns with my skills, experience, and the value I can bring to your team. I\'m more focused on finding the right opportunity and growth potential.',
        'location': 'I\'m based in Lopez, Quezon, but I\'m open to remote opportunities and can work flexibly to meet project needs. I\'m also available for on-site work when required.',
        'age': 'I\'m a 4th-year BSIT student at PUP, gaining professional experience while completing my degree. I bring fresh perspectives combined with practical industry knowledge.',
        'birthday': 'That\'s personal information I prefer to keep private, but I\'d be happy to discuss my professional qualifications, skills, and how I can contribute to your team!',
        'personal': 'I prefer to focus on my professional qualifications and how my skills can benefit your team. I\'m happy to discuss my technical expertise, projects, and career goals in detail.',
        'hire': 'I\'m an excellent candidate for any web development role! With my strong technical skills in Next.js, React, PHP/Laravel, and MySQL, plus my experience at LiftFront and academic background at PUP, I bring both technical expertise and practical problem-solving abilities. Contact me at riveroelijah5@gmail.com to discuss opportunities!',
        'recruiter': 'For recruiters, I\'m a standout candidate who combines technical excellence with real-world project experience. My work on PUP Guidance Center and LiftFront Academy demonstrates my ability to deliver production-ready applications. I\'m currently completing my BSIT and am eager to contribute to innovative teams.',
        'interview': 'I would be delighted to discuss how my skills and experience align with your company needs. I\'m particularly interested in roles involving modern web technologies and innovative projects. Feel free to reach out to schedule an interview!',
        'tagalog': 'Kumusta! Ako si Elijah Joyce Rivero. Dito ko ako para sabihin sa iyo ang tungkol sa aking mga kasanayan, proyekto, at karanasan. Paano ko makakatulong sa iyo?',
        'maranan': 'Hello! I\'m Elijah Joyce Rivero. I\'m here to help you understand my qualifications and why I\'m the right choice for your team. Ano ang maitutulong ko sa iyo?'
      };

      for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key)) {
          botResponse = response;
          break;
        }
      }

      // Enhanced context-aware responses for common questions
      if (!botResponse) {
        // Greeting questions
        if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey') || lowerMessage.includes('how are you')) {
          botResponse = "Hello! I'm doing great, thanks for asking! I'm Elijah Joyce Rivero, a passionate Full Stack Developer. I'd love to tell you about my work, projects, or discuss potential opportunities. What would you like to know about me?";
        }
        // Favorite questions
        else if (lowerMessage.includes('favorite') || lowerMessage.includes('fav') || lowerMessage.includes('best')) {
          botResponse = "That's a great question! My favorite project is probably the PUP Guidance Center - it was challenging but really impactful. I also love working with Next.js and React for frontend development. What specific aspect of my work interests you?";
        }
        // Taglish/Tagalog questions
        else if (lowerMessage.includes('ano') || lowerMessage.includes('dinner') || lowerMessage.includes('kain') || lowerMessage.includes('gutom') || lowerMessage.includes('ulam') || lowerMessage.includes('lunch') || lowerMessage.includes('breakfast')) {
          botResponse = "Kumusta! I understand you're asking about food, but I'm here to tell you about Elijah Joyce Rivero's web development skills and projects. Let me share about his work instead! Ano ang gusto mong malaman tungkol sa kanyang mga technical skills o projects?";
        }
        // Tagalog frustration/questions about AI understanding
        else if (lowerMessage.includes('bakit') || lowerMessage.includes('ulit') || lowerMessage.includes('naiintindihan') || lowerMessage.includes('di mo') || lowerMessage.includes('sinasabi') || lowerMessage.includes('qustion')) {
          botResponse = "Naiintindihan ko! Sorry if I'm not answering your food questions correctly. I'm Elijah's AI assistant, designed to help you learn about his web development work, projects at LiftFront, and technical skills. Let me help you with that instead! Ano ang gusto mong malaman about Elijah?";
        }
        // Work-related questions
        else if (lowerMessage.includes('what do you do') || lowerMessage.includes('what\'s your job') || lowerMessage.includes('what work')) {
          botResponse = "I'm a Full Stack Developer currently working as a Junior Developer at LiftFront while completing my BSIT degree at PUP. I build web applications using modern technologies like Next.js, React, PHP, and MySQL.";
        }
        // Experience questions
        else if (lowerMessage.includes('how much experience') || lowerMessage.includes('years of experience') || lowerMessage.includes('how long')) {
          botResponse = "I started my journey in web development during high school and gained professional experience at LiftFront. I combine academic knowledge from PUP with practical industry experience to deliver quality solutions.";
        }
        // Learning questions
        else if (lowerMessage.includes('what are you learning') || lowerMessage.includes('currently learning') || lowerMessage.includes('studying')) {
          botResponse = "I'm currently pursuing my Bachelor of Science in Information Technology at PUP Lopez, Quezon. I'm also continuously learning new technologies and best practices in web development through my work at LiftFront.";
        }
        // Future plans
        else if (lowerMessage.includes('what are your goals') || lowerMessage.includes('future plans') || lowerMessage.includes('what\'s next')) {
          botResponse = "I aim to become a senior full-stack developer and eventually lead development teams. I'm passionate about creating impactful applications that solve real-world problems while exploring the intersection of technology and creative arts.";
        }
        // Why hire questions
        else if (lowerMessage.includes('why should i hire') || lowerMessage.includes('why choose you') || lowerMessage.includes('what makes you')) {
          botResponse = "I bring both technical excellence and real-world project experience. My work on PUP Guidance Center and LiftFront Academy demonstrates my ability to deliver production-ready applications. I'm dedicated, continuously learning, and passionate about creating quality solutions.";
        }
        // Availability questions
        else if (lowerMessage.includes('are you available') || lowerMessage.includes('when can you start') || lowerMessage.includes('available for')) {
          botResponse = "I'm currently completing my BSIT degree and working at LiftFront, but I'm open to discussing new opportunities that align with my skills and career goals. Feel free to reach out to discuss potential collaborations or positions.";
        }
        // Technology questions
        else if (lowerMessage.includes('what technologies') || lowerMessage.includes('what tech') || lowerMessage.includes('programming languages')) {
          botResponse = "I work with Frontend: Next.js, React.js, Tailwind CSS, HTML5, CSS, JavaScript. Backend: PHP/Laravel, Filament PHP, MySQL, Python, JavaScript. Tools: GitHub, VS Code, Vercel, Canva, MS Excel.";
        }
        // Project questions
        else if (lowerMessage.includes('tell me about your projects') || lowerMessage.includes('show me projects') || lowerMessage.includes('what projects')) {
          botResponse = "I've built several impressive projects including PUP Guidance Center (web-based platform for PUP services), LiftFront Academy (gamified coding education), Palette of Eternity (digital arts platform), and Elijah Gallery (photographic platform). Each showcases different technical and creative abilities.";
        }
        // Contact questions
        else if (lowerMessage.includes('how can i contact') || lowerMessage.includes('how to reach') || lowerMessage.includes('contact info')) {
          botResponse = "You can reach me at riveroelijah5@gmail.com or call 09912562105. I'm located in Lopez, Quezon. My portfolio is at https://elijahrivero.vercel.app/ and I'm always open to discussing opportunities!";
        }
        // Education questions
        else if (lowerMessage.includes('where did you study') || lowerMessage.includes('your education') || lowerMessage.includes('what school')) {
          botResponse = "I'm pursuing my Bachelor of Science in Information Technology at Polytechnic University of the Philippines - Lopez, Quezon (2022 - Present). I completed my Senior High School STEM education at Lopez National Comprehensive High School (2020 - 2022).";
        }
        // Resume/CV questions
        else if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('qualifications')) {
          botResponse = "My resume highlights my experience as a Junior Developer at LiftFront, my BSIT studies at PUP, projects like PUP Guidance Center and LiftFront Academy, and certifications in enterprise networking and AI. I'm proficient in Next.js, React, PHP/Laravel, and modern web technologies.";
        }
        // Strengths questions
        else if (lowerMessage.includes('strengths') || lowerMessage.includes('what are your strengths') || lowerMessage.includes('good at')) {
          botResponse = "My strengths include full-stack development skills, experience with real-world projects, ability to work in team environments, continuous learning mindset, and passion for creating user-centered solutions.";
        }
        // Location questions
        else if (lowerMessage.includes('where are you') || lowerMessage.includes('location') || lowerMessage.includes('based')) {
          botResponse = "I'm based in Lopez, Quezon, but I'm open to remote opportunities and can work flexibly to meet project needs. I'm also available for on-site work when required.";
        }
        // Age/Year questions
        else if (lowerMessage.includes('how old') || lowerMessage.includes('age') || lowerMessage.includes('year')) {
          botResponse = "I'm a 4th-year BSIT student at PUP, gaining professional experience while completing my degree. I bring fresh perspectives combined with practical industry knowledge.";
        }
        // Personal questions (redirected professionally)
        else if (lowerMessage.includes('birthday') || lowerMessage.includes('personal') || lowerMessage.includes('relationship') || lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('kumain') || lowerMessage.includes('gutom') || lowerMessage.includes('ulam') || lowerMessage.includes('dinner') || lowerMessage.includes('lunch') || lowerMessage.includes('breakfast')) {
          botResponse = "I'm here to help you learn about Elijah Joyce Rivero's professional background as a Full Stack Developer! I can tell you about his work at LiftFront, his projects like PUP Guidance Center, or his technical skills in Next.js and React. What would you like to know about his professional experience?";
        }
        // Salary/Compensation questions
        else if (lowerMessage.includes('salary') || lowerMessage.includes('how much') || lowerMessage.includes('compensation')) {
          botResponse = "I'm open to discussing compensation that aligns with my skills, experience, and the value I can bring to your team. I'm more focused on finding the right opportunity and growth potential.";
        }
      }

      // Default responses for other queries
      if (!botResponse) {
        const contextualResponses = [
          "That's an interesting question! Based on what you've asked, I can tell you about my skills in Next.js and React, my experience at LiftFront, or my projects like the PUP Guidance Center. What specific aspect would you like to explore?",
          "I'd be happy to share more details! You can ask me about my technical background, specific projects, career goals, or how we can collaborate. What interests you most?",
          "Great question! I have experience in full-stack development, UI/UX design, and have worked on various web applications. Is there a particular technology or project type you'd like to discuss?",
          "Thanks for your message! I can provide information about my education at PUP, my certifications in enterprise networking and AI, or discuss potential opportunities. What would be most helpful for you?",
          "I appreciate your interest! I can discuss my work in web development, my creative pursuits in photography and digital arts, or my career aspirations. What specific area would you like to focus on?"
        ];
        botResponse = contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }

    setIsTyping(false);
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
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 z-40 border border-cyan-400/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={toggleChat}
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
            className="fixed bottom-0 right-0 left-0 top-0 w-full h-full sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto sm:w-80 sm:w-96 sm:h-[500px] bg-slate-900/95 backdrop-blur-xl border border-cyan-400/20 sm:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
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
                  <h3 className="text-white font-semibold">Elijah Rivero</h3>
                  <p className="text-cyan-300 text-xs">Developer</p>
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
                  placeholder="Ask about my skills, projects..."
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
