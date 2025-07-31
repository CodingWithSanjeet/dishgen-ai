import RecipeHeader from "@/components/RecipeHeader";
import RecipeForm from "@/components/RecipeForm";
import { useRecipeStream } from "@/hooks";
import { Recipe, ParsedRecipe } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import RecipeDisplay from "@/components/RecipeDisplay";
import { parseRecipeChunk } from "@/lib/utils";
import Footer from "@/components/Footer";

const Index = () => {
  const [parsedRecipe, setParsedRecipe] = useState<ParsedRecipe>({ ingredients: [], instructions: [] });
  const fullRecipeTextRef = useRef<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const resultSectionRef = useRef<HTMLDivElement>(null);
  const [header, setHeader] = useState<Recipe|null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);
  const [formHeight, setFormHeight] = useState<number>(0);

  const handleChunk = useCallback((chunk: string) => {
    fullRecipeTextRef.current += chunk;
    const newParsedRecipe = parseRecipeChunk(parsedRecipe, fullRecipeTextRef.current);
    setParsedRecipe(newParsedRecipe);
    
    // If we have any content, show it (but keep generating indicator)
    if (!isGenerating) {
      setIsGenerating(true);
    }
  }, [parsedRecipe, isGenerating]);

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, [formRef]);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
    setIsGenerating(false);
    toast.success("Your Personal AI Chef has created a perfect recipe!");
  }, []);

 const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
    setIsGenerating(false);
  }, []);

  const { initializeEventStream } = useRecipeStream({
    onChunk: handleChunk,
    onComplete: handleComplete,
    onError: handleError,
  });

  const handleSubmit = useCallback((recipeData: Recipe) => {
    // Immediately clear all displayed content
    setParsedRecipe({ name: '', ingredients: [], instructions: [] });
    fullRecipeTextRef.current = '';
    setError('');
    setHeader(null); // Clear previous header immediately
    setIsLoading(true);
    setIsGenerating(false);
    
    // Start the stream and set header
    initializeEventStream(recipeData);
    setHeader(recipeData);
    
    // On mobile, scroll to results; on desktop, just scroll recipe display to top
    setTimeout(() => {
      if (window.innerWidth < 1024) {
        resultSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // On desktop, scroll the recipe display container to top
        if (resultSectionRef.current) {
          resultSectionRef.current.scrollTop = 0;
        }
      }
    }, 500);
  }, [initializeEventStream]);

  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="py-8 px-4 pb-0">
        <div className="container mx-auto max-w-7xl">
          <RecipeHeader />
          
          {/* Side-by-side layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 mb-8">
            {/* Left side - Recipe Form */}
            <div ref={formRef} className="h-fit">
              <RecipeForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
            
            {/* Right side - Recipe Display */}
            <div 
              ref={resultSectionRef}
              className="h-fit"
              style={{ minHeight: formHeight }}
            >
              <RecipeDisplay recipe={parsedRecipe} isLoading={isLoading || isGenerating} error={error} header={header} height={formHeight} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
