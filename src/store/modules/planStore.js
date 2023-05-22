const planStore = {
    namespaced: true,
    state: {
        plans: [],
        planId: Number,
        day: Number,
    },
    mutations: {
        SELECT_PLAN(state, planId) {
            state.planId = planId;
            state.day = 0;
        },
        SELECT_DAY(state, day) {
            state.day = day;
        },
        SET_PLANS(state, plans) {
            state.plans = plans;
        }
    },
    actions: {
        selectPlan({ commit }, planId) {
            commit("SELECT_PLAN", planId);
        },
        selectDay({ commit }, day) {
            commit("SELECT_DAY", day);
        },
        setPlans({ commit }, plans) {
            commit("SET_PLANS", plans);
        }
    }
}

export default planStore;