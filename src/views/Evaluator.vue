<template>
  <div>
    <h1>
      Evaluator
      {{ length }}
    </h1>
    <select class="score-select dropdown" 
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
    <select v-model="mode">
      <option value="ionian"> C Ionian </option>
      <option value="dorian"> D Dorian </option>
    </select>
    <button v-on:click="reset">Clear</button>
    <div>
      <span v-for="position in length">
        {{ position + 1 }}:<select v-model="notesNames[position]">
          <!-- <option v-for="option in nameOptions[mode]">
            {{ option }}
          </option> -->
          <option 
            v-for="option in nameOptions[mode]" 
            v-if="!penultModeCheck(position)"> {{ option }} 
          </option>
          <option 
            v-for="option in nameOptions[mode]" 
            v-if="penultModeCheck(position)"> {{ option == "C4" ? "C♯4": option }} 
          </option>
      </select> </span>
    </div>
    <div>
      <h3> {{ notesNames }} </h3>
      <h3> {{ notes }} </h3>
    </div>
    <button v-on:click="createEvaluation">
      Evaluate
    </button>
    <h3><ul>
      <li v-for="error in errors" class="eval-error">
        {{ error }}
      </li>
      <li v-for="suggestion in suggestions" class="eval-suggestion">
        {{ suggestion }}
      </li>
    </ul></h3>
  </div>
</template>

<style>
.eval-error {
  color: red;
}

.eval-suggestion {
  color: yellow;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      length: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      mode: "ionian",
      errors: [],
      suggestions: [],
      //notesNames: ["", "", "", "", "", "", "", ""],
      notesNames: ["C4", "D4", "A4", "G4", "A4", "B4", "C5", "G4", "A4", "G4", "F4", "E4", "F4", "C4", "D4", "C4"],
      nameOptions: {
        ionian: ["E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4", "B3", "A3", "G3", "F3", "E3"],
        dorian: ["F5", "E5", "D5", "C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4", "B3", "A3", "G3", "F3"],
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
        "G4": "g/4", 
        "A4": "a/4", 
        "B4": "b/4", 
        "C5": "c/5", 
        "D5": "d/5", 
        "E5": "e/5",      
      },
    }
  },
  computed: {
    notes () {
      return this.notesNames.map(note => {
        return this.notesTranslator[note];
      })     
    }
  },
  methods: {
    createEvaluation: function () {
      console.log("Evaluating...");
      let params = {
        notes: this.notes,
        mode: this.mode,
      };

      axios
        .post("api/errors", params)
        .then(response => {
          console.log(response.data);
          this.errors = response.data.errors;
          this.suggestions = response.data.suggestions;
        })
        .catch(error => {
          console.log("aww");
        });
    },
    penultModeCheck: function (position) {
      if (this.mode == "dorian" && position == this.length[this.length.length - 2]) {
        return true;
      }
      return false;
    },
    // antepenultModeCheck: function (position) {
    //   if (this.mode == "aeolian" && position == this.length[this.length.length - 3]) {
    //     return true;
    //   }
    //   return false;
    // },
    reset: function () {
      this.notesNames = ["", "", "", "", "", "", "", ""]
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
      console.log("trim");
      if (this.notesNames.length > this.length.length) {
        this.notesNames = this.notesNames.slice(0, (this.length.length))
      }
    }
  },
}
</script>