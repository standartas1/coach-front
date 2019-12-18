<template>
  <div class="register">
    <Header :role="role"></Header>
    <div class="register__content">
      <form class="register__form form-group" @submit.prevent="handleSubmit">
        <h2 class="register__heading">Register</h2>
        <div>
          <label class="form-group__label" for="name">Name</label>
          <input
            class="form-group__input form-control"
            type="text"
            v-model="user.name"
            name="name"
            :class="{ 'is-invalid': submitted && !user.name }"
          />
          <small
            class="form-group__error form-text"
            v-show="submitted && !user.name"
          >Name is required</small>
        </div>
        <div>
          <label class="form-group__label" for="email">Email</label>
          <input
            type="text"
            v-model="user.email"
            name="email"
            class="form-group__input form-control"
            :class="{ 'is-invalid': submitted && !user.email }"
          />
          <small
            class="form-group__error form-text"
            v-show="submitted && !user.email"
          >Email is required</small>
        </div>
        <div>
          <label class="form-group__label" for="password">Password</label>
          <input
            class="form-group__input form-control"
            type="password"
            v-model="user.password"
            name="password"
            :class="{ 'is-invalid': submitted && !user.password }"
          />
          <small
            class="form-group__error form-text"
            v-show="submitted && !user.password"
          >Password is required</small>
        </div>
        <div class="form-group__buttons">
          <button class="form-group__button btn" :disabled="status.registering">Register</button>
          <router-link class="form-group__button btn" to="/login">Cancel</router-link>
        </div>
      </form>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Footer from "./../partials/Footer";
import Header from "./../partials/Header";
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        role: "User"
      },
      submitted: false,
      role: "Guest"
    };
  },
  components: {
    Footer: Footer,
    Header: Header
  },
  computed: {
    ...mapState("account", ["status"])
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit(e) {
      this.submitted = true;
      if (this.user.name && this.user.email && this.user.password) {
        this.register(this.user);
      }
    }
  }
};
</script>

<style lang="scss">
.register {
  height: 100vh;
  &__content {
    background-color: $color-moon;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100% - 60px);
    margin: 0 auto;
    padding-top: 80px;
  }
  &__form {
    background-color: white;
    border-radius: 0;
    box-shadow: 0 2px 8px 3px $color-storm;
    padding: 25px;
  }
  &__heading {
    color: #222c3c;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 30px;
    margin-bottom: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }
}
</style>