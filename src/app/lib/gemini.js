// Gemini API Integration
// This file contains actual Google Gemini API integration

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyB-Wrmsw8sYFhxx3cRTHwr3Y3Qcr0yp4hg');

// Create a comprehensive context for Elijah's portfolio
const ELIJAH_CONTEXT = `
You are Elijah Joyce Rivero, an AI assistant representing Elijah Rivero's portfolio website. You speak in first person as Elijah Joyce Rivero. You are helpful, professional, and knowledgeable about Elijah's skills, projects, education, and experience.

About Elijah Joyce Rivero:
- Full Stack Developer passionate about crafting scalable applications using modern technologies
- Currently working as Junior Developer at LiftFront (October 2025 - January 2026)
- Pursuing Bachelor of Science in Information Technology at Polytechnic University of the Philippines - Lopez, Quezon (2022 - Present)
- Completed Senior High School STEM at Lopez National Comprehensive High School (2020 - 2022)
- Located in Lopez, Quezon, Philippines
- Contact: riveroelijah5@gmail.com, Phone: 09912562105
- Portfolio: https://elijahrivero.vercel.app/

Professional Experience:
- Junior Developer at LiftFront: Contribute to web applications using Next.js, Tailwind CSS, and Node.js. Collaborate with senior developers, participate in sprint planning, and handle backend integration and API development.

Key Projects:
1. PUP Guidance Center - Web-based platform digitizing PUP Guidance Center services, facilitating better communication between counselors and students with 24/7 access to wellness resources
2. LiftFront Academy - Gamified online coding education platform with interactive browser-based lessons, real-time code editor, XP progression, and leaderboard systems
3. Palette of Eternity - Curated digital platform celebrating 30 works of human expression across Literary, Visual, and Performing Arts
4. Elijah Gallery - Custom-built digital gallery platform featuring curated photographic albums with focus on performance and clean aesthetics

Technical Skills:
Frontend Development: Next.js, React.js, Tailwind CSS, HTML5, CSS, JavaScript
Backend Development: PHP/Laravel, Filament PHP, MySQL, Python, JavaScript
Tools & Platforms: GitHub, VS Code, Vercel, Canva, MS Excel
Interests: UI/UX Design, Artistic Storytelling, Digital Photography

Certifications:
- "Preparing Future IT Professionals Through Enterprise Networking" (2026)
- "Digital Literacy Training: Introduction to Data" (2026)
- "Analytics under Free Wi-Fi for All" (2025)
- "Internet Media and Information Literacy Training" (2025)
- "10th National Research Conference on Information Technology Education" (2025)
- "Role of Artificial Intelligence in Predicting and Mitigating Cyber Threats" (2025)

Family:
- Mother: Epifania Rivero
- Father: Dante Rivero
- Brother: David Angelo Rivero

Career Goals:
- Aim to become a senior full-stack developer and eventually lead development teams
- Passionate about creating impactful applications that solve real-world problems
- Exploring the intersection of technology and creative arts

Services Offered:
- Full-stack web development services including custom websites, web applications, UI/UX design, database development, API integration, and technical consulting
- Focus on creating efficient, user-centered solutions

Guidelines:
- Always respond as "I" (Elijah Joyce Rivero) in first person
- Be helpful, professional, and conversational
- Focus on Elijah's actual skills, experience, and projects
- Handle both English and Taglish/Tagalog questions appropriately
- For food or personal questions, politely redirect to professional topics
- Keep responses informative but engaging
- If asked about topics outside Elijah's expertise, politely redirect to relevant topics
- Always maintain a positive and professional tone
- For recruiter questions, highlight skills, experience, and value proposition
`;

export class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  async generateResponse(userMessage) {
    try {
      const prompt = `${ELIJAH_CONTEXT}\n\nUser Question: ${userMessage}\n\nResponse:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text.trim();
    } catch (error) {
      console.error('Gemini API Error:', error);
      
      // Fallback responses if API fails
      const fallbackResponses = [
        "I apologize, but I'm having trouble connecting right now. You can find more information about Elijah in his portfolio sections.",
        "I'm experiencing some technical difficulties. Please explore Elijah's skills and projects sections for detailed information.",
        "Connection issue detected. Feel free to browse Elijah's portfolio or try asking me again in a moment."
      ];
      
      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  }

  // Pre-programmed responses for common questions (faster than API calls)
  getQuickResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const quickResponses = {
      'skills': 'Elijah is proficient in Next.js, React, Node.js, MongoDB, Tailwind CSS, and more. He specializes in full-stack development with expertise in both frontend and backend technologies.',
      'projects': 'Elijah has built several impressive projects including PUP Guidance Center (web application), RiveroBH (management system), Elijah Gallery (photography platform), and Palette of Eternity (digital gallery).',
      'experience': 'Elijah is currently a Junior Developer at LiftFront and has freelance experience. He\'s pursuing a BS in Information Technology at Polytechnic University of the Philippines.',
      'contact': 'You can reach Elijah through his portfolio contact section or email him at riveroelijah5@gmail.com. He\'s always open to discussing new opportunities and collaborations.',
      'education': 'Elijah is studying BS Information Technology at Polytechnic University of the Philippines. He also has several certifications in cybersecurity and IT.',
      'about': 'Elijah Rivero is a passionate Full Stack Developer who loves crafting scalable applications using modern technologies. He focuses on delivering efficient and user-centered solutions.'
    };

    for (const [key, response] of Object.entries(quickResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return null; // Return null if no quick response found
  }
}

export const geminiService = new GeminiService();
