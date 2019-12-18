<template>
  <div class="coaches">
    <div class="coaches__cards">
      <CoachCard
        v-for="(coach, i) in coaches"
        :key="coach._id + i"
        @readMore="readMoreClick"
        @update="onUpdateClick"
        :coach="coach"
        :role="role"
      ></CoachCard>
    </div>
    <CoachModal @clicked="readMoreClick" :readMoreOpen="readMoreOpen" :coach="coach" :role="role"></CoachModal>
    <UpdateCoachModal
      v-if="role === 'Administrator'"
      @clicked="onModalClick"
      :isOpen="isOpen"
      :coach="coach"
    ></UpdateCoachModal>
  </div>
</template>

<script>
import CoachCard from "./CoachCard";
import CoachModal from "./coach-modal/CoachModal";
import UpdateCoachModal from "./../admin/UpdateCoachModal";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {
    CoachCard: CoachCard,
    CoachModal: CoachModal,
    UpdateCoachModal: UpdateCoachModal
  },
  computed: {
    ...mapState("coaches", ["coaches"])
  },
  created() {
    this.getCoaches();
  },
  data() {
    return {
      coach: "",
      readMoreOpen: false,
      isOpen: false
    };
  },
  methods: {
    ...mapActions("coaches", ["getCoaches"]),
    onModalClick(value) {
      this.isOpen = value;
    },
    readMoreClick(value) {
      this.coach = value;
      this.readMoreOpen = !this.readMoreOpen;
    },
    onUpdateClick(value) {
      this.coach = value;
      this.isOpen = !this.isOpen;
    }
  },
  props: ["role"]
};
</script>

<style lang="scss">
.coaches {
  &__cards {
    display: grid;
    grid-template-columns: auto auto auto auto;
    @media (max-width: 768px) {
      grid-template-columns: auto;
    }
    @media (min-width: 769px) and (max-width: 1099px) {
      grid-template-columns: auto auto;
    }
    @media (min-width: 1100px) and (max-width: 1440px) {
      grid-template-columns: auto auto auto;
    }
  }
}
</style>