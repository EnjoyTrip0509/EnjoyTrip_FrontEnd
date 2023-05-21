<template>
    <div class="container">
      <img :src="attraction.firstImage" alt="">
      <div class="detail-header">
        <span>{{ attraction.title }}</span>
        <button>일정추가</button>
      </div>
      <div class="address-section" >{{ attraction.addr1 }}</div>
      <div class="description-section">'해발 1,200m의 청태산을 주봉으로 하여 인공림과 천연림이 잘 조화된 울창한 산림을 바탕으로 한 국유림 경영 시범단지로서 숲속에는 온갖 야생 동식물이 고루 서식하고 있어 자연박물관을 찾은 기분을 느낄 수 있다. 영동고속도로 신갈기점 강릉방향 128km 지점에 위치하고 있어 여름철 동해안 피서객들이 잠시 쉬었다 가기에 편리하고, 청소년의 심신수련을 위한 숲속교실도 설치되어 있으며 울창한 잣나무 숲속의 산림욕장은 한번왔다간 사람은 누구나 매료되어 찾는 곳이기도 하다. * 구역면적 - 403 ha'</div>
    </div>
</template>

<script>
import { getAttractionDetail } from "@/api/attraction.js";

export default {
  data() {
    return {
      attraction: null,
    }
  },
  created() {
    const contentId = this.$route.params.contentId;

    getAttractionDetail(contentId, ({ data }) => {
      this.attraction = data;
    },
    (error) => console.log(error)
    )
  }
}
</script>

<style scoped>
  .container {
    width: 560px;
    margin: 40px auto;
  }

  .container img {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }

  .detail-header {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid rgb(219, 219, 219);
  }

  .detail-header span {
    font-size: 30px;
    font-weight: 700;
  }

  .detail-header button {
    background: linear-gradient(to right, #e61e4d 0%, #e31c5f 50%, #d70466 100%);
    border: 0;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    width: 150px;
  }

  .address-section {
    font-weight: 600;
    padding-top: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid rgb(219, 219, 219);
  }

  .description-section {
    margin-top: 40px;
    padding-bottom: 40px;
    border-bottom: 2px solid rgb(219, 219, 219);

  }


</style>