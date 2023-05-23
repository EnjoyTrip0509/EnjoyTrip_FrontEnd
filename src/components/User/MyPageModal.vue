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
      <div v-if="!isModifying && !showForm" class="content">
        <user-info-table></user-info-table>
        <div class="button-box">
          <v-btn color="green darken-1" text @click="modifyUserInfo"
            >수정하기</v-btn
          ><v-btn color="red darken-1 " text @click="closeDialog">닫기</v-btn>
        </div>
      </div>

      <div v-if="isModifying && !showForm" class="content">
        <user-password-check></user-password-check>
      </div>

      <div v-if="showForm && !isModifying" class="content">
        <user-update-form></user-update-form>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from "@/util/EventBus";
import ProfileMenuItem from "../ProfileMenuItem.vue";
import UserInfoTable from "./UserInfoTable.vue";
import UserPasswordCheck from "@/components/User/UserPasswordCheck.vue";
import UserUpdateForm from "@/components/User/UserUpdateForm.vue";

export default {
  components: {
    UserInfoTable,
    ProfileMenuItem,
    UserPasswordCheck,
    UserUpdateForm,
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

      if (!this.dialog) {
        this.isModifying = false;
        this.showForm = false;
      }
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
      this.showForm = false;
    },
    showModifyForm() {
      this.isModifying = false;
      this.showForm = true;
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

