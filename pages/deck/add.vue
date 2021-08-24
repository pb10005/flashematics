<template>
  <div>
    <v-btn icon @click="$router.push(`/`)"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <div>
      <v-subheader>Add deck</v-subheader>
      <v-text-field label="name" v-model="newDeck.name"></v-text-field>
      <v-textarea label="description" v-model="newDeck.description" />
      <v-btn @click="addDeck">Create</v-btn>
    </div>
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

      this.newDeck = {
        name: "",
        description: "",
      };
    },
  },
};
</script>
