<template>
  <div class="select" @click.stop="onClickSelect" ref="dropdownMenu">
    {{ selected }}
    <ul class="dropdown" :class="{ hide: !open }">
      <li
        v-for="item in items"
        data-id="`${item.value}`"
        :key="item.value"
        @click.stop="closeDropdown(item)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import EventBus from "@/util/EventBus.js";

export default {
  name: "UnderlineSelect",
  components: {},
  props: {
    items: Array,
    event: String,
    selected: String,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    onClickSelect() {
      this.open = !this.open;

      if (this.open) {
        document.addEventListener("click", this.documentClick);
      } else {
        document.removeEventListener("click", this.documentClick);
      }
    },
    closeDropdown(item) {
      this.open = false;
      EventBus.$emit(this.event, item);
      document.removeEventListener("click", this.documentClick);
    },
    documentClick(e) {
      const el = this.$refs.dropdownMenu;
      const target = e.target;

      if (!el) {
        return;
      }

      if (el !== target && !el.contains(target)) {
        this.open = false;
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.select {
  position: relative;
  font-family: "KBO-Dia-Gothic_bold";
  font-size: 34px;
  border: solid 2px transparent;
  border-bottom: solid 2px #111;
  padding: 12px 10px 5px 0;
  height: auto;
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
}

.dropdown {
  box-sizing: border-box;
  position: absolute;
  height: auto;
  width: 100%;
  height: auto;
  max-height: 206px;
  overflow: auto;
  top: 100%;
  padding: 0;
  margin-top: 10px;
  border: 0;
  border-radius: 4px;
  box-shadow: 3px 7.4px 60.8px 18.2px rgba(189, 189, 189, 0.43);
  background-color: #fff;
}

.hide {
  display: none;
}

li {
  list-style: none;
  background-color: #f7f7f7;
  font-weight: bold;
  font-size: 18px;
  font-family: "NotoSansCJKkr", Helvetica, sans-serif;
  text-align: center;
}

li:hover {
  background-color: #e5e5e5;
}
</style>