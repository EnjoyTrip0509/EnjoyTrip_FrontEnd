<template>
  <div class="image-section">
    <landing-image filename="lake.jpg"></landing-image>
    <landing-image filename="palace.jpg"></landing-image>
    <landing-image filename="river.jpg"></landing-image>
    <div class="title"><h3>Discover story-worthy travel moments</h3></div>
  </div>
</template>

<script>
import LandingImage from "@/components/LandingImage.vue";

export default {
  name: "LandingView",
  components: {
    LandingImage,
  },
};
</script>

<style scoped>
.image-section {
  display: flex;
  position: relative;
}

.title {
  position: absolute;
  top: 25vh;
  z-index: 10;
  width: 100%;
  display: flex;
  color: white;
  justify-content: center;

  text-align: center;
}

h3 {
  max-width: 60rem;
  padding: 0;
  margin: 0;
  font-size: 80px;
  font-weight: 600;
}
</style>
