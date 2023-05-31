<template>
  <v-app>
    <v-row class="rowInTheVoyageVessel">
      <v-col cols="12" class="my-0 py-0 voyagevessel">
        <h2 style="color: #1565c0">VOYAGE : {{ Voy_id }}</h2>
      </v-col>
      <v-col cols="2" class="my-0 py-0 mr-0 pr-0">
        <vc-date-picker
          v-model="date"
          @input="selectedDateForActualVoyageChange"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              :class="
                selectedDateForActualVoyage == 'Select Date !'
                  ? 'beforeText'
                  : ''
              "
              label="Date"
              outlined
              :value="inputValue"
              v-on="inputEvents"
              v-model="selectedDateForActualVoyage"
              prepend-inner-icon="mdi-calendar-clock"
              class="voyagevessel"
            ></v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
      <v-col cols="3" class="my-0 py-0 mr-0 pr-0">
        <v-select
          outlined
          label="Vessel Name"
          :items="actualVoyages"
          @change="onChange"
          filled
          item-text="vessel_name"
          item-value="voy_no"
          v-model="selectedVoyage.voy_no"
          prepend-inner-icon="mdi-ferry"
          class="voyagevessel"
        >
        </v-select>
      </v-col>
      <v-col cols="3" class="my-0 py-0 mr-0 pr-0">
        <v-text-field
          label="Service"
          outlined
          v-model="selectedVoyage.service"
          prepend-inner-icon="mdi-vector-polyline"
          disabled
          class="voyagevessel"
        ></v-text-field>
      </v-col>
      <v-col cols="2" class="my-0 py-0 mr-0 pr-0">
        <vc-date-picker
          v-model="datepickerEta"
          mode="dateTime"
          is24hr
          @input="etaChange"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              class="voyagevessel"
              label="ETA"
              outlined
              :value="inputValue"
              v-on="inputEvents"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              v-model="selectedVoyage.eta"
              disabled
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
      <v-col cols="2" class="my-0 py-0">
        <vc-date-picker
          v-model="datepickerEtd"
          mode="dateTime"
          is24hr
          @input="etdChange"
        >
          <template v-slot="{ inputValue, inputEvents }">
            <v-text-field
              class="voyagevessel"
              label="ETD"
              outlined
              :value="inputValue"
              v-on="inputEvents"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              v-model="selectedVoyage.etd"
              disabled
            >
            </v-text-field>
          </template>
        </vc-date-picker>
      </v-col>
    </v-row>
  </v-app>
</template>
<style scoped></style>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  formatToSimpleFormatDD_MM_YYYY,
  formatToSimpleFormatDD_MM_YYYY_H_M_S,
} from "../../../helpers/helpers.js";
import { FormatDateStringToISO } from "../../../helpers/helpers.js";

