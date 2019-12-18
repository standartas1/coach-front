<template>
  <div class="user">
    <Header :role="role"></Header>
    <div class="user__coaches">
      <h2 class="user__heading">Coaches</h2>
      <Coaches :role="role"></Coaches>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Coaches from "./../partials/Coaches";
import Footer from "./../partials/Footer";
import Header from "./../partials/Header";
export default {
  components: {
    Coaches: Coaches,
    Footer: Footer,
    Header: Header
  },
  data() {
    return {
      role: "User"
    };
  }
};
</script>

<style lang="scss">
.user {
  &__coaches {
    background: $color-moon;
    padding: 115px 50px 35px;
  }
  &__heading {
    color: $color-storm;
    font-family: $Roboto;
    font-weight: 400;
    font-size: 30px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
}
</style>