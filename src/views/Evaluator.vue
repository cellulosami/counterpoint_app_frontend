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
    </div>
    <button v-on:click="createEvaluation">
      Evaluate
    </button>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data: function () {
    return {
      notes: [0, 2, 4, 5, 7, 5, 12, 0],
      length: 8, 
    }
  },
  computed: {
    lengthTranslator () {
      let array = [];
      let i = 0;
      while (i < this.length) {
        array.push(0)
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
        })
        .catch(error => {
          console.log("aww");
        });
    },
  },
}
</script>