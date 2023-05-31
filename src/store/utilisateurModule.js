import CustomizedAxios from "../plugins/axios.js";
const utilisateurModule = {
  state: {
    users: [],
    authenticatedUser: null,
    token: "",
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    UPDATE_USERS(state, user) {
      state.users = state.users.map((u) => {
        if (u.id == user.id) {
          u = user;
        }
        return u;
      });
    },
    CREATE_USERS(state, user) {
      state.users.push(user);
    },
    DELETE_USER(state, user) {
      state.users = state.users.filter((u) => u.id != user.id);
    },
    LOGIN_USER(state, payload) {
      state.authenticatedUser = payload.utilisateur;

      CustomizedAxios.defaults.headers.common = {
        Authorization: `Bearer ${payload.token}`,
        Accept: "application/json",
      };
      state.token = payload.token;
    },
    LOGOUT_USER(state, payload) {
      state.authenticatedUser = null;
      CustomizedAxios.defaults.headers.common = {
        Authorization: "Bearer ",
      };
    },
  },
  actions: {
    setUsersAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.get("api/utilisateurs")
          .then((response) => {
            commit("SET_USERS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            return reject(error);
          });
      });
    },
    updateUserAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/utilisateurs/update", payload)
          .then((response) => {
            if (response.data.status == "200")
              commit("UPDATE_USERS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addUserAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/utilisateurs/create", payload)
          .then((response) => {
            if (response.data.status == "200")
              commit("CREATE_USERS", response.data.payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    deleteUersAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("/api/utilisateurs/delete", payload)
          .then((response) => {
            commit("DELETE_USER", payload);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changeUserPasswordAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/utilisateurs/changePassword", payload)
          .then((response) => {
            resolve(response.data.payload);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    loginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/utilisateurs/login", payload)
          .then((response) => {
            commit("LOGIN_USER", response.data.payload);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    logoutAction({ commit }) {
      return new Promise((resolve, reject) => {
        CustomizedAxios.post("api/utilisateurs/logout")
          .then((response) => {
            commit("LOGOUT_USER");
            resolve(response.data.payload);
          })
          .catch((error) => {
            commit("LOGOUT_USER");
            reject(error);
          });
      });
    },
  },
  getters: {
    getUsers: (state) => {
      return state.users;
    },
    getAuthenticatedUser: (state) => {
      return state.authenticatedUser;
    },
  },
};
export default utilisateurModule;
