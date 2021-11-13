<template>
  <v-container app>
    <v-card notification dark color="primary">
      <v-card-title>{{ deckInfo.name }}</v-card-title>
      <v-card-text>
        <p>{{ deckInfo.description }}</p>
        <code>{{ $route.query.deck }}</code>
        <v-textarea v-if="base64Str" disabled v-model="base64Str"> </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn
          icon
          @click="$router.push(`/deck/list?deck=${$route.query.deck}`)"
          ><v-icon>mdi-view-list</v-icon></v-btn
        >
        <v-btn icon @click="exportDeck"><v-icon>mdi-export</v-icon></v-btn>
        <v-btn icon @click="openUploadDialog"
          ><v-icon>mdi-upload</v-icon></v-btn
        >
        <v-btn text v-if="base64Str" @click="base64Str = ''">Clear</v-btn>
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

    <v-dialog v-model="uploadDialog">
      <v-card>
        <v-card-title>Upload Deck to the server(Online Mode)</v-card-title>
        <v-card-text>
          <p>
            Are you sure you want to upload this deck? You have to
            <nuxt-link to="/settings">configure an endpoint of API</nuxt-link>
            before you can use online mode.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="uploadDialog = false">No</v-btn>
          <v-btn color="red" text @click="uploadDeck">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { Buffer } from "buffer";
import axios from "axios";
export default {
  data() {
    return {
      currentIndex: 0,
      base64Str: "",
      isHead: true,
      uploadDialog: false,
    };
  },
  computed: {
    deckInfo() {
      const decks = localStorage.getItem("decks");
      if (!decks) return { name: "none", description: "none" };
      const d = JSON.parse(decks).find((x) => x._id === this.$route.query.deck);
      return d || { name: "none", description: "none" };
    },
    cards() {
      const cards = localStorage.getItem("cards");
      if (!cards) return [];
      return JSON.parse(cards).filter((x) => x.deck === this.$route.query.deck);
    },
    deckLength() {
      return this.cards.length;
    },
    currentCard() {
      if (this.cards.length === 0) return { head: "none", tail: "none" };
      if (this.cards.length >= 1) return this.cards[this.currentIndex];
      else return { head: "none", tail: "none" };
    },
  },
  methods: {
    toBase64() {
      const deck = {
        d: {
          i: this.deckInfo._id,
          n: this.deckInfo.name,
          d: this.deckInfo.description
        },
        c: this.cards.map((x) => {
          return {
            i: x._id,
            h: x.head,
            t: x.tail,
          };
        }),
      };
      const deckStr = JSON.stringify(deck);
      return Buffer.from(deckStr).toString("base64");
    },
    exportDeck() {
      this.base64Str = this.toBase64();
    },
    flip() {
      this.isHead ^= true;
    },
    prev() {
      this.currentIndex--;
      if (this.currentIndex < 0) this.currentIndex = this.cards.length - 1;
      this.isHead = true;
    },
    next() {
      this.currentIndex++;
      if (this.currentIndex >= this.cards.length) this.currentIndex = 0;
      this.isHead = true;
    },
    openUploadDialog() {
      this.uploadDialog = true;
    },
    uploadDeck() {
      const svr = localStorage.getItem("serverUrl") || "";
      if (!svr) return;

      axios
        // .post(new URL(`/decks`, svr).href, {
        .post(new URL(`/api/DeckItems`, svr).href, {
          name: this.deckInfo._id,
          base64: this.toBase64(),
          updatedAt: this.deckInfo.updatedAt,
        })
        .then(() => {
          this.uploadDeck = false;
        });
    },
  },
};
</script>