<template>
  <div>
    <div class="plan-item-container">
      <div class="plan-item shadow mt-4 mb-10">
        <div class="plan-item-header">
          <div class="plan-info mt-5 ml-9" @click="showPlanDetail(plan.id)">
            <img :src="require(`@/assets/planet-earth.png`)" />
            <div class="plan-info-content">
              <h3 class="fw-bold">{{ plan.title }}</h3>
              <div>
                {{ plan.startDate | dateFormat }} -
                {{ plan.endDate | dateFormat }}
              </div>
            </div>
          </div>

          <div class="button-box">
            <span class="editBtn" type="button">
              <font-awesome-icon :icon="['fas', 'pencil']" />
            </span>
            <span class="removeBtn" type="button" @click="removePlan">
              <font-awesome-icon :icon="['far', 'fa-trash-alt']" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <v-sheet class="mx-auto d-flex pa-2 justify-center mb-5" max-width="700">
      <v-slide-group show-arrows>
        <v-slide-item v-for="n in dayCount" :key="n" v-slot="{ active }">
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="purple white--text"
            depressed
            rounded
            @click="onClickDay(n)"
            :class="{
              'btn-secondary': dayNumber == day,
              'btn-light': dayNumber != day,
            }"
          >
            day {{ n }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <v-btn @click="modify">{{ isModifying ? "적용" : "편집" }}</v-btn>
    </v-sheet>

    <v-row
      v-if="!isModifying && dayLocations.length"
      class="d-flex justify-center"
      max-width="800"
    >
      <div id="map"></div>
      <v-card-text class="py-0 pl-0 d-flex justify-center w-50">
        <v-timeline dense class="w-100">
          <v-timeline-item
            v-for="item in dayLocations"
            :key="item.id"
            :color="contentColor[item.attraction.contentTypeId]"
            small
            fill-dot
          >
            <div class="d-flex align-center">
              <v-alert
                :value="true"
                :color="contentColor[item.attraction.contentTypeId]"
                class="white--text mx-1 mt-3 w-100"
              >
                <div
                  class="attraction-title"
                  @click="moveAttractionDetail(item.attraction.contentId)"
                >
                  {{ item.attraction.title }}
                </div>
              </v-alert>

              <review-write-modal
                :planId="item.planId"
                :contentId="item.contentId"
              ></review-write-modal>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-row>

    <v-row
      v-if="isModifying && dayLocations.length"
      class="d-flex justify-center"
    >
      <div id="map"></div>

      <v-card-text class="py-0 pl-0 d-flex justify-center w-50">
        <v-timeline dense class="w-100">
          <draggable
            v-model="modifiedLocations"
            group="locations"
            @start="drag = true"
            @end="drag = false"
          >
            <v-timeline-item
              v-for="item in modifiedLocations"
              :key="item.id"
              :color="contentColor[item.attraction.contentTypeId]"
              small
              fill-dot
            >
              <div class="d-flex align-center">
                <v-alert
                  :value="true"
                  :color="contentColor[item.attraction.contentTypeId]"
                  class="white--text mx-1 mt-3 w-100"
                >
                  <div
                    class="attraction-title"
                    @click="moveAttractionDetail(item.attraction.contentId)"
                  >
                    {{ item.attraction.title }}
                  </div>
                </v-alert>

                <v-btn
                  v-if="isModifying"
                  class="mx-2 d-inline"
                  fab
                  dark
                  small
                  color="red"
                  @click="onClickDeleteLocation(item.id)"
                >
                  <v-icon dark> mdi-minus </v-icon>
                </v-btn>
              </div>
            </v-timeline-item>
          </draggable>
        </v-timeline>
      </v-card-text>
    </v-row>

    <div>
      <div v-if="!dayLocations.length" class="plan-info-section">
        <div class="plan-info-container" @click="onClickSearch">
          <span class="plan-info-title">방문할 장소를 추가해주세요!</span>
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPlanDayDetail,
  getPlanDetail,
  deleteLocation,
  updatePlan,
  deletePlan,
} from "@/api/plan.js";
import ReviewWriteModal from "@/components/Review/ReviewWriteModal.vue";
import draggable from "vuedraggable";
import _ from "lodash";
import contentColor from "@/constant/contentColor";
import { mapMutations } from "vuex";

const searchStore = "searchStore";

