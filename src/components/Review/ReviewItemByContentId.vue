<template>
    <b-list-group-item class="border-0 mb-5">
        <div class="review-header">
            <img :src="require(`@/assets/planet-earth.png`)" />
            <div class="review-info ml-3">
                <div class="review-user">{{ review.userId }}</div>
                <div class="reivew-register-time">{{ review.registerTime | dateFormat }}</div>
            </div>
        </div>
        <div class="review-content mt-2">
            {{ review.content }}
        </div>
    </b-list-group-item>
</template>

<script>
export default {
    props: {
        review: {},
    },
    filters: {
        dateFormat(value) {
            return value.substring(0,4) + "년" + value.substring(5,7) + "월" + value.substring(8,10) + "일";
        }
    }
}
</script>

<style scoped>
.review-header {
    display: flex;
}

.review-header img {
    margin-top: 5px;
    height: 40px;
    width: 40px;
}

.review-user {
    font-size: 20px;
    font-weight: 500;
}

.reivew-register-time {
    font-size: 14px;
    color: gray;
}
</style>