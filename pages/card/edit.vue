<template>
  <div>
    <v-btn icon @click="$router.go(-1)"><v-icon>mdi-arrow-left</v-icon></v-btn>
    <div>
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
      <v-btn @click="commit">Commit</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newCard: {
        _id: "",
        deck: "",
        head: "",
        tail: "",
      },
      isHead: true,
    };
  },
  mounted() {
    if (!this.$route.query.card) return;
    let cards = localStorage.getItem("cards");
    if (!cards) return;
    cards = JSON.parse(cards);
    const c = cards.find((x) => x._id === this.$route.query.card);
    this.newCard = {
      _id: c._id,
      deck: c.deck,
      head: c.head,
      tail: c.tail,
    };
  },
  methods: {
    commit() {
      if (!this.$route.query || !this.newCard.head) return;
      let cards = localStorage.getItem("cards");
      if (!cards) {
        cards = [];
      } else {
        cards = JSON.parse(cards);
      }
      cards = cards.filter((x) => x._id !== this.newCard._id);
      cards.push({
        _id: this.newCard._id,
        deck: this.newCard.deck,
        head: this.newCard.head,
        tail: this.newCard.tail,
      });

      localStorage.setItem("cards", JSON.stringify(cards));

      this.$router.push(`/deck/edit?deck=${this.newCard.deck}`);
    },
    flip() {
      this.isHead ^= true;
    },
  },
};
</script>
