import Vue from "vue";
import Vuex from "vuex";
import { Book, CartItem, CommercialOffer } from "./Types";
Vue.use(Vuex);

const booksDefaut: Book[] = [];
const cartDefault: CartItem[] = [];
const commercialOffersDefault: CommercialOffer[] = [];
export const store = new Vuex.Store({
  state: {
    books: booksDefaut,
    cart: cartDefault,
    total: 0,
    cartItemCount: 0,
    cartTotal: 0,
    offers: commercialOffersDefault,
    reduction: 0
  },
  getters: {
    getAllBooks(state) {
      return state.books;
    },
    getCartItems(state) {
      return state.cart;
    },
    getReduction(state) {
      return state.reduction;
    },
    getTotal(state) {
      return state.total;
    },
    getCartTotal(state) {
      return state.cartTotal;
    },
    getCountCartItems(state) {
      return state.cartItemCount;
    }
  },
  mutations: {
    FETCH_BOOKS(state, books) {
      state.books = books;
    },
    async GET_CART_TOTAL(state, fetchOffers) {
      if (fetchOffers) {
        const isbnList = state.cart.map((item: { isbn: string }) => item.isbn);
        const apiURL = "https://henri-potier-proxy.herokuapp.com";
        const route = `/books/${isbnList.join(",")}/commercialOffers`;
        const response = await fetch(apiURL + route);
        const offers = await response.json();
        state.offers = offers.offers;
      }

      const calculateReductionForOffer = (offer: CommercialOffer) => {
        switch (offer.type) {
          case "percentage": {
            return state.total * (offer.value / 100);
          }
          case "minus": {
            return offer.value;
          }
          case "slice": {
            const nbSlice = Math.floor(state.total / offer.sliceValue);
            return nbSlice * offer.value;
          }
        }
      };

      const calculateBestReduction = (offers: CommercialOffer[]) => {
        return offers
          .map(offer => ({ offer, amount: calculateReductionForOffer(offer) }))
          .sort((a, b) => (a.amount < b.amount ? 1 : -1))[0];
      };

      state.total = state.cart.reduce(
        (value, item) => value + item.quantity * item.price,
        0
      );
      const bestOffer = calculateBestReduction(state.offers);
      state.reduction = bestOffer.amount;
      state.cartTotal = state.total - state.reduction;
    },
    ADD_TO_CART(state, isbn) {
      const book = state.books.find(item => {
        return item.isbn === isbn;
      });
      if (book) {
        const bookInCart = state.cart.find(
          cartItem => cartItem.isbn === book.isbn
        );
        if (bookInCart) {
          bookInCart.quantity++;
        } else {
          const product: CartItem = {
            isbn: book.isbn,
            title: book.title,
            price: book.price,
            quantity: 1
          };
          state.cart.push(product);
        }
        state.cartItemCount = state.cart.reduce(
          (value, item) => value + item.quantity,
          0
        );
      }
    },
    DELETE_CART_ITEM(state, isbn) {
      const bookInCart = state.cart.find(cartItem => cartItem.isbn === isbn);
      if (bookInCart) {
        state.cart.splice(state.cart.indexOf(bookInCart), 1);
        state.cartItemCount = state.cart.reduce(
          (value, item) => value + item.quantity,
          0
        );
      }
    },
    CHANGE_ITEM_QUANTITY(state, book) {
      const bookInCart = state.cart.find(
        (cartItem: { isbn: string }) => cartItem.isbn === book.isbn
      );
      if (bookInCart) {
        state.cartItemCount = state.cart.reduce(
          (value, item) => value + item.quantity,
          0
        );
      }
    }
  },
  actions: {
    async fetchBooks({ commit }) {
      const apiURL = "https://henri-potier-proxy.herokuapp.com";
      const route = "/books";

      const response = await fetch(apiURL + route);
      const data = await response.json();
      commit("FETCH_BOOKS", data);
    }
  }
});

export default store;
