import { searchAttractions } from "@/api/attraction.js";

const searchStore = {
    namespaced: true,
    state: {
        sido: {
            sidoCode: '',
            sidoName: ''
        },
        gugun: {
            gugunCode: '',
            gugunName: ''
        },
        content: {
            contentCode: '',
            contentName: ''
        },
        searchResults: null,
        totalCnt: 0,
    },
    getters: {
        positions: (state) => {
            return state.searchResults.map(({ title, latitude, longitude, contentTypeId }) => ({ title, latitude, longitude, contentTypeId }));
        }
    },
    mutations: {
        SET_SIDO: (state, sido) => {
            state.sido = sido;
        },
        SET_GUGUN: (state, gugun) => {
            state.gugun = gugun;
        },
        SET_CONTENT: (state, content) => {
            state.content = content;
        },
        SET_RESULT: (state, results) => {
            state.searchResults = results;
        },
        SET_TOTAL_COUNT: (state, totalCnt) => {
            state.totalCnt = totalCnt;
        }
    },
    actions: {
        search({ state, commit }, callback) {
            searchAttractions(
                {
                    sidoCode: state.sido.sidoCode,
                    gugunCode: state?.gugun?.gugunCode,
                    contentTypeId: state.content.contentCode,
                    pageNo: 0,
                },
                ({ data }) => {
                    commit("SET_RESULT", data.attractions);
                    commit("SET_TOTAL_COUNT", data.resultCount);
                    callback();
                },
                (error) => {
                    console.log(error);
                }
            )
        },

        searchByPage({ state, commit }, { pageIndex, callback }) {
            searchAttractions(
                {
                    sidoCode: state.sido.sidoCode,
                    gugunCode: state?.gugun?.gugunCode,
                    contentTypeId: state.content.contentCode,
                    pageNo: pageIndex,
                },
                ({ data }) => {
                    commit("SET_RESULT", data.attractions);
                    callback();
                },
                (error) => {
                    console.log(error);
                }
            )

        }
    }
}

export default searchStore;