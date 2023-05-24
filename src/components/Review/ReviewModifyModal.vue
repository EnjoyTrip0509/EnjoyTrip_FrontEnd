<template>
    <div>
        <v-dialog
            v-model="dialog"
            max-width="600px"
        >
            <template v-slot:activator="{ attrs }">
                <div>
                    <span class="modifyBtn" type="button" @click="showModifyReviewModal" v-bind="attrs">
                        <font-awesome-icon :icon="['fas', 'pencil']"/>
                    </span>
                </div>
            </template>
            <div v-if="this.dialog" class="content"> 
                <div class="review-header">
                    <div class="review-header-title">리뷰 수정</div>
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

                <div class="form-group mt-5 ml-10 mr-10">
                    <v-textarea
                        counter
                        ref="reviewTextArea"
                        background-color="grey lighten-3"
                        v-model="content" 
                        no-resize
                        rounded
                        />
                </div>

                <div class="button-box">
                    <v-btn color="green darken-1" text @click="updateReview">수정</v-btn>
                    <v-btn color="red darken-1 " text @click="closeModifyReviewModal">닫기</v-btn>
                </div>
            </div>

        </v-dialog>
    </div>
</template>

<script>
import { getAttractionDetail } from "@/api/attraction.js";
import { getPlanDetail } from "@/api/plan.js";
import { modifyReview } from "@/api/review.js";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
    name: "ReviewModfiyModal",
    props: {
        review: {},
    },
    data() {
        return {
            dialog: false,
            attraction: {},
            plan: {},
            content: '',
        }
    },
    computed: {
        ...mapState(userStore, ["userInfo"]),
    },
    methods: {
        showModifyReviewModal() {
            this.dialog = !this.dialog;
            
            if (this.dialog && this.review != null) {
                getAttractionDetail(
                this.review.contentId, 
                ({ data }) => {
                    this.attraction = data;
                },
                (error) => console.log(error)
                );
            
            getPlanDetail(
                this.review.planId, 
                ({ data }) => {
                    this.plan = data;
                },
                (error) => console.log(error)
                );
            }

            this.content = this.review.content;
        },
        closeModifyReviewModal() {
            this.content = this.review.content;
            this.dialog = false;
        },
        updateReview() {
            if (this.content == '' || this.content == null || this.content == undefined) {
                this.$refs["reviewTextArea"].focus();

                return;
            }

            const review = { articleNo: this.review.articleNo, contentId: this.review.contentId, planId: this.review.planId, subject: this.review.subject, content: this.content, userId: this.review.id };
            
            modifyReview(
                review,
                () => {
                    this.closeModifyReviewModal();
                    this.$emit("modifyReview");
                }
            )
        }
    },
    filters: {
        dateFormat(value) {
            if (value == null || value == '' || value == undefined) {
                return;
            }

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

.modifyBtn {
    color: #3f42db;
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

.button-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  height: fit-content;
  padding: 0px 36px 24px 36px;
}
</style>