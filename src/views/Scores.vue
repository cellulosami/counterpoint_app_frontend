<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>{{ currentScore }}</p>
    <button v-on:click="lengthSelect(8)">length 8</button>
    <button v-on:click="lengthSelect(10)">length 10</button>
    <button v-on:click="scoresCreate">Create!</button>
  </div>
</template>

<script>
import axios from "axios";

export default {

  data: function () {
    return {
      message: "Scores",
      currentScore: {},
      inputLength: 8
    }
  },
  mounted: function () {

  },
  methods: {
    scoresCreate: function () {
      console.log("creating...");
      let params = {
        length: this.inputLength
      }
      axios
        .post("http://localhost:3000/api/scores", params)
        .then(response => {
          console.log(response.data);
          this.currentScore = response.data;
        })
    },
    lengthSelect: function (number) {
      this.inputLength = number;
    }
  }
}
</script>
