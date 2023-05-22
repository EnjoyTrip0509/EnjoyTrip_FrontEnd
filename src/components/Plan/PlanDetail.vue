<template>
    <div>
        <div class="ms-2 me-auto fw-bold mb-3">
            {{ plan.title }} <br/>
            {{ plan.startDate | dateFormat }} - {{ plan.endDate | dateFormat }}
        </div>
        <plan-day-item v-for="dayNumber in dayCount" :key="dayNumber" :dayNumber="dayNumber"></plan-day-item>
    </div>
</template>

<script>
import { getPlanDetail } from "@/api/plan.js";
import PlanDayItem from "@/components/Plan/PlanDayItem.vue"

export default {
    name: "PlanDetail",
    components: {
        PlanDayItem,
    },
    data() {
        return {
            plan: {},
            dayCount: 0,
            dayLocations: [],
        }
    },
    created() {
        const planId = this.$route.params.planId;

        getPlanDetail(planId, ({ data }) => {
            this.plan = data;
            console.log(this.plan);

            this.calcDay();
        });
    },
    methods: {
        calcDay() {
            let startDateArr = this.plan.startDate.split("-");
            let endDateArr = this.plan.endDate.split("-");

            let startDate = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);
            let endDate = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);

            let dayCount = endDate.getTime() - startDate.getTime();
            this.dayCount = dayCount / (1000 * 60 * 60 * 24) + 1;
        },
    },
    filters: {
        dateFormat(value) {
            return value.substring(0,4) + "." + value.substring(5,7) + "." + value.substring(8,10);
        }
    }
}
</script>