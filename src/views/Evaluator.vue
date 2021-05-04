<template>
  <div id="eval-main-body">
    <h1 id="eval-title">
      Cantus Firmus Evaluator
    </h1>
    <br />
    <div id="evaluator">
      <div id="option-select-container">
      Measures: 
        <select class="eval-select option-select"
          v-model="length"
          v-on:change="lengthTrim()"
        >
          <option v-bind:value="calculateLengthValue(8)"> 8 </option>
          <option v-bind:value="calculateLengthValue(9)"> 9 </option>
          <option v-bind:value="calculateLengthValue(10)"> 10 </option>
          <option v-bind:value="calculateLengthValue(11)"> 11 </option>
          <option v-bind:value="calculateLengthValue(12)"> 12 </option>
          <option v-bind:value="calculateLengthValue(13)"> 13 </option>
          <option v-bind:value="calculateLengthValue(14)"> 14 </option>
          <option v-bind:value="calculateLengthValue(15)"> 15 </option>
          <option v-bind:value="calculateLengthValue(16)"> 16 </option>
        </select>
        Mode: 
        <select v-model="mode" class="eval-select option-select">
          <option value="ionian"> C Ionian </option>
          <option value="dorian"> D Dorian </option>
          <option value="aeolian"> A Aeolian </option>
        </select>
        <button v-on:click="clear()" class="btn btn-clr">Clear</button>
        <button v-on:click="reset()" class="btn btn-clr reset">Reset</button>
        <button v-on:click="randomize()" class="btn btn-clr reset">Randomize</button>
      </div>
      <br />
      <div id="note-input-container">
        <span v-for="position in length" id="note-select-container">
          <span id="note-number">
            {{ position + 1 }}:
          </span>
          <select v-model="notesNames[position]" class="eval-select note-select">
            <option v-for="option in nameOptions[mode]"> 
              {{ sharpAdder(option, position, mode) }} 
            </option>
          </select> 
        </span>
      </div>
      <div>
        <button v-on:click="createEvaluation()" class="btn btn-eval">
          Evaluate
        </button>
        <button v-on:click="preview()" class="btn btn-eval" id="btn-preview">
          Preview
        </button>
      </div>
    </div>
    <br />
    <div id="results">
      <div id="staff-container">
        <div id="staff-loader" v-bind:id="loaderId">
          <div class="loader" v-bind:class="loaderClass"></div>
        </div>
        <div id="boo">
        </div>
      </div>
      <br />
      <ul>
      <div>
        <li v-for="error in errors" class="error result">{{ error }}</li>
        <li v-for="suggestion in suggestions" class="suggestion result">{{ suggestion }}</li>
      </div>
      </ul>
    </div>
  </div>
</template>

<style>
#eval-main-body {
  padding-top: 72px;
  padding-right: 48px;
  padding-left: 48px;
  margin: auto;
  width: 55%;
  font-size: 28px;
}

#eval-title {
  font-size: 72px;
  font-weight: bold;
}

#evaluator {
  font-size: 28px;
  font-weight: bold;
}

#option-select-container {
  position: relative
}

.option-select {
  margin-right: 1em;
}

.eval-select {
  font-family: Helvetica, sans-serif;
}

#note-input-container {
  position: relative;
  right: 5em;
  margin-top: 1em;
  margin-bottom: 5em;
}

#note-select-container {
  width: 12.5%;
  float: left;
  text-align: right;
  min-width: 140px;
}

#note-number {
  text-align: right;
}

.note-select {
  position: absolute;
  width: 3em;
  margin-right: 2.6em;
  margin-left: 0.4em;
}

.btn-clr {
  font-size: 20px;
  font-weight: bold;
  background-color: hsl(24, 10%, 90%);
  box-shadow: 0px 0px 6px rgb(0 0 0 / 50%);
  margin-left: 1%;
}

.btn-clr:hover {
  background-color: hsl(0, 57%, 97%);
}

.reset {
  background-color: #fc9e4f;
}

.reset:hover {
  background-color: #ffbb84;
}

.btn-clr:active {
  transform: translateY(2px);
  box-shadow: 0px 1px 4px rgb(0 0 0 / 50%);
  transition: 0s;
}

