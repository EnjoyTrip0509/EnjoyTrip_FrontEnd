<template>
    <div>
        <v-dialog
            v-model="dialog"
            max-width="600px"
        >
            <template v-slot:activator="{ attrs }">
                <v-btn class="mx-2" fab small color="primary" @click="showWriteReviewModal" v-bind="attrs">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
            </template>
            <div v-if="this.dialog" class="content">
                <div class="review-header">
                    <div class="review-header-title">리뷰 작성 <font-awesome-icon class="review-icon" :icon="['far', 'message']" /></div>
                </div>
                
                <div class="review-info">
                    <img :src="attraction.firstImage || require(`@/assets/planet-earth.png`)" alt="관광지 이미지" />
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

                <div class="form-group mt-5 ml-10 mr-10">
                    <v-textarea
                        ref="reviewTextArea"
                        solo
                        v-model="content" 
                        no-resize
                        placeholder="리뷰를 작성해주세요." />
                </div>

                <div class="button-box">
                    <v-btn color="green darken-1" text @click="registerReview">등록</v-btn>
                    <v-btn color="red darken-1 " text @click="closeWriteReviewModal">닫기</v-btn>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
import { getAttractionDetail } from "@/api/attraction.js";
import { getPlanDetail } from "@/api/plan.js";
import { addReview } from "@/api/review.js";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
    name: "ReviewWriteModal",
    data() {
        return {
            dialog: false,
            attraction: {},
            plan: {},
            content: ''
        }
    },
    props: {
        planId: Number,
        contentId : Number,
    },
    computed: {
        ...mapState(userStore, ["userInfo"]),
    },
    methods: {
        showWriteReviewModal() {
            this.dialog = !this.dialog;

            if (this.dialog) {
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
            }
        },
        closeWriteReviewModal() {
            this.content = '';
            this.dialog = false;
        },
        registerReview() {
            if (this.content == '' || this.content == null || this.content == undefined) {
                this.$refs["reviewTextArea"].focus();

                return;
            }

            const review = { contentId: this.attraction.contentId, planId:this.planId, subject: "review", content: this.content, userId: this.userInfo.id };

            addReview(
                review,
                () => {
                    this.closeWriteReviewModal();
                });
        }
    },
    filters: {
        dateFormat(value) {
            return value.substring(0,4) + "년 " + value.substring(5,7) + "월 " + value.substring(8,10) + "일";
        }
    }
}
</script>

<style scoped>
.content {
    background-color: white;
    border-radius: 20px;
}

.review-icon {
    height: 20px;
    width: 20px;
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
    margin-left: 25px;
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

.button-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  height: fit-content;
  padding: 0px 36px 24px 36px;
}
</style>