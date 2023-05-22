<template>
  <v-app>
    <div class="ms-2 me-auto fw-bold mb-3">
      {{ plan.title }} <br />
      {{ plan.startDate | dateFormat }} - {{ plan.endDate | dateFormat }}
    </div>
    <v-sheet class="mx-auto d-flex pa-2" max-width="700">
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
      <v-btn @click="modify">수정</v-btn>
    </v-sheet>

    <v-card-text class="py-0 pl-0 d-flex justify-center">
      <v-timeline dense class="w-75">
        <v-slide-x-reverse-transition group hide-on-leave>
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
                class="white--text mx-1 mt-3"
                :class="{ 'w-75': isModifying }"
              >
                {{ item.attraction.title }}
              </v-alert>

              <v-btn
                v-if="isModifying"
                class="mx-2 d-inline"
                fab
                dark
                small
                color="red ml-16"
              >
                <v-icon dark> mdi-minus </v-icon>
              </v-btn>
            </v-row>
          </v-timeline-item>
        </v-slide-x-reverse-transition>
      </v-timeline>
    </v-card-text>
  </v-app>
</template>

<script>
import { getPlanDayDetail, getPlanDetail } from "@/api/plan.js";

export default {
  name: "PlanDetail",

  data() {
    return {
      plan: {},
      dayCount: 0,
      dayLocations: [],
      isModifying: false,
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
    },
    onClickDay(idx) {
      const planId = this.$route.params.planId;

      getPlanDayDetail(planId, idx, ({ data }) => {
        this.dayLocations = data;
        console.log(data);
      });
    },
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
