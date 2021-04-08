<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>{{ currentScore }}</p>
    <div id="label"></div>
    <select id="length-select" class="btn" style="box-shadow: 0 2px 5px rgb(15 17 17 / 20%);" v-model="inputLength">
      <option>
        8
      </option>
      <option>
        9
      </option>
      <option>
        10
      </option>
      <option>
        11
      </option>
      <option>
        12
      </option>
      <option>
        13
      </option>
      <option>
        14
      </option>
    </select>
    <button v-on:click="scoresCreate">Create!</button>




  </div>
</template>

<style>
#length-select {
  border: 1px solid lightgray;
}
</style>

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
        length: parseInt(this.inputLength)
      }
      axios
        .post("http://localhost:3000/api/scores", params)
        .then(response => {
          console.log(response.data);
          this.currentScore = response.data;
        })
    },
  }
}
</script>
