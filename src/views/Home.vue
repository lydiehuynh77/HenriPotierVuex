<template>
  <div class="home">
    <Books />
  </div>
</template>

<script>
// @ is an alias to /src
import Books from "@/components/Books.vue";
import { mapGetters } from "vuex";
import store from "../store";

export default {
  name: "home",
  components: {
    Books
  }
};
</script>
