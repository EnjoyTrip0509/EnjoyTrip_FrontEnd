<template>
  <div class="hamburger-button-container">
    <span :class="{ clicked: clicked }"></span>
    <span :class="{ clicked: clicked }"></span>
    <span :class="{ clicked: clicked }"></span>
  </div>
</template>

<script>
export default {
  name: "HamburgerButton",
  components: {},
  props: {
    clicked: Boolean,
  },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
.hamburger-button-container {
  display: block;
  width: 16px;
  height: 10px;
  position: relative;
  cursor: pointer;
  background-color: white;
}

span {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  border-radius: 30px;
  background: #000;
  transition: all 0.35s;
}

span:nth-child(1) {
  top: 0;
}

span:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

span:nth-child(3) {
  bottom: 0;
}

span:nth-child(1).clicked {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

span:nth-child(2).clicked {
  opacity: 0;
}

span:nth-child(3).clicked {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}
</style>