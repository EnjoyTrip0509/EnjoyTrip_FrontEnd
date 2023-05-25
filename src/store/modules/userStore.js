import { login, tokenRegeneration, logout } from "@/api/user.js"

const userStore = {
    namespaced: true,
    state: {
        userInfo: null,
        isLogin: false,
    },
    getters: {},
    mutations: {
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo;
            state.isLogin = true;
        },
        REMOVE_USER_INFO: (state) => {
            state.userInfo = null;
            state.isLogin = false;
        }
    },
    actions: {
        async loginUser({ commit }, { user, successCallback, failCallback }) {
            await login(
                user,
                ({ data }) => {
                    if (data.message === 'fail') {
                        failCallback()
                        return;
                    }
                    const accessToken = data["access-token"];
                    const refreshToken = data["refresh-token"];

                    commit("SET_USER_INFO", data.userInfo);

                    sessionStorage.setItem("access-token", accessToken);
                    sessionStorage.setItem("refresh-token", refreshToken);

                    successCallback();
                },
                (error) => {
                    alert(error);
                }
            )
        },
        async tokenRegeneration({ state }) {
            await tokenRegeneration(
                JSON.Stringify(state.userInfo),
                ({ data }) => {
                    if (data.message === "success") {
                        let accessToken = data["access-token"];
                        console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
                        sessionStorage.setItem("access-token", accessToken);
                    }
                },
                async (error) => {
                    // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
                    if (error.response.status === 401) {
                        console.log("갱신 실패");
                        // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
                        await logout(
                            state.userInfo.userid,
                            ({ data }) => {
                                if (data.message === "success") {
                                    console.log("리프레시 토큰 제거 성공");
                                } else {
                                    console.log("리프레시 토큰 제거 실패");
                                }
                                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                    }
                }
            )
        },
        async logoutUser({ commit, state }) {
            await logout(
                state.userInfo.id,
                ({ data }) => {
                    if (data.message === "success") {
                        commit("REMOVE_USER_INFO");

                        sessionStorage.removeItem("access-token");
                        sessionStorage.removeItem("refresh-token");
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    },

}

export default userStore;