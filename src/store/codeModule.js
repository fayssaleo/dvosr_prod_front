import CustomizedAxios from "../plugins/axios.js";

const codeModule = {
  state: {
    codes: [],
  },
  mutations: {
    SET_CODES(state, codes) {
      state.codes = codes;
    },
    ADD_CODE(state, code) {
      state.codes.push(code);
    },
    EDIT_CODE(state, code) {
      state.codes = state.codes.map((c) => {
        if (c.id == code.id) return code;
        return c;
      });
    },
    DELETE_CODE(state, code) {
      state.codes = state.codes.filter((c) => c.id != code.id);
    },
  },
  actions: {
    addCodeAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/codes/create", payload)
          .then((response) => {
            if (response.data.status == "200")
              commit("ADD_CODE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setCodesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/codes")
          .then((response) => {
            commit("SET_CODES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editCodesAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/codes/update", payload)
          .then((response) => {
            if (response.data.status == "200")
              commit("EDIT_CODE", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteCodeAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/codes/delete", payload)
          .then((response) => {
            commit("DELETE_CODE", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getCodes: (state) => {
      return state.codes;
    },
  },
};
export default codeModule;
