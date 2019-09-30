<template>
  <div id="app">
    <router-view class="main" />
  </div>
</template>

<style lang="scss">
html, body {
  margin: 0;
}

#app {
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  .main {
    width: 100vw;
    flex: 1;
  }
}
</style>
