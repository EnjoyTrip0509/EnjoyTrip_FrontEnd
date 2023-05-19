<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";

const searchStore = "searchStore";

export default {
  name: "SearchView",
  data() {
    return {
      message: "",
    };
  },
  created() {
    this.search();
  },
  methods: {
    ...mapActions(searchStore, ["search"]),
  },
};
</script>

<style scoped></style>