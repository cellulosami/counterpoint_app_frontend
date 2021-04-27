<template>
  <div>
    <h1>
      Evaluator
      {{ lengthTranslator }}
    </h1>
    <select class="score-select dropdown" v-model="length">
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
    <select v-model="mode">
      <option value="ionian"> C Ionian </option>
      <option value="dorian"> D Dorian </option>
    </select>
    <button v-on:click="reset">Clear</button>
    <div v-for="position in lengthTranslator">
      <select v-model="notesNames[position]">
        <option 
          v-for="option in nameOptions[mode]" 
          v-if="!penultModeCheck(position) && !antepenultModeCheck(position)"> {{ option }} 
        </option>
        <option 
          v-for="option in nameOptions[mode]" 
          v-if="penultModeCheck(position)"> {{ option == "C4" ? "C♯4": option }} 
        </option>
      </select>
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
      length: 8,
      mode: "ionian",
      errors: [],
      suggestions: [],
      //notesNames: ["", "", "", "", "", "", "", ""],
      notesNames: ["C4", "E4", "F4", "G4", "F4", "E4", "D4", "C4"],
      nameOptions: {
        ionian: ["E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
        dorian: ["F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5"],
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
    lengthTranslator () {
      let array = [];
      let i = 0;
      while (i < this.length) {
        array.push(i)
        i++;
      }
      return array;
    },
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
      if (this.mode == "dorian" && position == this.length - 2) {
        return true;
      }
      return false;
    },
    antepenultModeCheck: function (position) {
      if (this.mode == "aeolian" && position == this.length - 3) {
        return true;
      }
      return false;
    },
    reset: function () {
      this.notesNames = ["", "", "", "", "", "", "", ""]
    }
  },
}
</script>