.btn-eval {
  margin-top: 1.7em;
  margin-right: 0.5em;
  font-size: 20px;
  font-weight: bold;
  width: 6em;
  color: white;
  box-shadow: 0px 3px 6px rgb(0 0 0 / 50%);
  background-color: #04914f;
}

.btn-eval:hover {
  background-color: #04a85c;
  color: white;
}

.btn-eval:active {
  transform: translateY(2px);
  box-shadow: 0px 1px 4px rgb(0 0 0 / 50%);
  transition: 0s;
}

#btn-preview {
  background-color: #0f4c75;
}

#btn-preview:hover {
  background-color: #14649a;
}

#staff-container {
  background-color: hsl(24, 10%, 90%);
  box-shadow: 0px 0px 8px rgb(0 0 0 / 30%);
  border-radius: 5px;
  padding-left: 32px;
  height: 232px;
  width: 984px;
  margin: auto;
  color: black;
}

#staff-loading {
  position: absolute;
  transform: translateX(-32px);
  background-color: hsl(24, 10%, 90%);
  border-radius: 5px;
  height: 232px;
  width: 984px;
  margin: auto;
  transition: ease 0.2s;
}

.loader {
  position: absolute;
  margin: 76px 452px;
  border: 2px solid #eff8ff; /* Light grey */
  border-top: 2px solid #0f4c75; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 1.5s linear infinite;
}

.active {
  transition: ease 0.2s;
}

.inactive {
  border: 2px solid #f3f3f300; /* Light grey */
  border-top: 2px solid #3498db00; /* Blue */
  transition: ease 1s;
}

@keyframes spin {
  0% { 
    transform: rotate(0deg); 
  }
  100% { 
    transform: rotate(360deg); 
  }
}

#staff-inactive {
  position: absolute;
  transform: translateX(-32px);
  background-color: hsla(24, 10%, 90%, 0);
  border-radius: 5px;
  height: 232px;
  width: 984px;
  margin: auto;
  transition: ease 1s;
}

#results {
  background-color: white;
  padding: 1em;
  border-radius: 15px;
  box-shadow: 0px 0px 8px rgb(0 0 0 / 30%);
  width: 1048px;
  margin: 0 auto;
  overflow: auto;
  margin-bottom: 4em;
  font-family: Palatino, serif;
  transition: ease 0.2s;
}

.error {
  color: rgb(175, 13, 37);
}

.suggestion {
  color: #fc9e4f;
}
</style>

<script>
import axios from "axios";
import Vex from "vexflow";
const VF = Vex.Flow;

