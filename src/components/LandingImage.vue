<template>
  <div>
    <img :src="require(`@/assets/${filename}`)" />
  </div>
</template>

<script>
export default {
  name: "LandingImage",
  props: {
    filename: String,
  },
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
div {
  width: 34vw;
  height: 66vh;
}

img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>