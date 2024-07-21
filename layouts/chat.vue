<template>
  <v-layout>
    <v-app-bar elevation="0" color="#071952">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div style="font-weight: bold" class="text-body-1 text-md-h6">
        <v-icon>mdi-umbrella</v-icon>SafeLife Insurance
      </div>
      <v-spacer></v-spacer>
      <v-btn rounded="xl" class="mr-2" @click="resign">
        <v-icon class="mr-2">mdi-exit-to-app</v-icon>Resign</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      color="#EBF4F6"
      border="0"
      :permanent="$vuetify.display.smAndUp"
    >
      <v-list class="pa-3 pt-2">
        <v-list-item
          v-for="chat in chats"
          @click="$router.push('/chats/' + chat.slug)"
          rounded="xl"
          class="mb-1"
          lines="two"
          :style="
            chat.slug === $route.params.slug ? 'background-color: #a5e3e8' : ''
          "
          :prepend-avatar="chat.avatar"
          :subtitle="chat.role"
          :title="chat.name"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <NuxtPage />
    </v-main>
  </v-layout>
</template>
<script setup>
const router = useRouter();
let instructions = await import("~/assets/instructions.json");

const chats = useState("chats", () => instructions.default);

const drawer = ref(true);

const loaded = useState("loaded", () => false);

// watch chats and save to localStorage

watch(
  chats,
  (value) => {
    if (!value) return;
    localStorage.setItem("chats", JSON.stringify(value));
  },
  { deep: true }
);

// onbeforemount, get chats from localStorage

onBeforeMount(() => {
  if (localStorage.getItem("chats")) {
    chats.value = JSON.parse(localStorage.getItem("chats"));
  }
  loaded.value = true;
});

const resign = () => {
  // Confirm the resignation action
  if (
    confirm(
      "Are you sure you want to resign? This will delete all chats and progress."
    )
  ) {
    try {
      // Remove chats from local storage
      localStorage.removeItem("chats");
      // loop through the chats and reset the messages
      chats.value = instructions.default;
    } catch (error) {
      console.error("Error removing chats from localStorage:", error);
    }

    try {
      // Navigate to the home page
      router.push("/");
    } catch (error) {
      console.error("Error navigating to home page:", error);
    }
  }
};
</script>
