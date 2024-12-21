<template>
  <Banner />
  <div class="main-container">
    <h1>Monte o seu Pedido</h1>
    <OrderForm />
  </div>
</template>

<script>
// @ is an alias to /src
import Banner from "../components/Banner.vue";
import OrderForm from "../components/OrdersForm.vue";

export default {
  name: 'HomeView',
  components: {
    Banner,
    OrderForm
  }
}
</script>
