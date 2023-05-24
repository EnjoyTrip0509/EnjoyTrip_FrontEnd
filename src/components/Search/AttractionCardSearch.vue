<template>
  <v-card
    class="ma-4 pointer pa-6"
    max-width="350"
    @click="onClickHotPlaceCard(attraction.contentId)"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="attraction.firstImage || require(`@/assets/earth-bg.png`)"
    ></v-img>

    <v-card-title>{{ attraction.title }}</v-card-title>

    <v-card-text>
      <p>{{ attraction.addr1 }}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    attraction: Object,
  },
  data() {
    return {};
  },
  methods: {
    onClickHotPlaceCard(contentId) {
      this.$router.push({ name: "attraction", params: { contentId } });
    },
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>