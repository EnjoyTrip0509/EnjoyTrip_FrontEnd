<template>
    <div class="my-plan-list-container">
        <div class="my-plan-list-header" @click="movePlanList">
            <div>
                <img :src="require(`@/assets/passport.png`)" />
            </div>
            <div class="my-plan-list-title">
                <h2 class="fw-bold">TRAVEL</h2>
            </div>
        </div>
        
        <div class="my-plan-list-body">
            <div class="mt-3">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "PlanView",
    methods: {
        movePlanList() {
            if (this.$route.path != '/plan' && this.$route.path != '/plan/list') {
                this.$router.push('/plan');
            }
        }
    }
}
</script>

<style scoped>
.my-plan-list-container {
    width: 1400px;
    margin: 40px auto;
}

.my-plan-list-header {
    cursor: pointer;
    margin: 0 auto;
    text-align: center;
}

.my-plan-list-header img {
    height: 160px;
    width: 160px;
}

.my-plan-list-title {
    margin-top: 12px;
    text-align: center;
}

.my-plan-list-body {
    width: 1400px;
}
</style>