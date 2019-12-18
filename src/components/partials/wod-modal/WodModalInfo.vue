<template>
  <div class="coach-card card">
    <img
      class="coach-card__image card-img-top"
      :src="'http://coaches-api.herokuapp.com/' + coach.img"
      alt
    />
    <div class="coach-card__content">
      <div class="coach-card__information">
        <p class="coach-card__label">Title</p>
        <p class="coach-card__text">{{ coach.title }}</p>
      </div>
      <div class="coach-card__information">
        <p class="coach-card__label">Type</p>
        <p class="coach-card__text">{{ coach.type }}</p>
      </div>
      <div class="coach-card__information">
        <p class="coach-card__label">Difficulty</p>
        <p class="coach-card__text">{{ coach.difficulty }}</p>
      </div>
      <div class="coach-card__information">
        <p class="coach-card__label">Workout</p>
        <p class="coach-card__text">{{ coach.workout }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["coach"]
};
</script>

<style lang="scss" scoped>
.coach-card {
  background-color: white;
  border: 0;
  border-right: 1px solid $color-storm;
  border-radius: 0 !important;
  margin: 0;
  max-width: 240px;
  height: 100%;
  &__image {
    height: 300px;
  }
  &__information {
    flex-direction: column;
    font-size: 14px;
    &--rating {
      font-size: 16px;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  &__label,
  &__text {
    margin: 4px 0 2px;
  }
}
</style>