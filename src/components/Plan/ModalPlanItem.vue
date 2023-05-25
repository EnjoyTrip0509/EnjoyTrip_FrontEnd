<template>
    <li class="list-group-item" :class="{ active : planId == plan.id }">
        <div class="ms-2 me-auto fw-bold mb-3" @click="showDay(plan.id)">
            {{ plan.title }} <br/>
            {{ plan.startDate | dateFormat }} - {{ plan.endDate | dateFormat }}
        </div>
        <div class="day-box" v-if="plan.id == this.planId" id="days">
            <button class="btn fw-bold" :class="{ 'btn-secondary' : dayNumber == day, 'btn-light' : dayNumber != day }" v-for="dayNumber in dayCount" :key="dayNumber" @click="checkDay(dayNumber)">
                <div class="">Day{{ dayNumber }}</div>
            </button>
        </div>
    </li>  
</template>

<script>
import { mapActions, mapState } from "vuex";

const planStore = "planStore";

export default {
    name: "ModalPlanItem",
    props: {
        plan: {},
    },
    data() {
        return {
            dayCount: Number,
            selectedDayNumber: 0,
        }
    },
    created() {
        this.calcDay();
    },
    computed: {
        ...mapState(planStore, ["planId", "day"]),
    },
    methods: {
        ...mapActions(planStore, ["selectPlan", "selectDay"]),
        calcDay() {
            let startDateArr = this.plan.startDate.split("-");
            let endDateArr = this.plan.endDate.split("-");

            let startDate = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);
            let endDate = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);

            let dayCount = endDate.getTime() - startDate.getTime();
            this.dayCount = dayCount / (1000 * 60 * 60 * 24) + 1;
        },  
        checkDay(dayNumber) {
            this.selectDay(dayNumber);

            console.log("item:", this.planId, this.day);
        },
        showDay(planId) {
            if (planId == this.planId) {
                this.selectPlan(0);
            } else {
                this.selectPlan(planId);
            }
        },
    },
    filters: {
        dateFormat(value) {
            return value.substring(0,4) + "." + value.substring(5,7) + "." + value.substring(8,10);
        }
    }
}
</script>

<style scoped>
li {
    cursor: pointer;
    margin-right: 22px;
}

.btn {
    border-radius: 20px;
    margin-right: 5px;
}

.btn-light {
    color: #566573 ;
}

.day-box {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
}

::-webkit-scrollbar {
    height: 0px;
}
</style>