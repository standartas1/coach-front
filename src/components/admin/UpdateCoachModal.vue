<template>
  <div class="update-coach">
    <transition name="my-modal">
      <div v-if="this.isOpen">
        <div class="overlay" @click.self="onClick">
          <div class="my-modal">
            <h2 class="my-modal__heading">EDIT COACH</h2>
            <form @submit.prevent="update" class="update-coach__form form-group">
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

              <div class="form-group__buttons">
                <input class="form-group__button btn" type="submit" value="Update Coach" />
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
    ...mapState({
      coaches: state => state.coaches.coaches
    })
  },
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    ...mapActions("coaches", ["updateCoach"]),
    update(e) {
      this.submitted = true;
      const editCoach = {
        _id: this.coach._id,
        name: this.coach.name,
        surname: this.coach.surname,
        skill: this.coach.skill,
        experience: this.coach.experience
      };
      if (
        editCoach.name &&
        editCoach.surname &&
        editCoach.skill &&
        editCoach.experience
      ) {
        this.updateCoach(editCoach);
        this.onClick(e);
        this.submitted = false;
      }
    },
    onClick(e) {
      this.$emit("clicked", !this.isOpen);
    },
    selectFile() {
      this.coach.img = this.$refs.file.files[0];
    }
  },
  props: ["coach", "isOpen"]
};
</script>

<style lang="scss" scoped>
.update-coach {
  &__button {
    background: $color-moon !important;
    border: 2px solid $color-storm;
    margin: 0 0 10px 0;
    max-width: 320px;
    text-transform: uppercase;
    width: 100%;
    &:focus,
    &:hover {
      background: darken($color-moon, 10) !important;
      color: black !important;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
}
.form-group {
  &__buttons {
    margin-top: 15px;
  }
}
</style>