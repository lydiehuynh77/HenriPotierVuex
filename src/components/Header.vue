<template>
  <header id="nav">
    <router-link to="/">Accueil</router-link>&nbsp;|
    <router-link to="/cart">
      Panier
      <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
    </router-link>
  </header>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      cartCount: "getCountCartItems"
    })
  }
};
</script>

<style scoped lang="scss">
.badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 22px;
  border: solid 1px #ccc;
  text-align: center;
  border-radius: 50%;
  font-size: 1.4rem;
  color: red;
  position: absolute;
  margin: -10px 0 0 3px;
}
</style>