<template>
  <div>
    <h1>
      Evaluator
      {{ notes }}
    </h1>
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
      notes: [0, 2, 4, 5, 7, 5, 2, 0]
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
        })
        .catch(error => {
          console.log("aww");
        });
    },
  },
}
</script>