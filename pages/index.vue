<template>
  <div>
    <v-card notification color="primary" dark>
      <v-card-title>Flashematics</v-card-title>
      <v-card-actions>
        <v-btn text @click="$router.push(`/deck/add`)">Add Deck</v-btn>
        <v-btn text @click="openImportDialog">Import Deck</v-btn>
        <v-btn icon @click="openDownloadDialog"
          ><v-icon>mdi-download</v-icon></v-btn
        >
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
    <v-dialog v-model="downloadDialog">
      <v-card>
        <v-card-title>Download deck from the server</v-card-title>
        <v-card-text>
          <v-text-field label="Url" v-model="url"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="downloadDialog = false">No</v-btn>
          <v-btn color="red" text @click="downloadDeck">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { Buffer } from "buffer";
import axios from "axios";
export default {
  data() {
    return {
      currentId: "",
      base64Str: "",
      url: "",
      dialog: false,
      importDialog: false,
      downloadDialog: false,
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
    openDownloadDialog() {
      this.downloadDialog = true;
    },
    import(base64) {
      try {
        const txt = Buffer.from(base64, "base64").toString();
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
    },
    importDeck() {
      this.import(this.base64Str);
      this.importDialog = false;
    },
    deleteDeck() {
      this.dialog = false;
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

      this.currentId = "";
    },
    downloadDeck() {
      axios
        .get(this.url)
        .then((doc) => {
          const base64 = doc.data.deck.base64;
          this.import(base64);
        })
        .then(() => {
          this.downloadDialog = false;
        });
    },
  },
};
</script>
