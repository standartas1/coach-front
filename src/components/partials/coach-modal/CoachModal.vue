<template>
  <div class="update-coach">
    <transition name="my-modal">
      <div v-if="this.readMoreOpen">
        <div class="overlay" @click.self="onClick">
          <div class="coach-modal my-modal">
            <CoachModalInfo :coach="coach"></CoachModalInfo>
            <CoachModalReviews :coach="coach" :role="role"></CoachModalReviews>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CoachModalInfo from "./CoachModalInfo";
import CoachModalReviews from "./CoachModalReviews";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    CoachModalInfo: CoachModalInfo,
    CoachModalReviews: CoachModalReviews
  },
  methods: {
    onClick(e) {
      this.$emit("clicked", this.coach);
    }
  },
  props: ["coach", "readMoreOpen", "role"]
};
</script>

<style lang="scss" scoped>
.coach-modal {
  background: white;
  height: 620px;
  display: flex;
  flex-direction: row;
  padding: 0;
  min-width: 600px;
  width: 60vw;
}
</style>