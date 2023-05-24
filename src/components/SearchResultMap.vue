<template>
  <div id="map"></div>
</template>

<script>
import { mapGetters } from "vuex";
import EventBus from "@/util/EventBus.js";

const searchStore = "searchStore";

export default {
  name: "SearchResultMap",
  components: {},
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  created() {
    EventBus.$on("updateMap", this.displayMarkers);
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.2429362, 131.8624657, 16),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      this.displayMarkers();
    },

    displayMarkers() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => {
          marker.setMap(null);
        });
      }

      const imgSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imageSize);

      const temp = [];

      this.positions.forEach(({ title, latitude, longitude }) => {
        const marker = new kakao.maps.Marker({
          map: this.map,
          position: new kakao.maps.LatLng(latitude, longitude),
          title: title,
          image: markerImage,
        });

        temp.push(marker);
      });

      const bounds = this.positions.reduce(
        (bound, { latitude, longitude }) =>
          bound.extend(new kakao.maps.LatLng(latitude, longitude)),
        new kakao.maps.LatLngBounds()
      );

      this.map.setBounds(bounds);
      this.markers = temp;
    },
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });

      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  computed: {
    ...mapGetters(searchStore, ["positions"]),
  },
};
</script>

<style scoped>
#map {
  position: sticky;
  width: 1000px;
  height: 100vh;
  top: 10px;
}
</style>