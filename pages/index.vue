<template>
  <div style="background-color: #ebf4f6">
    <v-container
      style="height: 100vh"
      class="d-flex justify-center align-center"
    >
      <v-card rounded="lg" elevation="0" class="pa-6" style="max-width: 600px">
        <p class="text-overline font-weight-bold pb-2">Internship simulation</p>
        <h1 class="text-h3 font-weight-bold pb-6">Data Analyst</h1>
        <p class="text-body-1 mb-8">
          Experience what it takes to be a data analyst intern in Kenya. Join
          the virtual team of 'SafeLine Insurance' and learn how to work with
          CSV data, analyse it and present your findings.
        </p>
        <v-btn
          color="primary"
          rounded="xl"
          elevation="0"
          size="x-large"
          block
          to="/chats/jane"
        >
          <v-icon>mdi-arrow-right</v-icon>Start Internship
        </v-btn>
      </v-card>
    </v-container>
  </div>
</template>
