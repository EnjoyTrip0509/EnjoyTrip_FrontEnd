<template>
  <div class="card-container" @click.stop="onClickCard(attraction.contentId)">
    <img :src="attraction.firstImage || require(`@/assets/planet-earth.png`)" alt="관광지 이미지" />
    <span>{{ attraction.title }}</span>
    <span>{{ attraction.addr1 }}</span>
  </div>
</template>

<script>
export default {
  name: "AttractionCard",
  components: {},
  props: {
    attraction: Object,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    onClickCard(contentId) {
      this.$router.push({name: 'attraction', params: {contentId}});
    }
  },
};
</script>

<style scoped>
.card-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card-container img {
  object-fit: cover;
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
}
</style>