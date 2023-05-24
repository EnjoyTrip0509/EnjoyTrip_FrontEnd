<template>
    <li class="shadow mb-7">
        <div class="plan-item-header">
            <div class="plan-info mt-5 ml-9" @click="showPlanDetail(plan.id)">
                <img :src="require(`@/assets/planet-earth.png`)" />
                <div class="plan-info-content">
                    <h3 class="fw-bold">{{ plan.title }}</h3>
                    <div>
                        {{ plan.startDate | dateFormat }}  -  {{ plan.endDate | dateFormat }}
                    </div>
                </div>
            </div>

            <div class="button-box">
                <span class="editBtn" type="button">
                    <font-awesome-icon :icon="['fas', 'pencil']"/>
                </span>
                <span class="removeBtn" type="button" @click="deletePlan">
                    <font-awesome-icon :icon="['far', 'fa-trash-alt']"/>
                </span>
            </div>
        </div>
    </li>  
</template>

<script>
export default {
    name: "ModalPlanItem",
    props: {
        plan: {},
    },
    methods: {
        showPlanDetail(planId) {
            this.$router.push({name: 'planDetail', params: {planId}});
        },
        deletePlan () {
            this.$emit("deletePlan");
        }
    },
    filters: {
        dateFormat(value) {
            if (!value) {
                return "";
            }

            return value.substring(0,4) + "년 " + value.substring(5,7) + "월 " + value.substring(8,10) + "일";
        }
    }
}
</script>

<style scoped>
.shadow {
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
}

li {
    height: fit-content;
    margin: 1rem 0;
    padding: 1rem 0.9rem;
    background: white;
    border-radius: 20px;
    justify-content: space-between;
    display: inline-block;
    cursor: pointer;
}

.removeBtn {
    color: #de4343;
}

.editBtn {
    color: #3f42db;
}

.list-enter-active, .list-leave-active {
    transition: all 1s;
}

.list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.button-box {
    width: 50px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    align-items: center;
    height: 50px;
}

.plan-item-header {
    width: 580px;
    height: 150px;
    display: flex;
}

.plan-info {
    width: 480px;
    height: 130px;
    display: flex;
    position : relative;
}

.plan-info img {
    width: 110px;
    height: 110px;
    border-radius: 25px;
    margin-right: 20px;
}

.plan-info-content {
    margin-top: 23px;
}

.plan-title {
    text-overflow: ellipsis;
}
</style>