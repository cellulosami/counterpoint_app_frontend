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
  padding-left: 32px;
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
      div: "",
      renderer: "",
      context: "",
      staveCurrentMeasure: "",
      notesCurrentMeasure: "",
      stavePreviousMeasure: "",
      noteIndex: 1,
      measureOffset: 0,
    }
  },
  mounted: function () {
    this.div = document.getElementById("boo");
    this.renderer = new this.VF.Renderer(this.div, this.VF.Renderer.Backends.SVG);
    this.renderer.resize(1000, 400);
    this.context = this.renderer.getContext();
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
          this.drawStave();
        })
    },

    drawStave: function () {
      this.addFirstStave();

      this.noteIndex = 1
      while (this.noteIndex < (this.currentScore.notes.length / 2)) {
        this.addAdditionalMeasure();
        this.noteIndex++;
      }

      this.addSecondStave();
      this.noteIndex++;

      while (this.noteIndex < this.currentScore.notes.length) {
        this.addAdditionalMeasure();
        this.noteIndex++;
      }
    },

    addFirstStave: function () {
      this.staveCurrentMeasure = new this.VF.Stave(0, 0, 150);
      this.staveCurrentMeasure.addClef("treble").addTimeSignature("4/4");
      this.staveCurrentMeasure.setContext(this.context).draw();
      this.notesCurrentMeasure = [
        new this.VF.StaveNote({ keys: [this.currentScore.notes[0]], duration: "w" }),
      ];
      this.VF.Formatter.FormatAndDraw(this.context, this.staveCurrentMeasure, this.notesCurrentMeasure);
      this.stavePreviousMeasure = this.staveCurrentMeasure
      this.measureOffset = 0
    },

    addAdditionalMeasure: function () {
      this.staveCurrentMeasure = new Vex.Flow.Stave(
        this.stavePreviousMeasure.width + this.stavePreviousMeasure.x,
        this.measureOffset,
        110
      );
      this.staveCurrentMeasure.setContext(this.context).draw();
      this.notesCurrentMeasure = [
        new this.VF.StaveNote({ keys: [this.currentScore.notes[this.noteIndex]], duration: "w" }),
      ];
      Vex.Flow.Formatter.FormatAndDraw(this.context, this.staveCurrentMeasure, this.notesCurrentMeasure);
      this.stavePreviousMeasure = this.staveCurrentMeasure
    },

    addSecondStave: function () {
      this.staveCurrentMeasure = new this.VF.Stave(0, 100, 120);
      this.staveCurrentMeasure.addClef("treble");
      this.staveCurrentMeasure.setContext(this.context).draw();
      this.notesCurrentMeasure = [
        new this.VF.StaveNote({ keys: [this.currentScore.notes[this.noteIndex]], duration: "w" }),
      ];
      this.VF.Formatter.FormatAndDraw(this.context, this.staveCurrentMeasure, this.notesCurrentMeasure);
      this.stavePreviousMeasure = this.staveCurrentMeasure
      this.measureOffset = 100
    }
  }
}
</script>
