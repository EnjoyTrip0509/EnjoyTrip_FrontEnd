<template>
  <div class="header-container">
    <header>
      <router-link to="/">
        <img :src="require(`@/assets/logo_bold_negative.png`)" class="logo"
      /></router-link>

      <div class="center-img">
        <router-link to="/">
          <img :src="require(`@/assets/planet-earth.png`)" />
        </router-link>

      </div>
      <div class="user-button-container" v-if="this.isLogin">
        <button class="user-menu" @click.stop="onClickProfile">
          <hamburger-button :clicked="showModal"></hamburger-button>
          <font-awesome-icon :icon="['fas', 'user']" />
          <div
            v-if="showModal"
            class="loginDropDown"
            @click.stop=""
            ref="loginDropDown"
          >
            <profile-menu-item
              :title="userInfo.name"
              event=""
              :disabled="true"
            ></profile-menu-item>

            <profile-menu-item
              title="로그아웃"
              event="logout"
            ></profile-menu-item>
            <my-page-modal></my-page-modal>

            <profile-menu-item
              title="내 여행 계획"
              event="movePlanList"
            ></profile-menu-item>
            <profile-menu-item
              title="내 리뷰"
              event="moveReviewList"
            ></profile-menu-item>            
          </div>
        </button>
      </div>

      <div class="user-button-container" v-else>
        <button class="user-menu" @click.stop="onClickProfile">
          <hamburger-button :clicked="showModal"></hamburger-button>
          <font-awesome-icon :icon="['fas', 'user']" />
          <div
            v-if="showModal"
            class="loginDropDown"
            @click.stop=""
            ref="loginDropDown"
          >
            <register-modal></register-modal>
            <login-modal></login-modal>
          </div>
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import HamburgerButton from "./HamburgerButton.vue";
import ProfileMenuItem from "./ProfileMenuItem.vue";
import LoginModal from "@/components/User/LoginModal.vue";
import RegisterModal from "@/components/User/RegisterModal.vue";
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
    EventBus.$on("moveReviewList", this.moveReviewList);
    EventBus.$on("showDialog", this.onClickUserInfo);
    EventBus.$on("showLoginDialog", this.onClickUserInfo);
    EventBus.$on("showRegisterDialog", this.onClickUserInfo);
    EventBus.$on("closeDialog", this.onClickProfile);
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

      if (this.$route.path != '/plan/list') {
        this.$router.push('/plan/list');
      }
    },
    moveReviewList() {
      if (this.$route.path != '/review') {
        this.$router.push('/review');
      }
    },
    documentClick(e) {
      const el = this.$refs.loginDropDown;
      const target = e.target;

      if (!el) {
        return;
      }

      console.log(el.contains(target), el, target);

      if (el !== target && !el.contains(target)) {
        this.showModal = false;
      }
    },
    onClickUserInfo() {
      document.removeEventListener("click", this.documentClick);
    },
    onClickLogo() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header-container {
  top: 0;
  position: sticky;
  z-index: 100;
  background-color: black;
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

header a {
  display: flex;
  height: 100%;
  align-items: center;
}

.logo {
  cursor: pointer;
  height: 60%;
}

.center-img {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-4%);
}

.center-img img {
  height: 60%;
  /* transform: translateX(-110px); */
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
  color: black;
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
  width: 72px;
}

.myprofile {
  position: relative;
  color: white;
  height: 42px;
  width: 240px;
  display: flex;
  align-items: center;
}

.user-button-container {
  height: 100%;
  width: 240px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>