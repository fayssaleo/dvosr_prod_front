<template>
  <v-app class="home">
    <LoadingPage v-if="getModuleShow" />
    <Home v-if="Logged" />
    <Login v-else />
  </v-app>
</template>

<script>
import Home from "./components/Home.vue";
import LoadingPage from "./components/LoadingPage.vue";
import Login from "./components/utilisateurs/Login.vue";
import { mapGetters } from "vuex";
export default {
  components: { Home, Login, LoadingPage },
  name: "App",
  computed: {
    ...mapGetters(["getAuthenticatedUser", "getShift", "getModuleShow"]),
    Logged() {
      if (this.getAuthenticatedUser == null) return false;
      else if (
        this.getAuthenticatedUser.role == "Foremen" &&
        (this.getShift == "" || this.getShift == null)
      )
        return false;
      else return true;
    },
  },
};
</script>
