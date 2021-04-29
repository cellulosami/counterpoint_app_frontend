<template>
  <div class="home">
    <div id="main-body">
      <div id="generator-container">
        <h1 id="title">Cantus Firmus Generator</h1>
        <div id="label"></div>
        <h5 id="measures"> Measures:
        <select class="score-select dropdown" v-model="inputLength">
          <option> 8 </option>
          <option> 9 </option>
          <option> 10 </option>
          <option> 11 </option>
          <option> 12 </option>
          <option> 13 </option>
          <option> 14 </option>
          <option> 15 </option>
          <option> 16 </option>
        </select>
        Mode:
        <select class="score-select dropdown" v-model="inputMode">
          <option value="ionian">
            Ionian
          </option>
          <option value="dorian">
            Dorian
          </option>
        </select>
        </h5>
        <button 
          v-on:click="scoresCreate" 
          class="btn" 
          id="generate"
          v-if="currentlyPlaying === false"
        >
          Generate!
        </button>
        <button 
          class="btn" 
          id="generate-inactive"
          v-if="currentlyPlaying === true"
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
          id="play-inactive" 
          v-if="currentlyPlaying === true"
        >
          <img src="../assets/play.png" height="16px">
        </button>
      </div>
      <div id="staff-container">
        <div id="boo">
        </div>
      </div>
      <p> attr: <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></p>
    </div>
  </div>

</template>

<style>
#main-body {
  padding: 32px;
  width: 1080px;
}

#staff-container {
  background-color: hsl(24, 10%, 90%);
  box-shadow: 3px 3px 8px rgb(0 0 0 / 30%);
  border-radius: 5px;
  padding-left: 32px;
  Height: 240px;
  width: 1024px;
}

#generator-container {
  margin-bottom: 2%;
  text-align: left;
}

#length-select {
  background-color: #ffffff;
  box-shadow: 0 3px 8px rgb(0 0 0 / 30%);
  border-radius: 3px;
}

#measures {
  margin-bottom: 20px;
}

#generate {
  background-color: #fc9e4f;
  font-weight: bold;
}

#generate:hover {
  background-color: #ffbb84;
}

#generate-inactive {
  background-color: #d3754687;
  font-weight: bold;
}

#play {
  background-color: #05a95c;
  margin-left: 10px;
}

#play:hover {
  background-color: #06fa88;
}

#play-inactive {
  background-color: #05a95d85;
  margin-left: 10px;
}

#title {
  font-size: 52px;
  font-weight: bold;
}

.btn {
  box-shadow: 0 0px 4px rgb(0 0 0 / 50%);
  transition: 0s;
}

.btn:hover {
  transition: 0.2s ease;
}

.btn:active {
  transform: translateY(2px);
  box-shadow: 0 0px 2px rgb(0 0 0 / 50%);
}
</style>

<script>
import axios from "axios";
import Vex from "vexflow";
const VF = Vex.Flow;

console.log(screen.width);
export default {

  data: function () {
    return {
      currentScore: {},
      currentNote: "",
      inputLength: 8,
      inputMode: "ionian",
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
        length: parseInt(this.inputLength),
        mode: this.inputMode
      }
      axios
        .post("http://localhost:3000/api/scores", params)
        .then(response => {
          this.currentScore = response.data;
          this.drawStave();
        })
    },

    drawStave: function () {
      //setup
      this.context.closeGroup();
      this.context.svg.removeChild(this.group);
      this.group = this.context.openGroup();
      this.noteIndex = 0;

      //draw first bar
      this.addFirstStave();
      
      //draw remaining bars on first line
      while (this.noteIndex < (this.currentScore.notes.length / 2)) {
        this.addAdditionalMeasure();
      }

      //draw first bar on second line
      this.addSecondStave();
      
      //draw all but last bar on second line
      while (this.noteIndex < this.currentScore.notes.length - 1) {
        this.addAdditionalMeasure();
      }

      //draw last bar on second line with double barline
      this.staveCurrentMeasure = new Vex.Flow.Stave(
        this.stavePreviousMeasure.width + this.stavePreviousMeasure.x,
        this.measureOffset,
        110
      );
      this.staveCurrentMeasure.setEndBarType(Vex.Flow.Barline.type.END);
      this.draw();
    },

    addFirstStave: function () {
      this.staveCurrentMeasure = new VF.Stave(0, 0, 150);
      this.staveCurrentMeasure.addClef("treble").addTimeSignature("4/4");
      this.draw();
      this.measureOffset = 0;
      this.noteIndex++;
    },

    addAdditionalMeasure: function () {
      this.staveCurrentMeasure = new Vex.Flow.Stave(
        this.stavePreviousMeasure.width + this.stavePreviousMeasure.x,
        this.measureOffset,
        110
      );
      this.draw();
      this.noteIndex++;
    },

    addSecondStave: function () {
      this.staveCurrentMeasure = new VF.Stave(0, 100, 120);
      this.staveCurrentMeasure.addClef("treble");
      this.draw();

      this.measureOffset = 100
      this.noteIndex++;
    },

    draw: function () {
      this.staveCurrentMeasure.setContext(this.context).draw();
      if (this.currentScore.notes[this.noteIndex].includes("#")) {
        this.notesCurrentMeasure = [
          new VF.StaveNote({ keys: [this.currentScore.notes[this.noteIndex]], duration: "w" }).addAccidental(0, new VF.Accidental("#")),
        ];   
      } else {
        this.notesCurrentMeasure = [
          new VF.StaveNote({ keys: [this.currentScore.notes[this.noteIndex]], duration: "w" })
        ];
      }
      VF.Formatter.FormatAndDraw(this.context, this.staveCurrentMeasure, this.notesCurrentMeasure);
      this.stavePreviousMeasure = this.staveCurrentMeasure;
    },

    playback: function () {
      if (this.currentScore.notes) {
        this.currentlyPlaying = true; //turns off play button
      }
      switch (this.currentScore.notes[this.currentScore.notes.length - 2]) {
        case "c#/4":
          this.currentScore.notes[this.currentScore.notes.length - 2] = "cSharp/4"
      }
      this.currentNote = 0
      this.playNote();
      this.playScore();
    },

    playNote: function () {
      console.log(this.currentScore.notes[this.currentNote]);
      var audio = new Audio(require(`../assets/short_notes/${this.currentScore.notes[this.currentNote]}.mp3`))
      audio.play();
      this.currentNote++;
    },

    playScore: function () {
      this.sleep(900).then(() => {
        this.playNote();
        if (this.currentNote < (this.currentScore.notes.length)) {
          this.playScore();
        } else {
          this.sleep(900).then(() => {
            this.currentlyPlaying = false; //turns play button back on
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
