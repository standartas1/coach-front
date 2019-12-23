<template>
  <div class="modal-reviews">
    <button
      v-if="role === 'Administrator' || role === 'User'"
      class="modal-reviews__button btn"
      @click="isOpen = !isOpen"
    >{{ !isOpen ? 'Add review' : 'Cancel' }}</button>
    <form @submit.prevent="handleSubmit" v-if="isOpen" class="modal-reviews__add-form">
      <div class="modal-reviews__form-inputs">
        <div class="modal-reviews__input-group">
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
      <input class="modal-reviews__button btn" type="submit" value="Add Review" />
    </form>
    <p v-if="coach.reviews.length === 0">No reviews</p>
    <div v-for="review in coach.reviews" :key="review._id">
      <Review :review="review"></Review>
    </div>
  </div>
</template>

<script>
import Review from "./Review";
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      coaches: state => state.coaches.coaches
    })
  },
  components: {
    Review: Review
  },
  data() {
    return {
      review: {
        comment: "",
        coach: this.coach._id
      },
      submitted: false,
      isOpen: false
    };
  },
  methods: {
    ...mapActions("coaches", ["postReview"]),
    handleSubmit(e) {
      this.submitted = true;
      if (this.review.comment) {
        this.postReview(this.review);
        this.isOpen = !this.isOpen;
        this.submitted = false;
      }
    }
  },
  props: ["coach", "role"]
};
</script>

<style lang="scss" scoped>
.form-group {
  &__label,
  &__input {
    width: 100%;
  }
}
.modal-reviews {
  overflow-y: auto;
  width: 100%;
  &__button {
    background-color: lighten(#858585b2, 15);
    border-radius: 0;
    text-transform: uppercase;
    width: 100%;
    &:focus,
    &:hover {
      background-color: darken($color-nude, 10);
    }
  }
  &__form-inputs {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 20px;
    width: 100%;
  }
  &__input-group {
    display: flex;
    flex-direction: column;
    width: 90%;
  }
  .review_form-group__radio {
    padding-left: 20px;
    padding-top: 15px;
  }
}
</style>