<template>
  <div>
    <v-btn icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-container app>
      <v-card-title>Settings</v-card-title>
      <label>Endpoint of API</label>
      <v-text-field
        label="Endpoint URL"
        v-model="serverUrl"
        placeholder="https://example.com"
      ></v-text-field>
      <v-btn text @click="$router.go(-1)">Cancel</v-btn>
      <v-btn text @click="save" color="red">Save</v-btn>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      serverUrl: "",
    };
  },
  mounted() {
    this.serverUrl = localStorage.getItem("serverUrl", this.serverUrl) || "";
  },
  methods: {
    save() {
      if (!this.serverUrl) return;
      localStorage.setItem("serverUrl", this.serverUrl);
    },
  },
};
</script>