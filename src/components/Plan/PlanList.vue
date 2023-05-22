<template>
    <b-container class="bv-example-row mt-3 text-center">
        <b-container class="bv-example-row mt-3">
            <b-row>
                <b-col>
                    <b-alert show variant="secondary"><h3 class="fw-bold">여행 목록</h3></b-alert>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <plan-item v-for="plan in plans" :key="plan.id" :plan="plan"></plan-item>
                </b-col>
            </b-row>
        </b-container>
    </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { listPlan } from "@/api/plan";
import PlanItem from '@/components/Plan/PlanItem.vue'

const userStore = "userStore";
const planStore = "planStore";

export default {
    name: "PlanList",
    components: {
        PlanItem,
    },
    created() {
        listPlan(
            this.userInfo.id,
            ({ data }) => {
                this.setPlans(data);
            });
    },
    methods: {
        ...mapActions(planStore, ["setPlans"]),
    },
    computed: {
        ...mapState(userStore, ["userInfo"]),
        ...mapState(planStore, ["plans"]),
    },
}
</script>