<template>
  <div class="coach-card card">
    <button class="coach-card__controls coach-card__controls--read-more" @click="readMore">
      <img
        class="coach-card__image card-img-top"
        :src="'http://coaches-api.herokuapp.com/' + coach.img"
        alt
      />
      <p class="coach-card__controls-text">Reviews</p>
    </button>
    <div class="coach-card__content">
      <div class="coach-card__information">
        <p class="coach-card__label">Name</p>
        <p class="coach-card__text">{{ coach.name }}</p>
      </div>
      <div class="coach-card__information">
        <p class="coach-card__label">Surname</p>
        <p class="coach-card__text">{{ coach.surname }}</p>
      </div>
      <div class="coach-card__information">
        <p class="coach-card__label">Oriented skill</p>
        <p class="coach-card__text">{{ coach.skill }}</p>
      </div>
      <div class="coach-card__information">
        <p class="coach-card__label">Experience</p>
        <p class="coach-card__text">{{ coach.experience }}</p>
      </div>
      <div v-if="role === 'Administrator'" class="coach-card__controls">
        <button @click="updateCoach" class="coach-card__button btn" type="button">Update</button>
        <button @click="deleteCoach(coach._id)" class="coach-card__button btn" type="button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("coaches", ["coaches"])
  },
  data() {
    return {
      editCoach: {},
      isOpen: false
    };
  },
  methods: {
    ...mapActions("coaches", ["deleteCoach"]),
    updateCoach() {
      this.$emit("update", this.coach);
    },
    readMore() {
      this.$emit("readMore", this.coach);
    }
  },
  props: ["coach", "role"]
};
</script>

<style lang="scss">
.coach-card {
  background: $color-nude;
  border: 2px solid $color-storm;
  border-radius: 0;
  margin: 0 0 20px 0;
  max-width: 320px;
  width: 320px;
  overflow: hidden;
  &__button {
    background-color: $color-storm !important;
    color: $color-moon;
    margin: 10px 5px 0;
    width: 90%;
    &:hover {
      background-color: darken($color-storm, 25) !important;
      color: $color-moon;
    }
  }
  &__content {
    margin: 10px;
  }
  &__controls {
    background-color: $color-nude;
    display: flex;
    &--read-more {
      border: 0;
      display: block;
      opacity: 1;
      padding: 0;
      position: relative;
      transition: transform 0.3s ease;
      :first-child {
        transition: opacity 0.3s ease;
      }
      :last-child {
        color: $color-storm;
        font-family: $Roboto;
        font-weight: 600;
        font-size: 60px;
        left: 50%;
        opacity: 0;
        position: absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
      }
      &:hover {
        cursor: pointer;
        transform: scale(1.02);
        :first-child {
          opacity: 0.2;
        }
        :last-child {
          opacity: 1;
        }
      }
    }
  }
  &__image {
    border-radius: 0;
    height: 400px;
    max-width: 320px;
    object-fit: cover;
  }
  &__information {
    border-bottom: 1px solid $color-storm;
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    &:last-of-type {
      border: 0;
    }
    &--rating {
      font-size: 18px;
      justify-content: flex-start;
    }
  }
  &__label {
    font-weight: 600;
    margin: 6px 0 4px;
    text-transform: uppercase;
  }
  &__text {
    margin: 6px 0 4px;
    &--rating {
      font-weight: 600;
      margin-left: 12px;
    }
  }
}
</style>