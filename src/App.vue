<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Scores</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div id="main-body" class="container">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #bbe1fa;
  background-color: #3282b8;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#main-body {
  background-color: #0f4c75;
  box-shadow: 0 5px 12px rgb(0 0 0 / 30%);
  border-radius: 20px;
}

html {
  background-color: #3282b8;
}
</style>

