<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title> </v-card-title>

        <v-card-text>
          <div>
            <v-row>
              <v-col cols="6">
                <vc-date-picker
                  v-model="from"
                  mode="dateTime"
                  is24hr
                  @input="dateChange('from')"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <v-text-field
                      label="From(Date)"
                      outlined
                      :value="inputValue"
                      v-on="inputEvents"
                      v-model="other_delay.from"
                      clearable
                      v-mask="'##/##/#### ##:##'"
                      placeholder="DD/MM/YYYY HH:mm"
                      prepend-inner-icon="mdi-calendar-clock"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
                <vc-date-picker
                  v-model="to"
                  mode="dateTime"
                  is24hr
                  @input="dateChange('to')"
                >
                  <template v-slot="{ inputValue, inputEvents }">
                    <v-text-field
                      label="To(Date)"
                      outlined
                      :value="inputValue"
                      v-on="inputEvents"
                      v-model="other_delay.to"
                      clearable
                      v-mask="'##/##/#### ##:##'"
                      placeholder="DD/MM/YYYY HH:mm"
                      prepend-inner-icon="mdi-calendar-clock"
                    >
                    </v-text-field>
                  </template>
                </vc-date-picker>
                <v-select
                  outlined
                  label="Crane"
                  :items="getCranes"
                  item-text="craneId"
                  item-value="id"
                  @change="onChange"
                  filled
                  v-model="other_delay.crane_id"
                >
                </v-select>
                <v-card elevation="2">
                  <v-card-title
                    >Please note the <br />
                    following:</v-card-title
                  >
                  <v-card-text>
                    NB:Delays to be recorded should exclude the normal
                    operations stipulated above: (Hatch Cover,Gearbox...) For
                    example:Crane Breakdown/waiting for ship's crane to swing to
                    seaside / Accident / etc...
                  </v-card-text>
                  <v-card-actions> </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col cols="12">
                    <v-select
                      outlined
                      label="Category"
                      :items="[
                        { id: 'Deductible', category: 'Deductible' },
                        { id: 'Operational', category: 'Operational' },
                        { id: 'Technical', category: 'Technical' },
                      ]"
                      item-text="category"
                      item-value="id"
                      @change="onChangeCategory"
                      filled
                      class="delaycodeSelect"
                      v-model="other_delay.category"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      outlined
                      label="Code"
                      :items="codes"
                      item-text="code"
                      item-value="id"
                      @change="onChangeCode"
                      filled
                      v-model="other_delay.code_id"
                      clearable
                      class="delaycodeSelect"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-card elevation="2">
                      <v-card-title
                        >code : {{ other_delay.code }}
                        {{
                          other_delay.code != ""
                            ? "(" + other_delay.category + ")"
                            : ""
                        }}</v-card-title
                      >
                      <v-card-text>
                        {{ other_delay.reason }}
                      </v-card-text>
                      <v-card-actions> </v-card-actions>
                    </v-card>
                  </v-col>
                  <v-col cols="12"
                    ><v-textarea
                      outlined
                      name="input-7-4"
                      label="Reason/Comments"
                      v-model="other_delay.comment"
                      clearable
                    ></v-textarea
                  ></v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="" @click="close"> Cancel </v-btn>
          <v-btn
            depressed
            :color="
              other_delay.crane_id == '' ||
              other_delay.crane_id == null ||
              other_delay.from == '' ||
              other_delay.from == null ||
              other_delay.to == '' ||
              other_delay.to == null ||
              other_delay.category == '' ||
              other_delay.category == null ||
              other_delay.code_id == '' ||
              other_delay.code_id == null
                ? 'grey'
                : 'primary'
            "
            @click="openSaveDelay"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog4" width="500">
        <v-card
          v-if="
            other_delay.crane_id != '' &&
            other_delay.crane_id != null &&
            other_delay.from != '' &&
            other_delay.from != null &&
            other_delay.to != '' &&
            other_delay.to != null &&
            other_delay.category != '' &&
            other_delay.category != null &&
            other_delay.code_id != '' &&
            other_delay.code_id != null
          "
        >
          <v-card-title class="text-h5 grey lighten-2">
            Confirm action
          </v-card-title>

          <v-card-text>
            <h3>Are you sure you want to proceed?</h3>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="" @click="dialog4 = false">Cancel</v-btn>
            <v-btn depressed color="primary" @click="saveDelay">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-else-if="other_delay.crane_id == '' || other_delay.crane_id == null"
        >
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>Select a crane !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else-if="other_delay.from == '' || other_delay.from == null">
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>"From" datetime is empty !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else-if="other_delay.to == '' || other_delay.to == null">
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>"To" datetime is empty !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-else-if="other_delay.category == '' || other_delay.category == null"
        >
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>Select the category !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-else-if="other_delay.code_id == '' || other_delay.code_id == null"
        >
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>Select the code !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-else-if="other_delay.reason == '' || other_delay.reason == null"
        >
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>Select the Category !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-row>
        <v-col style="text-align: center">
          <v-dialog v-model="errorDialog" width="500">
            <template> </template>
            <v-card>
              <v-card-title class="text-h5 error lighten-2">
                WARNING
              </v-card-title>

              <v-card-text class="mt-4">
                <h2>{{ warninText }}</h2>
                <br /><br />
                <h3>{{ warninText2 }}</h3>
                <h3 class="error--text">{{ warninText3 }}</h3>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="closeWarning"
                  >OK</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<style scoped></style>
