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
          <div class="p-10 mt-16">
            <h2 class="text-2xl font-bold mb-4 text-center">Register</h2>
            <form @submit.prevent="register" class="space-y-8">
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
                  type="email"
                  v-model="email"
                  placeholder="Email"
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
              <button
                type="submit"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </button>
            </form>
            <div v-if="registrationMessage" class="mt-4 text-black">
              {{ registrationMessage }}
            </div>
            <router-link
              to="/login"
              class="mt-4 block text-blue-700 hover:underline"
              >Already have an account? Login</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import userService from "@/services/RecipeSearch";

export default {
  data() {
    return {
      registrationSuccessful: false,
      registrationMessage: "",
      username: "",
      email: "",
      password: "",
      result: "",
    };
  },
  methods: {
    async register() {
      try {
        await userService.register(this.username, this.email, this.password);
        this.registrationSuccessful = true;
        this.registrationMessage =
          "Registration successful. Redirecting to login...";
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
      } catch (error) {
        console.error("Error registering user:", error);
        this.registrationMessage = "Error registering user. Please try again.";
      }
    },
  },
};
</script>
