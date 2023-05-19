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
    }
}

export default searchStore;