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
        <button 
          v-on:click="scoresCreate" 
          class="btn" 
          id="generate"
        >
          Generate!
        </button>
        <button 
          v-on:click="playback" 
          class="btn" id="play" 
          v-if="currentlyPlaying === false"
        >
          <img src="../assets/play.png" height="16px">
        </button>
        <button 
          class="btn" 
          id="playing" 
          v-if="currentlyPlaying === true"
        >
          <img src="../assets/play.png" height="16px">
        </button>
      </div>
      <div id="staff-container">
        <div id="boo">
        </div>
      </div>
    </div>
    <p> attr: <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></p>
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
  Height: 240px;
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
  background-color: #d37546;
  font-weight: bold;
  transition: ease 0.2s;
}

#generate:hover {
  background-color: #ffa97e;
}

#measures {
  margin-bottom: 20px;
}

#play {
  background-color: #05a95c;
  margin-left: 10px;
}

#play:hover {
  background-color: #06fa88;
}

#playing {
  background-color: #05a95d85;
  margin-left: 10px;
}
</style>

<script>
import axios from "axios";
import Vex from "vexflow";
const VF = Vex.Flow;

export default {

  data: function () {
    return {
      message: "Scores",
      currentScore: {},
      currentNote: "",
      inputLength: 8,
      div: "",
      renderer: "",
      context: "",
      staveCurrentMeasure: "",
      notesCurrentMeasure: "",
      stavePreviousMeasure: "",
      noteIndex: 1,
      measureOffset: 0,
      group: "",
      currentlyPlaying: false,
    }
  },
  mounted: function () {
    this.div = document.getElementById("boo");
    this.renderer = new VF.Renderer(this.div, VF.Renderer.Backends.SVG);
    this.renderer.resize(1000, 400);
    this.context = this.renderer.getContext();
    this.group = this.context.openGroup();
  },

  methods: {
    scoresCreate: function () {
      let params = {
        length: parseInt(this.inputLength)
      }
      axios
        .post("http://localhost:3000/api/scores", params)
        .then(response => {
          this.currentScore = response.data;
          this.drawStave();
        })
    },

    drawStave: function () {
      this.context.closeGroup();
      this.context.svg.removeChild(this.group);
      this.group = this.context.openGroup();
      this.noteIndex = 0
      this.addFirstStave();
      this.noteIndex++;

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
      this.staveCurrentMeasure = new VF.Stave(0, 0, 150);
      this.staveCurrentMeasure.addClef("treble").addTimeSignature("4/4");
      this.draw();
      this.measureOffset = 0
    },

    addAdditionalMeasure: function () {
      this.staveCurrentMeasure = new Vex.Flow.Stave(
        this.stavePreviousMeasure.width + this.stavePreviousMeasure.x,
        this.measureOffset,
        110
      );
      this.draw();
    },

    addSecondStave: function () {
      this.staveCurrentMeasure = new VF.Stave(0, 100, 120);
      this.staveCurrentMeasure.addClef("treble");
      this.draw();
      this.measureOffset = 100
    },

    draw: function () {
      this.staveCurrentMeasure.setContext(this.context).draw();
      this.notesCurrentMeasure = [
        new VF.StaveNote({ keys: [this.currentScore.notes[this.noteIndex]], duration: "w" }),
      ];
      VF.Formatter.FormatAndDraw(this.context, this.staveCurrentMeasure, this.notesCurrentMeasure);
      this.stavePreviousMeasure = this.staveCurrentMeasure;
    },

    playback: function () {
      this.currentlyPlaying = true;
      this.currentNote = 0
      this.playNote();
      this.currentNote++;
      this.playScore();
    },

    playNote: function () {
      var audio = new Audio(require(`../assets/short_notes/${this.currentScore.notes[this.currentNote]}.mp3`))
      audio.play();
    },

    playScore: function () {
      this.sleep(900).then(() => {
        this.playNote();
        this.currentNote++;
        if (this.currentNote < (this.currentScore.notes.length)) {
          this.playScore();
        } else {
          this.sleep(900).then(() => {
            this.currentlyPlaying = false;
          })
        }
      });
    },

    sleep: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
}
</script>
