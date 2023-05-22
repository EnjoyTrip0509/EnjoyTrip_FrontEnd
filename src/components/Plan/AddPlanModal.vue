<template>
    <div class="add-plan-container">
        <button class="add-plan-close-button" @click="close">
            <font-awesome-icon :icon="['fas', 'x']"/>
        </button>

        <div class="add-plan-header">
            <div class="add-plan-header-title">여행 추가</div>
        </div>
        
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text fw-bold">여행 제목</span>
            </div>
            <input class="form-control" type="text" v-model="title" id="planTitle" />
        </div>
        
        <div class="calendar">
            <date-picker
                v-model="dates"
                valueType="format"
                format="YYYY-MM-DD"
                range
            />
        </div>
        
        <button class="add-plan-button" @click="addPlan">추가하기</button>
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { mapState, mapActions } from "vuex";
import { addPlan, listPlan } from "@/api/plan";

const userStore = "userStore";
const planStore = "planStore";

export default {
    name: "AddPlanModal",
    components: {
        DatePicker,  
    },
    data() {
        return {
            title: '',
            dates: ['', ''],
        }
    },
    computed: {
        ...mapState(planStore, ["plans"]),
        ...mapState(userStore, ["userInfo"]),
        dateRangeText() {
            return this.dates.join(' ~ ')
        },
    },
    methods: {
        ...mapActions(planStore, ["setPlans"]),
        close() {
            this.$emit('closeAddPlanModal');
        },
        addPlan() {
            let plan = { title: this.title, userId: this.userInfo.id, startDate: this.dates[0], endDate: this.dates[1] };

            addPlan(plan);

            listPlan(
                this.userInfo.id,
                ({ data }) => {
                    this.setPlans(data);
                });
                
            this.$emit('closeAddPlanModal');
        }
    }
}
</script>

<style scoped>
.add-plan-container {
  width: 568px;
  height: 568px;
  position: fixed;
  background-color: #ffffff;
  z-index: 100;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.15);
}  

.add-plan-header {
  font-size: 23px;
  font-weight: 700;
  padding: 0 24px 0 24px;
  margin-bottom: 20px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}

.calendar {
    display: flex;
    justify-content: center;
    align-items: center;
}

.add-plan-close-button {
  position: absolute;
  top: 20px;
  left: 24px;
  appearance: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  width: 16px;
  height: 16px;
  padding: 0;
}

.add-plan-close-button::before {
  display: block;
  position: absolute;
  width: 32px;
  height: 32px;
  content: "";
  left: 50%;
  top: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
}

.add-plan-close-button:hover::before {
  background-color: #f7f7f7;
  border: none;
  border-radius: 50%;
  z-index: -1;
  cursor: pointer;
}

.add-plan-button {
  bottom: 0;
  position: fixed;
  width: 100%;
  color: #ffffff;
  border: 0;
  border-radius: 8px;
  background: linear-gradient(to right, #e61e4d 0%, #e31c5f 50%, #d70466 100%);
  cursor: pointer;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 24px;
  padding-right: 24px;
}

.input-group {
    margin: 0 auto;
    width: 80%;
}
</style>