export default {
  data: function () {
    return {
      length: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      mode: "ionian",
      errors: ["No errors."],
      suggestions: ["No suggestions."],
      //notesNames: ["", "", "", "", "", "", "", ""],
      notesNames: ["C4", "D4", "A4", "G4", "A4", "B4", "C5", "G4", "A4", "G4", "F4", "E4", "F4", "C4", "D4", "C4"],
      nameOptions: {
        ionian: ["E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4", "B3", "A3", "G3", "F3", "E3"],
        dorian: ["F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4", "B3", "A3", "G3", "F3"],
        aeolian: ["C6", "B5", "A5", "G5", "F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"],
      },
      notesTranslator: {
        "E3": "e/3", 
        "F3": "f/3", 
        "G3": "g/3", 
        "A3": "a/3", 
        "B3": "b/3", 
        "C4": "c/4",
        "C♯4": "c#/4",
        "D4": "d/4", 
        "E4": "e/4", 
        "F4": "f/4",
        "F♯4": "f#/4",
        "G4": "g/4",
        "G♯4": "g#/4", 
        "A4": "a/4", 
        "B4": "b/4", 
        "C5": "c/5", 
        "D5": "d/5", 
        "E5": "e/5",
        "F5": "f/5",
        "G5": "g/5",
        "A5": "a/5",
        "B5": "b/5",
        "C6": "c/6",
      },
      div: "",
      renderer: "",
      context: "",
      loaderId: "staff-inactive",
      loaderClass: "inactive",
    }
  },
  computed: {
    notes () {
      return this.notesNames.map(note => {
        return this.notesTranslator[note];
      })     
    },
    width () {
      return window.innerWidth;
    }
  },
  mounted: function () {
    this.div = document.getElementById("boo");
    this.renderer = new VF.Renderer(this.div, VF.Renderer.Backends.SVG);
    this.renderer.resize(921, 232);
    this.context = this.renderer.getContext();
    this.group = this.context.openGroup();
  },
  methods: {
    createEvaluation: function () {
      this.loaderId = "staff-loading";
      this.loaderClass = "active";
      this.sleep(300).then(() => {
        this.drawStave();
        let params = {
          notes: this.notes,
          mode: this.mode,
        };
        this.sleep(600).then(() => {
          this.loaderId = "staff-inactive";
          this.loaderClass = "inactive";
        })
        axios
          .post("api/errors", params)
          .then(response => {
            this.errors = response.data.errors;
            this.suggestions = response.data.suggestions;
          })
          .catch(error => {
          });
      })
    },
    clear: function () {
      this.notesNames = []
      let i = 0;
      while (i < this.length.length) {
        this.notesNames.push("");
        i++;
      }
    },
    reset: function () {
      this.length = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      this.notesNames = ["C4", "D4", "A4", "G4", "A4", "B4", "C5", "G4", "A4", "G4", "F4", "E4", "F4", "C4", "D4", "C4"];
    },
    randomize: function () {
      let temp = this.nameOptions;
      let mood = this.mode;
      let result = [];
      this.notesNames.forEach(function (name) {
        result.push(temp[mood][Math.floor(Math.random() * temp[mood].length)]);
      })
      console.log(result);
      console.log(mood);
      console.log(result[result.length - 2]);
      if (mood === "dorian" && result[result.length - 2] === "C4") {
        result[result.length - 2] = "C♯4";
      }
      if (mood === "aeolian" && result[result.length - 3] === "F4") {
        result[result.length - 3] = "F♯4";
      }
      if (mood === "aeolian" && result[result.length - 2] === "G4") {
        result[result.length - 2] = "G♯4";
      }
      this.notesNames = result
    },
    calculateLengthValue: function (number) {
      let i = 0;
      let result = [];
      while (i < number) {
        result.push(i)
        i++;
      }
      return result;
    },
    lengthTrim: function () {
      if (this.notesNames.length > this.length.length) {
        this.notesNames = this.notesNames.slice(0, (this.length.length))
      }
    },
    preview: function () {
      this.loaderId = "staff-loading";
      this.loaderClass = "active";
      this.sleep(300).then(() => {
        this.errors = [],
        this.suggestions = [],
        this.drawStave();
      })
      this.sleep(900).then(() => {
          this.loaderId = "staff-inactive";
          this.loaderClass = "inactive";
        })
    },
    sharpAdder: function(option, position, mode) {    
      let params = [option, position, mode];
      if (mode === "dorian" && position === this.length.length - 2 && option ==="C4") {
        return "C♯4";
      } else if (mode === "aeolian" && position === this.length.length - 3 && option ==="F4") {
        return "F♯4";
      } else if (mode === "aeolian" && position === this.length.length - 2 && option ==="G4") {
        return "G♯4";
      } else {
        return option;
      }
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
      while (this.noteIndex < (this.notes.length / 2)) {
        this.addAdditionalMeasure();
      }

      //draw first bar on second line
      this.addSecondStave();
      
      //draw all but last bar on second line
      while (this.noteIndex < this.notes.length - 1) {
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
      if (this.notes[this.noteIndex].includes("#")) {
        this.notesCurrentMeasure = [
          new VF.StaveNote({ keys: [this.notes[this.noteIndex]], duration: "w" }).addAccidental(0, new VF.Accidental("#")),
        ];   
      } else {
        this.notesCurrentMeasure = [
          new VF.StaveNote({ keys: [this.notes[this.noteIndex]], duration: "w" })
        ];
      }
      VF.Formatter.FormatAndDraw(this.context, this.staveCurrentMeasure, this.notesCurrentMeasure);
      this.stavePreviousMeasure = this.staveCurrentMeasure;
    },
    sleep: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
}
</script>