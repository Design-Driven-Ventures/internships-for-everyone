<template>
  <v-container class="fill-height pa-6 pb-6">
    <div v-for="message in chats[slug].messages" class="d-flex w-100 pb-3">
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
          {{ message.sender == "you" ? "You" : chats[slug].name }}
        </h4>
        <p
          class="text-body-1"
          v-html="message.message"
          style="word-wrap: normal"
        ></p>
      </div>
    </div>

    <div class="d-flex w-100 pb-3" v-if="typing">
      <v-avatar>
        <v-img :src="chats[slug].avatar"> </v-img>
      </v-avatar>
      <div class="w-100">
        <h4 class="text-body-1 font-weight-bold pl-3">
          {{ chats[slug].name }}
        </h4>
        <v-skeleton-loader
          class="w-25 pa-0 ma-0"
          type="list-item-two-line"
        ></v-skeleton-loader>
      </div>
    </div>

    <div id="bottom"></div>
  </v-container>
  <v-footer app>
    <v-container>
      <v-textarea
        :disabled="typing"
        rounded="lg"
        variant="outlined"
        label="Type a message"
        rows="2"
        auto-grow
        hide-details="auto"
        v-model="input"
        class="pb-2"
        @keydown.enter="sendMessage"
        ref="messageInput"
      >
        <template v-slot:append-inner>
          <v-form>
            <v-btn icon @click="sendMessage" color="#071952" elevation="0">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-form>
        </template>
      </v-textarea>
    </v-container>
  </v-footer>
</template>
<script setup>
definePageMeta({
  layout: "chat",
});

import { useGoTo } from "vuetify";

const goTo = useGoTo();

const chats = useState("chats");

const route = useRoute();
const slug = route.params.slug;

const input = ref("");

const typing = ref(false);

const messageInput = ref(null);

const sendMessage = async () => {
  if (!input.value) return;
  if (!input.value.trim()) return;
  if (input.value.length < 2) return;
  const message = input.value;

  chats.value[slug].messages.push({
    message: message,
    sender: "you",
  });

  setTimeout(() => {
    goTo("#bottom");
  }, 20);

  input.value = null;

  // wait between 1-3 seconds
  await new Promise((resolve) => {
    setTimeout(resolve, Math.floor(Math.random() * 2000) + 1000);
  });

  typing.value = true;

  setTimeout(() => {
    goTo("#bottom");
  }, 20);

  let response;

  try {
    response = await $fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(chats.value[slug]),
    });

    if (response.includes("[message-unsafe]")) {
      chats.value[slug].messages.pop();
      alert("Your message was rejected for security reasons.");
      typing.value = false;
      return;
    }
  } catch (error) {
    console.error(error);
    // remove the last message
    chats.value[slug].messages.pop();

    alert("Something went wrong, please try again.");
    typing.value = false;
    return;
  }

  let reply = response;

  if (reply.includes("%FILE%") && chats.value[slug].file) {
    reply = reply.replace(
      "%FILE%",
      `<a href='/files/${chats.value[slug].file}' download='${chats.value[slug].file}'>${chats.value[slug].file}</a>`
    );
  }

  reply = reply.replace(/\n/g, "<br>");

  typing.value = false;

  // add the response to the chat
  chats.value[slug].messages.push({
    message: reply,
    sender: "Jane",
  });

  input.value = null;
  await messageInput.value.focus();

  // after one second scroll goTo the bottom of the chat
  setTimeout(() => {
    goTo("#bottom");
  }, 100);
};
</script>
