<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title style="width: 100%; text-align: center">{{
                  !showShift ? "Login form" : "Set Shift"
                }}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div class="logo"></div>
                <v-form v-if="!showShift" ref="formData">
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="credentials.username"
                    outlined
                    :rules="[rules.required]"
                    :error="isError"
                    ref="username"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="password"
                    label="Password"
                    v-model="credentials.password"
                    outlined
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    :rules="[rules.required]"
                    :error="isError"
                    ref="password"
                  ></v-text-field>

                  <h3
                    class="grey--text font-weight-medium mb-2 text-center error--text"
                  >
                    {{ text }}
                  </h3>
                </v-form>
                <v-form v-else ref="formData2">
                  <v-select
                    :items="['A', 'B', 'C', 'D']"
                    id="shif"
                    outlined
                    name="shift"
                    label="SHIFT"
                    v-model="shift"
                    :rules="[rules.required]"
                    prepend-icon="gear"
                    :error="isError"
                    ref="shift"
                  ></v-select>
                  <h3
                    class="grey--text font-weight-medium mb-2 text-center error--text"
                  >
                    {{ text }}
                  </h3>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="!showShift"
                  color="primary"
                  style="width: 100%"
                  @click="login"
                  v-on:keypress.enter="login()"
                  >Login</v-btn
                >
                <v-btn v-else color="primary" @click="SetShift">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Login",
  data: () => {
    return {
      text: "",
      credentials: {
        username: "",
        password: "",
      },
      show1: false,
      isValid: false,
      isError: false,
      showShift: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  props: {
    source: String,
  },
  computed: {
    ...mapGetters(["getAuthenticatedUser"]),
  },
  methods: {
    ...mapActions([
      "loginAction",
      "registerAction",
      "shiftSetterAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    login() {
      if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
        this.setModuleShowToTrueAction();
        this.loginAction(this.credentials)
          .then((response) => {
            if (response.status == "200") {
              if (this.getAuthenticatedUser.role == "Foremen")
                console.log("this.getActualShift() : ", this.getActualShift());
              this.shiftSetterAction({ ...{ shift: this.getActualShift() } });
              this.setModuleShowToFalseAction();
            } else if (response.status == "401") {
              this.text = response.payload;
              this.setModuleShowToFalseAction();
            }
          })
          .catch((error) => {
            this.setModuleShowToFalseAction();
          });
      }
      //this.registerAction();
    },
    SetShift() {
      if (!this.$refs.shift.hasError)
        this.shiftSetterAction({ ...{ shift: this.shift } });
      else this.text = "select a shift !";
    },
    getActualShift() {
      let thisDate = new Date("2022-02-16T07:00:00");
      let nowDate = new Date();
      let shift = ["D", "A", "B", "C"];
      let momentDate = moment(thisDate);

      while (momentDate.add(72, "hours").toDate() < nowDate) {
        shift = this.shiftArrays(shift);
      }
      if (nowDate.getHours() >= 7 && nowDate.getHours() < 15) return shift[0];
      else if (nowDate.getHours() >= 15 && nowDate.getHours() < 23)
        return shift[1];
      else if (
        nowDate.getHours() == 23 ||
        (nowDate.getHours() >= 0 && nowDate.getHours() < 7)
      )
        return shift[2];
    },
    shiftArrays(array) {
      let c = "";
      c = array[3];
      array[3] = array[2];
      array[2] = array[1];
      array[1] = array[0];
      array[0] = c;

      return array;
    },
  },
  mounted() {
    console.log("shiiiift : ", this.getActualShift());
  },
};
</script>
<style>
.logo {
  width: 272px;
  height: 200px;
  background-color: black;
  background-image: url(/img/logo-white.1134ba4c.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}
</style>
