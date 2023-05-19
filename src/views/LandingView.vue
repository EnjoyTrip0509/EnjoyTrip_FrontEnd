<template>
  <div>
    <div class="image-section">
      <landing-image filename="river.jpg"></landing-image>
      <landing-image filename="palace.jpg"></landing-image>
      <landing-image filename="lake.jpg"></landing-image>
      <div class="title"><h3>Discover story-worthy travel moments</h3></div>
    </div>

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

      <div class="searchbutton-section">
        <button>내 취향 여행지 확인하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import LandingImage from "@/components/LandingImage.vue";
import UnderlineSelect from "@/components/UnderlineSelect.vue";
import contentId from "@/constant/content.js";
import { getSido, getGugun } from "@/api/location.js";
import { mapMutations, mapState } from "vuex";
import EventBus from "@/util/EventBus.js";
import contents from "@/constant/content.js";

const searchStore = "searchStore";

export default {
  name: "LandingView",
  components: {
    LandingImage,
    UnderlineSelect,
  },
  data() {
    return {
      contentId,
      sidos: [],
      guguns: [],
      contents,
    };
  },
  computed: {
    ...mapState(searchStore, ["sido", "gugun", "content"]),
  },
  created() {
    getSido(
      ({ data }) => {
        this.sidos = data.map(({ sidoCode, sidoName }) => ({
          value: sidoCode,
          title: sidoName,
        }));
        this.SET_SIDO(data[0]);
      },
      (error) => {
        console.log(error);
      }
    );

    this.SET_CONTENT({
      contentCode: this.contents[0].value,
      contentName: this.contents[0].title,
    });

    EventBus.$on("selectSido", this.selectSido);
    EventBus.$on("selectGugun", this.selectGugun);
    EventBus.$on("selectContent", this.selectContent);
  },
  methods: {
    ...mapMutations(searchStore, ["SET_SIDO", "SET_GUGUN", "SET_CONTENT"]),
    selectSido({ value, title }) {
      getGugun(
        value,
        ({ data }) => {
          this.guguns = data.map(({ gugunCode, gugunName }) => ({
            value: gugunCode,
            title: gugunName,
          }));

          this.SET_GUGUN(data[0]);
        },
        (error) => {
          console.log(error);
        }
      );

      this.SET_SIDO({ sidoCode: value, sidoName: title });
    },
    selectGugun({ value, title }) {
      this.SET_GUGUN({ gugunCode: value, gugunName: title });
    },
    selectContent({ value, title }) {
      this.SET_CONTENT({ contentCode: value, contentName: title });
    },
  },
};
</script>

<style scoped>
.image-section {
  display: flex;
  position: relative;
}

.search-section {
  margin-top: 120px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.searchbar-section {
  display: flex;
  justify-content: center;
}

.searchbutton-section {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.searchbutton-section button {
  width: 200px;
  height: 50px;
  border: 0;
  background-color: #000000;
  color: #ffffffff;
  border-radius: 50px;
}

.title {
  position: absolute;
  top: 25vh;
  z-index: 10;
  width: 100%;
  display: flex;
  color: white;
  justify-content: center;

  text-align: center;
}

h3 {
  max-width: 60rem;
  padding: 0;
  margin: 0;
  font-size: 80px;
  font-weight: 600;
}
</style>
