import apiClient from "./AxiosClient";
import type { AxiosResponse } from "axios";
import type { RecipeItem } from "@/type";
import type { UserItem } from "@/type";

export default {
  getRecipe(query: string): Promise<AxiosResponse<RecipeItem>> {
    return apiClient.post<RecipeItem>("/recipes/search", { query });
  },
  register(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<UserItem>> {
    try {
      return apiClient.post("/user/register ", { username, email, password });
    } catch (error) {
      throw new Error(error.response.data.message || "Error registering user");
    }
  },
  login(username: string, password: string): Promise<AxiosResponse<UserItem>> {
    try {
      return apiClient.post("/user/login", { username, password });
    } catch (error) {
      throw new Error(error.response.data.message || "Error registering user");
    }
  },
  getRecipeById(index: number): Promise<AxiosResponse<RecipeItem>> {
    return apiClient.get<RecipeItem>(`/recipes/recipe/${index}`);
  },
  createFolder(folderName) {
    return apiClient.post("/folder", { name: folderName });
  },
  getRecommendations(): Promise<
    AxiosResponse<{ recommendations: RecipeItem[] }>
  > {
    return apiClient.get<{ recommendations: RecipeItem[] }>(
      "/recipes/recommend"
    );
  },

  getFolders() {
    return apiClient.get("/folders");
  },
  bookmarks(recipeId, folderId) {
    return apiClient.post(`/boockmark/${recipeId}`, { folderId });
  },
  unbookmarkRecipe(recipeId, folderId) {
    return apiClient.delete(`/bookmark/${recipeId}`, { data: { folderId } });
  },
};