export default {
  name: "voyagevessel",
  data: () => ({
    date: new Date(),
    selectedDateForActualVoyage: null,
    value: "",
    datepickerEta: new Date(),
    datepickerEtd: new Date(),
    actualVoyages: [],
    reservedTakedValue: false,
    reservedActualVoyage: [],

    selectedVoyage: {
      voy_no: "",
      vessel_name: "",
      service: "",
      eta: "",
      etd: "",
    },
  }),
  mounted() {
    if (this.getVoyageToEditOrSave.id != "") {
      this.setModuleShowToTrueAction();

      this.selectedVoyage = { ...this.getVoyageToEditOrSave.vessel };
      this.reservedActualVoyage.push({ ...this.selectedVoyage });
      this.datepickerEta = new Date(
        FormatDateStringToISO(this.selectedVoyage.eta)
      );
      this.date = new Date(FormatDateStringToISO(this.selectedVoyage.eta));
      this.datepickerEtd = new Date(
        FormatDateStringToISO(this.selectedVoyage.etd)
      );
      this.selectedDateForActualVoyage = formatToSimpleFormatDD_MM_YYYY(
        new Date(FormatDateStringToISO(this.selectedVoyage.eta))
      );
      this.setActualVoyagesAction(this.selectedDateForActualVoyage)
        .then(() => {
          this.actualVoyages = [...this.getActualVoyages];
          this.actualVoyages.push({ ...this.selectedVoyage });
          this.setModuleShowToFalseAction();
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
          this.setSnackBarTosFailed("Failed to load vessels voyage liste !");
        });
      //this.actualVoyages = this.getActualVoyages;
      //this.setModuleShowToFalseAction();
    } else {
      this.selectedDateForActualVoyage = formatToSimpleFormatDD_MM_YYYY(
        this.date
      );
      this.setActualVoyagesAction(this.selectedDateForActualVoyage)
        .then(() => {
          this.actualVoyages = [...this.getActualVoyages];
          this.setModuleShowToFalseAction();
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
        });
      //this.actualVoyages = this.getActualVoyages;
      //this.setModuleShowToFalseAction();
    }

    if (this.selectedVoyage.voy_no == "" || this.selectedVoyage.voy_no == null)
      this.$emit("showTheWall");
    else this.$emit("closeTheWall");
  },
  methods: {
    ...mapActions([
      "setActualVoyagesAction",
      "vesselSetterAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "setSnackBarTosFailed",
    ]),
    onChange() {
      if (this.selectedVoyage.voy_no != "") {
        this.actualVoyages.filter((e) => {
          if (e.voy_no == this.selectedVoyage.voy_no) {
            this.selectedVoyage.vessel_name = e.vessel_name;
            this.selectedVoyage.service = e.service;
            this.selectedVoyage.eta = e.eta;

            this.datepickerEta = new Date(FormatDateStringToISO(e.eta));
            this.selectedVoyage.etd = e.etd;

            this.datepickerEtd = new Date(FormatDateStringToISO(e.etd));
            return true;
          }
          return false;
        })[0];
        let exist = false;
        exist =
          this.reservedActualVoyage.filter(
            (e) => e.voy_no != this.selectedVoyage.voy_no
          ).length > 0;
        if (exist) this.reservedActualVoyage.push({ ...this.selectedVoyage });
        this.vesselSetterAction(this.selectedVoyage);
        this.selectedDateForActualVoyage = formatToSimpleFormatDD_MM_YYYY(
          new Date(FormatDateStringToISO(this.selectedVoyage.eta))
        );
      }
    },
    etaChange(input) {
      this.selectedVoyage.eta = formatToSimpleFormatDD_MM_YYYY_H_M_S(input);
    },
    etdChange(input) {
      this.selectedVoyage.etd = formatToSimpleFormatDD_MM_YYYY_H_M_S(input);
    },
    selectedDateForActualVoyageChange(input) {
      this.setModuleShowToTrueAction();
      this.selectedVoyage = {
        voy_no: "",
        vessel_name: "",
        service: "",
        eta: "",
        etd: "",
      };
      this.selectedDateForActualVoyage = formatToSimpleFormatDD_MM_YYYY(input);
      if (this.selectedDateForActualVoyage != "Invalid date") {
        this.setActualVoyagesAction(this.selectedDateForActualVoyage)
          .then(() => {
            this.actualVoyages = [...this.getActualVoyages];
            if (
              this.selectedDateForActualVoyage ==
              formatToSimpleFormatDD_MM_YYYY(
                FormatDateStringToISO(this.getVoyageToEditOrSave.vessel.eta)
              )
            ) {
              this.actualVoyages.push({ ...this.getVoyageToEditOrSave.vessel });
              this.selectedVoyage.voy_no =
                this.getVoyageToEditOrSave.vessel.voy_no;
              this.selectedVoyage.vessel_name =
                this.getVoyageToEditOrSave.vessel.vessel_name;
              this.selectedVoyage.service =
                this.getVoyageToEditOrSave.vessel.service;
              this.selectedVoyage.eta = this.getVoyageToEditOrSave.vessel.eta;
              this.datepickerEta = new Date(
                FormatDateStringToISO(this.getVoyageToEditOrSave.vessel.eta)
              );
              this.selectedVoyage.etd = this.getVoyageToEditOrSave.vessel.etd;

              this.datepickerEtd = new Date(
                FormatDateStringToISO(this.getVoyageToEditOrSave.vessel.etd)
              );
              //-------------------------------------------------------------
            }
            this.reservedActualVoyage.forEach((element) => {
              if (
                this.selectedDateForActualVoyage ==
                formatToSimpleFormatDD_MM_YYYY(
                  FormatDateStringToISO(element.eta)
                )
              ) {
                this.actualVoyages.push({ ...element });
              }
            });

            this.setModuleShowToFalseAction();
          })
          .catch(() => {
            this.setModuleShowToFalseAction();
          });
      } else {
        this.setModuleShowToFalseAction();
        this.selectedVoyage = {
          voy_no: "",
          vessel_name: "",
          service: "",
          eta: "",
          etd: "",
        };
        this.selectedDateForActualVoyage = "Select Date !";
      }
    },
  },
  computed: {
    ...mapGetters(["getActualVoyages", "getVoyageToEditOrSave"]),
    Voy_id() {
      if (this.getVoyageToEditOrSave.id == "")
        return this.selectedVoyage.voy_no;
      else return this.getVoyageToEditOrSave.vessel.voy_no;
    },
  },
  watch: {
    "selectedVoyage.voy_no"($new) {
      if (
        this.selectedVoyage.voy_no == "" ||
        this.selectedVoyage.voy_no == null
      )
        this.$emit("showTheWall");
      else this.$emit("closeTheWall");
    },
  },
};
</script>
