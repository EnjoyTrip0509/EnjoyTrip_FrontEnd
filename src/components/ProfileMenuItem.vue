<template>
  <div>
    <div v-if="disabled" class="text">{{ title }}님 어서오세요!</div>
    <button v-else @click.stop="onClickMenu">{{ title }}</button>
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
    disabled: Boolean,
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

.text {
  border: 0;
  background-color: transparent;
  width: 240px;
  height: 40px;
  appearance: none;
  text-align: start;
  font-size: 15px;
  font-weight: 700;
  padding: 0 0 0 10px;
}
button:hover {
  background-color: #f7f7f7;
}
</style>