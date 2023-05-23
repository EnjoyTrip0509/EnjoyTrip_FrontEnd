<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ attrs }">
        <profile-menu-item
          title="내 정보 보기"
          event="showMyInfo"
          v-bind="attrs"
        ></profile-menu-item>
      </template>
      <user-info-table></user-info-table>
    </v-dialog>
  </div>
</template>
<script>
import EventBus from "@/util/EventBus";
import ProfileMenuItem from "../ProfileMenuItem.vue";
import UserInfoTable from "./UserInfoTable.vue";

export default {
  components: {
    UserInfoTable,
    ProfileMenuItem,
  },
  created() {
    EventBus.$on("showMyInfo", this.showMyInfo);
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    showMyInfo() {
      this.dialog = !this.dialog;
    },
  },
};
</script>

