<template>
  <div class="add-coach">
    <button @click="isOpen = !isOpen" class="add-coach__button btn" type="button">Add coach</button>
    <transition name="my-modal">
      <div v-if="this.isOpen">
        <div class="overlay" @click.self="isOpen = !isOpen">
          <div class="my-modal">
            <h2 class="my-modal__heading">ADD COACH</h2>
            <form @submit.prevent="handleSubmit" class="add-coach__form form-group">
              <label class="form-group__label" for="name">Name</label>
              <input
                v-model="coach.name"
                class="form-group__input form-control"
                type="text"
                id="name"
                :class="{ 'is-invalid': submitted && !coach.name }"
              />
              <small
                v-show="submitted && !coach.name"
                class="form-group__error form-text"
                id="nameError"
              >Incorrect Name</small>

              <label class="form-group__label" for="surname">Surname</label>
              <input
                v-model="coach.surname"
                class="form-group__input form-control"
                type="text"
                id="surname"
                :class="{ 'is-invalid': submitted && !coach.surname }"
              />
              <small
                v-show="submitted && !coach.surname"
                class="form-group__error form-text"
                id="surnameError"
              >Incorrect Surname</small>

              <label class="form-group__label" for="skill">Skill</label>
              <div class="form-group__select col-md-4">
                <select v-model="coach.skill" id="skill" class="form-control">
                  <option selected>Shooting</option>
                  <option>Dribbling</option>
                  <option>Passing</option>
                  <option>Spacing</option>
                  <option>Defence</option>
                  <option>Footwork</option>
                  <option>Basketball IQ</option>
                  <option>Conditioning</option>
                </select>
              </div>
              <small
                v-show="submitted && !coach.skill"
                class="form-group__error form-text"
                id="skillError"
              >Incorrect Skill</small>

              <label class="form-group__label" for="experience">Experience</label>
              <input
                v-model="coach.experience"
                class="form-group__input form-control"
                type="text"
                id="experience"
                :class="{ 'is-invalid': submitted && !coach.experience }"
              />
              <small
                v-show="submitted && !coach.experience"
                class="form-group__error form-text"
                id="experienceError"
              >Incorrect Experience</small>

              <label class="form-group__label" for="exmaple">Has Image</label>
              <div class="form-group__radio">
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="true"
                    name="exmaple"
                    class="custom-control-input"
                    value="true"
                    v-model="hasImage"
                  />
                  <label class="custom-control-label" for="true">Yes</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="false"
                    name="exmaple"
                    class="custom-control-input"
                    value="false"
                    v-model="hasImage"
                  />
                  <label class="custom-control-label" for="false">No</label>
                </div>
              </div>
              <div v-if="hasImage === 'true'">
                <label class="form-group__label" for="exmaple">Image</label>
                <input
                  v-if="hasImage === 'true'"
                  v-model="coach.img"
                  class="form-group__input form-control"
                  type="text"
                  id="exmaple"
                  :class="{ 'is-invalid': submitted && !coach.img }"
                />
                <small
                  v-if="hasImage === 'true'"
                  v-show="submitted && !coach.exmaple"
                  class="form-group__error form-text"
                  id="fileError"
                >Incorrect File</small>
              </div>
              <div class="form-group__buttons">
                <input class="form-group__button btn" type="submit" value="Add Coach" />
                <button
                  class="form-group__button btn"
                  @click="isOpen = !isOpen"
                  type="button"
                >Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("users", ["all"])
  },
  data() {
    return {
      coach: {
        name: "",
        surname: "",
        skill: "",
        experience: "",
        img: ""
      },
      hasImage: false,
      submitted: false,
      isOpen: false
    };
  },
  methods: {
    ...mapActions("coaches", ["postCoach"]),
    handleSubmit(e) {
      this.submitted = true;
      if (
        this.coach.name &&
        this.coach.surname &&
        this.coach.skill &&
        this.coach.experience
      ) {
        this.coach.img = this.coach.img
          ? `coachImages/${this.coach.img}.jpg`
          : "coachImages/placeholder.jpg";
        this.postCoach(this.coach);
        this.isOpen = !this.isOpen;
      }
    }
  },
  props: ["func"]
};
</script>

<style lang="scss" scoped>
.add-coach {
  &__button {
    background: $color-nude !important;
    border: 2px solid $color-storm;
    margin: 0 0 10px 0;
    max-width: 320px;
    text-transform: uppercase;
    width: 100%;
    &:focus,
    &:hover {
      background: darken($color-nude, 10) !important;
      color: black !important;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
}
.form-group {
  &__radio {
    padding: 7px 0;
  }

  &__select {
    padding: 7px 0;
  }
}
</style>