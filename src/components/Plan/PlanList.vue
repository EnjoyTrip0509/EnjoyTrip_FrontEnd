<template>
    <div class="my-plan-list-content">
        <ul>
            <plan-item v-for="plan in plans" :key="plan.id" :plan="plan" @deletePlan="removePlan(plan.id)"></plan-item>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { listPlan, deletePlan } from "@/api/plan";
import PlanItem from '@/components/Plan/PlanItem.vue'

const userStore = "userStore";
const planStore = "planStore";

export default {
    name: "PlanList",
    components: {
        PlanItem,
    },
    created() {
        this.getPlanList();
    },
    methods: {
        ...mapActions(planStore, ["setPlans"]),
        getPlanList() {
            listPlan(
                this.userInfo.id,
                ({ data }) => {
                    this.setPlans(data);
                });
        },
        removePlan(planId) {
            deletePlan(
                planId,
                () => {
                    this.getPlanList();
                }
            )
        }
    },
    computed: {
        ...mapState(userStore, ["userInfo"]),
        ...mapState(planStore, ["plans"]),
    },
}
</script>

<style scoped>
.my-plan-list-content {
    display: flex;
    justify-content : center;
}

ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
    width: 610px;
    justify-content : center;
}
</style>