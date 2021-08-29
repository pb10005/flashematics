<template>
  <div>
    <v-card notification color="primary" dark>
      <v-card-title>Flashematics</v-card-title>
      <v-card-actions>
        <v-btn text @click="$router.push(`/deck/add`)">Add Deck</v-btn>
        <v-btn text @click="openImportDialog">Import Deck</v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="ma-1" v-for="(item, index) in decks" :key="index">
      <v-card-title> {{ item.name }}</v-card-title>
      <v-card-text>
        {{ item.description }}
      </v-card-text>
      <v-card-actions>
        <v-btn icon @click="$router.push(`/card?deck=${item._id}`)"
          ><v-icon>mdi-cards-variant</v-icon></v-btn
        >
        <v-btn icon @click="$router.push(`/deck/list?deck=${item._id}`)"
          ><v-icon>mdi-view-list</v-icon></v-btn
        >
        <v-btn icon color="red" @click.stop="openDeleteDialog(item)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title> Are you sure you want to delete the deck? </v-card-title>
        <v-card-actions>
          <v-btn text @click="dialog = false">No</v-btn>
          <v-btn color="red" text @click="deleteDeck">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="importDialog">
      <v-card>
        <v-card-title>Import deck from Base64 text</v-card-title>
        <v-card-text>
          <v-textarea v-model="base64Str"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="importDialog = false">No</v-btn>
          <v-btn color="red" text @click="importDeck">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { Buffer } from "buffer";
export default {
  data() {
    return {
      currentId: "",
      base64Str: "",
      dialog: false,
      importDialog: false,
    };
  },
  computed: {
    decks: {
      cache: false,
      get() {
        const decks = localStorage.getItem("decks");
        if (!decks) return [];
        else return JSON.parse(decks);
      },
    },
  },
  methods: {
    openDeleteDialog({ _id }) {
      this.dialog = true;
      this.currentId = _id;
    },
    openImportDialog() {
      this.importDialog = true;
    },
    importDeck() {
      try {
        const txt = Buffer.from(this.base64Str, "base64").toString();
        const data = JSON.parse(txt);

        let decks = localStorage.getItem("decks");
        if (!decks) return;
        decks = JSON.parse(decks);
        decks = decks.filter((x) => x._id !== data.d.i);
        decks.push({
          _id: data.d.i,
          name: data.d.n,
          description: data.d.d,
        });
        localStorage.setItem("decks", JSON.stringify(decks));

        let cards = localStorage.getItem("cards");
        if (!cards) return;
        cards = JSON.parse(cards);

        const cardIds = data.c.map((x) => x.i);
        cards = cards.filter((x) => cardIds.indexOf(x._id) < 0);
        const impCards = data.c.map((x) => {
          return { _id: x.i, deck: data.d.i, head: x.h, tail: x.t };
        });
        cards = [...cards, ...impCards];
        localStorage.setItem("cards", JSON.stringify(cards));
      } catch (ex) {}
      this.importDialog = false;
    },
    deleteDeck() {
      let decks = localStorage.getItem("decks");
      if (!decks) return;
      decks = JSON.parse(decks);
      decks = decks.filter((x) => x._id !== this.currentId);
      localStorage.setItem("decks", JSON.stringify(decks));

      let cards = localStorage.getItem("cards");
      if (!cards) return;
      cards = JSON.parse(cards);
      cards = cards.filter((x) => x.deck !== this.currentId);
      localStorage.setItem("cards", JSON.stringify(cards));

      this.dialog = false;
      this.currentId = "";
    },
  },
};
</script>