export default {
  name: "PlanDetail",
  components: {
    ReviewWriteModal,
    draggable,
  },
  data() {
    return {
      plan: {},
      dayCount: 0,
      dayLocations: [],
      modifiedLocations: [],
      isModifying: false,
      map: null,
      markers: [],
      openWriteReviewModal: false,
      contentId: "",
      drag: false,
      ployline: null,
      contentColor,
    };
  },

  created() {
    const planId = this.$route.params.planId;

    getPlanDetail(planId, ({ data }) => {
      this.plan = data;
      this.calcDay();
    });

    getPlanDayDetail(planId, 1, ({ data }) => {
      this.dayLocations = data;
    });
  },
  updated() {
    this.$nextTick(function () {
      console.log("testsetset", this.dayLocations);
      if (this.dayLocations.length) {
        console.log("wokred");

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
      }
    });
  },
  methods: {
    ...mapMutations(searchStore, ["SET_SIDO", "SET_GUGUN", "SET_CONTENT"]),
    onClickSearch() {
      this.SET_SIDO({ sidoCode: 0, sidoName: "전국" });
      this.SET_GUGUN({ gugunCode: "", gugunName: "" });
      this.SET_CONTENT({ contentCode: 12, contentName: "관광지" });

      this.$router.push({ name: "search" });
    },
    calcDay() {
      let startDateArr = this.plan.startDate.split("-");
      let endDateArr = this.plan.endDate.split("-");

      let startDate = new Date(
        startDateArr[0],
        startDateArr[1],
        startDateArr[2]
      );
      let endDate = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);

      let dayCount = endDate.getTime() - startDate.getTime();
      this.dayCount = dayCount / (1000 * 60 * 60 * 24) + 1;
    },
    modify() {
      this.isModifying = !this.isModifying;

      if (this.isModifying) {
        this.modifiedLocations = this.dayLocations.map((location) =>
          _.cloneDeep(location)
        );
      } else {
        // console.log(this.plan, this.modifiedLocations);

        updatePlan(
          {
            ...this.plan,
            locations: this.modifiedLocations.map((location, index) => ({
              ...location,
              order: index + 1,
            })),
          },
          () => {
            this.dayLocations = this.modifiedLocations;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    onClickDay(idx) {
      const planId = this.$route.params.planId;

      getPlanDayDetail(planId, idx, ({ data }) => {
        console.log(data, "datatata");
        this.dayLocations = data;
      });
    },
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

      if (this.polyline) {
        this.polyline.setMap(null);
      }

      const temp = [];

      const imgSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imgSrc, imageSize);

      this.dayLocations
        .map(({ attraction: { title, latitude, longitude } }) => ({
          title,
          latitude,
          longitude,
        }))
        .forEach(({ title, latitude, longitude }) => {
          const marker = new kakao.maps.Marker({
            map: this.map,
            position: new kakao.maps.LatLng(latitude, longitude),
            title: title,
            image: markerImage,
          });

          temp.push(marker);
        });

      const bounds = this.dayLocations
        .map(({ attraction: { title, latitude, longitude } }) => ({
          title,
          latitude,
          longitude,
        }))
        .reduce(
          (bound, { latitude, longitude }) =>
            bound.extend(new kakao.maps.LatLng(latitude, longitude)),
          new kakao.maps.LatLngBounds()
        );

      this.polyline = new kakao.maps.Polyline({
        path: this.dayLocations.map(
          ({ attraction: { latitude, longitude } }) =>
            new kakao.maps.LatLng(latitude, longitude)
        ),
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: "#1976D2", // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "shortdash", // 선의 스타일입니다
      });

      this.map.setBounds(bounds);
      this.polyline.setMap(this.map);

      this.markers = temp;
    },
    onClickDeleteLocation(id) {
      deleteLocation(
        id,
        () => {
          // 삭제 성공시 daylocation을 갱신해준다.
          this.modifiedLocations = this.modifiedLocations.filter((location) => {
            return location.id !== id;
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    showWriteReviewModal(contentId) {
      this.contentId = contentId;
      this.openWriteReviewModal = true;
    },
    closeWriteReviewModal() {
      this.openWriteReviewModal = false;
      this.contentId = "";
    },
    removePlan() {
      deletePlan(this.plan.id, () => {
        this.$router.push("/plan");
      });
    },
    moveAttractionDetail(contentId) {
      this.$router.push({ name: "attraction", params: { contentId } });
    },
  },
  mounted() {},
  filters: {
    dateFormat(value) {
      if (!value) {
        return "";
      }

      return (
        value.substring(0, 4) +
        "년 " +
        value.substring(5, 7) +
        "월 " +
        value.substring(8, 10) +
        "일"
      );
    },
  },
};
</script>

<style scoped>
#map {
  display: flex;
  justify-content: center;
  width: 40%;
  aspect-ratio: 1/1;
}

.hide {
  width: 0px;
  height: 0px;
}

.btn:last-child {
  margin-right: 0;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

.plan-item-container {
  display: flex;
  justify-content: center;
}

.plan-item {
  height: fit-content;
  margin: 0;
  padding: 1rem 0.9rem;
  background: white;
  border-radius: 20px;
  justify-content: space-between;
  display: inline-block;
}

.removeBtn {
  color: #de4343;
}

.editBtn {
  color: #3f42db;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.button-box {
  width: 50px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  align-items: center;
  height: 50px;
}

.plan-item-header {
  width: 580px;
  height: 150px;
  display: flex;
}

.plan-info {
  width: 480px;
  height: 130px;
  display: flex;
  position: relative;
}

.plan-info img {
  width: 110px;
  height: 110px;
  border-radius: 25px;
  margin-right: 20px;
}

.plan-info-content {
  margin-top: 23px;
}

.plan-title {
  text-overflow: ellipsis;
}

.attraction-title {
  cursor: pointer;
}

.plan-info-container {
  cursor: pointer;
}

.plan-info-section {
  display: flex;
  justify-content: center;
  margin-top: 60px;
  align-items: center;
}

.plan-info-container svg {
  font-size: 40px;
  margin-left: 10px;
  color: #d7d7d7;
}

.plan-info-title {
  font-size: 50px;
  color: #d7d7d7;
  text-decoration-line: none;
  font-family: "KBO-Dia-Gothic_bold";
}

.plan-info-section a {
  text-decoration-line: none;
}
</style>
