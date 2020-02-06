<template>
  <div class="cart">
    <h1>Shopping cart</h1>
    <Cart />
  </div>
</template>

<script>
// @ is an alias to /src
import Cart from "@/components/Cart.vue";

export default {
  name: "cart",
  components: {
    Cart
  }
};
</script>
