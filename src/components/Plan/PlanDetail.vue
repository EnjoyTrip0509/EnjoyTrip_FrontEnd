<template>
  <div>
    <div class="plan-detail-header">
      <div class="travel-info">
        <div class="image-container">
          <img :src="require(`@/assets/palace.jpg`)" :alt="plan.id" class="trip-image">
        </div>
        <div class="info-container">
          <h1 class="title">{{ plan.title }}</h1>
          <p class="description">{{ plan.startDate | dateFormat }} - {{ plan.endDate | dateFormat }}</p>
          <div class="actions">
            <button class="edit-btn">편집</button>
            <button class="remove-btn">삭제</button>
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
          >
            day {{ n }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <v-btn @click="modify">{{isModifying ? '적용' : '편집'}}</v-btn>
    </v-sheet>

    <v-row v-if="!isModifying" class="d-flex justify-center" max-width="800">
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
                  <div class="d-flex align-center">
                    <v-alert
                      :value="true"
                      color="blue"
                      class="white--text mx-1 mt-3 w-100"
                    >
                      {{ item.attraction.title }}
                    </v-alert>
                    
                    <review-write-modal :planId="item.planId" :contentId="item.contentId"></review-write-modal>
                  </div>
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
                  <div class="d-flex align-center">
                    <v-alert
                      :value="true"
                      color="blue"
                      class="white--text mx-1 mt-3 w-100"
                    >
                      {{ item.attraction.title }}
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
  </div>
</template>

<script>
import { getPlanDayDetail, getPlanDetail, deleteLocation, updatePlan } from "@/api/plan.js"
import ReviewWriteModal from "@/components/Review/ReviewWriteModal.vue";
import draggable from 'vuedraggable'
import _ from 'lodash';

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
      contentId:'',
      drag: false,
      ployline: null,
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
        path: this.dayLocations.map(({attraction: {latitude, longitude}}) => new kakao.maps.LatLng(latitude, longitude)),
        strokeWeight: 5, // 선의 두께 입니다
        strokeColor: '#FFAE00', // 선의 색깔입니다
        strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: 'solid' // 선의 스타일입니다
      })

      this.map.setBounds(bounds);
      this.polyline.setMap(this.map);

      console.log('before', this.polyline);
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

.plan-detail-header {
  margin: 30px;
  justify-content: center;
  display: flex;
}

.travel-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 16px;
  margin-bottom: 16px;
  margin: 0.5rem 0;
  padding: 3rem 1.5rem;
  background: white;
  border-radius: 20px;
  width: 600px;
}

.image-container {
  flex: 0 0 30%;
  margin-right: 16px;
}

.trip-image {
  width: 200px;
  height: 200px;
  border-radius: 100px;
}

.info-container {
  flex: 1;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.description {
  font-size: 16px;
  color: #888;
  margin-bottom: 16px;
}

.actions {
  display: flex;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
}

.remove-btn {
  background-color: #F5483C;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
}

.btn:last-child {
  margin-right: 0;
}


</style>
