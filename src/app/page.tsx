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
      text: "Hello! I'm Harshita's AI assistant. I can tell you more about her skills, experience, or projects. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
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
    { width: 178, height: 171, top: 49, left: 62 },
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
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
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
        behavior: "smooth",
      });
    }
  };

  // Handle resume download
  const handleDownload = () => {
    const link = document.createElement("a");
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
      timestamp: new Date(),
    };
    setMessages([...messages, newUserMessage]);
    setInputMessage("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage);
      setMessages((prev) => [
        ...prev,
        {
          text: botResponse,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      return "Hello! I'm Harshita's AI assistant. How can I help you today? You can ask about her skills, experience, projects, or education.";
    } else if (
      lowerMessage.includes("skill") ||
      lowerMessage.includes("tech") ||
      lowerMessage.includes("stack")
    ) {
      return "Harshita has expertise in:\n\n• Frontend: HTML, CSS, JavaScript, React, Next.js, Bootstrap\n• Backend: Node.js, Express.js, PHP, Python, Django, C#\n• Databases: MySQL, MS SQL, PostgreSQL, MongoDB\n• AI/ML: Python, NumPy, Pandas, Scikit-learn, TensorFlow, PyTorch\n• Tools: VS Code, Jupyter Notebook, Git/GitHub\n\nCheck out the Skills section for more details!";
    } else if (
      lowerMessage.includes("experience") ||
      lowerMessage.includes("work") ||
      lowerMessage.includes("intern")
    ) {
      return "Harshita has professional experience in:\n\n1. ERP & Business Application/Web Development Intern at Phoenix Contact India\n2. Web Development Intern at Wap Venture (Remote)\n3. Web Development Intern at Edyyo Digital Solution (Remote)\n\nShe has worked on ERP customization, web application development, and cross-functional team collaboration. See the Experience section for more details!";
    } else if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("work")
    ) {
      return "Harshita has built several impressive projects:\n\n• College ERP Management System (HTML, CSS, PHP, MySQL)\n• Employee Attrition Prediction System (Python, ML)\n• Financial Expense Tracker with Prediction (React, Flask, Python)\n• E-Commerce Platform with Recommendation Engine (React, Node.js, MongoDB)\n\nYou can find all projects with descriptions in the Projects section!";
    } else if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("phone") ||
      lowerMessage.includes("reach")
    ) {
      return "You can reach Harshita at:\n\n• Email: harshitaupreti07@gmail.com\n• Phone: 8126963928\n\nFeel free to send a message through the Contact section or connect on social media!";
    } else if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return "You can download Harshita's resume by clicking the 'Download Resume' button in the hero section. Would you like me to guide you there?";
    } else if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("degree") ||
      lowerMessage.includes("college")
    ) {
      return "Harshita is pursuing her education in Computer Science/IT field with a focus on web development and software engineering. She has built a strong foundation in both theoretical concepts and practical applications.";
    } else if (
      lowerMessage.includes("hobby") ||
      lowerMessage.includes("interest") ||
      lowerMessage.includes("passion")
    ) {
      return "Harshita is passionate about web development, problem-solving, and continuously learning new technologies. She enjoys building projects that solve real-world problems and enhance user experiences.";
    } else {
      return "I'm not sure I understand. You can ask me about Harshita's:\n\n• Skills and technologies\n• Work experience\n• Projects\n• Education\n• How to contact her\n\nWhat would you like to know?";
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
    "How to contact you?",
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
    footerBg: "#FFFFFF",
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
    footerBg: "#1F2937",
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
    },
  ];

  const experiences = [
    {
      role: "ERP & Business Application / Web Development Intern",
      company: "Phoenix Contact India Pvt. Ltd.",
      period: "Full-time, Onsite",
      points: [
        "Working on ERP modules customization and integration to streamline business processes",
        "Collaborating with cross-functional teams to develop web applications",
        "Implementing automation solutions to enhance efficiency in reporting and data management",
      ],
    },
    {
      role: "Web Development Intern",
      company: "Wap Venture",
      period: "Remote",
      points: [
        "Developed and maintained responsive websites ensuring seamless user experience",
        "Collaborated with cross-functional teams to design user-friendly interfaces",
        "Worked on project development, version control, and iterative updates",
      ],
    },
    {
      role: "Web Development Intern",
      company: "Edyyo Digital Solution",
      period: "Remote",
      points: [
        "Conducted market research to identify emerging trends and consumer preferences",
        "Created engaging content for various platforms ensuring brand consistency",
        "Assisted in WordPress development and optimization tasks",
      ],
    },
  ];

  const skills = [
    {
      category: "Frontend",
      items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Bootstrap"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "PHP", "Python", "Django", "C#"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MS SQL", "PostgreSQL", "MongoDB"],
    },
    {
      category: "AI/ML",
      items: [
        "Python",
        "NumPy",
        "Pandas",
        "Scikit-learn",
        "TensorFlow",
        "PyTorch",
      ],
    },
    {
      category: "Tools",
      items: ["VS Code", "Jupyter Notebook", "Anaconda", "WordPress", "Git/GitHub"],
    },
    {
      category: "Soft Skills",
      items: [
        "Problem Solving",
        "Team Collaboration",
        "Adaptability",
        "Time Management",
        "Critical Thinking",
      ],
    },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // 3D floating element rotation based on mouse position
  const rotateX = isMounted ? (mousePosition.y / window.innerHeight) * 10 - 5 : 0;
  const rotateY = isMounted ? (mousePosition.x / window.innerWidth) * 10 - 5 : 0;

  const mobileMenuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  // Mobile menu toggle function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Dark mode toggle function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`font-sans scroll-smooth overflow-x-hidden transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        // Dynamic gradient based on scroll
        background: `linear-gradient(${135 + scrollProgress * 0.9}deg,
          ${darkMode ? "#0f172a" : "#fdfbf9"} 0%,
          ${colors.background} 30%,
          ${colors.background} 70%,
          ${darkMode ? "#1e293b" : "#f8fafc"} 100%)`,
      }}
      ref={containerRef}
    >
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 h-1 z-50"
        style={{
          backgroundColor: colors.primary,
          width: `${scrollProgress}%`,
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
              background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
            }}
            animate={
              isMounted
                ? {
                    x: [0, Math.random() * 20 - 10],
                    y: [0, Math.random() * 20 - 10],
                  }
                : {}
            }
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Floating gradient orbs */}
        <motion.div
          className="absolute w-80 h-80 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.primary}40 0%, transparent 70%)`,
            top: "20%",
            right: "10%",
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: `radial-gradient(circle, ${colors.secondary}40 0%, transparent 70%)`,
            bottom: "20%",
            left: "10%",
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Enhanced custom cursor with trail effect - only show on non-touch devices */}
      {isMounted && !("ontouchstart" in window) && (
        <>
          <motion.div
            className="fixed w-8 h-8 rounded-full bg-purple-400 mix-blend-difference pointer-events-none z-50"
            style={{
              left: mousePosition.x - 16,
              top: mousePosition.y - 16,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
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
            perspective: "1000px",
          }}
          animate={{
            rotateZ: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-16 h-16 relative">
            <div
              className="absolute inset-0 bg-purple-500 opacity-30 rounded-xl"
              style={{ transform: "translateZ(20px)" }}
            />
            <div
              className="absolute inset-0 bg-pink-500 opacity-30 rounded-xl"
              style={{ transform: "rotateY(180deg) translateZ(20px)" }}
            />
            <div
              className="absolute inset-0 bg-cyan-500 opacity-30 rounded-xl"
              style={{ transform: "rotateX(90deg) translateZ(20px)" }}
            />
            <div
              className="absolute inset-0 bg-purple-500 opacity-20 rounded-xl"
              style={{ transform: "rotateX(-90deg) translateZ(20px)" }}
            />
            <div
              className="absolute inset-0 bg-pink-500 opacity-20 rounded-xl"
              style={{ transform: "rotateY(90deg) translateZ(20px)" }}
            />
            <div
              className="absolute inset-0 bg-cyan-500 opacity-20 rounded-xl"
              style={{ transform: "rotateY(-90deg) translateZ(20px)" }}
            />
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
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative group transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-6 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            }}
            aria-label="Open AI Assistant"
          >
            <span className="text-2xl">🤖</span>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white opacity-0"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
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
              borderColor: `${colors.primary}30`,
            }}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div
              className="p-4 flex justify-between items-center border-b"
              style={{
                borderColor: `${colors.primary}20`,
                background: `linear-gradient(135deg, ${colors.primary}15, ${colors.secondary}10)`,
              }}
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div>
                  <h3 className="font-semibold" style={{ color: colors.primary }}>
                    Portfolio Assistant
                  </h3>
                  <p className="text-xs opacity-70" style={{ color: colors.text }}>
                    Ask me about Harshita
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Minimize chat"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => setIsChatbotOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close chat"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
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
                  className={`mb-4 flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-xs p-3 rounded-2xl ${
                      message.sender === "user"
                        ? "rounded-br-md bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "rounded-bl-md bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    {message.text.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-purple-200"
                          : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
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
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="px-4 pb-2">
              <div className="text-xs text-gray-500 mb-1">Try asking:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors transform hover:scale-105 active:scale-95"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="p-3 border-t flex"
              style={{ borderColor: `${colors.primary}20` }}
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skills, experience..."
                className="flex-1 py-2 px-4 rounded-l-lg focus:outline-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 rounded-r-lg text-white flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                }}
                disabled={inputMessage.trim() === "" || isTyping}
              >
                {isTyping ? (
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            </form>
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
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95"
            style={{ color: colors.primary, backgroundColor: colors.card }}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {["home", "about", "experience", "projects", "skills", "contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative ${
                    activeSection === item ? "font-medium" : "hover:text-purple-500"
                  }`}
                  style={{
                    color: activeSection === item ? colors.primary : colors.text,
                  }}
                >
                  {item}
                  {activeSection === item && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
                      style={{ backgroundColor: colors.primary }}
                      layoutId="activeSection"
                    />
                  )}
                </button>
              )
            )}
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full flex items-center justify-center ml-4 neumorph transition-all duration-300 transform hover:scale-110 active:scale-95"
              style={{
                backgroundColor: colors.card,
                color: colors.primary,
                boxShadow: darkMode
                  ? "inset 3px 3px 5px #1a202c, inset -3px -3px 5px #242c3c"
                  : "inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff",
              }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
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
          className="absolute top-6 right-6 text-2xl font-bold transition-all duration-300 hover:scale-110"
          style={{ color: colors.text }}
        >
          &times;
        </button>
        <nav className="flex flex-col items-center space-y-6">
          {["home", "about", "experience", "projects", "skills", "contact"].map(
            (item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize text-2xl font-bold transition-all duration-300 hover:scale-110 active:scale-95 ${
                  activeSection === item ? "" : "hover:text-purple-500"
                }`}
                style={{ color: activeSection === item ? colors.primary : colors.text }}
              >
                {item}
              </button>
            )
          )}
          <button
            onClick={toggleDarkMode}
            className="w-12 h-12 rounded-full flex items-center justify-center neumorph mt-8 transition-all duration-300 transform hover:scale-110 active:scale-95"
            style={{
              backgroundColor: colors.card,
              color: colors.primary,
              boxShadow: darkMode
                ? "inset 3px 3px 5px #1a202c, inset -3px -3px 5px #242c3c"
                : "inset 3px 3px 5px #e2e8f0, inset -3px -3px 5px #ffffff",
            }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </nav>
      </motion.div>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12 relative z-10">
        {/* Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center text-center">
          <motion.div
            className="flex flex-col items-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-extrabold mb-4"
              variants={fadeIn}
              style={{ color: colors.text }}
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Harshita</span>
            </motion.h2>
            <motion.p
              className="text-lg md:text-2xl font-medium mb-6"
              variants={fadeIn}
              style={{ color: colors.lightText }}
            >
              A passionate <span className="text-purple-500">{roles[currentRole]}</span>
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-8"
              variants={fadeIn}
            >
              <a
                href="#contact"
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                Get in Touch
              </a>
              <button
                onClick={handleDownload}
                className="px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                style={{ backgroundColor: colors.card, color: colors.primary, border: `2px solid ${colors.primary}` }}
              >
                Download Resume
              </button>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 min-h-screen flex flex-col items-center justify-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            About Me
          </motion.h2>
          <motion.div
            className="text-lg leading-relaxed text-center max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="mb-4">
              I am a **full-stack developer** with a strong background in both frontend and backend technologies. My passion lies in crafting elegant and efficient solutions to complex problems. I thrive on building responsive web applications and scalable backend systems.
            </p>
            <p className="mb-4">
              Throughout my journey, I've had the opportunity to work on diverse projects, from **ERP customization** and **web development** to **machine learning applications**. My goal is to create impactful and user-friendly digital experiences.
            </p>
            <p>
              I am a quick learner and a team player, always eager to take on new challenges and contribute to innovative projects. I believe in continuous learning and staying up-to-date with the latest industry trends.
            </p>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 min-h-screen flex flex-col items-center justify-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Work Experience
          </motion.h2>
          <div className="space-y-12 max-w-4xl w-full">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
                      {exp.role}
                    </h3>
                    <p className="text-md font-medium" style={{ color: colors.primary }}>
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {exp.period}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 min-h-screen flex flex-col items-center justify-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.desc}</p>
                <p className="text-sm font-medium" style={{ color: colors.lightText }}>
                  **Technologies:** {project.tech}
                </p>
                <a
                  href={project.link}
                  className="mt-4 inline-block text-sm font-semibold hover:underline"
                  style={{ color: colors.secondary }}
                >
                  View Project &rarr;
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 min-h-screen flex flex-col items-center justify-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            My Skills
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-shadow duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4" style={{ color: colors.secondary }}>
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-4 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${colors.primary}10`,
                        color: colors.primary,
                        border: `1px solid ${colors.primary}40`
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 min-h-screen flex flex-col items-center justify-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ color: colors.primary }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Contact Me
          </motion.h2>
          <motion.div
            className="max-w-xl w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-lg mb-6" style={{ color: colors.lightText }}>
              I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>
            <a
              href="mailto:harshitaupreti07@gmail.com"
              className="px-8 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              harshitaupreti07@gmail.com
            </a>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="py-8 text-center border-t transition-colors duration-300"
        style={{ backgroundColor: colors.footerBg, borderColor: `${colors.primary}20` }}
      >
        <p className="text-sm" style={{ color: colors.lightText }}>
          &copy; {new Date().getFullYear()} Harshita Upreti. All Rights Reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4 text-xl">
          <a
            href="https://github.com/harshitaupreti"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            style={{ color: colors.text }}
            className="hover:text-purple-500 transition-colors"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/harshita-upreti-43b95a201"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            style={{ color: colors.text }}
            className="hover:text-purple-500 transition-colors"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}