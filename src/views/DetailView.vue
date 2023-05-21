<template>
    <div>
      DetailView입니다.
    </div>
</template>

<script>
import { getAttractionDetail } from "@/api/attraction.js";

export default {
  data() {
    return {
      attraction: null,
    }
  },
  created() {
    const contentId = this.$route.params.contentId;

    getAttractionDetail(contentId, ({ data }) => {
      this.attraction = data;
    },
    (error) => console.log(error)
    )
  }
}
</script>

<style>

</style>