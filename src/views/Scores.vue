<template>
  <div class="home">
    <div id="main-body">
      <div id="generator-container">
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
          <option>
            15
          </option>
          <option>
            16
          </option>
        </select>
        </h5>
        <button v-on:click="scoresCreate" class="btn" id="generate">Generate!</button>
      </div>
      <div id="staff-container">
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
        <div class="bar-regular measure-container">

        </div>
      </div>
    </div>
  </div>
</template>

<style>
#main-body {
  padding: 32px;
  margin: 2%;
  width: 96%;
  background-color: #0f4c75;
  box-shadow: 0 5px 12px rgb(0 0 0 / 30%);
  border-radius: 20px;
}

.measure-container {
  float: left;
  background: repeating-linear-gradient(black, black 2px, hsl(24, 10%, 90%) 2px, hsl(24, 10%, 90%) 14.5px);
  height: 60px;
  width: 120px;
  font-size: 10rem;
  border-left: 2px solid #000;
  border-right: 2px solid #000;
  margin-bottom: 32px;
}

#staff-container {
  background-color: hsl(24, 10%, 90%);
  border-radius: 5px;
  padding: 32px;
  Height: 216px;
  width: 100%;
}

#staff-container.after {
    content: ".";
    display:block;
    height:0;
    clear:both;
    visibility:hidden;
}

#generator-container {
  margin-bottom: 2%;
}

#length-select {
  color: #1b262c;
  background-color: hsl(24, 10%, 90%);
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
  background-color: #ff8c00;
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
