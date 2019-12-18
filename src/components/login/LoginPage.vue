<template>
  <div class="login">
    <Header :role="role"></Header>
    <div class="login__content">
      <form class="login__form form-group" @submit.prevent="handleSubmit">
        <h2 class="login__heading">Login</h2>
        <div>
          <label class="form-group__label" for="email">Email</label>
          <input
            class="form-group__input form-control"
            type="text"
            v-model="email"
            name="email"
            :class="{ 'is-invalid': submitted && !email }"
          />
          <small class="form-group__error form-text" v-show="submitted && !email">Email is required</small>
        </div>
        <div>
          <label class="form-group__label" for="password">Password</label>
          <input
            class="form-group__input form-control"
            type="password"
            v-model="password"
            name="password"
            :class="{ 'is-invalid': submitted && !password }"
          />
          <small
            class="form-group__error form-text"
            v-show="submitted && !password"
          >Password is required</small>
        </div>
        <div class="form-group__buttons">
          <button class="form-group__button btn" :disabled="status.loggingIn">Login</button>
          <router-link class="form-group__button btn" to="/register">Register</router-link>
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
      email: "",
      password: "",
      submitted: false,
      role: "Guest"
    };
  },
  components: {
    Footer: Footer,
    Header: Header
  },
  computed: {
    ...mapState("account", ["status", "user"])
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit(e) {
      this.submitted = true;
      const { email, password } = this;
      if (email && password) {
        this.login({ email, password });
      }
    }
  }
};
</script>

<style lang="scss">
.login {
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