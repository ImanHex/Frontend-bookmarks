<template>
  <div class="container h-screen flex justify-center items-center ml-20">
    <div class="flex bg-slate-300 w-11/12 p-10 mx-auto rounded-md">
      <!-- Image Section -->
      <div class="w-1/2">
        <img
          src="https://i.pinimg.com/564x/70/c7/b4/70c7b45850fb057509baa13557c6378b.jpg"
          alt=""
          class="w-full object-fit rounded"
        />
      </div>

      <!-- Form Section -->
      <div class="w-1/2">
        <div class="bg-white p-8 rounded shadow-md h-full">
          <div class="p-10 mt-28">
            <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
            <form @submit.prevent="login" class="space-y-8">
              <div>
                <input
                  type="text"
                  v-model="username"
                  placeholder="Username"
                  class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  class="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div v-if="loginMessage" class="mt-4 text-black">
                {{ loginMessage }}
              </div>
              <button
                type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import userService from "@/services/RecipeSearch";
import router from "@/router";

export default {
  data() {
    return {
      username: "",
      password: "",
      LoginSuccessful: false,
      LoginMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        await userService.login(this.username, this.password);
        this.LoginSuccessful = true;
        this.LoginMessage = "Login successful";
        setTimeout(() => {
          router.push({ name: "Search" });
        }, 1000);
      } catch (error) {
        console.error("Error logging in:", error);
        this.LoginMessage = "Login failed, please try again";
      }
    },
  },
};
</script>
