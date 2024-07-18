<template>
  <v-container class="fill-height pa-6">
    <div v-for="message in chats[slug].messages" class="d-flex w-100 pb-4">
      <v-avatar>
        <v-img
          :src="
            message.sender == 'you'
              ? 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
              : chats[slug].avatar
          "
        >
        </v-img>
      </v-avatar>
      <div class="pl-3">
        <h4 class="text-body-1 font-weight-bold">
          {{ message.sender == "you" ? "You" : chats.jane.name }}
        </h4>
        <p class="text-body-1">{{ message.message }}</p>
      </div>
    </div>
  </v-container>
  <v-footer app>
    <v-container>
      <v-textarea
        rounded="lg"
        variant="outlined"
        label="Type a message"
        rows="2"
        auto-grow
        hide-details
        v-model="input"
        class="pb-2"
        @keydown.enter="sendMessage"
      >
        <template v-slot:append-inner>
          <v-form>
            <v-btn icon @click="sendMessage">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-form>
        </template>
      </v-textarea>
    </v-container>
  </v-footer>
</template>
<script setup>
const chats = useState("chats");
const route = useRoute();
const slug = route.params.slug;

const input = ref("");

const sendMessage = () => {
  console.log(chats.value[slug].messages);
  // trim the input value

  const message = input.value.trim();

  chats.value[slug].messages.push({
    message: message,
    sender: "you",
  });
  input.value = null;
};
</script>
