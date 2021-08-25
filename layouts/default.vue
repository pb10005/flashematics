<template>
  <v-app>
    <Nuxt class="mb-2" />
    <v-bottom-navigation app :value="value" color="primary">
      <v-btn @click="$router.push(`/`)">
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      value: "home",
    };
  },
};
</script>
<style>
</style>
