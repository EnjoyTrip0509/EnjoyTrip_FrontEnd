<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600px"
      @click:outside="onClickOutside"
    >
      <template v-slot:activator="{ attrs }">
        <profile-menu-item
          title="회원가입"
          v-bind="attrs"
          event="showRegisterDialog"
        ></profile-menu-item>
      </template>

      <div class="register-section">
        <span class="text-h5 mb-4 mypage-title">회원가입</span>
        <v-text-field
          label="아이디"
          v-model="id"
          :error-messages="errors"
        ></v-text-field>
        <v-text-field
          label="비밀번호"
          type="password"
          v-model="user.password"
        ></v-text-field>

        <v-text-field label="이름" v-model="user.name"></v-text-field>

        <v-text-field label="이메일" v-model="user.email"></v-text-field>

        <div v-if="message" class="message-section">{{ message }}</div>

        <div class="button-box">
          <v-btn color="green darken-1" text @click="onRegister"
            >회원가입</v-btn
          >
        </div>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import EventBus from "@/util/EventBus.js";
import ProfileMenuItem from "@/components/ProfileMenuItem.vue";
import { checkId, register } from "@/api/user.js";

const userStore = "userStore";

export default {
  name: "RegisterModal",
  components: {
    ProfileMenuItem,
  },
  data() {
    return {
      id: "",
      user: {
        password: "",
        name: "",
        email: "",
      },
      message: "",
      dialog: false,
      errors: [],
    };
  },
  watch: {
    id(val) {
      checkId(
        val,
        ({ status }) => {
          if (status === 202) {
            this.errors = [];
          }
        },
        ({ response: { status } }) => {
          if (status === 409) {
            this.errors = ["중복된 아이디가 존재합니다."];
          }
        }
      );
    },
  },
  created() {
    EventBus.$on("showRegisterDialog", this.showRegisterDialog);
  },
  methods: {
    ...mapActions(userStore, ["loginUser"]),
    onRegister() {
      if (this.errors.length) {
        this.message = "중복된 아이디가 존재합니다.";
        return;
      }

      if (this.id === "") {
        this.message = "아이디를 입력해주세요.";
        return;
      }

      if (this.user.password === "") {
        this.message = "비밀번호를 입력해주세요.";
        return;
      }

      if (this.user.name === "") {
        this.message = "이름을 입력해주세요.";
        return;
      }

      if (this.user.email === "") {
        this.message = "이메일을 입력해주세요.";
        return;
      }

      register(
        { ...this.user, id: this.id },
        () => {
          alert("회원가입에 성공하였습니다!");
          EventBus.$emit("closeDialog");
        },
        (error) => {
          console.log(error);
        }
      );
    },
    close() {
      //   EventBus.$emit("closeLoginModal");
    },
    onClickOutside() {
      EventBus.$emit("closeDialog");
    },
    showRegisterDialog() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

<style scoped>
.register-section {
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