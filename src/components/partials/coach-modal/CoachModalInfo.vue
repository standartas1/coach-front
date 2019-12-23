<template>
  <div class="coach-card card">
    <img
      class="coach-card__image card-img-top"
      :src="'http://coach-api-go.herokuapp.com/' + coach.img"
      alt
    />
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
        <p class="coach-card__label">Skill</p>
        <p class="coach-card__text">{{ coach.skill }}</p>
      </div>
      <div class="coach-card__information">
        <p class="coach-card__label">Experience</p>
        <p class="coach-card__text">{{ coach.experience }}</p>
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