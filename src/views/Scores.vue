<template>
  <div class="home">
    <br />
    <h1>{{ message }}</h1>
    <p>{{ currentScore }}</p>
    <div id="label"></div>
    <h5 id="measures"> Measures:
    <select id="length-select" class="dropdown" v-model="inputLength">
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
    </h5>
    <button v-on:click="scoresCreate" class="btn" id="generate">Generate!</button>
    <br />
    <br />
  </div>
</template>

<style>
#length-select {
  color: #1b262c;
  background-color: #bbe1fa;
  box-shadow: 0 3px 8px rgb(0 0 0 / 30%);
  border-radius: 3px;
}

#generate {
  color: #1b262c;
  background-color: #f0834d;
  font-weight: bold;
  transition: ease 0.2s;
}

#generate:hover {
  background-color: #f5bd6a;
}

#measures {
  margin-bottom: 20px;
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
