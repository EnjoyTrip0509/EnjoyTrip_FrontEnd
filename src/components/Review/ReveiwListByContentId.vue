<template>
    <b-list-group flush>
        <review-item-by-content-id v-for="review in reviews" :key="review.articleNo" :review="review"></review-item-by-content-id>
    </b-list-group>
</template>

<script>
import ReviewItemByContentId from "@/components/Review/ReviewItemByContentId.vue";
import { findReviewsByContentId } from "@/api/review.js";

export default {
    name: "ReviewListByContentId",
    props: {
        contentId: Number,
    },
    data() {
        return {
            reviews: [],
        }
    },
    components: {
        ReviewItemByContentId,
    },
    created() {
        findReviewsByContentId(
            this.contentId,
            ({ data }) => {
                console.log(data);
                this.reviews = data;
            }
        );
    },
}
</script>