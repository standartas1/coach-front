<template>
  <div>
    <nav class="navbar" v-if="this.role === 'Guest'">
      <div :class="{ 'is-active': isActive }" class="navbar__links-group">
        <router-link
          v-for="route in guestRoutes"
          :key="route.title"
          class="navbar__link"
          :to="route.to"
        >
          {{
          route.title
          }}
        </router-link>
      </div>
      <i
        :class="{ 'fa-times': isActive, 'fa-bars': !isActive }"
        @click="isActive = !isActive"
        class="navbar__hamburger fas fa-2x"
      ></i>
    </nav>
    <nav class="navbar" v-if="this.role === 'User'">
      <div :class="{ 'is-active': isActive }" class="navbar__links-group">
        <router-link
          v-for="route in userRoutes"
          :key="route.title"
          class="navbar__link"
          :to="route.to"
        >{{ route.title }}</router-link>
      </div>
      <i
        :class="{ 'fa-times': isActive, 'fa-bars': !isActive }"
        @click="isActive = !isActive"
        class="navbar__hamburger fas fa-2x"
      ></i>
    </nav>
    <nav class="navbar" v-if="this.role === 'Administrator'">
      <div :class="{ 'is-active': isActive }" class="navbar__links-group">
        <router-link
          v-for="route in adminRoutes"
          :key="route.title"
          class="navbar__link"
          :to="route.to"
        >{{ route.title }}</router-link>
      </div>
      <i
        :class="{ 'fa-times': isActive, 'fa-bars': !isActive }"
        @click="isActive = !isActive"
        class="navbar__hamburger fas fa-2x"
      ></i>
    </nav>
    <!-- <Profile v-if="this.user" @clicked="onModalClick" :isOpen="isOpen" :user="user"></Profile> -->
  </div>
</template>

<script>
// import Profile from './../user/Profile';
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "Navbar",
  // components: {
  //   Profile: Profile
  // },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
  data() {
    return {
      guestRoutes: [
        { title: "Login", to: "/login" },
        { title: "Register", to: "/register" }
      ],
      userRoutes: [{ title: "Logout", to: "/login" }],
      adminRoutes: [{ title: "Logout", to: "/login" }],
      isActive: false,
      isOpen: false
    };
  },
  methods: {
    onModalClick(value) {
      this.isOpen = value;
    }
  },
  props: ["role"]
};
</script>

<style lang="scss">
.navbar {
  display: flex;
  flex-direction: row;
  padding: 0;
  &__hamburger {
    color: white;
    &:focus,
    &:hover {
      cursor: pointer;
      color: darken($color-nude, 15%);
    }
    @media all and (min-width: 992px) {
      display: none;
    }
  }
  &__link {
    background-color: transparent;
    border: 0;
    color: $color-moon;
    font-weight: 600;
    text-transform: uppercase;
    padding: 12px;
    &--route {
      &:last-of-type {
        padding-right: 0;
      }
    }
    &:focus,
    &:hover {
      color: darken($color-moon, 15%);
      text-decoration: none;
    }
    @media all and (max-width: 992px) {
      background-color: $color-storm;
      border-top: 1px solid $color-moon;
      text-align: right;
      padding-right: 50px;
    }
  }
  &__links-group {
    @media all and (max-width: 992px) {
      display: none;
      flex-direction: column;
      position: absolute;
      right: -50px;
      top: 56px;
      width: 100vw;
      &.is-active {
        display: flex;
      }
    }
  }
}
</style>