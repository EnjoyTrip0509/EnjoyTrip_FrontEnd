<template>
  <div>
    <attraction-search></attraction-search>
    <div class="search-container">
      <div class="attraction-section">
        <div class="attraction-grid">
          <template v-for="attraction in searchResults">
            <attraction-card
              :key="attraction.contentId"
              :attraction="attraction"
            ></attraction-card>
          </template>
        </div>

        <v-pagination
          v-model="page"
          :length="calculatePageNo"
          rounded="circle"
          @input="onClickPage"
        ></v-pagination>
      </div>
      <search-result-map></search-result-map>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AttractionCard from "@/components/AttractionCard.vue";
import SearchResultMap from "@/components/SearchResultMap.vue";
import AttractionSearch from "@/components/Search/AttractionSearch.vue";
import EventBus from "@/util/EventBus.js";

const searchStore = "searchStore";

export default {
  name: "SearchView",
  data() {
    return {
      page: 1,
    };
  },
  components: {
    AttractionCard,
    SearchResultMap,
    AttractionSearch,
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
  height: 100%;
}

.attraction-grid {
  width: 100%;
  display: grid;
  gap: 40px 24px;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px;
}

.attraction-section {
  width: 100%;
}
</style>