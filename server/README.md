# 🔧 DishGen AI Backend

This is the **Node.js + Express + TypeScript** backend API for DishGen AI - Your Personal AI Chef.

## 🏗️ Backend Architecture

### Built With
- 🟢 **Node.js** - JavaScript runtime
- 🚀 **Express.js** - Web application framework  
- 🔷 **TypeScript** - Type-safe development
- 🤖 **OpenAI API** - GPT-powered recipe generation
- 📡 **Server-Sent Events** - Real-time data streaming
- 🔒 **CORS** - Cross-origin resource sharing

### Key Features
- ⚡ **Real-time Streaming** - SSE for live recipe generation
- 🎯 **Type Safety** - Full TypeScript coverage
- 🧠 **AI Integration** - OpenAI GPT for intelligent recipes
- 🔧 **Modular Design** - Clean separation of concerns
- 🛡️ **Error Handling** - Robust error management

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or yarn
- OpenAI API Key

### Quick Start
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your OpenAI API key to .env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001

# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Start production server
npm start
```

### Development Server
The API server will be available at:
```
http://localhost:3001
```

### Environment Variables
Create a `.env` file with the following variables:
```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 📁 Project Structure

```
server/
├── controller/          # Route controllers
│   └── recipeController.ts  # Recipe generation endpoints
├── utils/              # Utility functions
│   ├── generatePrompt.ts    # AI prompt generation
│   └── recipeStreamer.ts    # SSE streaming logic
├── types/              # TypeScript definitions
│   └── common-types.ts     # Shared type definitions
├── server.ts           # Main server entry point
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🔌 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### `POST /api/recipes/generate`
Generate a recipe using AI based on user preferences.

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

**Response:** Server-Sent Events (SSE) stream

**SSE Event Types:**
- `start` - Generation begins
- `chunk` - Recipe content chunk 
- `close` - Generation complete
- `error` - Error occurred

**Example SSE Response:**
```
data: {"action":"start"}

data: {"action":"chunk","chunk":"Recipe Name: "}
data: {"action":"chunk","chunk":"Margherita "}
data: {"action":"chunk","chunk":"Pasta\n"}

data: {"action":"chunk","chunk":"Ingredients:\n"}
data: {"action":"chunk","chunk":"- 400g pasta\n"}
data: {"action":"chunk","chunk":"- 3 tomatoes\n"}

data: {"action":"close"}
```

### Error Responses
```json
{
  "error": "Error message",
  "status": 400
}
```

## 🤖 AI Integration

### OpenAI Configuration
- **Model**: GPT-3.5-turbo (configurable)
- **Temperature**: 0.7 (creative but consistent)
- **Max Tokens**: 1000 (adequate for recipes)
- **Streaming**: Enabled for real-time responses

### Prompt Engineering
The AI prompt is carefully crafted to:
- Generate structured recipe output
- Follow consistent formatting
- Include all requested elements
- Respect dietary restrictions
- Optimize for ingredient usage

### Example Generated Prompt
```
Generate a Italian Dinner recipe for 4 people...
Dietary restrictions: Vegetarian
Available ingredients: tomatoes, basil, pasta
Cooking time: 30 minutes
Difficulty: Medium

Format the response exactly as:
Recipe Name: [Name]
Ingredients: [List]
Instructions: [Numbered steps]
```

## 🔧 Development Guidelines

### Code Style
- **TypeScript strict mode** enabled
- **ESLint + Prettier** for formatting
- **Async/await** for asynchronous operations
- **Error handling** with try-catch blocks

### Controller Pattern
```typescript
// Example controller structure
export const generateRecipe = async (req: Request, res: Response) => {
  try {
    // Validate request
    const recipeData = req.body;
    
    // Generate prompt
    const prompt = generatePrompt(recipeData);
    
    // Stream response
    await streamRecipeFromOpenAI(prompt, res);
    
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};
```

### Type Definitions
```typescript
// Shared types between frontend and backend
export interface Recipe {
  cuisine: string;
  mealType: string;
  dietaryRestrictions: string;
  availableIngredients: string;
  servingSize: string;
  cookingTime: string;
  difficultyLevel: string;
}

export interface ResponseData {
  action: 'start' | 'chunk' | 'close' | 'error';
  chunk?: string;
  error?: string;
}
```

## 📡 Streaming Implementation

### Server-Sent Events
The backend uses SSE to stream AI-generated content in real-time:

```typescript
// SSE Headers
res.setHeader('Content-Type', 'text/plain');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
res.setHeader('Access-Control-Allow-Origin', '*');

// Send chunks
const sendChunk = (data: ResponseData) => {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
};
```

### OpenAI Stream Processing
```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: prompt }],
  stream: true,
  temperature: 0.7,
  max_tokens: 1000,
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || '';
  if (content) {
    sendChunk({ action: 'chunk', chunk: content });
  }
}
```

## 🛡️ Error Handling

### Common Error Scenarios
- **Invalid API Key**: OpenAI authentication failure
- **Rate Limiting**: API quota exceeded
- **Network Issues**: Connectivity problems
- **Invalid Input**: Malformed request data

### Error Response Format
```typescript
interface ErrorResponse {
  error: string;
  status: number;
  timestamp: string;
  path: string;
}
```

## 🧪 Testing & Quality

### Manual Testing
```bash
# Test recipe generation endpoint
curl -X POST http://localhost:3001/api/recipes/generate \
  -H "Content-Type: application/json" \
  -d '{
    "cuisine": "Italian",
    "mealType": "Dinner",
    "dietaryRestrictions": "None",
    "availableIngredients": "pasta, tomatoes",
    "servingSize": "2",
    "cookingTime": "20 minutes", 
    "difficultyLevel": "Easy"
  }'
```

### Type Checking
```bash
npx tsc --noEmit      # Check TypeScript types
```

### Linting
```bash
npm run lint          # Check code style
```

## 📦 Dependencies

### Production Dependencies
- `express` - Web framework
- `cors` - CORS middleware
- `dotenv` - Environment variables
- `openai` - OpenAI API client

### Development Dependencies
- `typescript` - Type checking
- `@types/node` - Node.js types
- `@types/express` - Express types
- `@types/cors` - CORS types
- `nodemon` - Development server
- `ts-node` - TypeScript execution

## 🚀 Deployment

### Build Process
```bash
npm run build        # Compile TypeScript
npm start           # Start production server
```

### Production Configuration
- Set `NODE_ENV=production`
- Use process manager (PM2, etc.)
- Configure reverse proxy (Nginx)
- Set up SSL certificates
- Monitor with logging

### Recommended Hosting
- **Railway** - Simple Node.js deployment
- **Heroku** - Easy scaling and add-ons
- **DigitalOcean** - VPS with full control
- **AWS/GCP** - Enterprise-grade infrastructure

## 🔐 Security Considerations

### API Key Management
- Store OpenAI API key in environment variables
- Never commit API keys to version control
- Use different keys for development/production
- Monitor API usage and costs

### CORS Configuration
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

### Rate Limiting
Consider implementing rate limiting for production:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## 🔗 Related

- [📚 Main Project README](../README.md)
- [🎨 Frontend Documentation](../client/README.md)
- [🤖 OpenAI API Documentation](https://platform.openai.com/docs)

---

*Part of the DishGen AI project - Where AI Meets Appetite ✨*