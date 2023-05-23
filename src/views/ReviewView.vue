<template>
    <div class="my-review-container">
        <div class="my-review-header">
            <div>
                <img :src="require(`@/assets/review-icon.png`)" />
            </div>
            <div class="user-info">
                <h2 class="fw-bold">REVIEW</h2>
            </div>
        </div>

        <div class="mt-5">
            <review-list-by-user></review-list-by-user>
        </div>
    </div>
</template>

<script>
import ReviewListByUser from '@/components/Review/ReviewListByUser.vue'
import { mapState } from "vuex";

const userStore = "userStore";

export default {
    name: "ReivewView",
    components: {
        ReviewListByUser,
    },
    computed: {
        ...mapState(userStore, ["userInfo"])
    },
}
</script>

<style scoped>
.my-review-container {
    width: 560px;
    margin: 40px auto;
}

.my-review-header {
    margin: 0 auto;
    text-align: center;
}

.my-review-header img {
    height: 170px;
    width: 190px;
}

.user-info {
    text-align: center;
}

.user-icon {
    height: 200px;
    width: 200px;
}
</style>