<template>
  <div>
  <v-card notification dark color="primary">
    <v-card-title>
      {{deck.name}}
    </v-card-title>
    <v-card-actions>
      <v-btn text @click="$router.push(`/card/add?deck=${$route.query.deck}`)">Add Card</v-btn>
    </v-card-actions>
  </v-card>
    <v-card v-for="(item, index) in cardList" :key="index">
      <v-card-text>
        <span>{{item.head}}</span>
        <span>{{item.tail}}</span>
      </v-card-text>
      <v-card-actions>
        <v-btn text>Edit</v-btn>
        <v-btn @click="deleteCard(item)" text>Delete</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  computed: {
    deck() {
      if(!localStorage.decks) return {name: "none"};
      return localStorage.decks.find(x => x._id === this.$route.query.deck);
    },
    cardList() {
      if(!localStorage.cards) return [];
      return localStorage.cards.filter(x => x.deck === this.$route.query.deck);
    }
  },
  methods: {
    deleteCard({_id}) {
      console.log(_id);
    }
  }
};
</script>
