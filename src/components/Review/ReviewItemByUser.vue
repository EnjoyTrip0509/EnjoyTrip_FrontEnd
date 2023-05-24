<template>
    <li class="shadow mb-7">
        <div class="review-item-header">
            <div class="attraction-info mt-5 ml-9" @click="moveAttractionDetail(attraction.contentId)">
                <img :src="attraction.firstImage" alt="">
                <div class="attraction-info-content">
                    <h3 class="fw-bold">{{ attraction.title | attractionTitleSlice }}</h3>
                    <div>{{ attraction.addr1}}</div>
                    <div class="review-time">
                        {{ review.registerTime | dateFormat }}
                    </div>
                </div>
            </div>

            <div class="button-box">
                <review-modify-modal :review="review" @modifyReview="modifyReview"></review-modify-modal>
                <span class="removeBtn" type="button" @click="deleteReview">
                    <font-awesome-icon :icon="['far', 'fa-trash-alt']"/>
                </span>
            </div>
        </div>
        
        <div class="review-content">
            {{ review.content }}
        </div>
    </li>
</template>

<script>
import { getAttractionDetail } from "@/api/attraction"
import ReviewModifyModal from "./ReviewModifyModal.vue"

export default {
    name: "ReveiwItemByUser",
    components: {
        ReviewModifyModal
    },
    props: {
        review: {},
    },
    data() {
        return {
            attraction: {}
        }
    },
    created() {
        getAttractionDetail(
            this.review.contentId,
            ({ data }) => {
                this.attraction = data;
            }
        )
    },
    methods: {
        deleteReview() {
            this.$emit("deleteReview");
        },
        moveAttractionDetail(contentId) {
            this.$router.push({name: 'attraction', params: { contentId }});
        },
        modifyReview() {
            this.$emit("updateReviewList");
        }
    },
    filters: {
        dateFormat(value) {
            return value.substring(0,4) + "년" + value.substring(5,7) + "월" + value.substring(8,10) + "일";
        },
        attractionTitleSlice(value) {
            if (value == null) {
                return value;
            }
            
            //eslint-disable-next-line
            return value.split(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/)[0];
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
    margin: 0.5rem 0;
    padding: 1rem 0.9rem;
    background: white;
    border-radius: 20px;
    justify-content: space-between;
    display: inline-block;
}

.removeBtn {
    color: #de4343;
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

.review-item-header {
    width: 580px;
    height: 150px;
    display: flex;
}

.attraction-info {
    width: 480px;
    height: 130px;
    display: flex;
    position : relative;
}

.attraction-info img {
    width: 120px;
    height: 120px;
    border-radius: 25px;
    margin-right: 20px;
}

.attraction-info-content {
    margin-top: 15px;
}

.review-content {
    margin-top: 20px;
    margin-left: 40px;
    margin-bottom: 30px;
    height: fit-content;
    width: 480px;
}

.review-time {
    width: 330px;
    bottom: 0px;
    color: #BDC3C7;
    font-weight: 10;
    position : absolute;
    bottom : 10px;
}

.attraction-title {
    text-overflow: ellipsis;
}
</style>
