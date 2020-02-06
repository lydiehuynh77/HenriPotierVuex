<template>
  <div class="cart">
    <p class="cart-empty" v-if="cartItems.length === 0">Votre panier est vide !</p>
    <table v-if="cartItems.length > 0" class="cart-table">
      <thead>
        <tr>
          <th class="col-title" scope="col">Titre</th>
          <th scope="col">Quantité</th>
          <th scope="col">Prix unitaire</th>
          <th scope="col">Prix total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="cart-item" v-for="item in cartItems" :key="item.isbn">
          <td class="col-title">{{ item.title }}</td>
          <td class="col-quantity">
            <button class="btn" :disabled="item.quantity < 2" @click="changeQuantity(item, -1)">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button class="btn" @click="changeQuantity(item, 1)">+</button>
          </td>
          <td>{{ item.price }} €</td>
          <td class="col-price">{{ item.quantity * item.price }} €</td>
          <td>
            <button class="btn btn-delete" @click="deleteItemFromCart(item.isbn)">X</button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th></th>
          <th></th>
          <th>Sous-total</th>
          <td class="col-price">{{ total.toFixed(2) }} €</td>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>Réduction</th>
          <td class="col-price reduction">-{{ reduction.toFixed(2) }} €</td>
          <th></th>
        </tr>
        <tr>
          <th></th>
          <th></th>
          <th>Total</th>
          <td class="col-price">{{ cartTotal.toFixed(2) }} €</td>
          <th></th>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { store } from "../store";
import { CartItem, Book } from "../store/Types";

export default Vue.extend({
  name: "Cart",
  created: function() {
    this.cartItems = this.$store.getters.getCartItems;
    this.$store.commit("GET_CART_TOTAL", true);
  },
  methods: {
    deleteItemFromCart(isbn: string) {
      this.$store.commit("DELETE_CART_ITEM", isbn);
      this.$store.commit("GET_CART_TOTAL", true);
    },
    changeQuantity(book: CartItem, number: number) {
      book.quantity += number;
      this.$store.commit("CHANGE_ITEM_QUANTITY", book);
      this.$store.commit("GET_CART_TOTAL", false);
    }
  },
  computed: {
    ...mapGetters({
      cartItems: "getCartItems",
      reduction: "getReduction",
      total: "getTotal",
      cartTotal: "getCartTotal"
    }),
    cartItems: {
      get: function() {
        return this.$store.state.cart;
      },
      set: function(newValue: CartItem[]) {
        this.$store.state.cart = newValue;
      }
    }
  }
});
</script>

<style scoped lang="scss">
.cart-empty {
  margin-top: 30px;
}
.cart-table {
  margin: 30px auto;
  border-collapse: collapse;
  thead th {
    background-color: #f2f2f3;
    border: solid 1px #ccc;
  }
  th {
    padding: 10px 20px;
  }
  td {
    padding: 10px 20px;
    border: solid 1px #ccc;
  }
  .quantity {
    margin: 0 15px;
  }
  @media screen and (max-width: 1023px) {
    font-size: 1.2rem;
    td,
    th,
    .btn {
      padding: 5px;
    }
    .col-quantity {
      white-space: nowrap;
    }
    .quantity {
      margin: 0 5px;
    }
    .btn-delete {
      font-size: 1.2rem;
    }
  }
  .col-title {
    text-align: left;
  }
  .col-price {
    text-align: right;
    font-weight: bold;
  }
  .reduction {
    color: red;
  }
}
</style>