<script>
import {
  compareTwoDate,
  FormatDateStringToISO,
  formatToSimpleFormatDD_MM_YYYY_H_M_S,
} from "../../../helpers/helpers.js";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Delay",
  props: ["selectedOtherDelay"],
  data() {
    return {
      errorDialog: false,
      warninText: "",
      warninText2: "",
      warninText3: "",
      dialog4: false,
      value: "",
      crane_id: "",
      code: {
        id: "",
        code: "",
        description: "",
      },
      other_delay: {
        id: "",
        from: "",
        to: "",
        reason: "",
        comment: "",
        dep_arr: "arr",
        voyage_id: "",
        crane_id: "",
        code_id: "",
        code: "",
        category: "",
      },
      from: new Date(),
      to: new Date(),
      codes: [],
    };
  },
  methods: {
    ...mapActions(["delaySetterAction"]),
    dateChange(input) {
      this.other_delay[input] = formatToSimpleFormatDD_MM_YYYY_H_M_S(
        this[input]
      );
    },
    onChange() {},
    close() {
      this.dialog = false;
    },
    openSaveDelay() {
      this.dialog4 = true;
    },
    saveDelay() {
      let d1 = new Date(FormatDateStringToISO(this.other_delay.to));
      let d2 = new Date(FormatDateStringToISO(this.other_delay.from));
      if (compareTwoDate(d1, d2) == 1) {
        this.delaySetterAction(this.other_delay);
        this.dialog4 = this.$emit("refreshTable");
      } else {
        this.warninText =
          '"To" datetime must be superior than "From" datetime :';
        this.warninText2 = "From : " + this.other_delay.from;
        this.warninText3 = "To : " + this.other_delay.to;
        this.errorDialog = true;
        this.dialog4 = false;
      }
    },
    closeWarning() {
      this.warninText = "";
      this.errorDialog = false;
    },
    onChangeCode() {
      let description = this.getCodes.filter((e) => {
        return e.id == this.other_delay.code_id;
      });
      this.other_delay.reason = description[0].description;
      this.other_delay.code = description[0].code;
      this.other_delay.category = description[0].category;
    },
    onChangeCategory() {
      if (this.other_delay.category != "") {
        this.codes = this.getCodes.filter((e) => {
          return e.category == this.other_delay.category;
        });

        this.other_delay.reason = "";
        this.other_delay.code = "";
      }
    },
  },
  computed: {
    ...mapGetters(["getCranes", "getCodes"]),
    dialog: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      },
    },
  },
  mounted() {
    this.other_delay.id = this.selectedOtherDelay.id;
    this.other_delay.from = this.selectedOtherDelay.from;
    this.other_delay.to = this.selectedOtherDelay.to;
    this.other_delay.reason = this.selectedOtherDelay.reason;
    this.other_delay.comment = this.selectedOtherDelay.comment;
    this.other_delay.dep_arr = "arr";
    this.other_delay.voyage_id = this.selectedOtherDelay.voyage_id;
    this.other_delay.crane_id = this.selectedOtherDelay.crane_id;
    this.other_delay.code_id = this.selectedOtherDelay.code_id;
    this.other_delay.code = this.selectedOtherDelay.code;
    this.other_delay.category = this.selectedOtherDelay.category;
    if (this.other_delay.category != "") {
      this.codes = this.getCodes.filter((e) => {
        return e.category == this.other_delay.category;
      });
    }
  },
};
</script>
