<template>
  <div>
    <v-btn icon @click="$router.push(`/deck/list?deck=${$route.query.deck}`)"
      ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <v-container app>
      <v-subheader>Preview</v-subheader>
      <div class="pa-1">
        <HeadCard @click="flip" v-show="isHead" :content="newCard.head" />
        <TailCard @click="flip" v-show="!isHead" :content="newCard.tail" />
      </div>
      <div class="pa-1">
        <v-btn color="success" block @click="flip">Flip</v-btn>
      </div>
      <v-textarea label="Head" v-model="newCard.head" />
      <v-textarea label="Tail" v-model="newCard.tail" />
      <v-btn text @click="$router.push(`/deck/list?deck=${$route.query.deck}`)"
        >Cancel</v-btn
      >
      <v-btn text @click="addCard" color="red">Create</v-btn>
    </v-container>
  </div>
</template>
<script>
import { v4 as uuidv4 } from "uuid";
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
      if (!this.$route.query || !this.newCard.head) return;
      let cards = localStorage.getItem("cards");
      if (!cards) {
        cards = [];
      } else {
        cards = JSON.parse(cards);
      }

      cards.push({
        _id: uuidv4(),
        deck: this.$route.query.deck,
        head: this.newCard.head,
        tail: this.newCard.tail,
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
