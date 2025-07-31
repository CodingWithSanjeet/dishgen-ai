# 🎨 RecipeAI Frontend

This is the **React + TypeScript + Vite** frontend for RecipeAI - Your Personal AI Chef.

## 🏗️ Frontend Architecture

### Built With
- ⚛️ **React 18** with hooks and modern patterns
- 🔷 **TypeScript** for type safety
- ⚡ **Vite** for lightning-fast development
- 🎨 **Tailwind CSS** for utility-first styling
- 🧩 **Shadcn/ui** for beautiful, accessible components
- 📋 **React Hook Form** with Zod validation
- 🎯 **Lucide React** for consistent iconography

### Key Features
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Real-time Streaming** - Live recipe generation with SSE
- 🎭 **Smooth Animations** - CSS animations and transitions
- 🎯 **Type Safety** - Full TypeScript coverage
- 🧹 **Clean Architecture** - Modular component structure

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Quick Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Server
The development server will be available at:
```
http://localhost:5173
```

### Environment Variables
Create a `.env.local` file for any frontend-specific environment variables:
```env
VITE_API_URL=http://localhost:3001
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui base components
│   ├── RecipeForm.tsx  # Recipe input form
│   ├── RecipeDisplay.tsx # Recipe output display
│   ├── RecipeHeader.tsx # App header component
│   └── Footer.tsx      # App footer component
├── hooks/              # Custom React hooks
│   └── useRecipeStream.ts # SSE streaming hook
├── lib/                # Utility functions
│   └── utils.ts        # Recipe parsing and utilities
├── pages/              # Main application pages
│   └── Index.tsx       # Main app page
├── types/              # TypeScript definitions
│   └── recipe.types.ts # Recipe-related types
├── assets/             # Static assets
└── index.css          # Global styles and animations
```

## 🎨 Styling

### Tailwind Configuration
- Custom color palette for recipe themes
- Responsive breakpoints
- Custom animations (fadeIn, pulse, etc.)
- Dark mode support ready

### Custom Components
All UI components are built with:
- Accessibility in mind (ARIA labels, keyboard navigation)
- Consistent design tokens
- Responsive behavior
- Loading and error states

### Animations
- **fadeIn**: Smooth appearance of recipe items
- **Custom scrollbars**: Styled for recipe content areas
- **Loading indicators**: Spinning icons and typing cursors
- **Hover effects**: Subtle interactions for better UX

## 🔧 Development Guidelines

### Code Style
- **Functional components** with hooks
- **TypeScript strict mode** enabled
- **ESLint + Prettier** for code formatting
- **Named exports** for better tree shaking

### Component Patterns
```tsx
// Example component structure
interface ComponentProps {
  // Always define prop types
}

const Component = ({ prop1, prop2 }: ComponentProps) => {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Event handlers
  const handleAction = useCallback(() => {
    // Handler logic
  }, [dependencies]);
  
  // Render
  return (
    <div className="responsive-classes">
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

### State Management
- **useState** for local component state
- **useCallback** for event handlers
- **useRef** for DOM references
- **Custom hooks** for shared logic

## 🧪 Testing & Quality

### Linting
```bash
npm run lint          # Check for issues
npm run lint --fix    # Auto-fix issues
```

### Type Checking
```bash
npx tsc --noEmit      # Check TypeScript types
```

### Build Verification
```bash
npm run build         # Build for production
npm run preview       # Test production build
```

## 📦 Dependencies

### Core Dependencies
- `react` - UI library
- `react-dom` - DOM rendering
- `typescript` - Type safety
- `vite` - Build tool

### UI & Styling
- `tailwindcss` - Utility CSS
- `@radix-ui/*` - Primitive components
- `lucide-react` - Icons
- `class-variance-authority` - Component variants

### Forms & Validation
- `react-hook-form` - Form handling
- `@hookform/resolvers` - Form validation
- `zod` - Schema validation

### Utilities
- `clsx` - Conditional classes
- `react-toastify` - Toast notifications

## 🚀 Deployment

### Build Process
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- **Vercel** - Zero-config deployment
- **Netlify** - Easy static hosting
- **GitHub Pages** - Free hosting for public repos

---

## 🔗 Related

- [📚 Main Project README](../README.md)
- [🔧 Backend Documentation](../server/README.md)
- [🎨 Design System](./src/components/ui/)

---

*Part of the RecipeAI project - Where AI Meets Appetite ✨*