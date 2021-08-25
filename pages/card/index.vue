<template>
  <div>
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
export default {
  data() {
    return {
      currentIndex: 0,
      isHead: true,
    };
  },
  computed: {
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