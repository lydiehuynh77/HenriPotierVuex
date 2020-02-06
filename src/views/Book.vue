<template>
  <div class="book">
    <Book />
  </div>
</template>

<script>
// @ is an alias to /src
import Book from "@/components/Book.vue";

export default {
  name: "book",
  components: {
    Book
  }
};
</script>
