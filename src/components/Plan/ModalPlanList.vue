<template>
    <div class="plan-box">
        <ul class="list-group list-group-flush">
            <modal-plan-item v-for="plan in plans" :key="plan.id" :plan="plan"></modal-plan-item>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { listPlan } from "@/api/plan";
import ModalPlanItem from '@/components/Plan/ModalPlanItem.vue'

const userStore = "userStore";
const planStore = "planStore";

export default {
    name: "ModalPlanList",
    components: {
        ModalPlanItem,
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

<style scoped>
ul {
    border: none;
}

.plan-box {
    height: 530px;
    flex-wrap: nowrap;
    overflow-y: auto;
}

::-webkit-scrollbar {
    height: 0px;
}
</style>
