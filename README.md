# 🍳 DishGen AI

**Where AI Meets Appetite** ✨

**Your Personal AI Chef** - Transform your cooking experience with intelligent recipe generation

## 🌐 **Live Demo**

🚀 **[Try DishGen AI Live](https://dishgen-ai.netlify.app/)** - Experience AI-powered recipe generation in action!

*⚡ Real-time streaming • 🍽️ Personalized recipes • 🌿 Dietary preferences supported*

---

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=netlify&logoColor=white)](https://dishgen-ai.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6e614702-a3e5-4814-bf1e-15f4440390b4/deploy-status)](https://app.netlify.com/projects/dishgen-ai/deploys)

---

## 🌟 Overview

DishGen AI is an intelligent recipe generation platform that leverages the power of artificial intelligence to create personalized recipes based on your preferences, dietary restrictions, available ingredients, and cuisine choices. Whether you're a beginner cook or a seasoned chef, DishGen AI adapts to your needs and creates recipes that are perfect for you.

### ✨ Key Features

🍽️ **Custom Recipes** - Personalized recipes based on your specific preferences  
⚡ **Real-time Generation** - Watch your recipe being created live with streaming AI  
🌿 **Dietary Preferences** - Support for all dietary restrictions and preferences  
🎯 **Ingredient-based** - Create recipes from ingredients you already have  
📱 **Responsive Design** - Beautiful interface that works on all devices  
🎨 **Modern UI** - Clean, intuitive design with smooth animations  

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible component library
- **React Hook Form** - Efficient form handling
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **OpenAI API** - AI-powered recipe generation
- **Server-Sent Events** - Real-time streaming

---

## 🎯 **Quick Demo**

**Want to try it out immediately?** 

👉 **[Open DishGen AI Live Demo](https://dishgen-ai.netlify.app/)** 

No installation required! Just visit the link and start generating recipes instantly.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **OpenAI API Key**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dishgen-ai.git
   cd dishgen-ai
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   
   # Create environment file
   cp .env.example .env
   # Add your OpenAI API key to .env
   echo "OPENAI_API_KEY=your_openai_api_key_here" >> .env
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on `http://localhost:3001`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

---

## 💻 Usage

### Creating Your First Recipe

1. **Fill out the recipe form** with your preferences:
   - Cuisine type (Italian, Indian, Mexican, etc.)
   - Meal type (Breakfast, Lunch, Dinner, Snack)
   - Dietary restrictions (Vegetarian, Vegan, Gluten-free, etc.)
   - Available ingredients
   - Serving size and cooking time
   - Difficulty level

2. **Click "Generate Recipe"** and watch as your personalized recipe is created in real-time

3. **View your recipe** with detailed ingredients and step-by-step instructions

### Features in Action

- 🔄 **Real-time Streaming**: Watch ingredients and instructions appear as they're generated
- 📋 **Detailed Instructions**: Step-by-step cooking instructions with timing
- 🏷️ **Recipe Metadata**: Cooking time, servings, difficulty, and cuisine type
- 📱 **Mobile Responsive**: Perfect experience on desktop, tablet, and mobile

---

## 🏗️ Project Structure

```
dishgen-ai/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Main application pages
│   │   ├── types/         # TypeScript type definitions
│   │   └── assets/        # Static assets
│   ├── public/            # Public static files
│   └── package.json       # Frontend dependencies
│
├── server/                # Backend Node.js application
│   ├── controller/        # Route controllers
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── package.json      # Backend dependencies
│
└── README.md             # Project documentation
```

---

## 🔧 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### `POST /recipes/generate`
Generate a new recipe based on user preferences.

**Request Body:**
```json
{
  "cuisine": "Italian",
  "mealType": "Dinner", 
  "dietaryRestrictions": "Vegetarian",
  "availableIngredients": "tomatoes, basil, pasta",
  "servingSize": "4",
  "cookingTime": "30 minutes",
  "difficultyLevel": "Medium"
}
```

**Response:** Server-Sent Events stream with recipe chunks

---

## 🎨 Features & Screenshots

### 🌐 **Live Demo Available**
Experience DishGen AI in action: **[Demo Link](https://recipe-ai-xr29.onrender.com)**

### Real-time Recipe Generation
Watch as your recipe comes to life with live streaming AI generation, complete with typing indicators and smooth animations.

### Responsive Design
Beautiful, modern interface that adapts perfectly to any screen size - from mobile phones to desktop monitors.

### Intelligent Parsing
Advanced parsing engine that correctly identifies and formats recipe names, ingredients, and cooking instructions.

---

## 🤝 Contributing

We love contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and ensure they follow our coding standards
4. **Test thoroughly** on both frontend and backend
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design
- Test on multiple devices/browsers

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**CodingWithSanjeet**

- 🌐 Website: [CodingWithSanjeet](https://sanjeet-kumar-nitt.netlify.app/)
- 📧 Email: sanjeet.kumar.nitt@gmail.com
- 💼 LinkedIn: [Sanjeet Kumar](https://www.linkedin.com/in/sanjeet-kumar-nitt/)
- 🐙 GitHub: [CodingWithSanjeet](https://github.com/CodingWithSanjeet)

---

## 🙏 Acknowledgments

- **OpenAI** for providing the powerful GPT API
- **Vercel** for inspiration on modern UI design
- **Shadcn** for the beautiful component library
- **The React Community** for continuous innovation

---

## 🔮 Future Enhancements

- 🗣️ **Voice Commands** - Generate recipes with voice input
- 📸 **Image Recognition** - Upload ingredient photos for automatic detection
- 👥 **Social Features** - Share and rate recipes with the community
- 🍽️ **Meal Planning** - Weekly meal planning with shopping lists
- 🏪 **Shopping Integration** - Direct integration with grocery delivery services
- 📊 **Nutrition Analysis** - Detailed nutritional information for each recipe
- 🌍 **Multi-language Support** - Recipes in multiple languages

---

## 💫 **Made with Love and Coffee**

**Transform your cooking experience with AI-powered recipe generation**

**⭐ Star this repo if you found it helpful! ⭐**

*Happy Cooking! 🍳*