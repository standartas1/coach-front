<template>
  <div class="review">
    <div class="review__content">
      <div class="review__heading">
        <p class="review__heading-text">{{ review.user.name }}</p>
        <div
          v-if="user._id === review.user._id || user.role === 'Administrator'"
          class="review__heading-controls"
        >
          <i @click="isOpen = !isOpen" class="review__heading-edit fas fa-pen"></i>
          <i class="review__heading-delete fas fa-trash-alt" @click="_delete()"></i>
        </div>
      </div>
      <p class="review__comment">Adjustments: {{ review.adjustments }}</p>
      <p class="review__comment">{{ review.comment }}</p>
    </div>
    <div class="review__edit">
      <form @submit.prevent="update" v-if="isOpen" class="review__edit-form">
        <div class>
          <div class="form-group__radio">
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="rx"
                name="adjustments"
                class="custom-control-input"
                value="Rx"
                v-model="review.adjustments"
              />
              <label class="custom-control-label" for="rx">Rx</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="sc"
                name="adjustments"
                class="custom-control-input"
                value="Sc"
                v-model="review.adjustments"
              />
              <label class="custom-control-label" for="sc">Sc</label>
            </div>
          </div>
          <div class>
            <label class="form-group__label" for="comment">Comment</label>
            <input
              :class="{ 'is-invalid': submitted && !review.comment }"
              v-model="review.comment"
              class="form-group__input form-control"
              type="text"
              id="comment"
            />
            <small
              v-show="submitted && !review.comment"
              class="form-group__error form-text"
              id="commentError"
            >Incorrect Comment</small>
          </div>
        </div>
        <div class="review__edit-controls">
          <input class="review__edit-button btn" type="submit" value="Edit review" />
          <button class="review__edit-button btn" type="btn" @click="isOpen = !isOpen">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      coaches: state => state.coaches.coaches,
      user: state => state.account.user
    })
  },
  data() {
    return {
      isOpen: false,
      submitted: false
    };
  },
  methods: {
    ...mapActions("coaches", ["updateReview", "deleteReview"]),
    update(e) {
      this.submitted = true;
      const editReview = {
        _id: this.review._id,
        adjustments: this.review.adjustments,
        comment: this.review.comment
      };
      if (editReview.adjustments && editReview.comment) {
        this.updateReview({ coach: this.review.coach, review: editReview });
        this.isOpen = !this.isOpen;
      }
    },
    _delete(e) {
      const { coach, _id } = this.review;
      this.deleteReview({ coach, _id });
    }
  },
  props: ["review"]
};
</script>

<style lang="scss">
.review {
  background-color: lighten($color-moon, 10);
  display: flex;
  flex-direction: column;
  width: 100%;
  &__content {
    background-color: $color-nude;
    border-bottom: 1px solid black;
    padding: 5px 10px;
  }
  &__comment {
    font-size: 14px;
    margin: 6px 0;
  }
  &__edit {
    display: flex;
    background: white;
    justify-content: center;
  }
  &__edit-button {
    background-color: $color-nude;
    margin: 10px 0;
    text-transform: uppercase;
    width: 45%;
    &:focus,
    &:hover {
      background-color: darken($color-nude, 10);
    }
  }
  &__edit-controls {
    display: flex;
    justify-content: space-between;
  }
  &__edit-form {
    width: 90%;
  }
  &__heading {
    display: flex;
    flex-direction: row;
  }
  &__heading-text {
    font-family: $Roboto;
    margin: 0 12px 8px 0;
    text-transform: uppercase;
    &:last-of-type {
      font-weight: 600;
    }
  }
  &__heading-controls {
    margin-left: auto;
  }
  &__heading-edit {
    margin-right: 10px;
    &:hover {
      color: $color-leather;
      cursor: pointer;
    }
  }
  &__heading-delete {
    &:hover {
      color: $color-leather;
      cursor: pointer;
    }
  }
}
</style>