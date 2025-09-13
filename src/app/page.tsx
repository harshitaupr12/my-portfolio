"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced state for AI Chatbot
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I&apos;m Harshita&apos;s AI assistant. I can tell you more about her skills, experience, or projects. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const roles = ["Frontend Developer", "Web Developer", "Software Developer"];

  // Predefined values for background elements to avoid hydration mismatch
  const backgroundElements = [
    { width: 138, height: 128, top: 72, left: 93 },
    { width: 186, height: 173, top: 63, left: 84 },
    { width: 192, height: 295, top: 97, left: 43 },
    { width: 172, height: 113, top: 7, left: 51 },
    { width: 178, height: 171, top: 49, left: 62 }
  ];

  useEffect(() => {
    setIsMounted(true);
    // Check if user is on mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Disable some animations on mobile for better performance
    }
  }, []);

  // FIXED: Added roles.length to the dependency array
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          current = section.getAttribute("id") || "home";
        }
      });

      setActiveSection(current);

      // Calculate scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMounted]);

  // Scroll to messages bottom when new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  // Handle resume download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = "/harshita_resume.pdf";
    link.download = "Harshita_Upreti_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Enhanced AI Chatbot Functions
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const newUserMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    setMessages([...messages, newUserMessage]);
    setInputMessage("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages(prev => [...prev, {
        text: botResponse,
        sender: "bot",
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return "Hello! I&apos;m Harshita&apos;s AI assistant. How can I help you today? You can ask about her skills, experience, projects, or education.";
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("stack")) {
      return "Harshita has expertise in:\n\n• Frontend: HTML, CSS, JavaScript, React, Next.js, Bootstrap\n• Backend: Node.js, Express.js, PHP, Python, Django, C#\n• Databases: MySQL, MS SQL, PostgreSQL, MongoDB\n• AI/ML: Python, NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch\n• Tools: VS Code, Jupyter Notebook, Git/GitHub\n\nCheck out the Skills section for more details!";
    } else if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("intern")) {
      return "Harshita has professional experience in:\n\n1. ERP & Business Application/Web Development Intern at Phoenix Contact India\n2. Web Development Intern at Wap Venture (Remote)\n3. Web Development Intern at Edyyo Digital Solution (Remote)\n\nShe has worked on ERP customization, web application development, and cross-functional team collaboration. See the Experience section for more details!";
    } else if (lowerMessage.includes("project") || lowerMessage.includes("work")) {
      return "Harshita has built several impressive projects:\n\n• College ERP Management System (HTML, CSS, PHP, MySQL)\n• Employee Attrition Prediction System (Python, ML)\n• Financial Expense Tracker with Prediction (React, Flask, Python)\n• E-Commerce Platform with Recommendation Engine (React, Node.js, MongoDB)\n\nYou can find all projects with descriptions in the Projects section!";
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("phone") || lowerMessage.includes("reach")) {
      return "You can reach Harshita at:\n\n• Email: harshitaupreti07@gmail.com\n• Phone: 8126963928\n\nFeel free to send a message through the Contact section or connect on social media!";
    } else if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return "You can download Harshita&apos;s resume by clicking the &apos;Download Resume&apos; button in the hero section. Would you like me to guide you there?";
    } else if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("college")) {
      return "Harshita is pursuing her education in Computer Science/IT field with a focus on web development and software engineering. She has built a strong foundation in both theoretical concepts and practical applications.";
    } else if (lowerMessage.includes("hobby") || lowerMessage.includes("interest") || lowerMessage.includes("passion")) {
      return "Harshita is passionate about web development, problem-solving, and continuously learning new technologies. She enjoys building projects that solve real-world problems and enhance user experiences.";
    } else {
      return "I&apos;m not sure I understand. You can ask me about Harshita&apos;s:\n\n• Skills and technologies\n• Work experience\n• Projects\n• Education\n• How to contact her\n\nWhat would you like to know?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const quickReplies = [
    "Tell me about skills",
    "What projects have you done?",
    "Explain your experience",
    "How to contact you?"
  ];

  const handleQuickReply = (reply: string) => {
    setInputMessage(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Updated color palette - more vibrant and modern
  const lightColors = {
    primary: "#7C3AED",
    secondary: "#EC4899",
    accent: "#06B6D4",
    background: "#FDFBF9",
    text: "#4B5563",
    lightText: "#6B7280",
    card: "#FFFFFF",
    navBg: "rgba(255, 255, 255, 0.95)",
    footerBg: "#FFFFFF"
  };

  const darkColors = {
    primary: "#8B5CF6",
    secondary: "#F472B6",
    accent: "#22D3EE",
    background: "#111827",
    text: "#E5E7EB",
    lightText: "#9CA3AF",
    card: "#1F2937",
    navBg: "rgba(31, 41, 55, 0.95)",
    footerBg: "#1F2937"
  };

  const colors = darkMode ? darkColors : lightColors;

  // Updated projects data with 4 projects
  const projects = [
    {
      title: "College ERP Management System",
      desc: "Designed and implemented a comprehensive ERP solution for colleges with modules for student registration, attendance tracking, fee management, and academic records.",
      tech: "HTML, CSS, PHP, MySQL",
      link: "#",
    },
    {
      title: "Employee Attrition Prediction System",
      desc: "Built a machine learning model to predict employee resignation likelihood using performance, experience, and satisfaction data.",
      tech: "Python, Pandas, NumPy, Scikit-learn, Matplotlib",
      link: "#",
    },
    {
      title: "Financial Expense Tracker with Prediction",
      desc: "Developed a web-based application to track monthly expenses, categorize spending, and predict future expenses using ML algorithms.",
      tech: "React, Flask, Python, MySQL",
      link: "#",
    },
    {
      title: "E-Commerce Platform with Recommendation Engine",
      desc: "Created a full-stack e-commerce website with personalized product recommendations based on user behavior and preferences.",
      tech: "React, Node.js, MongoDB, TensorFlow.js",
      link: "#",
    }
  ];

  const experiences = [
    {
      role: "ERP & Business Application / Web Development Intern",
      company: "Phoenix Contact India Pvt. Ltd.",
      period: "Full-time, Onsite",
      points: [
        "Working on ERP modules customization and integration to streamline business processes",
        "Collaborating with cross-functional teams to develop web applications",
        "Implementing automation solutions to enhance efficiency in reporting and data management"
      ]
    },
    {
      role: "Web Development Intern",
      company: "Wap Venture",
      period: "Remote",
      points: [
        "Developed and maintained responsive websites ensuring seamless user experience",
        "Collaborated with cross-functional teams to design user-friendly interfaces",
        "Worked on project development, version control, and iterative updates"
      ]
    },
    {
      role: "Web Development Intern",
      company: "Edyyo Digital Solution",
      period: "Remote",
      points: [
        "Conducted market research to identify emerging trends and consumer preferences",
        "Created engaging content for various platforms ensuring brand consistency",
        "Assisted in WordPress development and optimization tasks"
      ]
    }
  ];

  const skills = [
    { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Bootstrap"] },
    { category: "Backend", items: ["Node.js", "Express.js", "PHP", "Python", "Django", "C#"] },
    { category: "Databases", items: ["MySQL", "MS SQL", "PostgreSQL", "MongoDB"] },
    { category: "AI/ML", items: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch"] },
    { category: "Tools", items: ["VS Code", "Jupyter Notebook", "Anaconda", "WordPress", "Git/GitHub"] },
    { category: "Soft Skills", items: ["Problem Solving", "Team Collaboration", "Adaptability", "Time Management", "Critical Thinking"] }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // 3D floating element rotation based on mouse position
  const rotateX = isMounted ? (mousePosition.y / window.innerHeight) * 10 - 5 : 0;
  const rotateY = isMounted ? (mousePosition.x / window.innerWidth) * 10 - 5 : 0;
  
  const mobileMenuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" }
  };
  
  // Mobile menu toggle function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };
  
  return (
    <div
      className={`font-sans scroll-smooth overflow-x-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        // Dynamic gradient based on scroll
        background: `linear-gradient(${135 + scrollProgress * 0.9}deg,
          ${darkMode ? '#0f172a' : '#fdfbf9'} 0%,
          ${colors.background} 30%,
          ${colors.background} 70%,
          ${darkMode ? '#1e293b' : '#f8fafc'} 100%)`
      }}
      ref={containerRef}
    >

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 z-50"
        style={{
          backgroundColor: colors.primary,
          width: `${scrollProgress}%`
        }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated background elements - using predefined values to avoid hydration issues */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {backgroundElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: element.width,
              height: element.height,
              top: `${element.top}%`,
              left: `${element.left}%`,
              background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`
            }}
            animate={isMounted ? {
              x: [0, Math.random() * 20 - 10],
              y: [0, Math.random() * 20 - 10],
            } : {}}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}

        {/* Floating gradient orbs */}
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
            top: '20%',
            right: '10%'
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
            bottom: '20%',
            left: '10%'
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Enhanced custom cursor with trail effect - only show on non-touch devices */}
      {isMounted && !('ontouchstart' in window) && (
        <>
          <motion.div
            className="fixed w-8 h-8 rounded-full bg-purple-400 mix-blend-difference pointer-events-none z-50"
            style={{
              left: mousePosition.x - 16,
              top: mousePosition.y - 16,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="fixed w-4 h-4 rounded-full bg-purple-600 mix-blend-difference pointer-events-none z-50"
            style={{
              left: mousePosition.x - 8,
              top: mousePosition.y - 8,
            }}
            animate={{
              scale: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          />
        </>
      )}

      {/* 3D Floating element that follows mouse */}
      {isMounted && (
        <motion.div
          className="fixed hidden md:block pointer-events-none z-30"
          style={{
            left: mousePosition.x + 50,
            top: mousePosition.y - 100,
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            perspective: "1000px"
          }}
          animate={{
            rotateZ: [0, 5, 0, -5, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 bg-purple-500 opacity-30 rounded-xl" style={{ transform: 'translateZ(20px)' }} />
            <div className="absolute inset-0 bg-pink-500 opacity-30 rounded-xl" style={{ transform: 'rotateY(180deg) translateZ(20px)' }} />
            <div className="absolute inset-0 bg-cyan-500 opacity-30 rounded-xl" style={{ transform: 'rotateX(90deg) translateZ(20px)' }} />
            <div className="absolute inset-0 bg-purple-500 opacity-20 rounded-xl" style={{ transform: 'rotateX(-90deg) translateZ(20px)' }} />
            <div className="absolute inset-0 bg-pink-500 opacity-20 rounded-xl" style={{ transform: 'rotateY(90deg) translateZ(20px)' }} />
            <div className="absolute inset-0 bg-cyan-500 opacity-20 rounded-xl" style={{ transform: 'rotateY(-90deg) translateZ(20px)' }} />
          </div>
        </motion.div>
      )}

      {/* Enhanced AI Chatbot Assistant */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      >
        {!isChatbotOpen ? (
          <motion.button
            onClick={() => setIsChatbotOpen(true)}
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative group"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Open AI Assistant"
          >
            <span className="text-2xl">🤖</span>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white opacity-0"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">AI</span>
            </div>

            {/* Tooltip */}
            <div className="absolute -top-12 right-0 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Chat with AI Assistant
            </div>
          </motion.button>
        ) : (
          <motion.div
            className="w-80 h-96 rounded-2xl overflow-hidden flex flex-col shadow-xl border"
            style={{
              backgroundColor: colors.card,
              borderColor: `${colors.primary}30`
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className="p-4 flex justify-between items-center border-b"
              style={{
                borderColor: `${colors.primary}20`,
                background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`
              }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.primary }}>Portfolio Assistant</h3>
                  <p className="text-xs opacity-70" style={{ color: colors.text }}>Ask me about Harshita</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Minimize chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setIsChatbotOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close chat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div
              className="flex-1 p-4 overflow-y-auto"
              style={{ backgroundColor: colors.background }}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${message.sender === "user"
                      ? "rounded-br-md bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "rounded-bl-md bg-gray-100 dark:bg-gray-800"}`}
                  >
                    {message.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                    ))}
                    <div className={`text-xs mt-1 ${message.sender === "user" ? 'text-purple-200' : 'text-gray-500'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t flex" style={{ borderColor: `${colors.primary}20` }}>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skills, experience..."
                className="flex-1 py-2 px-4 rounded-l-lg focus:outline-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text
                }}
                disabled={isTyping}
              />
              <motion.button
                onClick={handleSendMessage}
                className="px-4 py-2 rounded-r-lg text-white flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                disabled={inputMessage.trim() === "" || isTyping}
                whileHover={{ scale: inputMessage.trim() !== "" && !isTyping ? 1.05 : 1 }}
                whileTap={{ scale: inputMessage.trim() !== "" && !isTyping ? 0.95 : 1 }}
              >
                {isTyping ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 w-full backdrop-blur-md z-40 shadow-sm transition-colors duration-300"
        style={{ backgroundColor: colors.navBg }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-xl font-bold nav-name"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Harshita Upreti
          </motion.h1>
          {/* Mobile menu toggle button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center"
            style={{ color: colors.primary, backgroundColor: colors.card }}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors relative ${activeSection === item ? 'font-medium' : 'hover:text-purple-500'}`}
                style={{ color: activeSection === item ? colors.primary : colors.text }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {activeSection === item && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                    layoutId="activeSection"
                  />
                )}
              </motion.button>
            ))}

            {/* Dark/Light Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full flex items-center justify-center ml-4 neumorph"
              style={{
                backgroundColor: colors.card,
                color: colors.primary,
                boxShadow: darkMode
                  ? 'inset 3px 3px 5px #1a202c, inset -3px -3px 5px #242c3c'
                  : 'inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <motion.div
        className="fixed top-0 left-0 w-full h-full bg-white/95 dark:bg-black/95 backdrop-blur-md z-40 p-8 flex flex-col items-center justify-center md:hidden"
        style={{ backgroundColor: colors.navBg }}
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={toggleMobileMenu}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ color: colors.primary, backgroundColor: colors.card }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col space-y-6 text-2xl font-bold">
          {['home', 'about', 'experience', 'projects', 'skills', 'contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`capitalize transition-colors relative ${activeSection === item ? 'font-medium' : 'hover:text-purple-500'}`}
              style={{ color: activeSection === item ? colors.primary : colors.text }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </motion.div>


      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
            style={{ backgroundColor: colors.primary }}
            animate={{
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-20"
            style={{ backgroundColor: colors.secondary }}
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Hi, I&apos;m <span style={{ color: colors.primary }}>Harshita</span> 👋
        </motion.h1>

        <motion.div
          className="h-16 mb-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.p
            key={currentRole}
            className="text-2xl md:text-3xl font-mono text-center"
            style={{ color: colors.secondary }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {roles[currentRole]}
          </motion.p>
        </motion.div>

        <motion.p
          className="max-w-2xl mx-auto text-lg text-center mb-10"
          style={{ color: colors.text }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Enthusiastic and detail-oriented Frontend Developer and Software Developer with strong expertise in Software Development, Front-end Development and Web Application.
        </motion.p>

        <motion.div className="flex gap-6 flex-wrap justify-center">
          <motion.a
            href="#contact"
            className="px-8 py-3 rounded-full font-semibold text-white relative overflow-hidden group"
            style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 10px 25px -10px ${colors.primary}80`
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get In Touch</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Fixed Download Resume Button */}
          <motion.button
            onClick={handleDownload}
            className="px-8 py-3 rounded-full font-semibold relative overflow-hidden group"
            style={{
              border: `2px solid ${colors.primary}`,
              color: colors.primary,
              backgroundColor: 'transparent'
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: `${colors.primary}10`
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Download Resume</span>
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        >
          <svg className="w-8 h-8" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            About Me
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeIn} className="relative">
              <div className="w-72 h-72 mx-auto rounded-2xl overflow-hidden shadow-xl neumorph-inset"
                style={{
                  backgroundColor: colors.card,
                  boxShadow: darkMode
                    ? 'inset 5px 5px 10px #0d1117, inset -5px -5px 10px #313b4f'
                    : 'inset 5px 5px 10px #e2e8f0, inset -5px -5px 10px #ffffff'
                }}>
                <motion.div
                  className="w-full h-full flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-7xl">👩‍💻</span>
                </motion.div>
              </div>
              <motion.div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-50"
                style={{ backgroundColor: colors.accent }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-6">
              <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
                I am Harshita Upreti, a passionate developer building modern and responsive web applications using Next.js, React, and Tailwind CSS. I love solving real-world problems and continuously learning new technologies.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
                I&apos;m developing expertise in both web development, Front-end Development and Software Development, with hands-on experience in various internships and projects.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <motion.div
                  className="p-4 rounded-xl text-center neumorph"
                  style={{
                    backgroundColor: colors.card,
                    boxShadow: darkMode
                      ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                      : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                  }}
                  whileHover={{ y: -5 }}
                >
                  <span className="block text-2xl font-bold" style={{ color: colors.primary }}>1+</span>
                  <span style={{ color: colors.text }}>Years Experience</span>
                </motion.div>
                <motion.div
                  className="p-4 rounded-xl text-center neumorph"
                  style={{
                    backgroundColor: colors.card,
                    boxShadow: darkMode
                      ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                      : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                  }}
                  whileHover={{ y: -5 }}
                >
                  <span className="block text-2xl font-bold" style={{ color: colors.primary }}>4+</span>
                  <span style={{ color: colors.text }}>Projects Completed</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Experience
          </motion.h2>

          <motion.div
            className="space-y-12 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Timeline line */}
            <div className="absolute left-7 h-full border-l-2 border-dashed" style={{ borderColor: `${colors.primary}30` }} />

            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="flex items-start"
              >
                <motion.div
                  className="w-4 h-4 rounded-full mt-2 mr-6 flex-shrink-0 z-10"
                  style={{ backgroundColor: colors.primary }}
                  whileHover={{ scale: 1.5 }}
                />
                <motion.div
                  className="p-6 rounded-2xl w-full neumorph"
                  style={{
                    backgroundColor: colors.card,
                    boxShadow: darkMode
                      ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                      : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: colors.primary }}>{exp.role}</h3>
                      <p className="font-medium" style={{ color: colors.secondary }}>{exp.company}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: `${colors.accent}20`, color: colors.accent }}>
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start"
                        style={{ color: colors.text }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="mr-2 mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: colors.primary }} />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Projects
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="p-6 rounded-2xl h-full flex flex-col neumorph group hover-card"
                style={{
                  backgroundColor: colors.card,
                  boxShadow: darkMode
                    ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                    : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                }}
                whileHover={{
                  y: -10,
                }}
              >
                <h3 className="text-xl font-semibold mb-3" style={{ color: colors.primary }}>{project.title}</h3>
                <p className="mb-4 flex-grow" style={{ color: colors.text }}>{project.desc}</p>
                <div className="mb-4">
                  <span className="text-sm font-medium" style={{ color: colors.lightText }}>Tech Stack:</span>
                  <p className="text-sm" style={{ color: colors.secondary }}>{project.tech}</p>
                </div>
                <motion.a
                  href={project.link}
                  className="inline-flex items-center font-medium mt-auto group-hover:translate-x-1 transition-transform"
                  style={{ color: colors.primary }}
                >
                  View Project
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Skills
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                variants={fadeIn}
                className="p-5 rounded-2xl neumorph hover-card"
                style={{
                  backgroundColor: colors.card,
                  boxShadow: darkMode
                    ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                    : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b" style={{ color: colors.primary, borderColor: `${colors.primary}20` }}>
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <motion.span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-sm"
                      style={{ backgroundColor: `${colors.primary}10`, color: colors.primary }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: `${colors.primary}20`
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-16 text-center"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Contact Me
          </motion.h2>

          <motion.div
            className="p-8 rounded-2xl neumorph"
            style={{
              backgroundColor: colors.card,
              boxShadow: darkMode
                ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-center mb-8" style={{ color: colors.text }}>
              Feel free to reach out for collaborations or just a friendly hello 👋
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.a
                href="tel:8126963928"
                className="flex items-center justify-center p-4 rounded-xl neumorph hover-card"
                style={{
                  backgroundColor: colors.card,
                  boxShadow: darkMode
                    ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                    : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                }}
                whileHover={{ y: -3 }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 neumorph-inset"
                    style={{
                      backgroundColor: colors.card,
                      boxShadow: darkMode
                        ? 'inset 3px 3px 5px #0d1117, inset -3px -3px 5px #313b4f'
                        : 'inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff'
                    }}
                  >
                    <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span style={{ color: colors.text }}>8126963928</span>
                </div>
              </motion.a>

              <motion.a
                href="mailto:harshitaupreti07@gmail.com"
                className="flex items-center justify-center p-4 rounded-xl neumorph hover-card"
                style={{
                  backgroundColor: colors.card,
                  boxShadow: darkMode
                    ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                    : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                }}
                whileHover={{ y: -3 }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 neumorph-inset"
                    style={{
                      backgroundColor: colors.card,
                      boxShadow: darkMode
                        ? 'inset 3px 3px 5px #0d1117, inset -3px -3px 5px #313b4f'
                        : 'inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff'
                    }}
                  >
                    <svg className="w-6 h-6" style={{ color: colors.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span style={{ color: colors.text }}>harshitaupreti07@gmail.com</span>
                </div>
              </motion.a>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Name</label>
                <motion.input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors neumorph-inset"
                  style={{
                    backgroundColor: colors.background,
                    boxShadow: darkMode
                      ? 'inset 3px 3px 5px #0d1117, inset -3px -3px 5px #313b4f'
                      : 'inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff'
                  }}
                  placeholder="Your name"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Email</label>
                <motion.input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors neumorph-inset"
                  style={{
                    backgroundColor: colors.background,
                    boxShadow: darkMode
                      ? 'inset 3px 3px 5px #0d1117, inset -3px -3px 5px #313b4f'
                      : 'inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff'
                  }}
                  placeholder="Your email"
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: colors.text }}>Message</label>
                <motion.textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors neumorph-inset"
                  style={{
                    backgroundColor: colors.background,
                    boxShadow: darkMode
                      ? 'inset 3px 3px 5px #0d1117, inset -3px -3px 5px #313b4f'
                      : 'inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff'
                  }}
                  placeholder="Your message"
                  whileFocus={{ scale: 1.01 }}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 text-white rounded-lg font-semibold relative overflow-hidden group"
                style={{ background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})` }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 10px 25px -10px ${colors.primary}80`
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Send Message</span>
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center transition-colors duration-300" style={{ backgroundColor: colors.footerBg }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="flex justify-center space-x-8 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {['github', 'linkedin', 'twitter'].map((social, idx) => (
              <motion.a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center neumorph hover-card"
                style={{
                  backgroundColor: colors.card,
                  boxShadow: darkMode
                    ? '5px 5px 10px #0d1117, -5px -5px 10px #313b4f'
                    : '5px 5px 10px #e2e8f0, -5px -5px 10px #ffffff'
                }}
                whileHover={{
                  scale: 1.2,
                  backgroundColor: colors.primary,
                  color: '#fff'
                }}
              >
                <span className="text-lg">{['🐱', '🔗', '🐦'][idx]}</span>
              </motion.a>
            ))}
          </motion.div>
          <p style={{ color: colors.lightText }}>© 2025 Harshita Upreti. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .neumorph {
          border-radius: 16px;
        }
        .neumorph-inset {
          border-radius: 16px;
          border: none;
        }
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  );
}