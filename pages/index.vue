<template>
  <div style="background-color: #ebf4f6">
    <v-container
      style="height: 100vh"
      class="d-flex justify-center align-center"
    >
      <v-card rounded="lg" elevation="0" class="pa-6" style="max-width: 600px">
        <p class="text-overline font-weight-bold pb-2">Unlimited Internships</p>
        <h1 class="text-h3 font-weight-bold pb-6">Data Analyst</h1>
        <p class="text-body-1 mb-8">
          Experience what it takes to be a data analyst intern in Kenya. Join
          the virtual team of 'SafeLine Insurance' and learn how to analyze data
          to make informed decisions.
        </p>
        <v-btn
          color="#EBF4F6"
          rounded="lg"
          elevation="0"
          size="x-large"
          block
          to="/chats/jane"
        >
          <v-icon>mdi-arrow-right</v-icon>Start Internship
        </v-btn>

        <p class="text-caption text-center pt-4">
          This is a simulation and not a real internship. Powered by Llama 3.
        </p>
      </v-card>
    </v-container>
  </div>
</template>
