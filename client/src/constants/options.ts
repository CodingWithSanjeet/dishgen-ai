import { CuisineType, DifficultyLevel, CookingTime, MealType } from '../types';

export const SERVING_SIZE_OPTIONS = Array.from({ length: 10 }, (_, i) => ({
  value: String(i + 1),
  label: `${i + 1} Serving${i > 0 ? 's' : ''}`,
}));

export const CUISINE_OPTIONS = [
  { value: CuisineType.indian, label: 'Indian 🇮🇳' },
  { value: CuisineType.italian, label: 'Italian 🇮🇹' },
  { value: CuisineType.chinese, label: 'Chinese 🇨🇳' },
  { value: CuisineType.mexican, label: 'Mexican 🇲🇽' },
  { value: CuisineType.french, label: 'French 🇫🇷' },
  { value: CuisineType.thai, label: 'Thai 🇹🇭' },
  { value: CuisineType.greek, label: 'Greek 🇬🇷' },
  { value: CuisineType.japanese, label: 'Japanese 🇯🇵' },
  { value: CuisineType.american, label: 'American 🇺🇸' },
  { value: CuisineType.spanish, label: 'Spanish 🇪🇸' },
  { value: CuisineType.british, label: 'British 🇬🇧' },
  { value: CuisineType.korean, label: 'Korean 🇰🇷' },
];

export const MEAL_TYPE_OPTIONS = [
  { value: MealType.Breakfast, label: 'Breakfast' },
  { value: MealType.Lunch, label: 'Lunch' },
  { value: MealType.Dinner, label: 'Dinner' },
  { value: MealType.Snack, label: 'Snack' },
  { value: MealType.Dessert, label: 'Dessert' },
  { value: MealType.Appetizer, label: 'Appetizer' },
];

export const COOKING_TIME_OPTIONS = [
  { value: CookingTime['15-30'], label: '15 to 30 minutes' },
  { value: CookingTime['30-60'], label: '30 to 60 minutes' },
  { value: CookingTime['60-90'], label: '60 to 90 minutes' },
  { value: CookingTime['90+'], label: '90+ minutes or more' },
];

export const DIFFICULTY_LEVEL_OPTIONS = [
  { value: DifficultyLevel.easy, label: 'Easy' },
  { value: DifficultyLevel.medium, label: 'Medium' },
  { value: DifficultyLevel.hard, label: 'Hard' },
  { value: DifficultyLevel.expert, label: 'Expert' },
];