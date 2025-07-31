import { Heart, Github, Mail, ChefHat, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-background to-accent/30 border-t border-border/50 mt-8 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl py-4 px-4">
        <div className="flex flex-col items-center text-center space-y-3">
          
          {/* Connect Section - Top */}
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/CodingWithSanjeet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-accent/30 hover:bg-accent/60 transition-all duration-200 group hover:scale-110 shadow-sm"
              title="GitHub"
            >
              <Github className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/in/sanjeet-kumar-nitt/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-accent/30 hover:bg-accent/60 transition-all duration-200 group hover:scale-110 shadow-sm"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
            <a 
              href="mailto:sanjeetkumar.nitt@gmail.com" 
              className="p-2.5 rounded-xl bg-accent/30 hover:bg-accent/60 transition-all duration-200 group hover:scale-110 shadow-sm"
              title="Email"
            >
              <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          </div>

          {/* Brand Section - Middle */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 shadow-sm">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">RecipeAI</h3>
                <p className="text-muted-foreground text-xs">Your Personal AI Chef</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm text-center leading-relaxed">
              Your Personal AI Chef, ready to transform any ingredients into personalized, 
              delicious recipes tailored to your taste, dietary preferences, and cooking skills.
            </p>
          </div>

          {/* Copyright Section - Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-muted-foreground">
            <p>© {currentYear} CodingWithSanjeet. All rights reserved.</p>
            <span className="hidden sm:inline text-border/50">•</span>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
              <span>for food lovers</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;