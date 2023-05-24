<template>
  <div>
    <attraction-search></attraction-search>
    <div class="search-container">
      <div class="attraction-section">
        <div class="attraction-grid">
          <template v-for="attraction in searchResults">
            <attraction-search-card
              :key="attraction.contentId"
              :attraction="attraction"
            ></attraction-search-card>
          </template>
        </div>

        <v-pagination
          v-model="page"
          :length="calculatePageNo"
          rounded="circle"
          @input="onClickPage"
          :total-visible="7"
        ></v-pagination>
      </div>
      <search-result-map></search-result-map>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SearchResultMap from "@/components/SearchResultMap.vue";
import AttractionSearch from "@/components/Search/AttractionSearch.vue";
import EventBus from "@/util/EventBus.js";
import AttractionSearchCard from "@/components/Search/AttractionCardSearch.vue";

const searchStore = "searchStore";

export default {
  name: "SearchView",
  data() {
    return {
      page: 1,
    };
  },
  components: {
    // AttractionCard,
    SearchResultMap,
    AttractionSearch,
    AttractionSearchCard,
  },

  computed: {
    ...mapState(searchStore, ["searchResults", "totalCnt"]),
    calculatePageNo() {
      if (this.totalCnt % 9 === 0) {
        return parseInt(this.totalCnt / 9);
      }

      return parseInt(this.totalCnt / 9) + 1;
    },
  },
  created() {},
  methods: {
    ...mapActions(searchStore, ["searchByPage"]),
    onClickPage(pageIndex) {
      this.searchByPage({
        pageIndex,
        callback: () => {
          EventBus.$emit("updateMap");
        },
      });
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  width: 100%;
}

.attraction-grid {
  display: flex;
  overflow-y: scroll;
  flex-wrap: wrap;
  height: 100vh;
  justify-content: center;
}

.attraction-section {
  width: 100%;
}
</style>