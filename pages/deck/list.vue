<template>
  <v-container app>
    <v-card notification dark color="primary">
      <v-card-title>
        <v-text-field
          label="Name"
          v-if="editor"
          v-model="newDeck.name"
        ></v-text-field>
        <span v-else>{{ deck.name }}</span>
      </v-card-title>
      <v-card-subtitle>
        <v-textarea
          label="Description"
          v-if="editor"
          v-model="newDeck.description"
        ></v-textarea>
        <span v-else>{{ deck.description }}</span>
      </v-card-subtitle>
      <v-card-actions>
        <v-btn icon v-if="!editor" @click="editor = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon v-if="editor" @click="commitChange"
          ><v-icon>mdi-check</v-icon></v-btn
        >
        <v-btn icon v-if="editor" @click="clearEditor"
          ><v-icon>mdi-close</v-icon></v-btn
        >
        <v-btn icon @click="$router.push(`/card?deck=${$route.query.deck}`)"
          ><v-icon>mdi-cards-variant</v-icon></v-btn
        >
        <v-btn icon @click="$router.push(`/card/add?deck=${$route.query.deck}`)"
          ><v-icon>mdi-shape-rectangle-plus</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
    <v-card class="ma-1" v-for="(item, index) in cardList" :key="index">
      <v-card-text>
        <span>{{ item.head }}</span>
        <span>{{ item.tail }}</span>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.push(`/card/edit?card=${item._id}`)" icon
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
        <v-btn color="red" @click="openDeleteDialog(item)" icon
          ><v-icon>mdi-delete</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title> Are you sure you want to delete the card? </v-card-title>
        <v-card-actions>
          <v-btn text @click="dialog = false">No</v-btn>
          <v-btn color="red" text @click="deleteCard()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      newDeck: {
        name: "",
        description: "",
      },
      editor: false,
      dialog: false,
      currentId: "",
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
    deck: {
      cache: false,
      get() {
        if (this.decks.length === 0)
          return { name: "none", description: "none" };
        return this.decks.find((x) => x._id === this.$route.query.deck);
      },
    },
    cardList: {
      cache: false,
      get() {
        const cards = localStorage.getItem("cards");
        if (!cards) return [];
        return JSON.parse(cards).filter(
          (x) => x.deck === this.$route.query.deck
        );
      },
    },
  },
  mounted() {
    this.newDeck = {
      name: this.deck.name,
      description: this.deck.description,
    };
  },
  methods: {
    openDeleteDialog({ _id }) {
      this.dialog = true;
      this.currentId = _id;
    },
    clearEditor() {
      this.newDeck = {
        name: this.deck.name,
        description: this.deck.description,
      };
      this.editor = false;
    },
    commitChange() {
      let decks = localStorage.getItem("decks");
      if (!this.newDeck.name || !decks) {
        this.clearEditor();
        return;
      }

      decks = JSON.parse(decks);
      decks = decks.filter((x) => x._id !== this.$route.query.deck);
      decks.push({
        _id: this.$route.query.deck,
        name: this.newDeck.name,
        description: this.newDeck.description,
      });

      localStorage.setItem("decks", JSON.stringify(decks));
      this.clearEditor();
    },
    deleteCard() {
      let cards = localStorage.getItem("cards");
      if (!cards) return;
      cards = JSON.parse(cards);
      cards = cards.filter((x) => x._id !== this.currentId);
      localStorage.setItem("cards", JSON.stringify(cards));
      this.dialog = false;
      this.currentId = "";
    },
  },
};
</script>
