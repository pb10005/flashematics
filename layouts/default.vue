<template>
  <v-app>
    <div class="mb80">
      <Nuxt />
    </div>
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
.mb80 {
  margin-bottom: 80px;
}
</style>
