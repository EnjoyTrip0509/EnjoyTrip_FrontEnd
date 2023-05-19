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
* {
  box-sizing: border-box;
}
body,
html {
  padding: 0;
  margin: 0;
}

body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

@font-face {
  font-family: "KBO-Dia-Gothic_bold";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/KBO-Dia-Gothic_bold.woff")
    format("woff");
  font-weight: 700;
  font-style: normal;
}
</style>
