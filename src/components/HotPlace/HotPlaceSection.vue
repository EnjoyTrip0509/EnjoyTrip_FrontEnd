<template>
  <div class="hotplace-section">
    <div class="text-h3">TRIP US에서 선정한 HOT PLACE</div>
    <v-slide-group class="pa-4 w-75 slide" show-arrows>
      <v-slide-item v-for="place in hotPlaces" :key="place.contentId">
        <hot-place-card :attraction="place"></hot-place-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import HotPlaceCard from "@/components/HotPlace/HotPlaceCard.vue";
import { getHotPlace } from "@/api/attraction"

export default {
  name: "HotPlaceSection",
  components: {
    HotPlaceCard,
  },
  data() {
    return {
      hotPlaces: [],
    };
  },
  created() {
    getHotPlace(
      ({data}) => {
        this.hotPlaces = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
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