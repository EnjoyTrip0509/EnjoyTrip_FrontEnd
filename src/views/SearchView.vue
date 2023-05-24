<template>
  <div>
    <attraction-search></attraction-search>
    <div class="search-container">
      <div class="attraction-grid">
        <template v-for="attraction in searchResults">
          <attraction-card
            :key="attraction.contentId"
            :attraction="attraction"
          ></attraction-card>
        </template>
      </div>

      <search-result-map></search-result-map>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AttractionCard from "@/components/AttractionCard.vue";
import SearchResultMap from "@/components/SearchResultMap.vue";
import AttractionSearch from "@/components/Search/AttractionSearch.vue";

const searchStore = "searchStore";

export default {
  name: "SearchView",
  data() {
    return {
      message: "",
    };
  },
  components: {
    AttractionCard,
    SearchResultMap,
    AttractionSearch,
  },

  computed: {
    ...mapState(searchStore, ["searchResults"]),
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.attraction-grid {
  width: 100%;
  display: grid;
  gap: 40px 24px;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px;
}
</style>