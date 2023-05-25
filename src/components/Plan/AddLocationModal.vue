<template>
  <div class="container">
    <button class="close-button" @click="close">
      <font-awesome-icon :icon="['fas', 'x']" />
    </button>

    <div class="header">
      <div class="header-title">여행 목록</div>
    </div>

    <button class="add-plan-button" @click="showAddPlanModal">
      <div class="add-plan-button-content fw-bold">+ 여행 등록</div>
    </button>

    <div>
      <modal-plan-list></modal-plan-list>
    </div>

    <button class="add-button" @click="addLocationToPlan">일정 추가</button>
  </div>
</template>

<script>
import ModalPlanList from "@/components/Plan/ModalPlanList.vue";
import { addLocation } from "@/api/plan";
import { mapState, mapActions } from "vuex";

const userStore = "userStore";
const planStore = "planStore";

export default {
  name: "AddLocationModal",
  components: {
    ModalPlanList,
  },
  props: {
    contentId: Number,
  },
  created() {
    this.selectPlan(0);
    this.selectDay(0);
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
    ...mapState(planStore, ["planId", "day"]),
  },
  methods: {
    ...mapActions(planStore, ["selectPlan", "selectDay"]),
    addLocationToPlan() {
      let location = {
        contentId: this.contentId,
        planId: this.planId,
        day: this.day,
      };

      addLocation(location);

      this.close();
    },
    close() {
      this.$emit("closeAddLocationModal");
    },
    showAddPlanModal() {
      this.$emit("showAddPlanModal");
    },
  },
};
</script>

<style scoped>
.container {
  width: 568px;
  height: 660px;
  position: fixed;
  background-color: #ffffff;
  z-index: 100;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.15);
}

.header {
  font-size: 23px;
  font-weight: 700;
  padding: 0 24px 0 24px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}

.close-button {
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

.close-button::before {
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

.close-button:hover::before {
  background-color: #f7f7f7;
  border: none;
  border-radius: 50%;
  z-index: -1;
  cursor: pointer;
}

.add-button {
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

.add-plan-button {
  position: absolute;
  top: 15px;
  right: 20px;
  appearance: none;
  border: 0;
  background: rgb(0, 86, 240);
  color: white;
  cursor: pointer;
  padding: 0;
  border-radius: 20px;
}

.add-plan-button-content {
  margin: 7px 10px 7px 10px;
}
</style>