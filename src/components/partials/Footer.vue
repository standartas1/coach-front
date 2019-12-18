<template>
  <footer class="footer">
    <div class="footer__links">
      <i class="footer__social-media fab fa-facebook-square fa-2x"></i>
      <i class="footer__social-media fab fa-twitter-square fa-2x"></i>
      <i class="footer__social-media fab fa-instagram fa-2x"></i>
    </div>
    <p class="footer__copyright">Copyright &copy; 2019 WOD</p>
  </footer>
</template>

<script>
import Navbar from "./Navbar";
export default {};
</script>

<style lang="scss">
.footer {
  align-items: center;
  background-color: darken($color-storm, 25);
  // box-shadow: 0px 0px 12px $color-storm;
  color: white;
  display: flex;
  font-family: $Roboto;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 50px;
  height: 60px;
  width: 100%;
  &__copyright {
    font-size: 12px;
    margin: 0;
  }
  &__links {
    display: flex;
    justify-content: space-between;
    width: 120px;
  }
  &__social-media {
    &:hover {
      cursor: pointer;
      color: $color-nude;
    }
  }
}
</style>