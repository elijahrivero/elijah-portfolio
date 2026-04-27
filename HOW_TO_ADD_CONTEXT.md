# 📚 How to Add Context to Your AI Chatbot

## 🎯 **Quick Guide to Expanding Chatbot Knowledge**

### 📝 **Method 1: Add New Keywords (Easiest)**

Edit `src/app/components/SimpleChatbot.js` and add to the `responses` object:

```javascript
const responses = {
  // Existing responses...
  'skills': 'Elijah is proficient in...',
  'projects': 'Elijah has built...',
  
  // NEW: Add your own categories
  'hobbies': 'When not coding, Elijah enjoys...',
  'availability': 'Elijah is currently open to...',
  'technologies': 'Elijah works with modern tech stack...',
  'background': 'Elijah started his journey...',
  'goals': 'Elijah aims to become...',
  'services': 'Elijah offers web development services...'
};
```

### 🔍 **Method 2: Add Synonyms & Variations**

Make the chatbot smarter by adding multiple keywords for the same response:

```javascript
const responses = {
  'skills': 'Elijah is proficient in...',
  'skill': 'Elijah is proficient in...',        // Singular
  'expertise': 'Elijah specializes in...',      // Alternative
  'tech stack': 'Elijah works with...',         // Another variation
  
  'projects': 'Elijah has built...',
  'project': 'Elijah has built...',             // Singular
  'work': 'Elijah has built...',                // Casual term
  'portfolio': 'Elijah has built...'            // Professional term
};
```

### 🎨 **Method 3: Add Project-Specific Details**

Add detailed responses for each project:

```javascript
const responses = {
  'pup guidance': 'The PUP Guidance Center is a web-based platform that digitizes counseling services. Built with Next.js, React, Node.js, and MongoDB, it facilitates better communication between counselors and students.',
  
  'riverobh': 'RiveroBH is a comprehensive boarding house management system with features for tenant management, payment tracking, and room occupancy monitoring. Built with Next.js, React, and MongoDB.',
  
  'elijah gallery': 'Elijah Gallery is a custom-built photography platform featuring curated albums with optimized performance and clean aesthetics. Built with Next.js and React.',
  
  'palette of eternity': 'Palette of Eternity is a digital gallery celebrating 30 works across Literary, Visual, and Performing Arts, built as a centralized hub for artistic exploration.'
};
```

### 🤖 **Method 4: Enable Gemini API for Advanced AI**

For truly intelligent responses, activate the Gemini API:

1. **Update the import:**
```javascript
import { geminiService } from '../lib/gemini';
```

2. **Replace the handleSendMessage function:**
```javascript
const handleSendMessage = async () => {
  // ... existing code ...
  
  try {
    const botResponse = await geminiService.generateResponse(inputValue);
    // ... handle response ...
  } catch (error) {
    // ... fallback handling ...
  }
};
```

### 📊 **Method 5: Add Data-Driven Context**

Create a separate context file:

```javascript
// src/app/data/chatbotContext.js
export const chatbotContext = {
  personal: {
    name: "Elijah Rivero",
    title: "Full Stack Developer",
    location: "Philippines",
    email: "riveroelijah5@gmail.com"
  },
  skills: {
    frontend: ["Next.js", "React", "Tailwind CSS", "HTML5", "CSS"],
    backend: ["Node.js", "MongoDB", "PHP", "MySQL", "Python"],
    tools: ["Git", "VS Code", "Vercel", "Figma", "Docker"]
  },
  projects: [
    {
      name: "PUP Guidance Center",
      description: "Web-based counseling platform",
      tech: ["Next.js", "React", "Node.js", "MongoDB"],
      url: "https://pup-guidance-center.vercel.app"
    }
    // ... more projects
  ]
};
```

### 🎯 **Advanced Context Strategies**

#### **1. Context-Aware Responses:**
```javascript
// Check for multiple keywords
if (lowerMessage.includes('project') && lowerMessage.includes('react')) {
  return "Elijah has built several React projects including PUP Guidance Center and RiveroBH, both showcasing modern React patterns and best practices.";
}
```

#### **2. Follow-up Questions:**
```javascript
// Add follow-up logic
if (lowerMessage.includes('more details')) {
  return "I'd be happy to provide more details! Which specific project or skill would you like to know more about?";
}
```

#### **3. Personalization:**
```javascript
// Add personal touches
'personal': "Elijah is not just about code - he's passionate about creating meaningful applications that make a difference. He believes in clean code, user-centered design, and continuous learning."
```

### 🚀 **Best Practices for Adding Context**

#### **✅ Do:**
- Keep responses concise but informative
- Use natural, conversational language
- Add multiple keyword variations
- Update regularly with new information
- Test different phrasings users might try

#### **❌ Don't:**
- Make responses too long (users won't read)
- Use overly technical jargon
- Forget to update when your skills change
- Ignore common variations of questions
- Make responses sound robotic

### 📝 **Example: Adding a New Category**

Let's say you want to add "certifications":

1. **Add to responses object:**
```javascript
'certifications': 'Elijah holds several certifications including cybersecurity, IT fundamentals, and cloud computing. He believes in continuous learning and professional development.',
```

2. **Add variations:**
```javascript
'certification': 'Elijah holds several certifications...',
'certificate': 'Elijah holds several certifications...',
'certified': 'Elijah is certified in...',
```

3. **Test it:**
- Ask: "What certifications does Elijah have?"
- Ask: "Is Elijah certified?"
- Ask: "Tell me about his certificates"

### 🎯 **Context Categories You Can Add**

Consider adding these categories:
- **Hobbies & Interests**
- **Career Goals**
- **Work Philosophy**
- **Availability & Schedule**
- **Rates & Pricing** (if applicable)
- **Collaboration Preferences**
- **Learning Journey**
- **Industry Experience**
- **Technical Specializations**
- **Soft Skills**

### 🔧 **Maintenance Tips**

1. **Regular Updates:** Update context when you learn new skills
2. **User Feedback:** Note what questions users ask frequently
3. **Performance:** Monitor response times as you add more context
4. **Testing:** Regularly test new additions
5. **Documentation:** Keep track of what context you've added

Your chatbot can become as knowledgeable as you want it to be! Start with the basics and gradually add more sophisticated context as needed. 🚀
