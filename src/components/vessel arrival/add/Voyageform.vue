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
                  Disch of Gear Boxes and/or Hatch Covers before 1st Lift
                </h3>
              </center>
            </div>

            <vc-date-picker
              v-model="dgbohc_bfl_from"
              mode="dateTime"
              is24hr
              @input="dateChange('dgbohc_bfl_from')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="From(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.dgbohc_bfl_from"
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
              v-model="dgbohc_bfl_to"
              mode="dateTime"
              is24hr
              @input="dateChange('dgbohc_bfl_to')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="To(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.dgbohc_bfl_to"
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
              v-model="secondFormData.dgbohc_bfl_num_gb"
              label="Number of gear boxes:"
              type="number"
              clearable
              :min="0"
            ></v-text-field-->
            <integer-plusminus
              v-model="secondFormData.dgbohc_bfl_num_gb"
              :min="0"
              :step="1"
              class="mb-4"
            >
              <v-text-field
                label="Number of gear boxes:"
                v-model="secondFormData.dgbohc_bfl_num_gb"
                class="mb-0 pb-0"
                clearable
                :disabled="secondFormData.crane_id == ''"
                type="number"
              ></v-text-field>

              <template slot="decrement">-</template>

              <template slot="increment">+</template>
            </integer-plusminus>

            <!--v-text-field
              outlined
              v-model="secondFormData.dgbohc_bfl_num_hc"
              label="Number of Hatch covers:"
              type="number"
              clearable
              :min="0"
            ></v-text-field-->
            <integer-plusminus
              v-model="secondFormData.dgbohc_bfl_num_hc"
              :min="0"
              :step="1"
              class="mb-5"
            >
              <v-text-field
                label="Number of Hatch covers:"
                v-model="secondFormData.dgbohc_bfl_num_hc"
                class="mb-0 pb-0"
                clearable
                :disabled="secondFormData.crane_id == ''"
                type="number"
              ></v-text-field>

              <template slot="decrement">-</template>

              <template slot="increment">+</template>
            </integer-plusminus>
            <center>
              If spreaders discharged by the ship itself specify number,
              position and duration of handling spreaders by the ship.
            </center>
          </v-col>
          <v-col cols="12" md="6">
            <vc-date-picker
              v-model="cbd"
              mode="dateTime"
              is24hr
              @input="dateChange('cbd')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="Crane Boom Down"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.cbd"
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
                <h3 class="title">Disch of ship's Spreaders before 1st Lift</h3>
              </center>
            </div>
            <vc-date-picker
              v-model="dss_bfl_from"
              mode="dateTime"
              is24hr
              @input="dateChange('dss_bfl_from')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="From(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.dss_bfl_from"
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
              v-model="dss_bfl_to"
              mode="dateTime"
              is24hr
              @input="dateChange('dss_bfl_to')"
            >
              <template v-slot="{ inputValue, inputEvents }">
                <v-text-field
                  label="To(Date/Time)"
                  outlined
                  :value="inputValue"
                  v-on="inputEvents"
                  v-model="secondFormData.dss_bfl_to"
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
              v-model="secondFormData.dss_bfl_num_sp"
              label="Number of spreaders: "
              type="number"
              clearable
              :min="0"
            ></v-text-field-->
            <integer-plusminus
              v-model="secondFormData.dss_bfl_num_sp"
              :min="0"
              :step="1"
              class="mb-4"
              :disabled="secondFormData.crane_id == ''"
            >
              <v-text-field
                label="Number of spreaders: "
                v-model="secondFormData.dss_bfl_num_sp"
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
                  v-model="secondFormData.dss_bfl_fb"
                  :min="0"
                  :step="1"
                  class="mb-4"
                >
                  <v-text-field
                    label="From Bay : "
                    v-model="secondFormData.dss_bfl_fb"
                    class="mb-0 pb-0"
                    clearable
                    :disabled="secondFormData.crane_id == ''"
                    type="number"
                  ></v-text-field>

                  <template slot="decrement">-</template>

                  <template slot="increment">+</template>
                </integer-plusminus>
              </v-col>
              <v-col cols="6"
                ><v-select
                  outlined
                  label="Disch by NS or Wires?: "
                  :items="['NS', 'Wires']"
                  filled
                  v-model="secondFormData.dss_bfl_fb_dnw"
                  clearable
                  :disabled="secondFormData.crane_id == ''"
                >
                </v-select
              ></v-col>
            </v-row>

            <v-row>
              <v-col style="text-align: center">
                <v-dialog v-model="dialog1" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      style="width: 150px"
                      v-bind="attrs"
                      v-on="on"
                      dark
                      :color="
                        secondFormData.crane_id == ''
                          ? 'grey'
                          : 'light-blue accent-3'
                      "
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
    cranes: [],
    secondFormData: {
      id: "",
      cbd: "",
      dgbohc_bfl_from: "",
      dgbohc_bfl_to: "",
      dgbohc_bfl_num_gb: null,
      dgbohc_bfl_num_hc: null,
      dss_bfl_from: "",
      dss_bfl_to: "",
      dss_bfl_num_sp: null,
      dss_bfl_fb_dnw: "",
      crane_id: "",
      dss_bfl_fb: null,
    },
    crane_voyages: [],
    cbd: new Date(),
    dgbohc_bfl_from: new Date(),
    dgbohc_bfl_to: new Date(),
    dss_bfl_from: new Date(),
    dss_bfl_to: new Date(),
  }),
  computed: {
    ...mapGetters(["getCranes", "getVoyageToEditOrSave"]),
  },
  methods: {
    ...mapActions([
      "setCranesAction",
      "dishGearShipSetterAction",
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
      let count = 0;
      if (this.secondFormData.crane_id != "")
        this.crane_voyages.map((c) => {
          if (c.crane_id == this.secondFormData.crane_id) {
            this.secondFormData.id = c.id;
            this.secondFormData.cbd = c.cbd;
            this.secondFormData.dgbohc_bfl_from = c.dgbohc_bfl_from;
            this.secondFormData.dgbohc_bfl_to = c.dgbohc_bfl_to;
            this.secondFormData.dgbohc_bfl_num_gb = c.dgbohc_bfl_num_gb;
            this.secondFormData.dgbohc_bfl_num_hc = c.dgbohc_bfl_num_hc;
            this.secondFormData.dss_bfl_from = c.dss_bfl_from;
            this.secondFormData.dss_bfl_to = c.dss_bfl_to;
            this.secondFormData.dss_bfl_num_sp = c.dss_bfl_num_sp;
            this.secondFormData.dss_bfl_fb_dnw = c.dss_bfl_fb_dnw;
            this.secondFormData.dss_bfl_fb = c.dss_bfl_fb;
            this.secondFormData.crane_id = c.crane_id;
            if (
              this.secondFormData.cbd != "" &&
              this.secondFormData.cbd != null
            )
              this.cbd = new Date(
                FormatDateStringToISO(this.secondFormData.cbd)
              );
            else this.cbd = new Date();

            if (
              this.secondFormData.dgbohc_bfl_from != "" &&
              this.secondFormData.dgbohc_bfl_from != null
            )
              this.dgbohc_bfl_from = new Date(
                FormatDateStringToISO(this.secondFormData.dgbohc_bfl_from)
              );
            else this.dgbohc_bfl_from = new Date();

            if (
              this.secondFormData.dgbohc_bfl_to != "" &&
              this.secondFormData.dgbohc_bfl_to != null
            )
              this.dgbohc_bfl_to = new Date(
                FormatDateStringToISO(this.secondFormData.dgbohc_bfl_to)
              );
            else this.dgbohc_bfl_to = new Date();

            if (
              this.secondFormData.dss_bfl_from != "" &&
              this.secondFormData.dss_bfl_from != null
            )
              this.dss_bfl_from = new Date(
                FormatDateStringToISO(this.secondFormData.dss_bfl_from)
              );
            else this.dss_bfl_from = new Date();

            if (
              this.secondFormData.dss_bfl_to != "" &&
              this.secondFormData.dss_bfl_to != null
            )
              this.dss_bfl_to = new Date(
                FormatDateStringToISO(this.secondFormData.dss_bfl_to)
              );
            else this.dss_bfl_to = new Date();

            count = 1;
            return;
          }
        });
      if (count == 0)
        this.secondFormData = {
          ...{
            id: "",
            cbd: "",
            dgbohc_bfl_from: "",
            dgbohc_bfl_to: "",
            dgbohc_bfl_num_gb: null,
            dgbohc_bfl_num_hc: null,
            dss_bfl_from: "",
            dss_bfl_to: "",
            dss_bfl_num_sp: null,
            dss_bfl_fb_dnw: "",
            dss_bfl_fb: null,
            crane_id: this.secondFormData.crane_id,
          },
        };
    },
    saveOrUpdateVoyageSave() {
      if (
        this.secondFormData.dgbohc_bfl_from != "" &&
        this.secondFormData.dgbohc_bfl_from != null &&
        this.secondFormData.dgbohc_bfl_to != "" &&
        this.secondFormData.dgbohc_bfl_to != null
      ) {
        let d1 = new Date(
          FormatDateStringToISO(this.secondFormData.dgbohc_bfl_to)
        );
        let d2 = new Date(
          FormatDateStringToISO(this.secondFormData.dgbohc_bfl_from)
        );
        if (compareTwoDate(d1, d2) != 1) {
          this.warninText0 =
            "Disch of Gear Boxes and/or Hatch Covers before 1st Lift :";
          this.warninText1 =
            '"To" datetime must be superior than "From" datetime :';
          this.warninText2 = "From : " + this.secondFormData.dgbohc_bfl_from;
          this.warninText3 = "To : " + this.secondFormData.dgbohc_bfl_to;
          this.errorDialog2 = true;
          this.dialog1 = false;
          return;
        }
      }
      if (
        this.secondFormData.dss_bfl_from != "" &&
        this.secondFormData.dss_bfl_from != null &&
        this.secondFormData.dss_bfl_to != "" &&
        this.secondFormData.dss_bfl_to != null
      ) {
        let d1 = new Date(
          FormatDateStringToISO(this.secondFormData.dss_bfl_to)
        );
        let d2 = new Date(
          FormatDateStringToISO(this.secondFormData.dss_bfl_from)
        );
        if (compareTwoDate(d1, d2) != 1) {
          this.warninText0 = "Disch of ship's Spreaders before 1st Lift :";
          this.warninText1 =
            '"To" datetime must be superior than "From" datetime :';
          this.warninText2 = "From : " + this.secondFormData.dss_bfl_from;
          this.warninText3 = "To : " + this.secondFormData.dss_bfl_to;
          this.errorDialog2 = true;
          this.dialog1 = false;
          return;
        }
      }
      let checker =
        this.checkIfNumberFullAndFromAndToEmpty() ||
        this.checkIfNumberFullAndFromAndToEmpty2();
      if (!checker) {
        this.dishGearShipSetterAction(this.secondFormData);
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
    checkIfNumberFullAndFromAndToEmpty() {
      let dgbohc_bfl_num_gbIsEmpty =
        this.secondFormData.dgbohc_bfl_num_gb == "" ||
        this.secondFormData.dgbohc_bfl_num_gb == null ||
        this.secondFormData.dgbohc_bfl_num_gb == 0;
      let dgbohc_bfl_num_hcIsEmpty =
        this.secondFormData.dgbohc_bfl_num_hc == "" ||
        this.secondFormData.dgbohc_bfl_num_hc == null ||
        this.secondFormData.dgbohc_bfl_num_hc == 0;

      let dgbohc_bfl_fromIsEmpty =
        this.secondFormData.dgbohc_bfl_from == "" ||
        this.secondFormData.dgbohc_bfl_from == null;

      let dgbohc_bfl_toIsEmpty =
        this.secondFormData.dgbohc_bfl_to == "" ||
        this.secondFormData.dgbohc_bfl_to == null;

      if (dgbohc_bfl_fromIsEmpty && !dgbohc_bfl_toIsEmpty) {
        this.warninText =
          "When 'TO' is not empty 'FROM' must not be empty too !";
        this.errorDialog = true;
        return true;
      }
      if (
        !dgbohc_bfl_num_gbIsEmpty &&
        !dgbohc_bfl_num_hcIsEmpty &&
        dgbohc_bfl_fromIsEmpty
      ) {
        this.warninText =
          "When number of gear boxes or hatch covers is not zero you must insert 'FROM' and 'TO' datetimes or at least 'FROM' !";
        this.errorDialog = true;
        return true;
      }
      if (
        dgbohc_bfl_num_gbIsEmpty &&
        dgbohc_bfl_num_hcIsEmpty &&
        !dgbohc_bfl_fromIsEmpty
      ) {
        this.warninText =
          "When 'FROM' datetime is inserted either one of  number of gear boxes or hatch covers must not be zero !";
        this.errorDialog = true;
        return true;
      }
      return false;
    },
    checkIfNumberFullAndFromAndToEmpty2() {
      let dss_bfl_num_spIsEmpty =
        this.secondFormData.dss_bfl_num_sp == "" ||
        this.secondFormData.dss_bfl_num_sp == null;
      let dss_bfl_fbIsEmpty =
        this.secondFormData.dss_bfl_fb == "" ||
        this.secondFormData.dss_bfl_fb == null;
      let dss_bfl_fb_dnwIsEmpty =
        this.secondFormData.dss_bfl_fb_dnw == "" ||
        this.secondFormData.dss_bfl_fb_dnw == null;
      let dss_bfl_fromIsEmpty =
        this.secondFormData.dss_bfl_from == "" ||
        this.secondFormData.dss_bfl_from == null;
      let dss_bfl_toIsEmpty =
        this.secondFormData.dss_bfl_to == "" ||
        this.secondFormData.dss_bfl_to == null;

      if (dss_bfl_fromIsEmpty && !dss_bfl_toIsEmpty) {
        this.warninText =
          "When 'TO' is not empty 'FROM' must not be empty too !";
        this.errorDialog = true;
        return true;
      }
      if (
        !dss_bfl_num_spIsEmpty &&
        (!dss_bfl_fb_dnwIsEmpty || !dss_bfl_fbIsEmpty) &&
        dss_bfl_fromIsEmpty
      ) {
        this.warninText =
          "When number of spreaders is not zero or From Bay /Dish is NS or Wires you must insert 'FROM' and 'TO' datetimes or at least 'FROM' !";
        this.errorDialog = true;
        return true;
      }
      if (
        dss_bfl_num_spIsEmpty &&
        (dss_bfl_fb_dnwIsEmpty || dss_bfl_fbIsEmpty) &&
        !dss_bfl_fromIsEmpty
      ) {
        this.warninText =
          "When 'FROM' datetime is inserted either one of number of spreaders must not be zero or From Bay /Dish is NS or Wires must been selected !";
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
};
</script>
