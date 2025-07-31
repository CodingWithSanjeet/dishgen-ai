import recipeLogoSrc from "@/assets/recipe-logo.png";

const RecipeHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <img 
          src={recipeLogoSrc} 
          alt="RecipeAI" 
          className="w-14 h-14 mr-3"
        />
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-primary">
            RecipeAI 
          </h1>
          <p className="text-muted-foreground text-lg">
            Your Personal AI Chef ✨
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
          Transform your cooking experience with AI-powered recipe generation. Simply tell us your preferences, 
          dietary restrictions, available ingredients, or cuisine type, and watch as our intelligent chef creates 
          personalized recipes just for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            🍽️ <span>Custom Recipes</span>
          </span>
          <span className="flex items-center gap-1">
            ⚡ <span>Real-time Generation</span>
          </span>
          <span className="flex items-center gap-1">
            🌿 <span>Dietary Preferences</span>
          </span>
          <span className="flex items-center gap-1">
            🎯 <span>Ingredient-based</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;