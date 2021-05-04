<template>
  <div id="staff-container">
    <div id="staff-loader" v-bind:id="loaderId">
      <div class="loader" v-bind:class="loaderClass"></div>
    </div>
    <div id="boo">
    </div>
  </div>
</template>

<style>
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
</style>

<script>
export default {
  props: ["loaderId", "loaderClass"]
}
</script>
