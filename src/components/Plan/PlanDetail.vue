<template>
  <div>
    <div class="ms-2 me-auto fw-bold mb-3">
      {{ plan.title }} <br />
      {{ plan.startDate | dateFormat }} - {{ plan.endDate | dateFormat }}
    </div>
    <v-sheet class="mx-auto d-flex pa-2 justify-center" max-width="700">
      <v-slide-group show-arrows>
        <v-slide-item v-for="n in dayCount" :key="n" v-slot="{ active }">
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="purple white--text"
            depressed
            rounded
            @click="onClickDay(n)"
          >
            day {{ n }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <v-btn @click="modify">{{isModifying ? '수정완료' : '수정'}}</v-btn>
    </v-sheet>


    <v-row v-if="!isModifying" class="d-flex justify-center">
      <div id="map"></div>
      <v-card-text class="py-0 pl-0 d-flex justify-center w-50">
        <v-timeline dense class="w-100">
                <v-timeline-item
                  v-for="item in dayLocations"
                  :key="item.id"
                  color="blue"
                  small
                  fill-dot
                >
                  <v-row class="d-flex align-center">
                    <v-alert
                      :value="true"
                      color="blue"
                      class="white--text mx-1 mt-3 w-75"
                    >
                      {{ item.attraction.title }}
                    </v-alert>

                    <v-btn class="ma-2" outlined large fab color="indigo" @click="showWriteReviewModal(item.contentId)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
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
                  </v-row>
                </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-row>

    <v-row v-else class="d-flex justify-center">
      <div id="map"></div>

      <v-card-text class="py-0 pl-0 d-flex justify-center w-50">
        <v-timeline dense class="w-100">
              <draggable v-model="modifiedLocations" group="locations" @start="drag=true" @end="drag=false">
                <v-timeline-item
                  v-for="item in modifiedLocations"
                  :key="item.id"
                  color="blue"
                  small
                  fill-dot
                >
                  <v-row class="d-flex align-center">
                    <v-alert
                      :value="true"
                      color="blue"
                      class="white--text mx-1 mt-3 w-75"
                    >
                      {{ item.attraction.title }}
                    </v-alert>

                    <v-btn class="ma-2" outlined large fab color="indigo" @click="showWriteReviewModal(item.contentId)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
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
                  </v-row>
                </v-timeline-item>
              </draggable>
        </v-timeline>
      </v-card-text>
    </v-row>
    <review-write-modal v-if="openWriteReviewModal" :planId="plan.id" :contentId="contentId" @closeWriteReviewModal="closeWriteReviewModal"></review-write-modal>
  </div>
</template>

<script>
import { getPlanDayDetail, getPlanDetail, deleteLocation, updatePlan } from "@/api/plan.js";
import ReviewWriteModal from "@/components/Review/ReviewWriteModal.vue";
import draggable from 'vuedraggable'
import _ from 'lodash';


export default {
  name: "PlanDetail",
  components: {
    ReviewWriteModal,
    draggable
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
      contentId:'',
      drag: false
    };
  },
  methods: {
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
        this.modifiedLocations = this.dayLocations.map((location) => _.cloneDeep(location));
      } else {
        // console.log(this.plan, this.modifiedLocations);

        updatePlan({
          ...this.plan,
          locations: this.modifiedLocations.map((location, index) => ({...location, order: index + 1})),
        }, () => {
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
        this.dayLocations = data;
        this.displayMarkers();
      });
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.2429362, 131.8624657, 16),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);

      const planId = this.$route.params.planId;

      getPlanDetail(planId, ({ data }) => {
        this.plan = data;
        this.calcDay();
      });

      getPlanDayDetail(planId, 1, ({ data }) => {
        this.dayLocations = data;
        this.displayMarkers();
      });
    },

    displayMarkers() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => {
          marker.setMap(null);
        });
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

      this.map.setBounds(bounds);
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
      this.contentId = '';
    }
  },

  mounted() {
    const planId = this.$route.params.planId;
    console.log(planId);

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);

        // getPlanDetail(planId, ({ data }) => {
        //   this.plan = data;
        //   this.calcDay();
        // });

        // getPlanDayDetail(planId, 1, ({ data }) => {
        //   this.dayLocations = data;
        //   this.displayMarkers();
        // });
      });

      document.head.appendChild(script);
    } else {
      this.initMap();

      // getPlanDetail(planId, ({ data }) => {
      //   this.plan = data;
      //   this.calcDay();
      // });

      // getPlanDayDetail(planId, 1, ({ data }) => {
      //   this.dayLocations = data;
      //   this.displayMarkers();
      // });
    }
  },
  filters: {
    dateFormat(value) {
      if (!value) {
        return "";
      }

      return (
        value.substring(0, 4) +
        "." +
        value.substring(5, 7) +
        "." +
        value.substring(8, 10)
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
</style>
