<template>
  <div id="app">
    <main-header></main-header>
    <router-view></router-view>
  </div>
</template>


<script>
import MainHeader from "@/components/MainHeader.vue";
export default {
  components: {
    MainHeader,
  },
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
}
</style>
