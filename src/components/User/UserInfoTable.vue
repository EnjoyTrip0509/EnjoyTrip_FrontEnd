<template>
  <div>
    <v-simple-table class="pa-9 pb-0">
      <template v-slot:default>
        <span class="text-h5 mb-4 mypage-title"
          >{{ userInfo.name }}님의 정보</span
        >
        <tbody>
          <tr>
            <td>이름</td>
            <td>{{ userInfo.name }}</td>
          </tr>
          <tr>
            <td>아이디</td>
            <td>{{ userInfo.id }}</td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>{{ userInfo.email }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserInfoTable.vue",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style scoped>
.mypage-title {
  display: inline-block;
}
</style>