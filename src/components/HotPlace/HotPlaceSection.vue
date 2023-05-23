<template>
  <div class="hotplace-section">
    <div class="text-h3">TRIP US에서 선정한 HOT PLACE</div>
    <v-slide-group v-model="model" class="pa-4 w-75 slide" show-arrows>
      <v-slide-item v-for="n in 15" :key="n">
        <hot-place-card :key="i"></hot-place-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import HotPlaceCard from "@/components/HotPlace/HotPlaceCard.vue";

export default {
  name: "HotPlaceSection",
  components: {
    HotPlaceCard,
  },
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
.hotplace-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}

.slide {
  display: flex;
  justify-content: center;
}
</style>