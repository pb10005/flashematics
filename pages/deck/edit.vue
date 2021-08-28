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
        <v-btn color="red" @click="openDeleteDialog(item)" text>Delete</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title> Are you sure you want to delete the card? </v-card-title>
        <v-card-actions>
          <v-btn text @click="dialog = false">No</v-btn>
          <v-btn color="red" text @click="deleteCard()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      currentId: "",
    };
  },
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
    cardList: {
      cache: false,
      get() {
        const cards = localStorage.getItem("cards");
        if (!cards) return [];
        return JSON.parse(cards).filter(
          (x) => x.deck === this.$route.query.deck
        );
      },
    },
  },
  methods: {
    openDeleteDialog({ _id }) {
      this.dialog = true;
      this.currentId = _id;
    },
    deleteCard() {
      let cards = localStorage.getItem("cards");
      if (!cards) return;
      cards = JSON.parse(cards);
      cards = cards.filter((x) => x._id !== this.currentId);
      localStorage.setItem("cards", JSON.stringify(cards));
      this.dialog = false;
      this.currentId = "";
    },
  },
};
</script>
