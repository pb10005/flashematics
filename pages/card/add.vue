<template>
  <div>
    <v-btn icon @click="$router.push(`/deck/edit?deck=${$route.query.deck}`)"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <div>
      <h2>Preview</h2>
      <HeadCard @click="flip" v-show="isHead" :content="newCard.head" />
      <TailCard @click="flip" v-show="!isHead" :content="newCard.tail" />
      <v-btn color="success" block @click="flip">Flip</v-btn>
      <v-textarea label="Head" v-model="newCard.head" />
      <v-textarea label="Tail" v-model="newCard.tail" />
      <v-btn @click="addCard">Create</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newCard: {
        head: "",
        tail: "",
      },
      isHead: true,
    };
  },
  methods: {
    addCard() {
      if(!this.$route.query
      || !this.newCard.head) return;
      let cards = localStorage.getItem("cards");
      if(!cards) {
        cards = [];
      } else {
        cards = JSON.parse(cards);
      }

      cards.push({
        deck: this.$route.query.deck,
        head: this.newCard.head,
        tail: this.newCard.tail
        });
      
      localStorage.setItem("cards", JSON.stringify(cards));

      this.newCard = {
        head: "",
        tail: "",
      };
    },
    flip() {
      this.isHead ^= true;
    },
  },
};
</script>
