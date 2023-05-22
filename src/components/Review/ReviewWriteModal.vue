<template>
    <div class="review-container">
        <button class="review-close-button" @click="close">
            <font-awesome-icon :icon="['fas', 'x']" />
        </button>

        <div class="review-header">
            <div class="review-header-title">리뷰 작성</div>
        </div>
        
        <div class="review-info">
            <img :src="attraction.firstImage" alt="">
            <div class="review-info-content">
                <div class="review-info-attraction">
                    <h3>{{ attraction.title }}</h3>
                    {{ attraction.addr1 }}
                </div>
                <div class="review-info-plan mt-3">
                    {{ plan.startDate | dateFormat }}
                </div>
            </div>
        </div>

        <div class="form-group">
            <input type="text" v-model="subject" class="form-control mb-1" id="subject" placeholder="제목" required/>
            <textarea class="form-control" id="content" rows="4" v-model="content" placeholder="내용" required></textarea>
        </div>

        <button class="add-review-button" @click="registerReview">리뷰 등록</button>
    </div>
</template>

<script>
import { getAttractionDetail } from "@/api/attraction.js";
import { getPlanDetail } from "@/api/plan.js";
import { addReview } from "@/api/review.js";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
    name: "ModalReviewWrite",
    props: {
        contentId: Number,
        planId: Number,
    },
    data() {
        return {
            attraction: {},
            plan: {},
            subject: '',
            content: '',
        }
    },
    computed: {
        ...mapState(userStore, ["userInfo"]),
    },
    created() {
        getAttractionDetail(
            this.contentId, 
            ({ data }) => {
                this.attraction = data;
            },
            (error) => console.log(error)
            );
        
        getPlanDetail(
            this.planId, 
            ({ data }) => {
                this.plan = data;
            },
            (error) => console.log(error)
            );
    },
    methods: {
        registerReview() {
            const review = { contentId: this.attraction.contentId, subject: this.subject, content: this.content, userId: this.userInfo.id };
            
            addReview(review);

            this.close();
        },
        close() {
            this.$emit("closeWriteReviewModal");
        }
    },
    filters: {
        dateFormat(value) {
            return value.substring(0,4) + "년" + value.substring(5,7) + "월" + value.substring(8,10) + "일";
        }
    }
}
</script>

<style scoped>
.review-container {
  width: 568px;
  height: 500px;
  position: fixed;
  background-color: #ffffff;
  z-index: 100;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.15);
}

.review-header {
  font-size: 23px;
  font-weight: 700;
  padding: 0 24px 0 24px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}

.review-close-button {
  position: absolute;
  top: 24px;
  left: 24px;
  appearance: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  width: 16px;
  height: 16px;
  padding: 0;
}

.review-close-button::before {
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

.review-close-button:hover::before {
  background-color: #f7f7f7;
  border: none;
  border-radius: 50%;
  z-index: -1;
  cursor: pointer;
}

.review-info {
    margin: 20px 20px 10px 20px;
    display: flex;
    align-items: center;
}

.review-info img {
    height: 190px;
    width: 190px;
    aspect-ratio: 1/1;
    border-radius: 40px;
}

.form-group {
    margin: 10px;
}

.review-info-content {
    margin-left: 10px;
    font-size: 15px;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.review-info-attraction {
    text-align: center;
    justify-content: center;
    align-items: center;
}

.review-info-plan {
    text-align: right;
    display: flex;
    justify-content: center;
}

.add-review-button {
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
</style>