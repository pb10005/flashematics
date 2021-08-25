<template>
  <div>
    <v-card notification dark color="primary">
      <v-card-title>
        {{ deck.name }}
      </v-card-title>
      <v-card-subtitle>{{ deck.description }} </v-card-subtitle>
      <v-card-actions>
        <v-btn text @click="$router.push(`/card/add?deck=${$route.query.deck}`)"
          >Add Card</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-card class="ma-1" v-for="(item, index) in cardList" :key="index">
      <v-card-text>
        <span>{{ item.head }}</span>
        <span>{{ item.tail }}</span>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.push(`/card/edit?card=${item._id}`)" text
          >Edit</v-btn
        >
        <v-btn @click="deleteCard(item)" text>Delete</v-btn>
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
    deck() {
      if (this.decks.length === 0) return { name: "none", description: "none" };
      return this.decks.find((x) => x._id === this.$route.query.deck);
    },
    cardList() {
      const cards = localStorage.getItem("cards");
      if (!cards) return [];
      return JSON.parse(cards).filter((x) => x.deck === this.$route.query.deck);
    },
  },
  methods: {
    deleteCard({ _id }) {
      let cards = localStorage.getItem("cards");
      if (!cards) return;
      cards = JSON.parse(cards);
      cards = cards.filter((x) => x._id !== _id);
      localStorage.setItem("cards", JSON.stringify(cards));
    },
  },
};
</script>
