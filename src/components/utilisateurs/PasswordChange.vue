<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Change password</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-col cols="12">
                  <v-text-field
                    v-model="password.password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                    ref="paaswordFirstInput"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password.password_confirmation"
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[
                      rules.required,
                      rules.min,
                      passwordConfirmationRule,
                    ]"
                    :type="show2 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Confirm Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show2 = !show2"
                    ref="paaswordSecondInput"
                  ></v-text-field>
                </v-col>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="changePasswordMethod"
                  >Save</v-btn
                >
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

export default {
  name: "Change_password",
  props: {
    source: String,
  },
  data: () => ({
    show1: false,
    show2: false,

    password: {
      password: "",
      password_confirmation: "",
      id: "",
    },
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  computed: {
    ...mapGetters(["getAuthenticatedUser"]),
    passwordConfirmationRule() {
      return () =>
        this.password.password === this.password.password_confirmation ||
        "Password must match";
    },
  },
  methods: {
    ...mapActions([
      "changeUserPasswordAction",
      "logoutAction",
      "setSnackBarTosSuccess",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    changePasswordMethod() {
      if (
        !this.$refs.paaswordFirstInput.hasError &&
        !this.$refs.paaswordSecondInput.hasError
      ) {
        this.password.id = this.getAuthenticatedUser.id;
        this.setModuleShowToTrueAction();
        this.changeUserPasswordAction(this.password)
          .then(() => {
            this.setSnackBarTosSuccess();

            this.setModuleShowToFalseAction();
            this.$router.push("/");
            this.logoutAction();
          })
          .catch((error) => {
            this.setModuleShowToFalseAction();
          });
      }
    },
  },
};
</script>

<style></style>
