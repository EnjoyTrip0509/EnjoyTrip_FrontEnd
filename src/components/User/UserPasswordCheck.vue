<template>
  <div class="passwordcheck-section">
    <span class="text-h5 mb-4 mypage-title">비밀번호를 입력해주세요.</span>
    <v-text-field v-model="password" type="password"></v-text-field>
    <div class="message-section">{{ message }}</div>
    <div class="button-box">
      <v-btn color="green darken-1" text @click="movePrev">이전</v-btn
      ><v-btn color="green darken-1 " text @click="moveNext">다음</v-btn>
    </div>
  </div>
</template>

<script>
import EventBus from "@/util/EventBus";
import { checkPassword } from "@/api/user";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserPasswordCheck",
  components: {},
  data() {
    return {
      password: "",
      message: "",
    };
  },
  created() {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    movePrev() {
      EventBus.$emit("modifyMyInfo");
    },
    moveNext() {
      //   console.log(this.userInfo, this.password);
      checkPassword(
        { ...this.userInfo, password: this.password },
        () => {
          EventBus.$emit("showModifyForm");
        },
        () => {
          this.message = "비밀번호를 확인해주세요.";
        }
      );
    },
  },
};
</script>

<style scoped>
.passwordcheck-section {
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
}
</style>