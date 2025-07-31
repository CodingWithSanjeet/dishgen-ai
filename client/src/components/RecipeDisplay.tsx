import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Globe, ChefHat, Utensils, Target, Loader2 } from "lucide-react";
import { RecipeDisplayProps } from "@/types";


/**
 * Loading indicator component for sections being generated
 */
const GeneratingIndicator = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
    <Loader2 className="w-4 h-4 animate-spin" />
    <span className="text-sm">{text}</span>
    <span className="animate-bounce">...</span>
  </div>
);

/**
 * Typing cursor animation for active generation
 */
const TypingCursor = () => (
  <span className="inline-block w-0.5 h-4 bg-primary animate-pulse ml-1"></span>
);

const RecipeDisplay = ({ recipe, isLoading, error, header, height }: RecipeDisplayProps) => {

  if (error) {
    return (
      <Card className="w-full shadow-soft" style={{ minHeight: `${height}px` }}>
        <CardContent className="p-6 text-center">
          <p className="text-red-500">Error: {error}</p>
        </CardContent>
      </Card>
    );
  }

  // Show empty state if no recipe data at all and not loading
  if (!isLoading && !recipe.name && !recipe.ingredients.length && !recipe.instructions.length) {
    return (
      <Card className="w-full shadow-soft flex items-center justify-center" style={{ minHeight: `${height}px` }}>
        <CardContent className="p-6 text-center">
          <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Your Personal AI Chef is ready to create amazing recipes</p>
        </CardContent>
      </Card>
    );
  }

  // Show loading state when starting generation (empty recipe + loading)
  if (isLoading && (!recipe.name || recipe.name === '') && !recipe.ingredients.length && !recipe.instructions.length) {
    return (
      <Card className="w-full shadow-soft flex items-center justify-center" style={{ minHeight: `${height}px` }}>
        <CardContent className="p-6 text-center">
          <GeneratingIndicator text="Your Personal AI Chef is crafting your recipe" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-soft hover:shadow-glow transition-smooth flex flex-col" style={{ maxHeight: `${height}px` }}>
      <CardHeader className="text-center border-b border-border flex-shrink-0">
        <CardTitle className="text-3xl text-foreground font-bold">
          {recipe.name || "Recipe"}
          {isLoading && !recipe.name && <TypingCursor />}
          {isLoading && recipe.name && <TypingCursor />}
        </CardTitle>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {header?.servingSize} Serving{header?.servingSize !== "1" ? "s" : ""}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {header?.cookingTime}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Globe className="w-3 h-3" />
            {header?.cuisine}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Target className="w-3 h-3" />
            {header?.difficultyLevel}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <ChefHat className="w-3 h-3" />
            {header?.mealType}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6 flex-1 overflow-y-auto recipe-scroll min-h-0">
        {/* Ingredients Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            Ingredients
            {isLoading && recipe.ingredients.length === 0 && <TypingCursor />}
          </h3>
          <div className="bg-accent/50 rounded-lg p-4 border-l-4 border-primary">
            {recipe.ingredients.length > 0 ? (
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-2 text-foreground animate-fadeIn">
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                    {ingredient}
                  </li>
                ))}
                {isLoading && <li className="flex items-center gap-2"><TypingCursor /></li>}
              </ul>
            ) : isLoading ? (
              <GeneratingIndicator text="Gathering ingredients" />
            ) : (
              <p className="text-muted-foreground italic">No ingredients parsed yet</p>
            )}
          </div>
        </div>

        {/* Instructions Section */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-primary" />
            Instructions
            {isLoading && recipe.instructions.length === 0 && <TypingCursor />}
          </h3>
          <div className="space-y-3">
            {recipe.instructions.length > 0 ? (
              <>
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-accent/30 border border-border animate-fadeIn">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-foreground leading-relaxed">{instruction}</p>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3 p-3 rounded-lg bg-accent/30 border border-border border-dashed">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm">
                      <Loader2 className="w-3 h-3 animate-spin" />
                    </div>
                    <GeneratingIndicator text="Writing next step" />
                  </div>
                )}
              </>
            ) : isLoading ? (
              <div className="p-4 rounded-lg bg-accent/30 border border-border border-dashed">
                <GeneratingIndicator text="Preparing cooking instructions" />
              </div>
            ) : (
              <p className="text-muted-foreground italic p-4 rounded-lg bg-accent/30 border border-border">
                Instructions will appear here as they are generated
              </p>
            )}
          </div>
        </div>

        {/* Generation status indicator */}
        {isLoading && (
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Recipe is being generated...</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecipeDisplay;