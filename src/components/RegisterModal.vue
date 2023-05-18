<template>
  <div class="container">
    <button class="close-button">
      <font-awesome-icon :icon="['fas', 'x']" />
    </button>
    <div class="header">
      <div class="header-title">회원가입</div>
    </div>
    <div class="input-section">
      <div>
        <label for="id">아이디</label>
        <input id="id" class="register-input" type="text" v-model="user.id" />
      </div>

      <div>
        <label for="password">비밀번호</label>
        <input
          id="password"
          class="register-input"
          type="text"
          v-model="user.password"
        />
      </div>

      <div>
        <label for="name">이름</label>
        <input
          id="name"
          class="register-input"
          type="text"
          v-model="user.name"
        />
      </div>

      <div>
        <label for="email">이메일</label>
        <input
          id="email"
          class="register-input"
          type="text"
          v-model="user.email"
        />
      </div>

      <button class="register-button" @click="onRegister">회원가입</button>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/user.js";
import EventBus from "@/util/EventBus.js";

export default {
  name: "RegisterModal",
  components: {},
  data() {
    return {
      user: {
        id: "",
        password: "",
        name: "",
        email: "",
      },
    };
  },
  created() {},
  methods: {
    onRegister() {
      register(
        this.user,
        () => {
          alert("회원가입에 성공하였습니다!");
          EventBus.$emit("closeRegisterModal");
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
.container {
  width: 568px;
  height: fit-content;
  position: fixed;
  background-color: #ffffff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.15);
}

.header {
  font-size: 23px;
  font-weight: 700;
  padding: 0 24px 0 24px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
}

.close-button {
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

.close-button::before {
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

.close-button:hover::before {
  background-color: #f7f7f7;
  border: none;
  border-radius: 50%;
  z-index: -1;
  cursor: pointer;
}

.input-section {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.register-input {
  display: block;
  width: 100%;
  height: 56px;
  box-sizing: border-box;
  padding: 0;
  margin-top: 10px;

  border-radius: 8px;
  font-size: 15px;

  padding-left: 10px;
}

.register-button {
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

