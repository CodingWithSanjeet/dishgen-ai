import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  COOKING_TIME_OPTIONS,
  CUISINE_OPTIONS,
  DIFFICULTY_LEVEL_OPTIONS,
  MEAL_TYPE_OPTIONS,
  SERVING_SIZE_OPTIONS,
} from "@/constants/options";
import {
  CookingTime,
  CuisineType,
  DifficultyLevel,
  MealType,
  Recipe,
  RecipeFormProps,
} from "@/types";
import {
  ChefHat,
  Clock,
  Globe,
  Loader2,
  Sparkles,
  Target,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<Recipe>({
    ingredients: "",
    servingSize: "1",
    cuisine: CuisineType.indian,
    mealType: MealType.Breakfast,
    cookingTime: CookingTime["15-30"],
    difficultyLevel: DifficultyLevel.easy,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerateRecipe = () => {
    if (!formData.ingredients.trim()) {
      toast.error("Please enter some ingredients to generate a recipe.");
      return;
    }
    const ingredients = formData.ingredients.trim();
    const recipeData: Recipe = {
      ingredients: ingredients,
      servingSize: formData.servingSize,
      mealType: formData.mealType,
      cuisine: formData.cuisine,
      cookingTime: formData.cookingTime,
      difficultyLevel: formData.difficultyLevel,
    };

    onSubmit(recipeData);
  };

  return (
    <Card className="w-full shadow-soft hover:shadow-glow transition-smooth bg-gradient-to-br from-background to-accent/20">
      <CardHeader className="text-center relative">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50 rounded-t-lg"></div>
        <CardTitle className="text-2xl text-foreground flex items-center justify-center gap-2 relative z-10">
          <ChefHat className="w-6 h-6 text-primary" />
          Recipe Creator
        </CardTitle>
        <p className="text-muted-foreground mt-2 relative z-10">
          Fill in the details to generate your perfect recipe
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
          {/* Ingredients */}
          <div className="space-y-2">
            <Label
              htmlFor="ingredients"
              className="text-foreground font-medium flex items-center gap-2"
            >
              <Utensils className="w-4 h-4 text-primary" />
              Ingredients
            </Label>
            <Textarea
              id="ingredients"
              placeholder="Enter ingredients separated by commas (e.g., chicken, tomatoes, onions, garlic, spices...)"
              value={formData.ingredients}
              onChange={(e) => handleInputChange("ingredients", e.target.value)}
              className="min-h-[120px] border-border bg-input/50 focus:bg-background transition-smooth focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Serving Size */}
          <div className="space-y-2">
            <Label
              htmlFor="servingSize"
              className="text-foreground font-medium flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-primary" />
              Serving Size
            </Label>
            <Select
              value={formData.servingSize}
              onValueChange={(value) => handleInputChange("servingSize", value)}
            >
              <SelectTrigger className="border-border bg-input/50 focus:bg-background transition-smooth">
                <SelectValue placeholder="Select serving size" />
              </SelectTrigger>
              <SelectContent>
                {SERVING_SIZE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cuisine */}
          <div className="space-y-2">
            <Label
              htmlFor="cuisine"
              className="text-foreground font-medium flex items-center gap-2"
            >
              <Globe className="w-4 h-4 text-primary" />
              Cuisine
            </Label>
            <Select
              value={formData.cuisine}
              onValueChange={(value) => handleInputChange("cuisine", value)}
            >
              <SelectTrigger className="border-border bg-input/50 focus:bg-background transition-smooth">
                <SelectValue placeholder="Select cuisine type" />
              </SelectTrigger>

              <SelectContent>
                {CUISINE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Meal Type */}
          <div className="space-y-2">
            <Label
              htmlFor="mealType"
              className="text-foreground font-medium flex items-center gap-2"
            >
              <ChefHat className="w-4 h-4 text-primary" />
              Meal Type
            </Label>
            <Select
              value={formData.mealType}
              onValueChange={(value) => handleInputChange("mealType", value)}
            >
              <SelectTrigger className="border-border bg-input/50 focus:bg-background transition-smooth">
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {MEAL_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cooking Time */}
          <div className="space-y-2">
            <Label
              htmlFor="cookingTime"
              className="text-foreground font-medium flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-primary" />
              Cooking Time
            </Label>
            <Select
              value={formData.cookingTime}
              onValueChange={(value) => handleInputChange("cookingTime", value)}
            >
              <SelectTrigger className="border-border bg-input/50 focus:bg-background transition-smooth">
                <SelectValue placeholder="Select cooking time" />
              </SelectTrigger>
              <SelectContent>
                {COOKING_TIME_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Level */}
          <div className="space-y-2">
            <Label
              htmlFor="difficultyLevel"
              className="text-foreground font-medium flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-primary" />
              Difficulty Level
            </Label>
            <Select
              value={formData.difficultyLevel}
              onValueChange={(value) =>
                handleInputChange("difficultyLevel", value)
              }
            >
              <SelectTrigger className="border-border bg-input/50 focus:bg-background transition-smooth">
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTY_LEVEL_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateRecipe}
            disabled={isLoading}
            variant="recipe"
            size="lg"
            className="w-full mt-8 bg-gradient-primary hover:opacity-90 transition-smooth shadow-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Recipe...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Recipe
              </>
            )}
          </Button>
        </CardContent>
    </Card>
  );
};

export default RecipeForm;
