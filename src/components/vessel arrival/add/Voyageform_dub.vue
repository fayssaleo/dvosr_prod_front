<template>
  <v-app>
    <v-container fluid>
      <form @submit.prevent="() => {}">
        <v-row>
          <v-col cols="12" md="6">
            <div class="">
              <v-select
                outlined
                label="Crane"
                :items="cranes"
                item-text="craneId"
                item-value="id"
                @change="onChange"
                filled
                v-model="secondFormData.crane_id"
              >
              </v-select>
            </div>

            <div class="pb-4">
              <center>
                <h3 class="title">
                  Load of Gear Boxes &/or Hatch Covers after Last Lift
                </h3>
              </center>
            </div>

            <vc-date-picker
              v-model="lgbohc_all_from"
              mode="dateTime"
              is24hr
              @input="dateChange('lgbohc_all_from')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="From(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.lgbohc_all_from"
                  clearable
                  v-mask="'##/##/#### ##:##'"
                  placeholder="DD/MM/YYYY HH:mm"
                  prepend-inner-icon="mdi-calendar-clock"
                  :disabled="secondFormData.crane_id == ''"
                >
                </v-text-field>
              </template>
            </vc-date-picker>

            <vc-date-picker
              v-model="lgbohc_all_to"
              mode="dateTime"
              is24hr
              @input="dateChange('lgbohc_all_to')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="To(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.lgbohc_all_to"
                  clearable
                  v-mask="'##/##/#### ##:##'"
                  placeholder="DD/MM/YYYY HH:mm"
                  prepend-inner-icon="mdi-calendar-clock"
                  :disabled="secondFormData.crane_id == ''"
                >
                </v-text-field>
              </template>
            </vc-date-picker>
            <v-row>
              <v-col cols="6"
                ><integer-plusminus
                  v-model="secondFormData.lgbohc_all_num_gb"
                  :min="0"
                  :step="1"
                  class="mb-5"
                  :disabled="secondFormData.crane_id == ''"
                >
                  <v-text-field
                    label="Number of gear boxes:"
                    v-model="secondFormData.lgbohc_all_num_gb"
                    class="mb-0 pb-0"
                    clearable
                    :disabled="secondFormData.crane_id == ''"
                    type="number"
                  ></v-text-field>

                  <template slot="decrement">-</template>

                  <template slot="increment">+</template>
                </integer-plusminus></v-col
              >

              <v-col cols="6"
                ><integer-plusminus
                  v-model="secondFormData.lgbohc_all_inbay"
                  :min="0"
                  :step="1"
                  class="mb-5"
                  :disabled="secondFormData.crane_id == ''"
                >
                  <v-text-field
                    label="GB In Bay :"
                    v-model="secondFormData.lgbohc_all_inbay"
                    class="mb-0 pb-0"
                    clearable
                    :disabled="secondFormData.crane_id == ''"
                    type="number"
                  ></v-text-field>

                  <template slot="decrement">-</template>

                  <template slot="increment">+</template>
                </integer-plusminus></v-col
              >
              <v-col cols="6"
                ><integer-plusminus
                  v-model="secondFormData.lgbohc_all_hc"
                  :min="0"
                  :step="1"
                  class="mb-5"
                  :disabled="secondFormData.crane_id == ''"
                >
                  <v-text-field
                    label="Number of Hatch covers:"
                    v-model="secondFormData.lgbohc_all_hc"
                    class="mb-0 pb-0"
                    clearable
                    :disabled="secondFormData.crane_id == ''"
                    type="number"
                  ></v-text-field>

                  <template slot="decrement">-</template>

                  <template slot="increment">+</template>
                </integer-plusminus></v-col
              >
              <v-col cols="6"
                ><integer-plusminus
                  v-model="secondFormData.lgbohc_all_inbay_hatch_covers"
                  :min="0"
                  :step="1"
                  class="mb-5"
                  :disabled="secondFormData.crane_id == ''"
                >
                  <v-text-field
                    label="HC In Bay :"
                    v-model="secondFormData.lgbohc_all_inbay_hatch_covers"
                    class="mb-0 pb-0"
                    clearable
                    :disabled="secondFormData.crane_id == ''"
                    type="number"
                  ></v-text-field>

                  <template slot="decrement">-</template>

                  <template slot="increment">+</template>
                </integer-plusminus></v-col
              >
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <vc-date-picker
              v-model="cbu"
              mode="dateTime"
              is24hr
              @input="dateChange('cbu')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="Crane Boom Up"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.cbu"
                  clearable
                  v-mask="'##/##/#### ##:##'"
                  placeholder="DD/MM/YYYY HH:mm"
                  prepend-inner-icon="mdi-calendar-clock"
                  :disabled="secondFormData.crane_id == ''"
                >
                </v-text-field>
              </template>
            </vc-date-picker>
            <div class="pt-0 pb-4">
              <center>
                <h3 class="title">Load Of Ship's Spreaders after Last Lift</h3>
              </center>
            </div>
            <vc-date-picker
              v-model="lss_all_from"
              mode="dateTime"
              is24hr
              @input="dateChange('lss_all_from')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="From(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.lss_all_from"
                  clearable
                  v-mask="'##/##/#### ##:##'"
                  placeholder="DD/MM/YYYY HH:mm"
                  prepend-inner-icon="mdi-calendar-clock"
                  :disabled="secondFormData.crane_id == ''"
                >
                </v-text-field>
              </template>
            </vc-date-picker>

            <vc-date-picker
              v-model="lss_all_to"
              mode="dateTime"
              is24hr
              @input="dateChange('lss_all_to')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="To(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.lss_all_to"
                  clearable
                  v-mask="'##/##/#### ##:##'"
                  placeholder="DD/MM/YYYY HH:mm"
                  prepend-inner-icon="mdi-calendar-clock"
                  :disabled="secondFormData.crane_id == ''"
                >
                </v-text-field>
              </template>
            </vc-date-picker>

            <!--v-text-field
              outlined
              v-model="secondFormData.lss_all_num_ss"
              label="Number of ship's spreaders : "
              type="number"
              clearable
              :min="0"
            ></v-text-field-->
            <integer-plusminus
              v-model="secondFormData.lss_all_num_ss"
              :min="0"
              :step="1"
              class="mb-5"
              :disabled="secondFormData.crane_id == ''"
            >
              <v-text-field
                label="Number of ship's spreaders : "
                v-model="secondFormData.lss_all_num_ss"
                class="mb-0 pb-0"
                clearable
                :disabled="secondFormData.crane_id == ''"
                type="number"
              ></v-text-field>

              <template slot="decrement">-</template>

              <template slot="increment">+</template>
            </integer-plusminus>
            <v-row>
              <v-col cols="6">
                <integer-plusminus
                  v-model="secondFormData.lss_all_ib"
                  :min="0"
                  :step="1"
                  class="mb-5"
                  :disabled="secondFormData.crane_id == ''"
                >
                  <v-text-field
                    label="In Bay : "
                    v-model="secondFormData.lss_all_ib"
                    class="mb-0 pb-0"
                    clearable
                    :disabled="secondFormData.crane_id == ''"
                    type="number"
                  ></v-text-field>

                  <template slot="decrement">-</template>

                  <template slot="increment">+</template>
                </integer-plusminus>
              </v-col>
              <v-col cols="6">
                <v-select
                  outlined
                  label="Loaded by NS or Wires?: "
                  :items="['NS', 'Wires']"
                  filled
                  v-model="secondFormData.lss_all_ib_lnw"
                  clearable
                  :disabled="secondFormData.crane_id == ''"
                >
                </v-select>
              </v-col>
            </v-row>

            <center>
              <v-row>
                <v-col cols="12"
                  ><v-switch
                    v-model="secondFormData.pgb_r_co"
                    label="Positions for gear boxes required by C/O ?"
                    @change="OpenPositionDialog"
                  ></v-switch
                ></v-col>
              </v-row>
            </center>
            <v-row>
              <v-col style="text-align: center">
                <v-dialog v-model="dialog1" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      style="width: 150px"
                      v-bind="attrs"
                      v-on="on"
                      :color="
                        secondFormData.crane_id == ''
                          ? 'grey'
                          : 'light-blue accent-3'
                      "
                      dark
                      >Save</v-btn
                    ></template
                  >

                  <v-card v-if="secondFormData.crane_id != ''">
                    <v-card-title class="text-h5 grey lighten-2">
                      Confirm action
                    </v-card-title>

                    <v-card-text>
                      <h3>Are you sure you want to proceed?</h3>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn depressed color="" @click="dialog1 = false"
                        >Cancel</v-btn
                      >
                      <v-btn
                        depressed
                        color="primary"
                        @click="saveOrUpdateVoyageSave"
                        >OK</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                  <v-card v-else>
                    <v-card-title class="text-h5 error lighten-2">
                      WARNING
                    </v-card-title>

                    <v-card-text class="mt-4">
                      <h2>Select a crane first !</h2>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn depressed color="primary" @click="dialog1 = false"
                        >OK</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
              <v-col style="text-align: center">
                <v-dialog v-model="dialog2" width="500">
                  <template v-slot:activator="{ on, attrs }"> </template>

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Please specify reason given by C/O :
                    </v-card-title>

                    <v-card-text>
                      <v-textarea
                        class="mt-4"
                        v-model="secondFormData.pgb_r_co_reason"
                      ></v-textarea>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn depressed color="" @click="closePositionDialog"
                        >Cancel</v-btn
                      >
                      <v-btn
                        depressed
                        color="primary"
                        @click="closePositionDialog"
                        >OK</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
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
          </v-col>
        </v-row>
      </form>
      <v-row>
        <v-col style="text-align: center">
          <v-dialog v-model="errorDialog2" width="500">
            <template> </template>
            <v-card>
              <v-card-title class="text-h5 error lighten-2">
                WARNING
              </v-card-title>

              <v-card-text class="mt-4">
                <h2>{{ warninText1 }}</h2>
                <br />
                <br />
                <h3 style="font-weight: 900">{{ warninText0 }}</h3>

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
<style scoped>
/* bordures gris */

.v-text-field {
  margin: 0;
  padding: 0;
}

/* .title {
  border: 1px solid black;
  padding: 10px;
} */
.title {
  height: 56px;
}
</style>
<script>
import Datepicker from "../../date&time/Datepicker";
import Dialog from "../../dialog/Dialog";
import { mapGetters, mapActions } from "vuex";
import {
  compareTwoDate,
  FormatDateStringToISO,
} from "../../../helpers/helpers.js";
import { formatToSimpleFormatDD_MM_YYYY_H_M_S } from "../../../helpers/helpers.js";
import { IntegerPlusminus } from "vue-integer-plusminus";

export default {
  name: "Voyageform",
  components: { Datepicker, Dialog, IntegerPlusminus },
  data: () => ({
    errorDialog: false,
    errorDialog2: false,
    warninText: "",
    warninText0: "",
    warninText1: "",
    warninText2: "",
    warninText3: "",
    dialog1: false,
    dialog2: false,
    cranes: [],

    secondFormData: {
      id: "",
      cbu: "",
      lgbohc_all_from: "",
      lgbohc_all_to: "",
      lgbohc_all_num_gb: null,
      lgbohc_all_hc: null,
      lgbohc_all_inbay: null,
      lgbohc_all_inbay_hatch_covers: null,
      lss_all_from: "",
      lss_all_to: "",
      lss_all_num_ss: null,
      lss_all_ib: null,
      lss_all_ib_lnw: null,
      crane_id: "",
      pgb_r_co: 0,
      pgb_r_co_reason: "",
    },
    crane_voyages: [],
    cbu: new Date(),
    lgbohc_all_from: new Date(),
    lgbohc_all_to: new Date(),
    lss_all_from: new Date(),
    lss_all_to: new Date(),
  }),
  computed: {
    ...mapGetters(["getCranes", "getVoyageToEditOrSave"]),
  },
  methods: {
    ...mapActions([
      "setCranesAction",
      "dishGearShip2SetterAction",
      "saveOrUpdateVoyageAction",
      "setSnackBarTosSuccess",
      "setSnackBarTosFailed",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    dateChange(input) {
      this.secondFormData[input] = formatToSimpleFormatDD_MM_YYYY_H_M_S(
        this[input]
      );
    },
    onChange() {
      this.secondFormData.pgb_r_co = this.getVoyageToEditOrSave.pgb_r_co;
      this.secondFormData.pgb_r_co_reason =
        this.getVoyageToEditOrSave.pgb_r_co_reason;
      let count = 0;
      if (this.secondFormData.crane_id != "")
        this.crane_voyages.map((c) => {
          if (c.crane_id == this.secondFormData.crane_id) {
            this.secondFormData.id = c.id;
            this.secondFormData.cbu = c.cbu;
            this.secondFormData.lgbohc_all_from = c.lgbohc_all_from;
            this.secondFormData.lgbohc_all_to = c.lgbohc_all_to;
            this.secondFormData.lgbohc_all_num_gb = c.lgbohc_all_num_gb;
            this.secondFormData.lgbohc_all_hc = c.lgbohc_all_hc;
            this.secondFormData.lgbohc_all_inbay = c.lgbohc_all_inbay;
            this.secondFormData.lgbohc_all_inbay_hatch_covers =
              c.lgbohc_all_inbay_hatch_covers;
            this.secondFormData.lss_all_from = c.lss_all_from;
            this.secondFormData.lss_all_to = c.lss_all_to;
            this.secondFormData.lss_all_num_ss = c.lss_all_num_ss;
            this.secondFormData.lss_all_ib = c.lss_all_ib;
            this.secondFormData.lss_all_ib_lnw = c.lss_all_ib_lnw;

            if (this.secondFormData.cbu)
              this.cbu = new Date(
                FormatDateStringToISO(this.secondFormData.cbu)
              );
            else this.cbu = new Date();

            if (this.secondFormData.lgbohc_all_from)
              this.lgbohc_all_from = new Date(
                FormatDateStringToISO(this.secondFormData.lgbohc_all_from)
              );
            else this.lgbohc_all_from = new Date();

            if (this.secondFormData.lgbohc_all_to)
              this.lgbohc_all_to = new Date(
                FormatDateStringToISO(this.secondFormData.lgbohc_all_to)
              );
            else this.lgbohc_all_to = new Date();

            if (this.secondFormData.lgbohc_all_from)
              this.lss_all_from = new Date(
                FormatDateStringToISO(this.secondFormData.lss_all_from)
              );
            else this.lgbohc_all_from = new Date();

            if (this.secondFormData.lss_all_to)
              this.lss_all_to = new Date(
                FormatDateStringToISO(this.secondFormData.lss_all_to)
              );
            else this.lss_all_to = new Date();

            count = 1;
            return;
          }
        });
      if (count == 0)
        this.secondFormData = {
          ...{
            id: "",
            cbu: "",
            lgbohc_all_from: "",
            lgbohc_all_to: "",
            lgbohc_all_num_gb: null,
            lgbohc_all_hc: null,
            lgbohc_all_inbay: null,
            lgbohc_all_inbay_hatch_covers: null,
            lss_all_from: "",
            lss_all_to: "",
            lss_all_num_ss: null,
            lss_all_ib: null,
            lss_all_ib_lnw: "",
            pgb_r_co: 0,
            pgb_r_co_reason: "",
            crane_id: this.secondFormData.crane_id,
          },
        };
    },
    saveOrUpdateVoyageSave() {
      if (
        this.secondFormData.lgbohc_all_from != "" &&
        this.secondFormData.lgbohc_all_from != null &&
        this.secondFormData.lgbohc_all_to != "" &&
        this.secondFormData.lgbohc_all_to != null
      ) {
        let d1 = new Date(
          FormatDateStringToISO(this.secondFormData.lgbohc_all_to)
        );
        let d2 = new Date(
          FormatDateStringToISO(this.secondFormData.lgbohc_all_from)
        );
        if (compareTwoDate(d1, d2) != 1) {
          this.warninText0 =
            "Load of Gear Boxes &/or Hatch Covers after Last Lift :";
          this.warninText1 =
            '"To" datetime must be superior than "From" datetime :';
          this.warninText2 = "From : " + this.secondFormData.lgbohc_all_from;
          this.warninText3 = "To : " + this.secondFormData.lgbohc_all_to;
          this.errorDialog2 = true;
          this.dialog1 = false;
          return;
        }
      }
      if (
        this.secondFormData.lss_all_from != "" &&
        this.secondFormData.lss_all_from != null &&
        this.secondFormData.lss_all_to != "" &&
        this.secondFormData.lss_all_to != null
      ) {
        let d1 = new Date(
          FormatDateStringToISO(this.secondFormData.lss_all_to)
        );
        let d2 = new Date(
          FormatDateStringToISO(this.secondFormData.lss_all_from)
        );
        if (compareTwoDate(d1, d2) != 1) {
          this.warninText0 = "Load Of Ship's Spreaders after Last Lift :";
          this.warninText1 =
            '"To" datetime must be superior than "From" datetime :';
          this.warninText2 = "From : " + this.secondFormData.lss_all_from;
          this.warninText3 = "To : " + this.secondFormData.lss_all_to;
          this.errorDialog2 = true;
          this.dialog1 = false;
          return;
        }
      }
      let checker =
        this.checkIfNumberFullAndFromAndToEmpty() ||
        this.checkIfNumberFullAndFromAndToEmpty2();
      if (!checker) {
        this.dishGearShip2SetterAction(this.secondFormData);
        this.setModuleShowToTrueAction();
        this.saveOrUpdateVoyageAction().then((response) => {
          if (response.status == "200") {
            this.setSnackBarTosSuccess();
            this.setModuleShowToFalseAction();
            this.dialog1 = false;
          } else if (response.status == "406_2") {
            this.setSnackBarTosFailed("Please chose the voyage first !");
            this.setModuleShowToFalseAction();
            this.dialog1 = false;
          }
        });
      }
      this.dialog1 = false;
    },
    OpenPositionDialog() {
      if (this.secondFormData.pgb_r_co) this.dialog2 = true;
    },
    closePositionDialog() {
      if (!this.secondFormData.pgb_r_co_reason)
        this.secondFormData.pgb_r_co = false;
      this.dialog2 = false;
    },
    checkIfNumberFullAndFromAndToEmpty() {
      let lgbohc_all_num_gbIsEmpty =
        this.secondFormData.lgbohc_all_num_gb == "" ||
        this.secondFormData.lgbohc_all_num_gb == null ||
        this.secondFormData.lgbohc_all_num_gb == 0;

      let lgbohc_all_hcIsEmpty =
        this.secondFormData.lgbohc_all_hc == "" ||
        this.secondFormData.lgbohc_all_hc == null ||
        this.secondFormData.lgbohc_all_hc == 0;

      let lgbohc_all_inbayIsEmpty =
        this.secondFormData.lgbohc_all_inbay == "" ||
        this.secondFormData.lgbohc_all_inbay == null ||
        this.secondFormData.lgbohc_all_inbay == 0;
      let lgbohc_all_inbay_hatch_coversIsEmpty =
        this.secondFormData.lgbohc_all_inbay_hatch_covers == "" ||
        this.secondFormData.lgbohc_all_inbay_hatch_covers == null ||
        this.secondFormData.lgbohc_all_inbay_hatch_covers == 0;

      let lgbohc_all_fromIsEmpty =
        this.secondFormData.lgbohc_all_from == "" ||
        this.secondFormData.lgbohc_all_from == null;

      let lgbohc_all_toIsEmpty =
        this.secondFormData.lgbohc_all_to == "" ||
        this.secondFormData.lgbohc_all_to == null;
      if (lgbohc_all_fromIsEmpty && !lgbohc_all_toIsEmpty) {
        this.warninText =
          "When 'TO' is not empty 'FROM' must not be empty too !";
        this.errorDialog = true;
        return true;
      }
      if (
        !lgbohc_all_num_gbIsEmpty &&
        !lgbohc_all_hcIsEmpty &&
        !lgbohc_all_inbayIsEmpty &&
        !lgbohc_all_inbay_hatch_coversIsEmpty &&
        lgbohc_all_fromIsEmpty
      ) {
        this.warninText =
          "When number of gear boxes or hatch covers or In Bay is not zero you must insert 'FROM' and 'TO' datetimes or at least 'FROM' !";
        this.errorDialog = true;
        return true;
      }
      if (
        lgbohc_all_num_gbIsEmpty &&
        lgbohc_all_hcIsEmpty &&
        lgbohc_all_inbayIsEmpty &&
        lgbohc_all_inbay_hatch_coversIsEmpty &&
        !lgbohc_all_fromIsEmpty
      ) {
        this.warninText =
          "When 'FROM' datetime is inserted either one of number of gear boxes or hatch covers or In Bay must not be zero !";
        this.errorDialog = true;
        return true;
      }
      return false;
    },
    checkIfNumberFullAndFromAndToEmpty2() {
      let lss_all_num_ssIsEmpty =
        this.secondFormData.lss_all_num_ss == "" ||
        this.secondFormData.lss_all_num_ss == null;
      let lss_all_ibIsEmpty =
        this.secondFormData.lss_all_ib == "" ||
        this.secondFormData.lss_all_ib == null;
      let lss_all_ib_lnwIsEmpty =
        this.secondFormData.lss_all_ib_lnw == "" ||
        this.secondFormData.lss_all_ib_lnw == null;
      let lss_all_fromIsEmpty =
        this.secondFormData.lss_all_from == "" ||
        this.secondFormData.lss_all_from == null;
      let lss_all_toIsEmpty =
        this.secondFormData.lss_all_to == "" ||
        this.secondFormData.lss_all_to == null;

      if (lss_all_fromIsEmpty && !lss_all_toIsEmpty) {
        this.warninText =
          "When 'TO' is not empty 'FROM' must not be empty too !";
        this.errorDialog = true;
        return true;
      } else if (
        !lss_all_num_ssIsEmpty &&
        (!lss_all_ib_lnwIsEmpty || !lss_all_ibIsEmpty) &&
        lss_all_fromIsEmpty
      ) {
        this.warninText =
          "When number of ship's spreaders is not zero or In Bay is Loaded by NS or WIRES you must insert 'FROM' and 'TO' datetimes or at least 'FROM' !";
        this.errorDialog = true;
        return true;
      } else if (
        lss_all_num_ssIsEmpty &&
        (lss_all_ib_lnwIsEmpty || lss_all_ibIsEmpty) &&
        !lss_all_fromIsEmpty
      ) {
        this.warninText =
          "When 'FROM' datetime is inserted either one of number of ship's spreaders or 'In Bay' and 'Loaded by NS or WIRES' must be inserted too !";
        this.errorDialog = true;
        return true;
      }
      return false;
    },
    closeWarning() {
      this.warninText = "";
      this.warninText0 = "";
      this.warninText1 = "";
      this.warninText2 = "";
      this.warninText3 = "";
      this.errorDialog = false;
      this.errorDialog2 = false;
    },
  },
  mounted() {
    if (this.getVoyageToEditOrSave.id != "") {
      this.crane_voyages = this.getVoyageToEditOrSave.crane_voyages;
      this.secondFormData.pgb_r_co = this.getVoyageToEditOrSave.pgb_r_co;
      this.secondFormData.pgb_r_co_reason =
        this.getVoyageToEditOrSave.pgb_r_co_reason;
    }
    this.setModuleShowToTrueAction();
    this.setCranesAction()
      .then(() => {
        this.cranes = this.getCranes;
        this.setModuleShowToFalseAction();
      })
      .catch((error) => {
        this.setModuleShowToFalseAction();
        this.logoutAction();
      });
  },
  watch: {
    dialog2(newValue, old) {
      if (!newValue) this.closePositionDialog();
    },
  },
};
</script>
