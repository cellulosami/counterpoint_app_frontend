<template>
  <div>
    <h1>
      Evaluator
      {{ lengthTranslator }}
    </h1>
    <select class="score-select dropdown" v-model="length">
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
    <div>
      <input v-for="note in lengthTranslator" v-model="notes[note]" />
    </div>
    <div>
      <h3>
        {{ notes }}
      </h3>
    </div>
    <button v-on:click="notesToInt(createEvaluation)">
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
      notes: [0, 2, 4, 5, 7, 5, 2, 0],
      length: 8,
      errors: [],
      suggestions: [],
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
    notesToInt: function (callback) {
      console.log(this.notes);
      this.notes = this.notes.map(note => {
        return parseInt(note);
      });
      console.log(this.notes);
      callback();
    },
  },
}
</script>