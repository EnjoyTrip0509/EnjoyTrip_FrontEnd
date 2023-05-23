<template>
  <v-card
    class="ma-4 pointer"
    max-width="374"
    @click="onClickHotPlaceCard(126504)"
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
      src="http://tong.visitkorea.or.kr/cms/resource/37/2652137_image2_1.jpg"
    ></v-img>

    <v-card-title>봉은사(서울)</v-card-title>

    <v-card-text>
      <p>서울특별시 강남구 봉은사로 531</p>
      <div class="my-4">
        봉은사는 신라 원성왕 10년(794년)에 연회국사가 세웠고, 견성사라고 했다.
        1498년 성종의 계비 정현왕후가 성종의 능(선릉) 동편에 있던 이 절을 크게
        중창하고 절이름을 봉은사로 바꿨다. 본래는 서남쪽으로 1km가량 떨어진
        선릉에 있던 것을 조선 명종 때 보우가 옮겨 지었다. 추사 김정희가 쓴
        현판이 걸린 판전에는 화엄경, 금강경 등 13가지의 불경 경판 3,479판이
        보관되어 있다. 매년 음력 9월 9일에는 사부대중이 함께 경판을 머리에 이고
        법성게를 독송하면서 법계도를 따라 행진하는 정대불사라는 의식이 행해진다.
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
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