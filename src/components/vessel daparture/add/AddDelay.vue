<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card-text>
          <h1>{{ selectedDepartureChoice.operation }}:</h1>
          <br />

          <v-row>
            <v-col cols="6">
              <h3>From(Date/Time):</h3>
              <vc-date-picker
                v-model="from"
                mode="dateTime"
                is-expanded
                is24hr
                @input="dateChange()"
              />
            </v-col>

            <v-col cols="6">
              <h3>To(Date/Time):</h3>
              <vc-date-picker
                v-model="to"
                mode="dateTime"
                is-expanded
                is24hr
                @input="dateChange()"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="comment"
                outlined
                name="input-7-4"
                label="Comment ..."
                clearable
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="" @click="close"> Cancel </v-btn>
          <v-btn
            depressed
            :color="
              from == '' || from == null || to == '' || to == null
                ? 'grey'
                : 'primary'
            "
            @click="openSave"
          >
            Save
          </v-btn>
        </v-card-actions></v-col
      >
    </v-row>
    <v-dialog v-model="dialog4" width="500">
      <v-card v-if="from != '' && from != null && to != '' && to != null">
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

      <v-card v-else-if="to == '' || to == null">
        <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

        <v-card-text class="mt-4">
          <h2>Select "To" Datetime !</h2>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="dialog4 = false">OK</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="from == '' || from == null">
        <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

        <v-card-text class="mt-4">
          <h2>Select "From" Datetime !</h2>
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
              <v-btn depressed color="primary" @click="closeWarning">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
* {
  color: black;
}
</style>
<script>
import {
  compareTwoDate,
  FormatDateStringToISO,
  formatToSimpleFormatDD_MM_YYYY_H_M_S,
} from "../../../helpers/helpers.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddDelay",
  props: ["selectedDepartureChoice"],
  data() {
    return {
      errorDialog: false,
      warninText: "",
      warninText2: "",
      warninText3: "",
      insertCommentIsMandatory: false,
      from: Date.now(),
      to: Date.now(),
      comment: "",
      unmooring_forward_from: "",
      unmooring_forward_to: "",
      unmooring_forward_comment: "",
      unmooring_aft_from: "",
      unmooring_aft_to: "",
      unmooring_aft_comment: "",

      dialog4: false,
    };
  },
  methods: {
    ...mapActions(["vesselDepartureSetterAction"]),
    dateChange() {
      this[this.selectedDepartureChoice.from] =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(this.from);
      this[this.selectedDepartureChoice.to] =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(this.to);
    },

    close() {
      this.dialog = false;
    },
    openSave() {
      this.dialog4 = true;
    },
    saveDelay() {
      let d1 = new Date(
        FormatDateStringToISO(this[this.selectedDepartureChoice.to])
      );
      let d2 = new Date(
        FormatDateStringToISO(this[this.selectedDepartureChoice.from])
      );
      if (compareTwoDate(d1, d2) == 1) {
        this.vesselDepartureSetterAction({
          from: this.selectedDepartureChoice.from,
          to: this.selectedDepartureChoice.to,
          comment: this.selectedDepartureChoice.comment,
          commentValue: this.comment,
          fromValue: this[this.selectedDepartureChoice.from],
          toValue: this[this.selectedDepartureChoice.to],
        });
        this.dialog4 = this.$emit("reloadTable");
      } else {
        this.warninText =
          '"To" datetime must be superior than "From" datetime :';
        this.warninText2 = "From : " + this[this.selectedDepartureChoice.from];
        this.warninText3 = "To : " + this[this.selectedDepartureChoice.to];
        this.errorDialog = true;
      }
      this.dialog4 = false;
    },
    closeWarning() {
      this.warninText = "";
      this.errorDialog = false;
    },
  },
  computed: {
    ...mapGetters(["getVoyageToEditOrSave"]),
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    this.unmooring_forward_from =
      this.getVoyageToEditOrSave.unmooring_forward_from;
    this.unmooring_forward_to = this.getVoyageToEditOrSave.unmooring_forward_to;
    this.unmooring_forward_comment =
      this.getVoyageToEditOrSave.unmooring_forward_comment;
    this.unmooring_aft_from = this.getVoyageToEditOrSave.unmooring_aft_from;
    this.unmooring_aft_to = this.getVoyageToEditOrSave.unmooring_aft_to;
    this.unmooring_aft_comment =
      this.getVoyageToEditOrSave.unmooring_aft_comment;
    this[this.selectedDepartureChoice.comment] =
      this.selectedDepartureChoice.commentValue;
    this.comment = this[this.selectedDepartureChoice.comment];
    if (
      this[this.selectedDepartureChoice.from] != "" &&
      this[this.selectedDepartureChoice.from] != null
    ) {
      this.from = new Date(
        FormatDateStringToISO(this[this.selectedDepartureChoice.from])
      );
    } else {
      this.from = Date.now();
      this[this.selectedDepartureChoice.from] =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(this.from);
    }
    if (
      this[this.selectedDepartureChoice.to] != "" &&
      this[this.selectedDepartureChoice.to] != null
    ) {
      this.to = new Date(
        FormatDateStringToISO(this[this.selectedDepartureChoice.to])
      );
    } else {
      this.to = Date.now();
      this[this.selectedDepartureChoice.to] =
        formatToSimpleFormatDD_MM_YYYY_H_M_S(this.to);
    }
  },
};
</script>
