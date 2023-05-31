<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <div class="crane-dropdown">
                  <v-select
                    filled
                    outlined
                    label="Crane"
                    :items="cranes"
                    item-text="craneId"
                    item-value="id"
                    v-model="liftDelay.crane_id"
                    @change="onChange1"
                  >
                  </v-select>
                </div>
                <div class="lift-dropdown">
                  <v-select
                    filled
                    outlined
                    label="Lifts"
                    :items="liftchoices"
                    item-text="lift"
                    item-value="liftVarNam"
                    v-model="liftDelay.liftVarNam"
                    @change="onChange2"
                    :disabled="liftDelay.crane_id == ''"
                  >
                  </v-select>
                </div>
              </v-col>
              <v-col cols="12">
                <center>
                  <h3>Time:</h3>
                  <vc-date-picker
                    v-model="datetime"
                    mode="dateTime"
                    is-expanded
                    is24hr
                    @input="dateChange()"
                  />
                </center>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              v-if="liftDelay.crane_id != '' && liftDelay.liftVarNam != ''"
              depressed
              color="error"
              @click="clear"
            >
              Clear <v-icon right dark> mdi-autorenew </v-icon></v-btn
            >
            <v-spacer></v-spacer>
            <v-btn depressed color="" @click="close"> Cancel </v-btn>
            <v-btn depressed color="primary" @click="openSaveDelay">
              Save
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-dialog v-model="dialog4" width="500">
        <v-card
          v-if="
            liftDelay.crane_id != '' &&
            liftDelay.liftVarNam != '' &&
            liftDelay.value != '' &&
            liftDelay.value != null &&
            liftDelay.value != 'Invalid date'
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
            <v-btn depressed color="primary" @click="saveLiftDelay">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else-if="liftDelay.crane_id == ''">
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>Select crane first !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-else-if="liftDelay.liftVarNam == ''">
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>Select a lift !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-else-if="
            liftDelay.value == '' ||
            liftDelay.value == null ||
            liftDelay.value == 'Invalid date'
          "
        >
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>Select date and time !</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialog9" width="500">
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Confirm action
          </v-card-title>

          <v-card-text>
            <h3>Are you sure you want to proceed?</h3>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="" @click="dialog9 = false">Cancel</v-btn>
            <v-btn depressed color="primary" @click="confirmClear">OK</v-btn>
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
                <h3 class="error--text">{{ warninText4 }}</h3>
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
<script>
import {
  compareTwoDate,
  FormatDateStringToISO,
  formatToSimpleFormatDD_MM_YYYY_H_M_S,
} from "../../../helpers/helpers.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "LiftDelay",
  data() {
    return {
      errorDialog: false,
      warninText: "",
      warninText2: "",
      warninText3: "",
      warninText4: "",
      dialog4: false,
      liftDelay: {
        id: "",
        crane_id: "",
        liftVarNam: "",
        value: "",
      },
      leftDelays: [],
      datetime: new Date(),
      cranes: [],
      liftchoices: [],
      liftchoicesHolder: [
        { lift: "1st First Lift", liftVarNam: "ffl" },
        { lift: "1st Last Lift", liftVarNam: "fll" },
        { lift: "2nd First Lift", liftVarNam: "sfl" },
        { lift: "2nd Last Lift", liftVarNam: "sll" },
        { lift: "3rd First Lift", liftVarNam: "tfl" },
        { lift: "3rd Last Lift", liftVarNam: "tll" },
        { lift: "4th First Lift", liftVarNam: "fofl" },
        { lift: "4th Last Lift", liftVarNam: "foll" },
        { lift: "5th First Lift", liftVarNam: "fifl" },
        { lift: "5th Last Lift", liftVarNam: "fill" },
        { lift: "6th First Lift", liftVarNam: "sifl" },
        { lift: "6th Last Lift", liftVarNam: "sill" },
        { lift: "7th First Lift", liftVarNam: "sevfl" },
        { lift: "7th Last Lift", liftVarNam: "sevll" },
        { lift: "8th First Lift", liftVarNam: "eifl" },
        { lift: "8th Last Lift", liftVarNam: "eill" },
        { lift: "9th First Lift", liftVarNam: "nfl" },
        { lift: "9th Last Lift", liftVarNam: "nll" },
        { lift: "10th First Lift", liftVarNam: "tenfl" },
        { lift: "10th Last Lift", liftVarNam: "tenll" },
      ],
    };
  },
  methods: {
    ...mapActions([
      "leftDelaySetterAction",
      "saveOrUpdateVoyageAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    dateChange() {
      this.liftDelay.value = formatToSimpleFormatDD_MM_YYYY_H_M_S(
        this.datetime
      );
    },
    onChange1() {
      if (this.liftDelay.crane_id != "") {
        this.liftchoices = [];
        let thisLiftDelays = this.leftDelays.filter((e) => {
          return e.crane_id == this.liftDelay.crane_id;
        });

        const thisChoices = [
          { lift: "1st First Lift", liftVarNam: "ffl" },
          { lift: "1st Last Lift", liftVarNam: "fll" },
          { lift: "2nd First Lift", liftVarNam: "sfl" },
          { lift: "2nd Last Lift", liftVarNam: "sll" },
          { lift: "3rd First Lift", liftVarNam: "tfl" },
          { lift: "3rd Last Lift", liftVarNam: "tll" },
          { lift: "4th First Lift", liftVarNam: "fofl" },
          { lift: "4th Last Lift", liftVarNam: "foll" },
          { lift: "5th First Lift", liftVarNam: "fifl" },
          { lift: "5th Last Lift", liftVarNam: "fill" },
          { lift: "6th First Lift", liftVarNam: "sifl" },
          { lift: "6th Last Lift", liftVarNam: "sill" },
          { lift: "7th First Lift", liftVarNam: "sevfl" },
          { lift: "7th Last Lift", liftVarNam: "sevll" },
          { lift: "8th First Lift", liftVarNam: "eifl" },
          { lift: "8th Last Lift", liftVarNam: "eill" },
          { lift: "9th First Lift", liftVarNam: "nfl" },
          { lift: "9th Last Lift", liftVarNam: "nll" },
          { lift: "10th First Lift", liftVarNam: "tenfl" },
          { lift: "10th Last Lift", liftVarNam: "tenll" },
        ];
        let countFullLifts = 0;
        thisChoices.map((e) => {
          if (
            thisLiftDelays.filter((l) => {
              return (
                l.liftVarNam == e.liftVarNam && l.value != "" && l.value != null
              );
            }).length == 1
          )
            countFullLifts++;
        });
        if (countFullLifts == 0)
          this.liftchoices.push({
            lift: "1st First Lift (Empty)",
            liftVarNam: "ffl",
          });
        else if (countFullLifts == 1) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({
            lift: "1st Last Lift (Empty)",
            liftVarNam: "fll",
          });
        } else if (countFullLifts == 2) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({
            lift: "2nd First Lift (Empty)",
            liftVarNam: "sfl",
          });
        } else if (countFullLifts == 3) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({
            lift: "2nd Last Lift (Empty)",
            liftVarNam: "sll",
          });
        } else if (countFullLifts == 4) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({
            lift: "3rd First Lift (Empty)",
            liftVarNam: "tfl",
          });
        } else if (countFullLifts == 5) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift (Empty)",
            liftVarNam: "tll",
          });
        } else if (countFullLifts == 6) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({
            lift: "4th First Lift (Empty)",
            liftVarNam: "fofl",
          });
        } else if (countFullLifts == 7) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({
            lift: "4th Last Lift (Empty)",
            liftVarNam: "foll",
          });
        } else if (countFullLifts == 8) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({
            lift: "5th First Lift (Empty)",
            liftVarNam: "fifl",
          });
        } else if (countFullLifts == 9) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({
            lift: "5th Last Lift (Empty)",
            liftVarNam: "fill",
          });
        } else if (countFullLifts == 10) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({
            lift: "6th First Lift (Empty)",
            liftVarNam: "sifl",
          });
        } else if (countFullLifts == 11) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({
            lift: "6th Last Lift (Empty)",
            liftVarNam: "sill",
          });
        } else if (countFullLifts == 12) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift (Empty)",
            liftVarNam: "sevfl",
          });
        } else if (countFullLifts == 13) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({
            lift: "7th Last Lift (Empty)",
            liftVarNam: "sevll",
          });
        } else if (countFullLifts == 14) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({ lift: "7th Last Lift", liftVarNam: "sevll" });
          this.liftchoices.push({
            lift: "8th First Lift (Empty)",
            liftVarNam: "eifl",
          });
        } else if (countFullLifts == 15) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({ lift: "7th Last Lift", liftVarNam: "sevll" });
          this.liftchoices.push({ lift: "8th First Lift", liftVarNam: "eifl" });
          this.liftchoices.push({
            lift: "8th Last Lift (Empty)",
            liftVarNam: "eill",
          });
        } else if (countFullLifts == 16) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({ lift: "7th Last Lift", liftVarNam: "sevll" });
          this.liftchoices.push({ lift: "8th First Lift", liftVarNam: "eifl" });
          this.liftchoices.push({ lift: "8th Last Lift", liftVarNam: "eill" });
          this.liftchoices.push({
            lift: "9th First Lift (Empty)",
            liftVarNam: "nfl",
          });
        } else if (countFullLifts == 17) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({ lift: "7th Last Lift", liftVarNam: "sevll" });
          this.liftchoices.push({ lift: "8th First Lift", liftVarNam: "eifl" });
          this.liftchoices.push({ lift: "8th Last Lift", liftVarNam: "eill" });
          this.liftchoices.push({ lift: "9th First Lift", liftVarNam: "nfl" });
          this.liftchoices.push({
            lift: "9th Last Lift (Empty)",
            liftVarNam: "nll",
          });
        } else if (countFullLifts == 18) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({ lift: "7th Last Lift", liftVarNam: "sevll" });
          this.liftchoices.push({ lift: "8th First Lift", liftVarNam: "eifl" });
          this.liftchoices.push({ lift: "8th Last Lift", liftVarNam: "eill" });
          this.liftchoices.push({ lift: "9th First Lift", liftVarNam: "nfl" });
          this.liftchoices.push({ lift: "9th Last Lift", liftVarNam: "nll" });
          this.liftchoices.push({
            lift: "10th First Lift (Empty)",
            liftVarNam: "tenfl",
          });
        } else if (countFullLifts == 19) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({ lift: "7th Last Lift", liftVarNam: "sevll" });
          this.liftchoices.push({ lift: "8th First Lift", liftVarNam: "eifl" });
          this.liftchoices.push({ lift: "8th Last Lift", liftVarNam: "eill" });
          this.liftchoices.push({ lift: "9th First Lift", liftVarNam: "nfl" });
          this.liftchoices.push({ lift: "9th Last Lift", liftVarNam: "nll" });
          this.liftchoices.push({
            lift: "10th First Lift",
            liftVarNam: "tenfl",
          });
          this.liftchoices.push({
            lift: "10th Last Lift (Empty)",
            liftVarNam: "tenll",
          });
        } else if (countFullLifts == 20) {
          this.liftchoices.push({ lift: "1st First Lift", liftVarNam: "ffl" });
          this.liftchoices.push({ lift: "1st Last Lift", liftVarNam: "fll" });
          this.liftchoices.push({ lift: "2nd First Lift", liftVarNam: "sfl" });
          this.liftchoices.push({ lift: "2nd Last Lift", liftVarNam: "sll" });
          this.liftchoices.push({ lift: "3rd First Lift", liftVarNam: "tfl" });
          this.liftchoices.push({
            lift: "3rd Last Lift",
            liftVarNam: "tll",
          });
          this.liftchoices.push({ lift: "4th First Lift", liftVarNam: "fofl" });
          this.liftchoices.push({ lift: "4th Last Lift", liftVarNam: "foll" });
          this.liftchoices.push({ lift: "5th First Lift", liftVarNam: "fifl" });
          this.liftchoices.push({ lift: "5th Last Lift", liftVarNam: "fill" });
          this.liftchoices.push({ lift: "6th First Lift", liftVarNam: "sifl" });
          this.liftchoices.push({ lift: "6th Last Lift", liftVarNam: "sill" });
          this.liftchoices.push({
            lift: "7th First Lift",
            liftVarNam: "sevfl",
          });
          this.liftchoices.push({ lift: "7th Last Lift", liftVarNam: "sevll" });
          this.liftchoices.push({ lift: "8th First Lift", liftVarNam: "eifl" });
          this.liftchoices.push({ lift: "8th Last Lift", liftVarNam: "eill" });
          this.liftchoices.push({ lift: "9th First Lift", liftVarNam: "nfl" });
          this.liftchoices.push({ lift: "9th Last Lift", liftVarNam: "nll" });
          this.liftchoices.push({
            lift: "10th First Lift",
            liftVarNam: "tenfl",
          });
          this.liftchoices.push({
            lift: "10th Last Lift",
            liftVarNam: "tenll",
          });
        }
      }
      this.onChange2();
    },
    onChange2() {
      if (this.liftDelay.crane_id != "" && this.liftDelay.liftVarNam != "") {
        let count = 0;
        this.leftDelays.map((e) => {
          if (
            this.liftDelay.crane_id == e.crane_id &&
            this.liftDelay.liftVarNam == e.liftVarNam
          ) {
            this.liftDelay.id = e.id;
            if (e.value != "" && e.value != null) {
              this.datetime = new Date(FormatDateStringToISO(e.value));
              this.liftDelay.value = e.value;
            } else {
              this.datetime = new Date();
              this.liftDelay.value = formatToSimpleFormatDD_MM_YYYY_H_M_S(
                this.datetime
              );
            }

            count = 1;
          }
          if (count == 0) {
            this.liftDelay.value = "";
            this.datetime = new Date();
            this.liftDelay.id = "";
          }
        });
      }
    },
    close() {
      this.dialog = false;
    },
    saveLiftDelay() {
      if (this.liftchoices.length > 1) {
        let ThisLiftDelayHolder = {};
        let ThisLiftDelayHolder2 = {};
        let thisLiftDelays = this.leftDelays.filter((e) => {
          return e.crane_id == this.liftDelay.crane_id;
        });
        for (let index = 0; index < thisLiftDelays.length; index++) {
          if (thisLiftDelays[index].liftVarNam != this.liftDelay.liftVarNam)
            ThisLiftDelayHolder = { ...thisLiftDelays[index] };
          else break;
        }
        for (let index = thisLiftDelays.length - 1; index >= 0; index--) {
          if (thisLiftDelays[index].liftVarNam != this.liftDelay.liftVarNam)
            ThisLiftDelayHolder2 = { ...thisLiftDelays[index] };
          else break;
        }

        if (
          ThisLiftDelayHolder &&
          Object.keys(ThisLiftDelayHolder).length === 0 &&
          Object.getPrototypeOf(ThisLiftDelayHolder) === Object.prototype
        ) {
          ThisLiftDelayHolder = { ...thisLiftDelays[0] };
        }
        if (
          ThisLiftDelayHolder2 &&
          Object.keys(ThisLiftDelayHolder2).length === 0 &&
          Object.getPrototypeOf(ThisLiftDelayHolder2) === Object.prototype
        ) {
          ThisLiftDelayHolder2 = { ...thisLiftDelays[19] };
        }

        let d1 = new Date(FormatDateStringToISO(this.liftDelay.value));
        let d2 = new Date(FormatDateStringToISO(ThisLiftDelayHolder.value));
        if (
          compareTwoDate(d1, d2) == 1 ||
          this.liftDelay.liftVarNam == ThisLiftDelayHolder.liftVarNam
        ) {
          if (
            ThisLiftDelayHolder2.value != "" &&
            ThisLiftDelayHolder2.value != null
          ) {
            let d3 = new Date(FormatDateStringToISO(this.liftDelay.value));
            let d4 = new Date(
              FormatDateStringToISO(ThisLiftDelayHolder2.value)
            );
            if (
              compareTwoDate(d3, d4) == -1 ||
              this.liftDelay.liftVarNam == ThisLiftDelayHolder2.liftVarNam
            ) {
              this.leftDelaySetterAction(this.liftDelay);
              this.dialog4 = this.$emit("refreshTable");
            } else {
              this.warninText3 = "";
              let nextLiftName = this.liftchoicesHolder.filter(
                (e) => e.liftVarNam == ThisLiftDelayHolder2.liftVarNam
              )[0];
              let thisLiftName = this.liftchoicesHolder.filter(
                (e) => e.liftVarNam == this.liftDelay.liftVarNam
              )[0];

              this.warninText =
                thisLiftName.lift +
                " datetime must be inferior than " +
                nextLiftName.lift +
                " datetime :";
              this.warninText2 =
                nextLiftName.lift + " : " + ThisLiftDelayHolder2.value;
              this.warninText4 =
                thisLiftName.lift + " : " + this.liftDelay.value;
              this.errorDialog = true;
              this.dialog4 = false;
            }
          } else {
            this.leftDelaySetterAction(this.liftDelay);
            this.dialog4 = this.$emit("refreshTable");
          }
        } else {
          this.warninText4 = "";
          let previousLiftName = this.liftchoicesHolder.filter(
            (e) => e.liftVarNam == ThisLiftDelayHolder.liftVarNam
          )[0];
          let thisLiftName = this.liftchoicesHolder.filter(
            (e) => e.liftVarNam == this.liftDelay.liftVarNam
          )[0];

          this.warninText =
            thisLiftName.lift +
            " datetime must be superior than " +
            previousLiftName.lift +
            " datetime :";
          this.warninText2 =
            previousLiftName.lift + " : " + ThisLiftDelayHolder.value;
          this.warninText3 = thisLiftName.lift + " : " + this.liftDelay.value;
          this.errorDialog = true;
          this.dialog4 = false;
        }
      } else {
        this.leftDelaySetterAction(this.liftDelay);
        this.dialog4 = this.$emit("refreshTable");
      }
    },
    openSaveDelay() {
      this.dialog4 = true;
    },
    closeWarning() {
      this.warninText = "";
      this.errorDialog = false;
    },
    clear() {
      this.liftDelay.value = null;
      this.dialog9 = true;
    },
    confirmClear() {
      this.leftDelaySetterAction(this.liftDelay);
      this.dialog9 = this.$emit("refreshTable");
    },
  },
  computed: {
    ...mapGetters(["getCranes", "getVoyageToEditOrSave"]),
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
    this.cranes = this.getCranes;
    const thisChoices = [
      { lift: "1st First Lift", liftVarNam: "ffl" },
      { lift: "1st Last Lift", liftVarNam: "fll" },
      { lift: "2nd First Lift", liftVarNam: "sfl" },
      { lift: "2nd Last Lift", liftVarNam: "sll" },
      { lift: "3rd First Lift", liftVarNam: "tfl" },
      { lift: "3rd Last Lift", liftVarNam: "tll" },
      { lift: "4th First Lift", liftVarNam: "fofl" },
      { lift: "4th Last Lift", liftVarNam: "foll" },
      { lift: "5th First Lift", liftVarNam: "fifl" },
      { lift: "5th Last Lift", liftVarNam: "fill" },
      { lift: "6th First Lift", liftVarNam: "sifl" },
      { lift: "6th Last Lift", liftVarNam: "sill" },
      { lift: "7th First Lift", liftVarNam: "sevfl" },
      { lift: "7th Last Lift", liftVarNam: "sevll" },
      { lift: "8th First Lift", liftVarNam: "eifl" },
      { lift: "8th Last Lift", liftVarNam: "eill" },
      { lift: "9th First Lift", liftVarNam: "nfl" },
      { lift: "9th Last Lift", liftVarNam: "nll" },
      { lift: "10th First Lift", liftVarNam: "tenfl" },
      { lift: "10th Last Lift", liftVarNam: "tenll" },
    ];
    this.getVoyageToEditOrSave.crane_voyages.map((c) => {
      thisChoices.map((l) => {
        if (c[l.liftVarNam] != "") {
          this.leftDelays.push({
            id: c.id,
            crane_id: c.crane_id,
            liftVarNam: l.liftVarNam,
            value: c[l.liftVarNam],
          });
        }
      });
    });
    this.liftDelay.value = formatToSimpleFormatDD_MM_YYYY_H_M_S(this.datetime);
  },
};
</script>
