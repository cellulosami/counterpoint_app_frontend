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
      <option value="ionian"> Ionian </option>
      <option value="dorian"> Dorian </option>
    </select>
    <div v-for="position in lengthTranslator">
      <select v-model="notesNames[position]">
        <option 
          v-for="option in nameOptions" 
          v-if="!modeCheck(position)"> {{ option }} 
        </option>
        <option 
          v-for="option in nameOptions" 
          v-if="modeCheck(position)"> {{ option == "C4" ? "C♯4": option }} 
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
      notesNames: ["C4", "D4", "E4", "F4", "G4", "F4", "D4", "C4"],
      nameOptions: ["E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"],
      notesTranslator: {
        "E3": -8, 
        "F3": -7, 
        "G3": -5, 
        "A3": -3, 
        "B3": -1, 
        "C4": 0,
        "C♯4": 1,
        "D4": 2, 
        "E4": 4, 
        "F4": 5, 
        "G4": 7, 
        "A4": 9, 
        "B4": 11, 
        "C5": 12, 
        "D5": 14, 
        "E5": 16
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
        notes: this.notes
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
    modeCheck: function (position) {
      if (this.mode == "dorian" && position == this.length - 2) {
        return true;
      }
      return false;
    }
  },
}
</script>