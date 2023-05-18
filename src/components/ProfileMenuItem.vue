<template>
  <div>
    <button @click.stop="onClickMenu">{{ title }}</button>
  </div>
</template>

<script>
import EventBus from "@/util/EventBus.js";

export default {
  name: "ProfileMenuItem",
  components: {},
  props: {
    title: String,
    event: String,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    onClickMenu() {
      EventBus.$emit(this.event);
    },
  },
};
</script>

<style scoped>
button {
  border: 0;
  background-color: transparent;
  width: 240px;
  height: 40px;
  appearance: none;
  text-align: start;
  font-size: 15px;
  font-weight: 700;
  padding: 0 0 0 10px;
  cursor: pointer;
}

button:hover {
  background-color: #f7f7f7;
}
</style>