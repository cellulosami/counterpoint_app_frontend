<template>
  <div>
    <div>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand">Why Can't I Firmus?</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active"><router-link class="router-link" to="/">Generator</router-link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link active"><router-link class="router-link" to="/evaluator">Evaluator</router-link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link active"><router-link class="router-link" to="/about">About</router-link></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
  color: #272838;
  /* background-color: #3282b8; */
  background-color: #AFD2E9;
}

.navbar {
  font-family: Noto-sans, sans-serif;
  background-color: #0f4c75;
}

.navbar-brand {
  color: white;
}
.navbar-brand:hover {
  color: white;
}

.router-link {
  color: rgb(187, 187, 187);
  text-decoration: none;
  transition: ease 0.3s;
}

.router-link:hover {
  color: rgb(233, 233, 233);
  transition: ease 0.2s;
}
html {
  /* background-color: #3282b8; */
  background-color: #AFD2E9;
}
</style>

