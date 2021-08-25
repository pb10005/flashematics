<template>
  <div>
    <v-card notification color="primary" dark>
      <v-card-title>Flashematics</v-card-title>
      <v-card-actions>
        <v-btn text @click="$router.push(`/deck/add`)">Add Deck</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ma-1" v-for="(item, index) in decks" :key="index">
      <v-card-title>
        {{ item.name }}
      </v-card-title>
      <v-card-text>
        {{ item.description }}
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$router.push(`/card?deck=${item._id}`)">View</v-btn>
        <v-btn text @click="$router.push(`/deck/edit?deck=${item._id}`)"
          >Edit</v-btn
        >
        <v-btn text @click="deleteDeck(item)">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  computed: {
    decks() {
      const decks = localStorage.getItem("decks");
      if (!decks) return [];
      else return JSON.parse(decks);
    },
  },
  methods: {
    deleteDeck({ _id }) {
      let decks = localStorage.getItem("decks");
      if (!decks) return;
      decks = JSON.parse(decks);
      decks = decks.filter((x) => x._id !== _id);
      localStorage.setItem("decks", JSON.stringify(decks));
    },
  },
};
</script>
