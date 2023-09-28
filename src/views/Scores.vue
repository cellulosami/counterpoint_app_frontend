<template>
  <div class="home">
    <div id="main-body">
      <div id="generator-container">
        <h1 id="title">Cantus Firmus Generator</h1>
        <br />
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
            C Ionian
          </option>
          <option value="dorian">
            D Dorian
          </option>
          <option value="aeolian">
            A Aeolian
          </option>
        </select>
        </h5>
        <button 
          v-on:click="scoresCreate()" 
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
          <img src="../assets/play.png" height="20px">
        </button>
        <button 
          class="btn" 
          id="play-inactive" 
          v-if="currentlyPlaying === true"
        >
          <img src="../assets/play.png" height="16px">
        </button>
      </div>
      <StaffContainer 
        v-bind:loaderId="loaderId"
        v-bind:loaderClass="loaderClass"
      />
      <p > <br /> <div id="attr">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div></p>
    </div>
  </div>

</template>

<style>
#main-body {
  padding-top: 24px;
  padding-right: 48px;
  padding-left: 48px;
  padding-bottom: 2px;
  margin: auto;
  margin-top: 48px;
  min-width: 1120px;
  /* background-color: #AFD2E9; */
  border-radius: 15px;
  width: 1120px;
}

#generator-container {
  margin-bottom: 20px;
  margin-left: 4%;
  text-align: left;
}

#length-select {
  background-color: #ffffff;
  box-shadow: 0 3px 8px rgb(0 0 0 / 30%);
  border-radius: 3px;
}

#measures {
  margin-bottom: 28px;
  font-size: 28px;
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
  background-color: #06d071;
}

#play-inactive {
  background-color: #05a95d85;
  margin-left: 10px;
}

#title {
  font-size: 72px;
  font-weight: bold;
}

.btn {
  box-shadow: 0 0px 4px rgb(0 0 0 / 50%);
  transition: 0s;
  font-size: 20px;
}

.btn:hover {
  transition: 0.3s ease;
}

.btn:active {
  transform: translateY(2px);
  box-shadow: 0 0px 2px rgb(0 0 0 / 50%);
}

#attr {
  text-align: right;
}
</style>

<script>
import axios from "axios";
import Vex from "vexflow";
const VF = Vex.Flow;
import StaffContainer from "@/components/StaffContainer.vue";

function preloadAudio(notes, length, currentNote) {
  let audios = []
  notes.forEach((note) => {
    let audio = new Audio(require(`../assets/short_notes/${note}.mp3`))
    audios.push(audio)
  })

  playback(notes, length, currentNote, audios);
}

function playback(notes, length, currentNote, audios) {
  let audio = audios[currentNote]
  currentNote++

  audio.play();
  audio.addEventListener('ended', function() {
    if (currentNote < length)
    playback(notes, length, currentNote, audios);
  })
}

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
      loaderId: "staff-inactive",
      loaderClass: "inactive",
    }
  },
  mounted: function () {
    this.div = document.getElementById("boo");
    this.renderer = new VF.Renderer(this.div, VF.Renderer.Backends.SVG);
    this.renderer.resize(921, 232);
    this.context = this.renderer.getContext();
    this.group = this.context.openGroup();
  },
  components: {
    StaffContainer,
  },
  methods: {
    scoresCreate: function () {
      let params = {
        length: parseInt(this.inputLength),
        mode: this.inputMode
      }
      this.loaderId = "staff-loading";
      this.loaderClass = "active";
      this.sleep(300).then(() => {
        axios
        .post("/api/scores", params)
        .then(response => {
          this.currentScore = response.data;
          this.drawStave();
          this.sleep(600).then(() => {
            this.loaderId = "staff-inactive";
            this.loaderClass = "inactive";
          })
        })
        .catch(error => {
          this.sleep(600).then(() => {
            this.loaderId = "staff-inactive";
            this.loaderClass = "inactive";
          })
        })
      });
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
      this.staveCurrentMeasure = new VF.Stave(0, 100, 130);
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
      let length = this.currentScore.notes.length

      if (this.currentScore.notes) {
        this.currentlyPlaying = true; //turns off play button
      }
      switch (this.currentScore.notes[length - 2]) {
        case "c#/4":
          this.currentScore.notes[length - 2] = "cSharp/4";
          break;
        case "g#/4":
          this.currentScore.notes[length - 2] = "gSharp/4";
      }
      switch (this.currentScore.notes[length - 3]) {
        case "f#/4":
          this.currentScore.notes[length - 3] = "fSharp/4";
      }
      this.currentNote = 0
      preloadAudio(this.currentScore.notes, length, this.currentNote);

      this.sleep(1050 * length).then(() => {
        this.currentlyPlaying = false; //turns play button back on
      });
    },

    sleep: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  }
}
</script>
