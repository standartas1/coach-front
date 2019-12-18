<template>
  <div>
    <div v-if="alert.message" :class="`alert ${alert.type}`">{{ alert.message }}</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Header from "../src/components/partials/Header";
export default {
  name: "app",
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>

<style lang="scss">
html,
body {
  font-family: $Roboto;
  margin: 0;
}
</style>