<template>
  <div>
    <transition name="my-modal">
      <div v-if="this.isOpen">
        <div class="overlay" @click.self="onClick()">
          <div class="my-modal">
            <h2 class="my-modal__heading">EDIT USER</h2>
            <form @submit.prevent="updateUser" class="form-group">
              <label class="form-group__label" for="name">Name</label>
              <input
                :class="{ 'is-invalid': submitted && !user.name }"
                class="form-group__input form-control"
                type="text"
                id="name"
                :value="user.name"
                @input="user.name = $event.target.value"
              />
              <small
                class="form-group__error form-text"
                id="emailError"
                v-show="submitted && user.name.trim() === ''"
              >Incorrect Name</small>
              <div v-if="role === 'Administrator'" class="form-group__radio">
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="user"
                    name="role"
                    class="custom-control-input"
                    value="User"
                    v-model="user.role"
                  />
                  <label class="custom-control-label" for="user">User</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    class="custom-control-input"
                    value="Administrator"
                    v-model="user.role"
                  />
                  <label class="custom-control-label" for="admin">Administrator</label>
                </div>
              </div>
              <input class="form-group__button btn" type="submit" value="Update" />
              <button class="form-group__button btn" @click="onClick()" type="button">Cancel</button>
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
      submitted: false
    };
  },
  methods: {
    ...mapActions("users", ["update"]),
    onClick(e) {
      this.$emit("clicked", !this.isOpen);
    },
    updateUser(e) {
      this.submitted = true;
      const editUser = {
        _id: this.user._id,
        name: this.user.name,
        role: this.user.role
      };
      if (this.user.name.trim() !== "") {
        this.update(editUser);
        this.onClick(e);
        this.submitted = false;
      }
    }
  },
  props: ["isOpen", "user", "role"]
};
</script>

<style lang="scss">
.form-group {
  font-family: $Roboto;
  &__button {
    background: $color-storm !important;
    color: white;
    margin: 15px 12px 0 0;
    &:focus,
    &:hover {
      background: darken($color-storm, 25) !important;
      color: white;
    }
  }
  &__label {
    color: $color-storm;
    margin-top: 10px !important;
    margin-bottom: 4px;
  }
  &__error {
    color: $color-storm;
    padding-bottom: 5px;
  }
  &__radio {
    padding-top: 15px;
  }
}
.my-modal {
  width: 500px;
  padding: 20px;
  background-color: $color-moon;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 2px 8px 3px $color-storm;
  font-family: $Roboto;
  &__heading {
    color: $color-storm;
  }
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgba($color: $color-moon, $alpha: 0.45);
  z-index: 999;
  transition: opacity 0.2s ease;
}
</style>