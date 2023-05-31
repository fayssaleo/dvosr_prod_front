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
                <v-form ref="formData">
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
                    class="
                      grey--text
                      font-weight-medium
                      mb-2
                      text-center
                      error--text
                    "
                  >
                    {{ text }}
                  </h3>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="SetShift">Save</v-btn>
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
  name: "Shif",
  props: {
    source: String,
  },
  data: () => ({
    shift: "",
    text: "",
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
  }),
  computed: {
    ...mapGetters(["getAuthenticatedUser"]),
  },
  methods: {
    ...mapActions(["shiftSetterAction"]),
    SetShift() {
      if (!this.$refs.shift.hasError)
        this.shiftSetterAction({ ...{ shift: this.shift } });
      else this.text = "select a shift !";
    },
  },
};
</script>

<style></style>
