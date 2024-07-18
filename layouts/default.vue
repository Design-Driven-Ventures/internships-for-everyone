<template>
  <v-layout>
    <v-app-bar elevation="0" color="#071952">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-icon></v-icon>
      <v-toolbar-title style="font-weight: bold"
        ><v-icon>mdi-umbrella</v-icon>SafeLife Insurance</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-btn> <v-icon>mdi-exit-to-app</v-icon>Resign</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" color="#EBF4F6" border="0" persistent>
      <v-list class="pa-3 pt-2">
        <v-list-item
          v-for="chat in chats"
          @click="$router.push('/chats/' + chat.slug)"
          rounded="xl"
          lines="two"
          :style="chat.slug === slug ? 'background-color: #a5e3e8' : ''"
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
const route = useRoute();

const slug = ref(route.params.slug);

const starterChat = {
  jane: {
    slug: "jane",
    messages: [
      {
        message:
          "Hi Paul, I'm Jane from SafeLife Insurance. Welcome to your first day as a data analyst intern! Are you ready for your first task?",
        sender: "Jane",
      },
    ],
    name: "Jane Juma",
    role: "Human Resources",
    avatar: "https://randomuser.me/api/portraits/women/92.jpg",
  },
};

const chats = useState("chats", () => {
  return starterChat;
});

const drawer = ref(true);
</script>
