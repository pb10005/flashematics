<template>
  <div>
    <v-btn icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <v-subheader>Settings</v-subheader>
    <label>Server URL</label>
    <v-text-field label="Url" v-model="serverUrl"></v-text-field>
    <v-btn @click="save">Save</v-btn>
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