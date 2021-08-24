<template>
  <v-card class="card">
    <v-card-text>
      <vue-mathjax class="formula" :formula="content"> </vue-mathjax>
    </v-card-text>
  </v-card>
</template>
<script>
import { VueMathjax } from "vue-mathjax";
export default {
  components: {
    "vue-mathjax": VueMathjax,
  },
  props: {
    content: String,
  },
  created() {
    if (process.browser) {
      window.MathJax.Hub.Config({
        // MathJaxの設定
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/HTML-CSS"],
        tex2jax: {
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
          displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"],
          ],
          processEscapes: true,
        },
        "HTML-CSS": { fonts: ["TeX"] },
      });
    }
  },
};
</script>
<style scoped>
.card {
  min-height: 200px;
  padding: 10px;
}
.formula {
  font-size: 1.5rem;
}
</style>
