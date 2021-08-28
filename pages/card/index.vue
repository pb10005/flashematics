<template>
  <div>
    <v-card>
      <v-card-title>{{ deckInfo.name }}</v-card-title>
      <v-card-text>{{ base64Str }}</v-card-text>
      <v-card-actions>
        <v-btn text @click="exportDeck">Export</v-btn>
      </v-card-actions>
    </v-card>
    <div class="pa-1">
      <HeadCard @click="flip" v-show="isHead" :content="currentCard.head" />
      <TailCard @click="flip" v-show="!isHead" :content="currentCard.tail" />
    </div>
    <div class="pa-1">
      <v-btn color="success" block @click="flip">Flip</v-btn>
    </div>
    <v-card class="d-flex justify-center pa-2" elevation="0">
      <v-btn @click="prev">Prev</v-btn>
      <p class="pa-2">{{ currentIndex + 1 }}/{{ deckLength }}</p>
      <v-btn @click="next">Next</v-btn>
    </v-card>
  </div>
</template>
<script>
import { Buffer } from "buffer";
export default {
  data() {
    return {
      currentIndex: 0,
      base64Str: "",
      isHead: true,
    };
  },
  computed: {
    deckInfo() {
      const decks = localStorage.getItem("decks");
      if (!decks) return { name: "none" };
      const d = JSON.parse(decks).find((x) => x._id === this.$route.query.deck);
      return d || { name: "none" };
    },
    deck() {
      const cards = localStorage.getItem("cards");
      if (!cards) return [];
      return JSON.parse(cards).filter((x) => x.deck === this.$route.query.deck);
    },
    deckLength() {
      return this.deck.length;
    },
    currentCard() {
      if (this.deck.length === 0) return { head: "none", tail: "none" };
      if (this.deck.length >= 1) return this.deck[this.currentIndex];
      else return { head: "none", tail: "none" };
    },
  },
  methods: {
    exportDeck() {
      const deck = {
        deckInfo: this.deckInfo,
        deck: this.deck,
      };
      const deckStr = JSON.stringify(deck);
      this.base64Str = Buffer.from(deckStr).toString("base64");
    },
    flip() {
      this.isHead ^= true;
    },
    prev() {
      this.currentIndex--;
      if (this.currentIndex < 0) this.currentIndex = this.deck.length - 1;
      this.isHead = true;
    },
    next() {
      this.currentIndex++;
      if (this.currentIndex >= this.deck.length) this.currentIndex = 0;
      this.isHead = true;
    },
  },
};
</script>