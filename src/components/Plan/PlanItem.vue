<template>
    <li class="list-group-item" @click="showPlanDetail(plan.id)">
        <div class="ms-2 me-auto fw-bold mb-3">
            <h3>{{ plan.title }}</h3>
            {{ plan.startDate | dateFormat }} - {{ plan.endDate | dateFormat }}
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
        }
    },
    filters: {
        dateFormat(value) {
            return value.substring(0,4) + "." + value.substring(5,7) + "." + value.substring(8,10);
        }
    }
}
</script>