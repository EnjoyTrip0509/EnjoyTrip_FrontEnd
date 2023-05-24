<template>
  <div class="header-container">
    <header>
      <router-link to="/">logo</router-link>
      <div
        v-if="this.isLogin"
        class="myprofile"
        @click.stop="onClickProfile"
        ref="loginDropDown"
      >
        {{ userInfo.name }}님 안녕하세요!
        <div v-if="showModal" class="loginDropDown" @click.stop="">
          <profile-menu-item
            title="로그아웃"
            event="logout"
          ></profile-menu-item>
          <profile-menu-item
            title="내 여행 계획"
            event="movePlanList"
          ></profile-menu-item>
          <my-page-modal></my-page-modal>
        </div>
      </div>
      <button class="user-menu" @click.stop="onClickProfile" v-else>
        <hamburger-button :clicked="showModal"></hamburger-button>
        <font-awesome-icon :icon="['fas', 'user']" />
        <div
          v-if="showModal"
          class="loginDropDown"
          @click.stop=""
          ref="loginDropDown"
        >
          <profile-menu-item
            title="회원가입"
            event="showRegisterModal"
          ></profile-menu-item>
          <profile-menu-item
            title="로그인"
            event="showLoginModal"
          ></profile-menu-item>
        </div>
      </button>
    </header>
    <register-modal v-if="openRegisterModal"></register-modal>
    <login-modal v-if="openLoginModal"></login-modal>
    <!-- <div class="bg" @click.stop="onClickBackground"></div> -->
  </div>
</template>

<script>
import HamburgerButton from "./HamburgerButton.vue";
import ProfileMenuItem from "./ProfileMenuItem.vue";
import RegisterModal from "@/components/RegisterModal.vue";
import LoginModal from "@/components/LoginModal.vue";
import MyPageModal from "./User/MyPageModal.vue";
import EventBus from "@/util/EventBus.js";
import { mapActions, mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "MainHeader",
  components: {
    HamburgerButton,
    ProfileMenuItem,
    RegisterModal,
    LoginModal,
    MyPageModal,
  },
  data() {
    return {
      showModal: false,
      openRegisterModal: false,
      openLoginModal: false,
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },

  created() {
    EventBus.$on("showLoginModal", this.showLoginModal);
    EventBus.$on("showRegisterModal", this.showRegisterModal);
    EventBus.$on("closeRegisterModal", this.closeRegisterModal);
    EventBus.$on("closeLoginModal", this.closeLoginModal);
    EventBus.$on("logout", this.logout);
    EventBus.$on("movePlanList", this.movePlanList);
  },
  methods: {
    ...mapActions(userStore, ["logoutUser"]),
    onClickSido() {},
    onClickBackground() {
      this.showModal = false;
      this.openRegisterModal = false;
      this.openLoginModal = false;
    },
    onClickProfile() {
      this.showModal = !this.showModal;

      if (this.showModal) {
        document.addEventListener("click", this.documentClick);
      } else {
        document.removeEventListener("click", this.documentClick);
      }
    },
    showRegisterModal() {
      this.showModal = false;
      this.openRegisterModal = true;
      document.removeEventListener("click", this.documentClick);
    },
    showLoginModal() {
      this.showModal = false;
      this.openLoginModal = true;
      document.removeEventListener("click", this.documentClick);
    },
    closeRegisterModal() {
      this.openRegisterModal = false;
    },
    closeLoginModal() {
      this.openLoginModal = false;
    },
    logout() {
      this.logoutUser();
      this.showModal = false;
      document.removeEventListener("click", this.documentClick);
    },
    movePlanList() {
      this.showModal = false;
      document.removeEventListener("click", this.documentClick);

      this.$router.push({ name: "planList" });
    },
    documentClick(e) {
      const el = this.$refs.loginDropDown;
      const target = e.target;

      if (!el) {
        return;
      }

      if (el !== target && !el.contains(target)) {
        this.showModal = false;
      }
    },
  },
};
</script>

<style scoped>
.header-container {
  top: 0;
  position: sticky;
  z-index: 100;
  background: linear-gradient(to right, #e61e4d 0%, #e31c5f 50%, #d70466 100%);
}

header {
  position: relative;
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  align-items: center;
}

#search-bar {
  border-radius: 40px;
  border: 1px solid #dddddd;
  min-width: 348px;
  height: 48px;
  display: inline-flex;
  align-items: center;
}

span {
  flex: 0 0 1px;
  height: 24px;
  width: 1px;
  background-color: #dddddd;
}

.search-button {
  flex: 1 1 auto;
  background-color: transparent;
  border: none;
  height: 100%;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}

.bg {
  height: 100vh;
  /* background-color: rgb(0 0 0 / 25%);
   */
  background-color: #22222222;
}

.loginDropDown {
  cursor: default;
  width: fit-content;
  height: fit-content;
  right: 0px;
  padding: 16px 0;
  background-color: white;
  position: absolute;
  top: 100%;
  margin-top: 10px;
  z-index: 1000;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 8px 16px rgba(0, 0, 0, 0.15);
}

.outer {
  position: relative;
}

.user-menu {
  position: relative;
  flex: 0 1 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: transparent;
  cursor: pointer;
  margin: 0;
  text-align: inherit;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  border-radius: 21px;
  transition: box-shadow 0.2s ease;
  height: 42px;
  width: 77px;
}

.myprofile {
  position: relative;
}
</style>