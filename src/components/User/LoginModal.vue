<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600px"
      @click:outside="onClickOutside"
    >
      <template v-slot:activator="{ attrs }">
        <profile-menu-item
          title="로그인"
          v-bind="attrs"
          event="showLoginDialog"
        ></profile-menu-item>
      </template>

      <div class="login-section">
        <span class="text-h5 mb-4 mypage-title">로그인</span>

        <v-text-field label="아이디" v-model="user.id"></v-text-field>
        <v-text-field
          label="비밀번호"
          type="password"
          v-model="user.password"
        ></v-text-field>

        <div v-if="message" class="message-section">{{ message }}</div>

        <div class="button-box">
          <v-btn color="green darken-1" text @click="onLogin">로그인</v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import EventBus from "@/util/EventBus.js";
import ProfileMenuItem from "@/components/ProfileMenuItem.vue";

const userStore = "userStore";

export default {
  name: "LoginModal",
  components: {
    ProfileMenuItem,
  },
  data() {
    return {
      user: {
        id: "",
        password: "",
      },
      dialog: false,
      message: "",
    };
  },
  created() {
    EventBus.$on("showLoginDialog", this.showLoginDialog);
  },
  methods: {
    ...mapActions(userStore, ["loginUser"]),
    onLogin() {
      this.loginUser({
        user: this.user,
        successCallback: () => {
          EventBus.$emit("closeDialog");
        },
        failCallback: () => {
          this.message = "아이디와 비밀번호를 확인해주세요";
        },
      });
    },
    close() {
      //   EventBus.$emit("closeLoginModal");
    },
    onClickOutside() {
      EventBus.$emit("closeDialog");
    },
    showLoginDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped>
.login-section {
  padding: 36px 36px 24px 36px;
  background: white;
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