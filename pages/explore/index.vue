<template> 
  <div>
    <v-btn icon @click="$router.push(`/`)"
    ><v-icon>mdi-arrow-left</v-icon></v-btn
    >
    <v-container app>
      <v-subheader>Explore decks(Online Mode)</v-subheader>
      <v-card class="ma-1" v-for="item in list" :key="item.id">
        <v-card-title>
          {{item.name}}
        </v-card-title>
        <v-card-text>
          <code>{{item._id}}</code>
        </v-card-text>
        <v-card-actions>
          <v-btn icon>
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
          const txt = Buffer.from(x.base64, "base64").toString();
          const data = JSON.parse(txt);
          return {
            _id: data.d.i,
            name: data.d.n,
            updatedAt: x.updatedAt
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
}
</script>
