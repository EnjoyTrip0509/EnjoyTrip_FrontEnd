<template>
  <div id="map"></div>
</template>

<script>
export default {
  name: "SearchResultMap",
  components: {},
  data() {
    return {
      map: null,
    };
  },
  created() {},
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.2429362, 131.8624657, 16),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
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