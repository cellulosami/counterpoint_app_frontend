<template>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/evaluator">Evaluator</router-link> |
    </div>
    <div id="app">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Noto-sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #bbe1fa;
  background-color: #3282b8;
}

html {
  background-color: #3282b8;
}
</style>

