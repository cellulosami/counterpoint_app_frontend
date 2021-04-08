<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>{{ currentScore }}</p>
    <button v-on:click="scoresCreate">Create!</button>
  </div>
</template>

<script>
import axios from "axios";

export default {

  data: function () {
    return {
      message: "Scores",
      currentScore: {}
    }
  },
  mounted: function () {

  },
  methods: {
    scoresCreate: function () {
      console.log("creating...");
      axios
        .post("http://localhost:3000/api/scores")
        .then(response => {
          console.log(response.data);
          this.currentScore = response.data;
        })
    }
  }
}
</script>
