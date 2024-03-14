import apiClient from "./AxiosClient";
import type { AxiosResponse } from "axios";
import type { RecipeItem } from "@/type";
import type { UserItem } from "@/type";

export default {
  getRecipe(query: string): Promise<AxiosResponse<RecipeItem>> {
    return apiClient.post<RecipeItem>("/search", { query });
  },
  register(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<UserItem>> {
    try {
      return apiClient.post("/register", { username, email, password });
    } catch (error) {
      throw new Error(error.response.data.message || "Error registering user");
    }
  },
  login(username: string, password: string): Promise<AxiosResponse<UserItem>> {
    try {
      return apiClient.post("/login", { username, password });
    } catch (error) {
      throw new Error(error.response.data.message || "Error registering user");
    }
  },
};
