const snackBarModule = {
  state: {
    snackbar: false,
    sbackbarText: "",
    success: false,
  },
  mutations: {
    SET_SNACK_BAR_TO_SUCCESS(state) {
      state.snackbar = true;
      state.sbackbarText = "Successfully !";
      state.success = true;
      setTimeout(function () {
        state.snackbar = false;
      }, 3000);
    },
    SET_SNACK_BAR_TO_FAILED(state, payload) {
      state.snackbar = true;
      state.sbackbarText = payload;
      state.success = false;
      setTimeout(function () {
        state.snackbar = false;
      }, 3000);
    },
    CLOSE_SNACK_BAR(state) {
      state.snackbar = false;
    },
  },
  actions: {
    setSnackBarTosSuccess({ commit }) {
      commit("SET_SNACK_BAR_TO_SUCCESS");
    },
    setSnackBarTosFailed({ commit }, payload) {
      commit("SET_SNACK_BAR_TO_FAILED", payload);
    },
    closeSnackBar({ commit }) {
      commit("CLOSE_SNACK_BAR");
    },
  },
  getters: {
    getSnackBarstate: (state) => {
      return state.snackbar;
    },
    getSnackBarClassState: (state) => {
      return state.success;
    },
    getSnackBarText: (state) => {
      return state.sbackbarText;
    },
  },
};
export default snackBarModule;
