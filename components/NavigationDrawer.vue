<template>
  <v-app>
    <v-main>
      <NuxtPage />
    </v-main>

    <v-bottom-navigation app>
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon to="/statistics">
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>
      <v-btn icon to="/calculator">
        <v-icon>mdi-calculator</v-icon>
      </v-btn>
      <v-btn icon to="/settings">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { VBottomNavigation, VBtn, VIcon } from 'vuetify/components'
</script>
