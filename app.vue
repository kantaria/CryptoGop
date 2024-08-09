<template>
  <v-app>
    <NavigationDrawer />

    <v-main>
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script setup>
import NavigationDrawer from '~/components/NavigationDrawer.vue'

const toggleDrawer = () => {
  const drawer = document.querySelector('.v-navigation-drawer')
  if (drawer) {
    drawer.__vue__.$data.drawer = !drawer.__vue__.$data.drawer
  }
}
</script>
