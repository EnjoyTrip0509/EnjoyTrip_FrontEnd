<template>
  <div>
    <div class="image-section">
      <landing-image filename="lake.jpg"></landing-image>
      <landing-image filename="palace.jpg"></landing-image>
      <landing-image filename="river.jpg"></landing-image>
      <div class="title"><h3>Discover story-worthy travel moments</h3></div>
    </div>

    <div class="search-section">
      <span>나는 <underline-select :items="contentId"></underline-select></span>
    </div>
  </div>
</template>

<script>
import LandingImage from "@/components/LandingImage.vue";
import UnderlineSelect from "@/components/UnderlineSelect.vue";
import contentId from "@/constant/contentId.js";

export default {
  name: "LandingView",
  components: {
    LandingImage,
    UnderlineSelect,
  },
  data() {
    return {
      contentId,
    };
  },
};
</script>

<style scoped>
.image-section {
  display: flex;
  position: relative;
}

.search-section {
  margin-top: 120px;
  display: flex;
  justify-content: center;
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
