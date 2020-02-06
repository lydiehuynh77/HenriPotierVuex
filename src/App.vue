<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
html {
  font-size: 62.5%; //10px
}
body {
  font-size: 1.6rem;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1280px;
  margin: 0 auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul,
li {
  list-style: none;
}
.btn {
  background: rebeccapurple;
  color: #fff;
  border: 0;
  padding: 10px;
  font-size: 1.6rem;
  cursor: pointer;

  &:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
}

.books-list .btn {
  width: 100%;
}
</style>
