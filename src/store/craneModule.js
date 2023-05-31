import CustomizedAxios from "../plugins/axios.js";

const craneModule = {
  state: {
    cranes: [],
  },
  mutations: {
    SET_CRANES(state, cranes) {
      state.cranes = cranes;
    },
    ADD_CRANE(state, crane) {
      state.cranes.push(crane);
    },
    EDIT_CRANE(state, crane) {
      state.cranes = state.cranes.map((c) => {
        if (c.id == crane.id) return crane;
        return c;
      });
    },
    DELETE_CRANE(state, crane) {
      state.cranes = state.cranes.filter((c) => c.id != crane.id);
    },
  },
  actions: {
    addCraneAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/cranes/create", payload)
          .then((response) => {
            commit("ADD_CRANE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setCranesAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("/api/cranes")
          .then((response) => {
            commit("SET_CRANES", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    editCranesAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/cranes/update", payload)
          .then((response) => {
            commit("EDIT_CRANE", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteCraneAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/cranes/delete", payload)
          .then((response) => {
            commit("DELETE_CRANE", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getCranes: (state) => {
      return state.cranes;
    },
  },
};
export default craneModule;
