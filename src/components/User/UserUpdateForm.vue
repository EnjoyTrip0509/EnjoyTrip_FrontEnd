<template>
  <div class="form-section">
    <span class="text-h5 mb-4 mypage-title">사용자 정보 변경</span>

    <v-text-field
      label="아이디"
      v-model="modifiedUserInfo.id"
      disabled
    ></v-text-field>
    <v-text-field label="이름" v-model="modifiedUserInfo.name"></v-text-field>
    <v-text-field
      label="비밀번호"
      v-model="modifiedUserInfo.password"
      type="password"
    ></v-text-field>
    <v-text-field
      label="비밀번호 확인"
      :rules="[rules.samePassword]"
      v-model="modifiedUserInfo.passwordCheck"
      type="password"
    ></v-text-field>
    <div class="message-section">{{ message }}</div>
    <v-text-field
      label="이메일"
      v-model="modifiedUserInfo.email"
    ></v-text-field>

    <div class="button-box">
      <v-btn color="green darken-1" text @click="close">닫기</v-btn
      ><v-btn color="green darken-1 " text @click="changeUserInfo">변경</v-btn>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { updateUser } from "@/api/user";
import EventBus from "@/util/EventBus";

import _ from "lodash";

const userStore = "userStore";

export default {
  name: "UserUpdateForm",
  components: {},
  data() {
    return {
      modifiedUserInfo: {},
      message: "",
      rules: {
        samePassword: (value) => {
          return (
            value === this.modifiedUserInfo.password ||
            "비밀번호가 일치하지 않습니다."
          );
        },
      },
    };
  },
  created() {
    this.modifiedUserInfo = _.cloneDeep(this.userInfo);
    this.modifiedUserInfo.passwordCheck = "";
    this.modifiedUserInfo.password = "";
  },
  methods: {
    ...mapMutations(userStore, ["SET_USER_INFO"]),
    close() {
      EventBus.$emit("showDialog");
      EventBus.$emit("closeDialog");
    },
    changeUserInfo() {
      if (
        this.modifiedUserInfo.password !== this.modifiedUserInfo.passwordCheck
      ) {
        return;
      }

      updateUser(
        this.modifiedUserInfo,
        ({ data }) => {
          this.SET_USER_INFO(data.userInfo);
          EventBus.$emit("showDialog");
          EventBus.$emit("closeDialog");
        },

        (error) => {
          console.log(error);
        }
      );
    },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style scoped>
.form-section {
  padding: 36px 36px 24px 36px;
}

.button-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  height: fit-content;
}

.message-section {
  color: red;
  margin-bottom: 14px;
}
</style>