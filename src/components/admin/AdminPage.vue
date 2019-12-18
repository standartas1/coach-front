<template>
  <div class="admin">
    <Header :role="role"></Header>
    <div id="users" class="admin__users">
      <h2 class="admin__heading">Users</h2>
      <Users></Users>
    </div>
    <div class="admin__coaches">
      <h2 class="admin__heading">Coaches</h2>
      <AddCoachModal :role="role"></AddCoachModal>
      <Coaches :role="role"></Coaches>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import AddCoachModal from "./AddCoachModal";
import Coaches from "./../partials/Coaches";
import Header from "./../partials/Header";
import Users from "./Users";
import Footer from "./../partials/Footer";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    AddCoachModal: AddCoachModal,
    Coaches: Coaches,
    Header: Header,
    Footer: Footer,
    Users: Users
  },
  data() {
    return {
      role: "Administrator"
    };
  }
};
</script>

<style lang="scss">
.admin {
  &__coaches {
    background: $color-moon;
    padding: 35px 50px;
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
  &__users {
    background: $color-nude;
    padding: 115px 50px 35px;
  }
}
</style>