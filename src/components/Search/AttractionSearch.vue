<template>
  <div class="search-section">
    <div class="searchbar-section">
      <span
        >나는
        <underline-select
          v-if="sidos.length"
          :items="sidos"
          event="selectSido"
          :selected="sido.sidoName"
        ></underline-select>

        <span v-if="guguns.length"
          ><underline-select
            :items="guguns"
            event="selectGugun"
            :selected="gugun.gugunName"
          ></underline-select
          >에서
        </span>
        <underline-select
          :items="contents"
          event="selectContent"
          :selected="content.contentName"
        ></underline-select
        >즐기고 싶어요.
      </span>
    </div>
  </div>
</template>

<script>
import { getGugun, getSido } from "@/api/location";
import { mapActions, mapMutations, mapState } from "vuex";
import contents from "@/constant/content.js";
import UnderlineSelect from "@/components/Search/UnderlineSelect.vue";
import EventBus from "@/util/EventBus.js";

const searchStore = "searchStore";

export default {
  name: "AttractionSearch",
  components: {
    UnderlineSelect,
  },
  data() {
    return {
      sidos: [],
      guguns: [],
      contents,
    };
  },
  created() {
    getSido(
      ({ data }) => {
        this.sidos = data.map(({ sidoCode, sidoName }) => ({
          value: sidoCode,
          title: sidoName,
        }));

        getGugun(
          this.sido.sidoCode,
          ({ data }) => {
            this.guguns = data.map(({ gugunCode, gugunName }) => ({
              value: gugunCode,
              title: gugunName,
            }));
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );

    EventBus.$on("selectSido", this.selectSido);
    EventBus.$on("selectGugun", this.selectGugun);
    EventBus.$on("selectContent", this.selectContent);
  },
  computed: {
    ...mapState(searchStore, ["sido", "gugun", "content"]),
  },
  methods: {
    ...mapMutations(searchStore, ["SET_SIDO", "SET_GUGUN", "SET_CONTENT"]),
    ...mapActions(searchStore, ["search"]),
    selectSido({ value, title }) {
      getGugun(
        value,
        ({ data }) => {
          this.guguns = data.map(({ gugunCode, gugunName }) => ({
            value: gugunCode,
            title: gugunName,
          }));

          this.SET_GUGUN(data[0]);
          this.search(() => {
            EventBus.$emit("updateMap");
          });
        },
        (error) => {
          console.log(error);
        }
      );

      this.SET_SIDO({ sidoCode: value, sidoName: title });
    },
    selectGugun({ value, title }) {
      this.SET_GUGUN({ gugunCode: value, gugunName: title });
      this.search(() => {
        EventBus.$emit("updateMap");
      });
    },
    selectContent({ value, title }) {
      this.SET_CONTENT({ contentCode: value, contentName: title });
      this.search(() => {
        EventBus.$emit("updateMap");
      });
    },
  },
};
</script>

<style scoped>
.search-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
}

.searchbar-section span {
  font-size: 40px;
}
.searchbar-section {
  display: flex;
  justify-content: center;
}
</style>