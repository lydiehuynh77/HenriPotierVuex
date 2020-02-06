<template>
  <div class="products">
    <h1>Bienvenue à la boutique d'Henri Potier</h1>
    <div>
      <form class="search-form" method="post" @submit.prevent="searchBook">
        <input class="input" type="text" placeholder="Recherche" v-model="keyword" />
        <button class="btn btn-search" type="submit">Rechercher</button>
      </form>
    </div>
    <ul class="books-list">
      <li class="book-item" v-for="book in books" :key="book.isbn">
        <div class="col-img">
          <img :src="book.cover" alt />
          <span class="price">{{ book.price }} €</span>
          <button class="btn" @click="addBookToCart(book.isbn)">Ajouter au panier</button>
        </div>
        <div class="info">
          <div class="info-content">
            <h2 class="title">{{ book.title }}</h2>
            <p class="synopsis">{{ book.synopsis[0] }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { store } from "../store";

export default Vue.extend({
  name: "Books",
  data: function() {
    return {
      books: [],
      keyword: ""
    };
  },
  methods: {
    addBookToCart(isbn: string) {
      this.$store.commit("ADD_TO_CART", isbn);
    },
    searchBook() {
      this.$store.dispatch("fetchBooks").then(() => {
        this.books = this.$store.getters.getAllBooks;
        this.books = this.keyword
          ? this.books.filter((item: { title: string }) =>
              item.title.toLowerCase().includes(this.keyword.toLowerCase())
            )
          : this.books;
      });
    }
  },
  created: function() {
    this.$store.dispatch("fetchBooks").then(() => {
      this.books = this.$store.getters.getAllBooks;
    });
  }
});
</script>

<style scoped lang="scss">
@media screen and (min-width: 1024px) {
  .books-list {
    display: flex;
    flex-wrap: wrap;
  }
}
.book-item {
  position: relative;
  text-align: left;
  margin: 30px 15px;
  @media screen and (min-width: 1024px) {
    width: calc(25% - 30px);
    .synopsis {
      display: none;
    }
  }
  &:hover {
    .info {
      background-color: rgba(0, 0, 0, 0.5);
    }
    .synopsis {
      display: block;
    }
  }
}
@media screen and (max-width: 1023px) {
  .info {
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.col-img {
  img {
    width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
  }
}
.price {
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  padding: 10px 20px;
  background-color: rebeccapurple;
  color: #fff;
  font-size: 26px;
  font-weight: bold;
}
.info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 55px;
  padding: 50px 30px 40px;
  text-align: left;
  font-size: 1.4rem;
  color: #fff;
  transition: all 0.5s linear;
}
.info-content {
  max-height: 100%;
  overflow: hidden;
}
.title {
  margin-bottom: 15px;
  text-shadow: 2px 2px 0 #000;
}
.search-form {
  margin-top: 20px;
  margin: 20px 15px 0;
}
.btn-search {
  width: 110px;
}
.input {
  padding: 10px 10px 9px;
  width: 300px;
  max-width: calc(100% - 110px);
}
</style>
