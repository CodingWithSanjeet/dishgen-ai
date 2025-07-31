import { useRef, useCallback } from 'react';
import { Recipe, StreamResponse } from '../types';
const apiUrl = import.meta.env.VITE_RECIPE_AI_API_URL;

type UseRecipeStreamProps = {
  onChunk: (chunk: string) => void;
  onComplete: () => void;
  onError: (error: string) => void;
};

export const useRecipeStream = ({ onChunk, onComplete, onError }: UseRecipeStreamProps) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  const closeEventStream = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }, []);

  const initializeEventStream = useCallback((recipeData: Recipe) => {
    closeEventStream();
    
    const recipeInputs = { ...recipeData };
    const queryParams = new URLSearchParams(recipeInputs).toString();
    const url = `${apiUrl}/api/v1/stream-recipe?${queryParams}`;
    
    eventSourceRef.current = new EventSource(url);
    
    eventSourceRef.current.onmessage = (event) => {
      try {
        const data: StreamResponse = JSON.parse(event.data);
        console.log('Stream data:', data);
        
        switch (data.action) {
          case 'chunk':
            if (data.chunk) {
              onChunk(data.chunk);
            }
            break;
          case 'close':
            onComplete();
            closeEventStream();
            break;
          case 'error':
            onError(data.message || 'An error occurred');
            closeEventStream();
            break;
        }
      } catch (err) {
        console.error('Error parsing stream data:', err);
        onError('Failed to parse response');
        closeEventStream();
      }
    };
    
    eventSourceRef.current.onerror = () => {
      onError('Connection error');
      closeEventStream();
    };
  }, [onChunk, onComplete, onError, closeEventStream]);

  return {
    initializeEventStream,
    closeEventStream,
  };
};