import CustomizedAxios from "../plugins/axios.js";

const actionDetailsModule = {
  state: {
    actionDetails: [],
  },
  mutations: {
    SET_ACTION_DETAILS(state, actionDetails) {
      state.actionDetails = actionDetails;
    },
    ADD_ACTION_DETAILS(state, actionDetail) {
      state.actionDetails.push(actionDetail);
    },
  },
  actions: {
    undoActionDetailAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/voyages/undoAction", payload)
          .then((response) => {
            if (response.data.status == "200")
              commit("ADD_ACTION_DETAILS", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setActionDetailsAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/voyages/vesselAllActionsDetails", payload)
          .then((response) => {
            commit("SET_ACTION_DETAILS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    getActionDetails: (state) => {
      return state.actionDetails;
    },
  },
};
export default actionDetailsModule;
