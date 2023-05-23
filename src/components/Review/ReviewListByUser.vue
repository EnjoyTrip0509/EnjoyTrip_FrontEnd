<template>
    <ul>
        <review-item-by-user v-for="review in reviews" :key="review.articleNo" :review="review" @modifyReview="modifyReview(review)" @deleteReview="deleteReviewFromList(review.articleNo)"></review-item-by-user>
    </ul>
</template>

<script>
import ReviewItemByUser from '@/components/Review/ReviewItemByUser.vue'
import { mapState } from "vuex";
import { findReviewsByUserId, deleteReview } from "@/api/review.js"

const userStore = "userStore";

export default {
    name: "ReviewListByUser",
    data() {
        return {
            reviews: [],
        }
    },
    components: {
        ReviewItemByUser,
    },
    computed: {
        ...mapState(userStore, ["userInfo"])
    },
    created() {
        this.setReviewList();
    },
    methods: {
        setReviewList() {
            findReviewsByUserId(
                this.userInfo.id,
                ({ data }) => {
                    console.log(data);
                    this.reviews = data;
                }
            );
        },
        deleteReviewFromList(articleNo) {
            deleteReview(articleNo,
                () => {
                    alert("리뷰가 삭제되었습니다.");
                    this.setReviewList();
                }
            )
        },
        modifyReview(review) {
            console.log(review);
        }
    }
}
</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}
</style>