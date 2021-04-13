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
        <div id="boo">
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#main-body {
  padding: 32px;
  margin: 2%;
  width: 1080px;
  background-color: #0f4c75;
  box-shadow: 0 5px 12px rgb(0 0 0 / 30%);
  border-radius: 20px;
}

#staff-container {
  color: black;
  background-color: hsl(24, 10%, 90%);
  border-radius: 5px;
  padding: 32px;
  Height: 216px;
  width: 1024px;
}

#generator-container {
  margin-bottom: 2%;
  text-align: center;
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
import Vex from "vexflow";

export default {

  data: function () {
    return {
      message: "Scores",
      currentScore: {},
      inputLength: 8,
      VF: Vex.Flow,
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

          var VF = this.VF
          var div = document.getElementById("boo")
          var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
          renderer.resize(400, 400);
          var context = renderer.getContext();

          var staveMeasure1 = new VF.Stave(0, 0, 160);
          staveMeasure1.addClef("treble").addTimeSignature("4/4");
          staveMeasure1.setContext(context).draw();

          var notesMeasure1 = [
            new VF.StaveNote({ keys: ["c/4"], duration: "w" }),
          ];

          var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
          voice.addTickables(notesMeasure1);

          var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 100);

          //voice.draw(context, stave);
          VF.Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

          var staveMeasure2 = new Vex.Flow.Stave(
            staveMeasure1.width + staveMeasure1.x,
            0,
            120
          );
          staveMeasure2.setContext(context).draw();

          var notesMeasure2 = [
            new VF.StaveNote({ keys: ["d/4"], duration: "w" }),
          ];

           Vex.Flow.Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);
        })
    },
  }
}
</script>
