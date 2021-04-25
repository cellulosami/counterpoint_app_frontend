<template>
  <h1>
    Evaluator
    {{ notes }}
  </h1>
</template>


<script>
import axios from "axios";

export default {
  data: function () {
    return {
      notes: [0, 2, 4, 5, 7, 5, 2, 0]
    }
  }
}
</script>