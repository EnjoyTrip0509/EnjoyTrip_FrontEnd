<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600px"
      @click:outside="onClickOutside"
    >
      <template v-slot:activator="{ attrs }">
        <profile-menu-item
          title="내 정보 보기"
          event="showDialog"
          v-bind="attrs"
        ></profile-menu-item>
      </template>
      <div v-if="!isModifying" class="content">
        <user-info-table></user-info-table>
        <div class="button-box">
          <v-btn color="green darken-1" text @click="modifyUserInfo"
            >수정하기</v-btn
          ><v-btn color="red darken-1 " text @click="closeDialog">닫기</v-btn>
        </div>
      </div>

      <div v-if="isModifying" class="content">
        <user-password-check></user-password-check>
      </div>

      <div class="content"></div>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from "@/util/EventBus";
import ProfileMenuItem from "../ProfileMenuItem.vue";
import UserInfoTable from "./UserInfoTable.vue";
import UserPasswordCheck from "@/components/User/UserPasswordCheck.vue";

export default {
  components: {
    UserInfoTable,
    ProfileMenuItem,
    UserPasswordCheck,
  },
  created() {
    EventBus.$on("showDialog", this.showDialog);
    EventBus.$on("moveToMyInfoStep", this.showMyInfo);
    EventBus.$on("modifyMyInfo", this.showModifyForm);
  },
  data: () => ({
    dialog: false,
    isModifying: false,
    showForm: false,
  }),
  methods: {
    showDialog() {
      this.dialog = !this.dialog;
    },
    closeDialog() {
      this.dialog = false;
    },
    modifyUserInfo() {
      this.isModifying = true;
    },
    showMyInfo() {
      this.isModifying = false;
    },
    onClickOutside() {
      this.isModifying = false;
    },
    showModifyForm() {
      this.isModifying = false;
    },
  },
};
</script>
<style scoped>
.content {
  background-color: white;
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

