<template>
  <div class="select" @click.stop="onClickSelect">
    {{ selected }}
    <ul class="dropdown" :class="{ hide: !open }">
      <!-- <li @click.stop="closeDropdown">서울</li>
      <li @click.stop="closeDropdown">대구</li>
      <li @click.stop="closeDropdown">부산</li>
      <li @click.stop="closeDropdown">광주</li> -->

      <li v-for="item in items" data-id="`${item.value}`" :key="item.value">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UnderlineSelect",
  components: {},
  props: {
    items: Array,
  },
  data() {
    return {
      open: false,
      selected: "",
    };
  },
  created() {},
  methods: {
    onClickSelect() {
      this.open = !this.open;
    },
    closeDropdown(e) {
      this.open = false;
      this.selected = e.target.textContent;
    },
  },
  mounted() {
    this.selected = this.items[0].title;
  },
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