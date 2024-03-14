export interface RecipeItem {
  cook_time: string;
  description: string;
  index: number;
  name: string;
  prep_time: string;
  recipe_instructions: string;
  score: number;
}

export interface UserItem {
  username: string;
  email: string;
  password: string;
}

export interface MenuItem {
  cook_time: string;
  description: string;
  index: number;
  name: string;
  prep_time: string;
  recipe_instructions: string;
  score: number;
}
export interface RecipesResponse {
  query: string;
  results: MenuItem[];
}
