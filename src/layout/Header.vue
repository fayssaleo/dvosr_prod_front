<template>
  <v-toolbar color="#E0E0E0" class="Vtoolbar">
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      v-if="
        getAuthenticatedUser.role == 'Admin' ||
        getAuthenticatedUser.role == 'Documentation'
      "
    ></v-app-bar-nav-icon>
    <v-btn
      class="mx-2"
      fab
      dark
      small
      color="#90A4AE"
      @click="goBackToVoyage"
      v-if="isNotAdminAndNotAddVoyage"
    >
      <v-icon dark large> mdi-arrow-left-thin </v-icon>
    </v-btn>
    <div class="logo"></div>
    <v-spacer></v-spacer>
    <v-menu rounded="b-xl" offset-y bottom left>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          color="#90A4AE"
          class="white--text ma-5"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon class="mr-2">mdi-account-cog</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item link to="/changePassword">
          <v-list-item-title v-text="'Change my password'"></v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-title
            v-text="'Logout'"
            @click="logoutDialog"
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialogLogout" max-width="500px">
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to logout?</v-card-title
        >
        <br />

        <v-card-actions>
          <v-btn color="blue" @click="closeLogout">Cancel</v-btn>
          <v-spacer></v-spacer>

          <v-btn depressed color="error" @click="logoutConfirm">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>
</template>
<script lang="ts">
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogLogout: false,
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogLogout(val) {
      val || this.closeLogout();
    },
  },
  methods: {
    ...mapActions(["logoutAction", "shiftSetterAction"]),
    closeLogout() {
      this.dialogLogout = false;
    },
    logoutDialog() {
      this.dialogLogout = true;
    },
    logoutConfirm() {
      this.logoutAction().then(() => {
        this.shiftSetterAction({ ...{ shift: "" } });

        this.logoutDialog();
      });
    },
    goBackToVoyage() {
      this.$router.push("/voyages");
    },
  },
  computed: {
    ...mapGetters(["getAuthenticatedUser"]),
    drawer: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    isNotAdminAndNotAddVoyage() {
      if (
        this.getAuthenticatedUser.role != "Admin" &&
        this.getAuthenticatedUser.role != "Documentation" &&
        this.$route.path != "/voyages"
      )
        return true;
      else return false;
    },
  },
};
</script>
<style scoped>
.logo {
  width: 150px;
  height: 50px;
  background-color: black;
  background-image: url("./../assets/logo.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
