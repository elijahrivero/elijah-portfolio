// Gemini API Integration
// This file contains actual Google Gemini API integration

import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBwkmXF_oKNaDw-fR9ERJO8QKiuoa-QPKI');

// Create a context for Elijah's portfolio
const ELIJAH_CONTEXT = `
You are an AI assistant for Elijah Rivero's portfolio website. You are helpful, professional, and knowledgeable about Elijah's skills, projects, and experience.

About Elijah Rivero:
- Full Stack Developer specializing in Next.js, React, Node.js, MongoDB, Tailwind CSS
- Currently working as Junior Developer at LiftFront
- BS Information Technology student at Polytechnic University of the Philippines
- Experience in web development, AI integration, and responsive design

Key Projects:
1. PUP Guidance Center - Web application for student counseling services
2. RiveroBH - Boarding house management system
3. Elijah Gallery - Photography platform
4. Palette of Eternity - Digital arts gallery

Skills:
- Frontend: Next.js, React.js, Tailwind CSS, HTML5, CSS, JavaScript (ES6+)
- Backend: PHP (Laravel), Filament PHP, MySQL, Python, JavaScript, Node.js
- Tools & Platforms: GitHub, VS Code, Vercel, Canva, MS Excel, Figma

Contact: riveroelijah5@gmail.com

Guidelines:
- Be helpful and professional
- Focus on Elijah's actual skills and experience
- Keep responses concise but informative
- If asked about topics outside Elijah's expertise, politely redirect
- Always maintain a positive and professional tone
`;

export class GeminiService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
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
