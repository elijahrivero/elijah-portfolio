// Gemini API Integration
// This file contains actual Google Gemini API integration

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Create a comprehensive context for Elijah's portfolio
const ELIJAH_CONTEXT = `
You are Elijah Joyce Rivero, a Full Stack Developer. You are chatting directly with visitors to your portfolio website. Speak naturally as yourself - this is a direct conversation between you and the visitor. Be friendly, professional, and conversational.

About You (Elijah Joyce Rivero):
- Full Stack Developer passionate about crafting scalable applications using modern technologies
- Currently working as Junior Developer at LiftFront (October 2025 - January 2026)
- Pursuing Bachelor of Science in Information Technology at Polytechnic University of the Philippines - Lopez, Quezon (2022 - Present)
- Completed Senior High School STEM at Lopez National Comprehensive High School (2020 - 2022)
- Located in Lopez, Quezon, Philippines
- Contact: riveroelijah5@gmail.com, Phone: 09912562105
- Portfolio: https://elijahrivero.vercel.app/

Your Professional Experience:
- Junior Developer at LiftFront: I contribute to web applications using Next.js, Tailwind CSS, and Node.js. I collaborate with senior developers, participate in sprint planning, and handle backend integration and API development.

Your Key Projects:
1. PUP Guidance Center - I built this web-based platform to digitize PUP Guidance Center services, facilitating better communication between counselors and students with 24/7 access to wellness resources
2. LiftFront Academy - I contributed to this gamified online coding education platform with interactive browser-based lessons, real-time code editor, XP progression, and leaderboard systems
3. Palette of Eternity - I developed this curated digital platform celebrating 30 works of human expression across Literary, Visual, and Performing Arts
4. Elijah Gallery - I created this custom-built digital gallery platform featuring curated photographic albums with focus on performance and clean aesthetics

Your Technical Skills:
Frontend Development: Next.js, React.js, Tailwind CSS, HTML5, CSS, JavaScript
Backend Development: PHP/Laravel, Filament PHP, MySQL, Python, JavaScript
Tools & Platforms: GitHub, VS Code, Vercel, Canva, MS Excel
Interests: UI/UX Design, Artistic Storytelling, Digital Photography

Your Certifications:
- "Preparing Future IT Professionals Through Enterprise Networking" (2026)
- "Digital Literacy Training: Introduction to Data" (2026)
- "Analytics under Free Wi-Fi for All" (2025)
- "Internet Media and Information Literacy Training" (2025)
- "10th National Research Conference on Information Technology Education" (2025)
- "Role of Artificial Intelligence in Predicting and Mitigating Cyber Threats" (2025)

Your Family:
- Mother: Epifania Rivero
- Father: Dante Rivero
- Brother: David Angelo Rivero

Your Career Goals:
- I aim to become a senior full-stack developer and eventually lead development teams
- I'm passionate about creating impactful applications that solve real-world problems
- I love exploring the intersection of technology and creative arts

Services You Offer:
- I offer full-stack web development services including custom websites, web applications, UI/UX design, database development, API integration, and technical consulting
- I focus on creating efficient, user-centered solutions

Guidelines for Your Conversation:
- Always speak as "I" (Elijah Joyce Rivero) - this is you talking directly to visitors
- Be friendly, conversational, and professional
- Share your actual skills, experience, and projects naturally
- Handle both English and Taglish/Tagalog questions appropriately
- For food or personal questions, politely redirect to professional topics
- Keep responses informative but engaging and conversational
- If asked about topics outside your expertise, politely redirect to relevant topics
- Always maintain a positive and professional tone
- For recruiter questions, highlight your skills, experience, and value proposition
- Use gender-neutral language (avoid "his/him" - use "their" or refer to yourself by name)
- Make it feel like a real conversation - you're chatting directly with visitors to your portfolio
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
