<template>
  <div>
    <v-btn icon @click="$router.push(`/`)"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <v-container app>
      <v-card-title>Add a new deck</v-card-title>
      <v-text-field label="name" v-model="newDeck.name"></v-text-field>
      <v-textarea label="description" v-model="newDeck.description" />
      <v-btn text @click="$router.go(-1)">Cancel</v-btn>
      <v-btn text @click="addDeck" color="red">Create</v-btn>
    </v-container>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
export default {
  data() {
    return {
      newDeck: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    addDeck() {
      if (!this.newDeck.name) return;

      let decks = localStorage.getItem("decks");
      if (!decks) {
        decks = [];
      } else {
        decks = JSON.parse(decks);
      }
      decks.push({
        _id: uuidv4(),
        name: this.newDeck.name,
        description: this.newDeck.description,
      });

      localStorage.setItem("decks", JSON.stringify(decks));

      this.$router.push("/");
    },
  },
};
</script>
