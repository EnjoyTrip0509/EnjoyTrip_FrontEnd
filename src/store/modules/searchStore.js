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
        searchResults: null
    },
    getters: {
        positions: (state) => {
            return state.searchResults.map(({title, latitude, longitude}) => ({ title, latitude, longitude}));
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
        }
    },
    actions: {
        search({ state, commit }, callback) {
            searchAttractions(
                {
                    sidoCode: state.sido.sidoCode,
                    gugunCode: state.gugun.gugunCode,
                    contentTypeId: state.content.contentCode
                },
                ({ data }) => {
                    commit("SET_RESULT", data);
                    callback();
                },
                (error) => {
                    console.log(error);
                }
            )
        },
    }
}

export default searchStore;