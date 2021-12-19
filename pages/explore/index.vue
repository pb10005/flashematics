<template> 
  <div>
    <v-btn icon @click="$router.push(`/`)"
    ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <v-container app>
      <v-subheader>Explore decks(Online Mode)</v-subheader>
      <v-card class="ma-1" v-for="item in list" :key="item.id">
        <v-card-text>
          <code>{{item._id}}</code>
          {{item.updatedAt}}
        </v-card-text>
        <v-card-actions>
          <v-btn icon @click="download(item._id)">
            <v-icon>mdi-download-circle</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import { Buffer } from "buffer";
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    const svr = localStorage.getItem("serverUrl") || "";
    if (!svr) return;
    axios
      .get(new URL(`/api/DeckItems/`, svr).href)
      .then((docs) => {
        this.list = docs.data.map(x => {
          // const txt = Buffer.from(x.base64, "base64").toString();
          // const data = JSON.parse(txt);
          return {
            _id: x.name,
            updatedAt: x.updatedAt
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
  methods: {
    import(base64, updatedAt) {
      try {
        const txt = Buffer.from(base64, "base64").toString();
        const data = JSON.parse(txt);

        let decks = localStorage.getItem("decks");
        if (!decks) {
          decks = [];
        } else {
          decks = JSON.parse(decks);
          decks = decks.filter((x) => x._id !== data.d.i);
        }

        decks.push({
          _id: data.d.i,
          name: data.d.n,
          description: data.d.d,
          updatedAt: updatedAt
        });
        localStorage.setItem("decks", JSON.stringify(decks));

        let cards = localStorage.getItem("cards");
        if (!cards) {
          cards = [];
        } else {
          cards = JSON.parse(cards);
        }

        const cardIds = data.c.map((x) => x.i);
        cards = cards.filter((x) => cardIds.indexOf(x._id) < 0);
        const impCards = data.c.map((x) => {
          return { _id: x.i, deck: data.d.i, head: x.h, tail: x.t };
        });
        cards = [...cards, ...impCards];
        localStorage.setItem("cards", JSON.stringify(cards));
      } catch (ex) {}
    },
    download(id) {
      const svr = localStorage.getItem("serverUrl") || "";
      if (!svr) return;
      axios
        .get(new URL(`/api/DeckItems/${id}`, svr).href)
        .then((doc) => {
          const base64 = doc.data.base64;
          const updatedAt = doc.data.updatedAt;
          this.import(base64, updatedAt);
        });
    }
  }
}
</script>
