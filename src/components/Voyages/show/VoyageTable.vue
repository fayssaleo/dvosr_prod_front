<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="vessels"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            ><h2 style="color: #1976d2">Voyages Reports :</h2></v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            label="Search ..."
            class="mx-4 tableVoyageSearchBar"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-btn
            color="rgb(9 161 216)"
            dark
            class="mb-2 mr-4"
            v-bind="attrs"
            v-on="on"
            @click="showSendReportDialog"
            v-if="
              getAuthenticatedUser.role == 'Admin' ||
              getAuthenticatedUser.role == 'Shift Manager'
            "
          >
            Send Shift Report <v-icon class="ml-2 pl-2">mdi-file-chart</v-icon>
          </v-btn>
          <v-btn
            color="grey"
            dark
            class="mb-2 mr-4"
            v-bind="attrs"
            v-on="on"
            @click="showCodesDialog"
            v-if="
              getAuthenticatedUser.role == 'Admin' ||
              getAuthenticatedUser.role == 'Shift Manager'
            "
          >
            DELAYS CODES <v-icon class="ml-2 pl-2">mdi-cog</v-icon>
          </v-btn>
          <v-btn
            @click="showAllMethod"
            :color="showAll ? 'green' : 'gray'"
            dark
            class="mb-2 mr-6"
          >
            Show All
          </v-btn>
          <v-btn
            @click="addVoyage"
            color="primary"
            dark
            class="mb-2"
            v-if="
              getAuthenticatedUser.role == 'Admin' ||
              getAuthenticatedUser.role == 'Foremen'
            "
          >
            Add Voyage
          </v-btn>

          <v-dialog v-model="successOrFail" max-width="400px">
            <v-card>
              <v-card-text class="text-h5" v-if="successOrFailResult == true">
                <img
                  class="imgForLoading"
                  src="./../../../assets/successgif.gif"
                />
                <h2 class="successMessage">Success !</h2></v-card-text
              >
              <v-card-text class="text-h5" v-else
                ><img
                  class="imgForLoading"
                  src="./../../../assets/failed.png"
                />
                <h2 class="failedMessage">Error !</h2></v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  v-if="successOrFailResult == true"
                  depressed
                  color="green"
                  class="white--text"
                  @click="closeSuccessOrFail"
                  >Continue</v-btn
                >

                <v-btn
                  v-if="successOrFailResult == false"
                  depressed
                  @click="stopCounter"
                  >Cancel</v-btn
                >
                <v-btn
                  v-if="successOrFailResult == false"
                  depressed
                  color="red"
                  class="white--text"
                  @click="sendShiftReportMethod"
                  >Resend in (<span id="counter">10</span>)</v-btn
                >

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="showSendReport" max-width="600px">
            <v-card>
              <v-toolbar dark color="rgb(9, 161, 216)"
                ><h2>SEND SHIFT REPORT</h2></v-toolbar
              >
              <v-card-title class="text-h5"
                >Are you sure you want to send the shift report?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closeSendReportDialog"
                  >CANCEL</v-btn
                >
                <v-btn
                  depressed
                  color="#00ACC1"
                  class="white--text"
                  @click="sendShiftReportMethod"
                  >SEND</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to archive this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="" @click="closeDelete">Cancel</v-btn>
                <v-btn
                  depressed
                  color="#00ACC1"
                  class="white--text"
                  @click="deleteItemConfirm"
                  >Archive</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog4">
            <template v-slot:activator="{ on, attrs }"> </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Voyage : {{ editedItem.voy_no }} --
                {{ editedItem.vessel_name }}
                <v-spacer></v-spacer>
                <!--v-btn
                  depressed
                  rounded
                  color="primary"
                  class="mr-2"
                  @click="undoAction"
                >
                  Undo Last ACTION
                </v-btn-->
              </v-card-title>

              <v-card-text>
                <ActionHistory
                  v-if="dialog4"
                  :historyTable="historyTable"
                  :editedItem="editedItem"
                />
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="closeHistory"> CLOSE </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="showReportDialogVal"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }"> </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="showReportDialogVal = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title
                  >Voyage :
                  {{
                    voyage.vessel ? voyage.vessel.voy_no : ""
                  }}</v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <download-excel
                    class="vesselButton"
                    :data="json_data2"
                    height="20px"
                    worksheet="Vessel stats"
                    :name="
                      voyage.vessel
                        ? voyage.vessel.vessel_name +
                          ' ' +
                          voyage.vessel.voy_no +
                          '-' +
                          'Vessel stats'
                        : ''
                    "
                  >
                    Vessel Stats
                  </download-excel>
                  <download-excel
                    class="craneButton"
                    :data="json_data"
                    height="20px"
                    worksheet="Crane stats"
                    :name="
                      voyage.vessel
                        ? voyage.vessel.vessel_name +
                          ' ' +
                          voyage.vessel.voy_no +
                          '-' +
                          'Crane stats'
                        : ''
                    "
                  >
                    Crane Stats
                  </download-excel>
                  <v-btn
                    dark
                    height="20px"
                    color="green"
                    @click="generateReport"
                  >
                    DOWNLOAD
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <ShowReport :voyage="voyage" :cranes="[...getCranes]" />
            </v-card>
          </v-dialog>
          <v-dialog v-model="CodeDialog" max-width="850px">
            <template v-slot:activator="{ on, attrs }"> </template>

            <CodeTable v-if="CodeDialog" v-model="CodeDialog" />
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          depressed
          rounded
          color="primary"
          class="mr-2 voyageButton"
          @click="editItem(item)"
          v-if="
            getAuthenticatedUser.role == 'Admin' ||
            getAuthenticatedUser.role == 'Foremen' ||
            getAuthenticatedUser.role == 'Shift Manager'
          "
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          depressed
          rounded
          class="mr-2 voyageButton"
          color="#00ACC1"
          @click="deleteItem(item)"
          v-if="
            getAuthenticatedUser.role == 'Admin' ||
            getAuthenticatedUser.role == 'Documentation'
          "
        >
          <v-icon color="#ffffff"> mdi-archive-arrow-down </v-icon>
        </v-btn>
        <v-btn
          depressed
          rounded
          color="#CFD8DC"
          class="mr-2 voyageButton"
          @click="openHistory(item)"
          v-if="
            getAuthenticatedUser.role == 'Foremen' ||
            getAuthenticatedUser.role == 'Admin' ||
            getAuthenticatedUser.role == 'Shift Manager'
          "
        >
          <v-icon> mdi-archive-clock </v-icon>
        </v-btn>
        <v-btn
          depressed
          rounded
          color="#66BB6A"
          @click="openShowReport(item)"
          class="voyageButton"
        >
          <v-icon color="white"> mdi-eye-outline </v-icon>
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>

    <vue-html2pdf
      v-if="voyage.vessel"
      :show-layout="false"
      :enable-download="true"
      :preview-modal="true"
      :filename="
        voyage.vessel
          ? voyage.vessel.vessel_name + ' ' + voyage.vessel.voy_no
          : ''
      "
      :pdf-quality="2"
      :manual-pagination="true"
      ref="html2Pdf"
      pdf-format="a3"
      pdf-content-width="1100px"
    >
      <section style="width: 1100px" slot="pdf-content">
        <ShowReportForDownload :voyage="voyage" :cranes="[...getCranes]" />
      </section>
    </vue-html2pdf>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import ShowReport from "./ShowReport.vue";
import ActionHistory from "./ActionHistory.vue";
import CodeTable from "./../../vessel arrival/add/CodeTable.vue";
import ShowReportForDownload from "./ShowReportForDownload.vue";
import VueHtml2pdf from "vue-html2pdf";
import moment from "moment";

import {
  calculateDuration,
  compareTwoDateWithStringParams,
  sendShiftReportMail,
} from "../../../helpers/helpers";
export default {
  data: () => ({
    showSendReport: false,
    successOrFail: false,
    successOrFailResult: false,
    CodeDialog: false,
    json_fields: {
      City: "city",
      Telephone: "phone.mobile",
    },
    json_data: [],
    json_data2: [],
    json_meta: [
      [
        {
          key: "charset",
          value: "utf-8",
        },
      ],
    ],
    dialog: false,
    dialog4: false,
    dialogDelete: false,
    showReportDialogVal: false,
    voyage: {},
    headers: [
      { text: "Id", value: "voy_no" },
      { text: "Vessel Name", value: "vessel_name" },
      { text: "Service", value: "service" },
      { text: "ETA", value: "eta" },
      { text: "ETD", value: "etd" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    historyHeaders: [
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Username", value: "username" },
      { text: "Action", value: "action" },
      { text: "Shift", value: "shift" },
      { text: "Date", value: "date", sortable: false },
    ],
    vessels: [],
    historyTable: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      vessel_name: "",
      service: "",
      eta: "",
      etd: "",
    },
    defaultItem: {
      id: "",
      vessel_name: "",
      service: "",
      eta: "",
      etd: "",
    },
    search: "",
    showAll: false,
  }),
  components: {
    ShowReport,
    VueHtml2pdf,
    ShowReportForDownload,
    CodeTable,
    ActionHistory,
  },
  computed: {
    ...mapGetters([
      "getVessels",
      "getActionHistory",
      "getVoyages",
      "getCranes",
      "getAuthenticatedUser",
      "getShift",
    ]),
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    ...mapActions([
      "setVoyagesAction",
      "logoutAction",
      "setVoyageToEditAction",
      "initializeVoyageToEditOrSave",
      "setActionHistoryAction",
      "archiveVoyageAction",
      "setSnackBarTosSuccess",
      "setCranesAction",
      "setAllVoyagesAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "setCodesAction",
      "undoAnctionFunctionAction",
      "sendShiftReportAction",
    ]),
    startCounter() {
      var timeleft = 0;
      var setSendShiftReport = () => {
        this.sendShiftReportMethod();
      };
      this.downloadTimer = setInterval(function () {
        if (timeleft >= 10) {
          setSendShiftReport();
          clearInterval(this.downloadTimer);
        }
        document.getElementById("counter").innerHTML = 10 - timeleft;
        timeleft += 1;
      }, 500);
    },
    stopCounter() {
      this.successOrFail = false;
      clearInterval(this.downloadTimer);
    },
    showSendReportDialog() {
      this.showSendReport = true;
    },
    closeSendReportDialog() {
      this.showSendReport = false;
    },
    sendShiftReportMethod() {
      clearInterval(this.downloadTimer);
      this.successOrFail = false;
      this.setModuleShowToTrueAction();
      this.sendShiftReportAction()
        .then((res) => {
          this.closeSendReportDialog();
          this.setModuleShowToFalseAction();
          this.setSnackBarTosSuccess();
          this.successOrFailResult = true;
          this.successOrFail = true;
        })
        .catch((res) => {
          this.closeSendReportDialog();
          this.setModuleShowToFalseAction();
          this.successOrFailResult = false;
          this.successOrFail = true;
          this.startCounter();
        });
    },
    closeSuccessOrFail() {
      this.successOrFail = false;
    },
    showCodesDialog() {
      this.CodeDialog = true;
    },
    initialize() {
      this.vessels = [...this.getVessels];
    },
    editItem(item) {
      this.editedIndex = this.vessels.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.setVoyageToEditAction(item);
      this.$router.push("add/voyage");
    },
    deleteItem(item) {
      this.editedIndex = this.vessels.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.setModuleShowToTrueAction();

      this.archiveVoyageAction({ id: this.editedItem.id })
        .then(() => {
          this.vessels.splice(this.editedIndex, 1);
          this.closeDelete();
          this.setSnackBarTosSuccess();
          this.setModuleShowToFalseAction();
        })
        .catch((error) => {
          this.setModuleShowToFalseAction();
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    addVoyage() {
      this.initializeVoyageToEditOrSave();
      this.$router.push("add/voyage");
    },
    openHistory(item) {
      this.editedIndex = this.vessels.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.setModuleShowToTrueAction();
      this.setActionHistoryAction({ vessel_id: this.editedItem.id })
        .then(() => {
          this.historyTable = this.getActionHistory.reverse();
          this.setModuleShowToFalseAction();
          this.dialog4 = true;
        })
        .catch((error) => {
          this.setModuleShowToFalseAction();
        });
    },
    closeHistory() {
      this.editedIndex = -1;
      this.editedItem = this.defaultItem;
      this.dialog4 = false;
    },
    openShowReport(item) {
      this.voyage = {
        ...this.getVoyages.filter((e) => e.vessel.id == item.id)[0],
      };
      this.fillTheCraneStats(this.voyage);
      this.fillTheVesselStats(this.voyage);
      this.showReportDialogVal = true;
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },
    TotalCraneWorkingHours(voyage) {
      let total = 0;
      this.getCranes.map((c) => {
        let craneVoyage = voyage.crane_voyages.filter(
          (e) => e.crane_id == c.id
        );
        if (craneVoyage.length > 0) {
          total += this.craneWorkingHours(
            craneVoyage[0].ffl,
            craneVoyage[0].fll,
            craneVoyage[0].sfl,
            craneVoyage[0].sll,
            craneVoyage[0].tfl,
            craneVoyage[0].tll
          );
        }
      });
      return total;
    },
    craneWorkingHours(ffl, fll, sfl, sll, tfl, tll) {
      let dur = moment.duration(moment(null));
      let firstDur = null;
      let secDur = null;
      let thirdDur = null;
      if (ffl != "" && ffl != null && fll != "" && fll != null) {
        firstDur = calculateDuration(ffl, fll);
        dur = dur.add(firstDur.days(), "days");
        dur = dur.add(firstDur.hours(), "hours");
        dur = dur.add(firstDur.minutes(), "minutes");
      }
      if (sfl != "" && sfl != null && sll != "" && sll != null) {
        secDur = calculateDuration(sfl, sll);
        dur = dur.add(secDur.days(), "days");
        dur = dur.add(secDur.hours(), "hours");
        dur = dur.add(secDur.minutes(), "minutes");
      }
      if (tfl != "" && tfl != null && tll != "" && tll != null) {
        thirdDur = calculateDuration(tfl, tll);
        dur = dur.add(thirdDur.days(), "days");
        dur = dur.add(thirdDur.hours(), "hours");
        dur = dur.add(thirdDur.minutes(), "minutes");
      }
      let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
      return Math.round((result + Number.EPSILON) * 100) / 100;
    },
    craneIntensity(crane_working_hours, first_lift, last_lift) {
      if (
        crane_working_hours != "" &&
        crane_working_hours != null &&
        last_lift != "" &&
        last_lift != null &&
        first_lift != "" &&
        first_lift != null
      ) {
        let dur = moment.duration(moment(null));
        let firstDur = calculateDuration(first_lift, last_lift);
        dur = dur.add(firstDur.days(), "days");
        dur = dur.add(firstDur.hours(), "hours");
        dur = dur.add(firstDur.minutes(), "minutes");
        let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
        result = crane_working_hours / result;
        return Math.round((result + Number.EPSILON) * 100) / 100;
      }

      return "";
    },
    delayDuration(voyage, crane_id, category) {
      let dur = moment.duration(moment(null));
      let other_delays = voyage.other_delays.filter((e) => {
        return e.crane_id == crane_id && e.category == category;
      });
      other_delays.map((e) => {
        if (e.from != "" && e.from != null && e.to != "" && e.to != null) {
          let firstDur = calculateDuration(e.from, e.to);
          dur = dur.add(firstDur.days(), "days");
          dur = dur.add(firstDur.hours(), "hours");
          dur = dur.add(firstDur.minutes(), "minutes");
        }
      });
      let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
      return Math.round((result + Number.EPSILON) * 100) / 100;
    },
    fillTheCraneStats(voyage) {
      this.json_data = [];
      let dataTable = {
        "Voyage ID": "",
        craneId: "",
        "Crane Boom Up": "",
        "Crane Boom Down": "",
        "1st First Lift": "",
        "1st Last Lift": "",
        "2nd First Lift": "",
        "2nd Last Lift": "",
        "3nd First Lift": "",
        "3nd Last Lift": "",
        "Crane working hours": "",
        "Deductible delays": "",
        "Technical delays": "",
        "Operational delays": "",
      };
      this.getCranes.map((c) => {
        let craneVoyage = voyage.crane_voyages.filter(
          (e) => e.crane_id == c.id
        );
        if (craneVoyage.length > 0) {
          dataTable["Voyage ID"] = voyage.vessel.voy_no;
          dataTable["craneId"] = c.craneId;
          dataTable["Crane Boom Up"] = craneVoyage[0].cbu;
          dataTable["Crane Boom Down"] = craneVoyage[0].cbd;
          dataTable["1st First Lift"] = craneVoyage[0].ffl;
          dataTable["1st Last Lift"] = craneVoyage[0].fll;
          dataTable["2nd First Lift"] = craneVoyage[0].sfl;
          dataTable["2nd Last Lift"] = craneVoyage[0].sll;
          dataTable["3nd First Lift"] = craneVoyage[0].tfl;
          dataTable["3nd Last Lift"] = craneVoyage[0].tll;
          dataTable["Crane working hours"] = this.craneWorkingHours(
            craneVoyage[0].ffl,
            craneVoyage[0].fll,
            craneVoyage[0].sfl,
            craneVoyage[0].sll,
            craneVoyage[0].tfl,
            craneVoyage[0].tll
          );
          dataTable["Deductible delays"] = this.delayDuration(
            voyage,
            c.id,
            "Deductible"
          );
          dataTable["Technical delays"] = this.delayDuration(
            voyage,
            c.id,
            "Technical"
          );
          dataTable["Operational delays"] = this.delayDuration(
            voyage,
            c.id,
            "Operational"
          );
          this.json_data.push({ ...dataTable });
        }
      });
    },
    fillTheVesselStats(voyage) {
      this.json_data2 = [];
      let dataTable = {
        "Voyage ID": "",
        ETA: "",
        ETD: "",
        "FIRST LINE": "",
        "VESSEL ALL FAST": "",
        "GANGWAY SECURED": "",
        "LASHERS ONBOARD": "",
        "FIRST LIFT": "",
        "LAST LIFT": "",
        "LASHING FINISHED": "",
        "AGENT ONBOARD": "",
        "SAFETY NET OFF + GANGWAY UP": "",
        "PILOT ONBOARD": "",
        "TUGS ARRIVED": "",
        "UNMOORING FORWARD from": "",
        "UNMOORING FORWARD to": "",
        "UNMOORING AFT from": "",
        "UNMOORING AFT to": "",
        "LAST LINE": "",
        "TOTAL CRANE WORKING HOURS": "",
        "CRANE INTENSITY": "",
        "VESSEL WORKING HOURS (on proforma)": "",
        "VESSEL WORKING HOURS (not on proforma)": "",
        "ARRIVAL IDLE TIME": "",
        "ARRIVAL DEPARTURE TIME": "",
        "IDLE TIME": "",
        "DEDUCTIBLE DELAYS": "",
        "TECHNICAL DELAYS": "",
        "OPERATIONAL DELAYS": "",
        "TOTAL DELAYS": "",
      };
      dataTable["Voyage ID"] = voyage.vessel.voy_no;
      dataTable["ETA"] = voyage.vessel.eta;
      dataTable["ETD"] = voyage.vessel.etd;
      dataTable["FIRST LINE"] = voyage.first_line_datetime;
      dataTable["VESSEL ALL FAST"] = voyage.vessel_all_fast;
      dataTable["GANGWAY SECURED"] = voyage.gangway_secured;
      dataTable["LASHERS ONBOARD"] = voyage.lashers_onboard;
      dataTable["FIRST LIFT"] = this.first_lift(voyage);
      dataTable["LAST LIFT"] = voyage.last_lift_to;
      dataTable["LASHING FINISHED"] = voyage.lf_to;
      dataTable["AGENT ONBOARD"] = voyage.agent_onboard_to;
      dataTable["SAFETY NET OFF + GANGWAY UP"] = voyage.safety_net_gangway_to;
      dataTable["PILOT ONBOARD"] = voyage.pilot_onboard_to;
      dataTable["TUGS ARRIVED"] = voyage.tugs_arrived_to;
      dataTable["UNMOORING FORWARD from"] = voyage.unmooring_forward_from;
      dataTable["UNMOORING FORWARD to"] = voyage.unmooring_forward_to;
      dataTable["UNMOORING AFT from"] = voyage.unmooring_aft_from;
      dataTable["UNMOORING AFT to"] = voyage.unmooring_aft_to;
      dataTable["LAST LINE"] = voyage.last_line_to;
      dataTable["TOTAL CRANE WORKING HOURS"] =
        this.TotalCraneWorkingHours(voyage);
      dataTable["CRANE INTENSITY"] = this.craneIntensity(
        dataTable["TOTAL CRANE WORKING HOURS"],
        dataTable["FIRST LIFT"],
        voyage.last_lift_to
      );
      dataTable["VESSEL WORKING HOURS (on proforma)"] =
        this.vesselWorkingHoursOnPro(
          dataTable["LASHERS ONBOARD"],
          dataTable["LAST LIFT"]
        );

      dataTable["VESSEL WORKING HOURS (not on proforma)"] =
        this.vesselWorkingHoursNotOnPro(
          dataTable["FIRST LIFT"],
          dataTable["LAST LIFT"]
        );
      dataTable["ARRIVAL IDLE TIME"] = this.arrivalIdleTime(
        dataTable["VESSEL ALL FAST"],
        dataTable["FIRST LIFT"]
      );
      dataTable["ARRIVAL DEPARTURE TIME"] = this.arrivalDepartureTime(
        dataTable["LAST LIFT"],
        dataTable["LAST LINE"]
      );
      dataTable["IDLE TIME"] =
        parseFloat(dataTable["ARRIVAL IDLE TIME"]) +
        parseFloat(dataTable["ARRIVAL DEPARTURE TIME"]);
      dataTable["DEDUCTIBLE DELAYS"] = this.delayDurationTotal(
        voyage,
        "Deductible"
      );
      dataTable["TECHNICAL DELAYS"] = this.delayDurationTotal(
        voyage,
        "Technical"
      );
      dataTable["OPERATIONAL DELAYS"] = this.delayDurationTotal(
        voyage,
        "Operational"
      );
      dataTable["TOTAL DELAYS"] =
        parseFloat(dataTable["DEDUCTIBLE DELAYS"]) +
        parseFloat(dataTable["TECHNICAL DELAYS"]) +
        parseFloat(dataTable["OPERATIONAL DELAYS"]);
      this.json_data2.push({ ...dataTable });
    },
    vesselWorkingHoursOnPro(lashersOnBoard, last_lift_to) {
      let dur = moment.duration(moment(null));
      let firstDur = null;
      if (
        lashersOnBoard != "" &&
        lashersOnBoard != null &&
        last_lift_to != "" &&
        last_lift_to != null
      ) {
        firstDur = calculateDuration(lashersOnBoard, last_lift_to);
        dur = dur.add(firstDur.days(), "days");
        dur = dur.add(firstDur.hours(), "hours");
        dur = dur.add(firstDur.minutes(), "minutes");
        let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
        return Math.round((result + Number.EPSILON) * 100) / 100;
      } else return "";
    },
    vesselWorkingHoursNotOnPro(first_lift, last_lift_to) {
      let dur = moment.duration(moment(null));
      let firstDur = null;
      if (
        first_lift != "" &&
        first_lift != null &&
        last_lift_to != "" &&
        last_lift_to != null
      ) {
        firstDur = calculateDuration(first_lift, last_lift_to);
        dur = dur.add(firstDur.days(), "days");
        dur = dur.add(firstDur.hours(), "hours");
        dur = dur.add(firstDur.minutes(), "minutes");
        let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
        return Math.round((result + Number.EPSILON) * 100) / 100;
      } else return "";
    },
    arrivalIdleTime(all_fast, first_lift) {
      let dur = moment.duration(moment(null));
      let firstDur = null;
      if (
        all_fast != "" &&
        all_fast != null &&
        first_lift != "" &&
        first_lift != null
      ) {
        firstDur = calculateDuration(all_fast, first_lift);
        dur = dur.add(firstDur.days(), "days");
        dur = dur.add(firstDur.hours(), "hours");
        dur = dur.add(firstDur.minutes(), "minutes");
        let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
        return Math.round((result + Number.EPSILON) * 100) / 100;
      } else return "";
    },
    arrivalDepartureTime(last_lift, last_line) {
      let dur = moment.duration(moment(null));
      let firstDur = null;
      if (
        last_lift != "" &&
        last_lift != null &&
        last_line != "" &&
        last_line != null
      ) {
        firstDur = calculateDuration(last_lift, last_line);
        dur = dur.add(firstDur.days(), "days");
        dur = dur.add(firstDur.hours(), "hours");
        dur = dur.add(firstDur.minutes(), "minutes");
        let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
        return Math.round((result + Number.EPSILON) * 100) / 100;
      } else return "";
    },
    first_lift(voyage) {
      let lift = "";
      console.log("first lift : ", voyage);
      if (voyage.crane_voyages.length > 0) {
        let firstLifts = voyage.crane_voyages.map((e) => {
          return e.dgbohc_bfl_from;
        });
        lift = firstLifts[0];
        console.log("firstLifts : ", firstLifts);
        for (let index = 0; index < firstLifts.length; index++) {
          if (firstLifts[index] != "" && firstLifts[index] != null)
            if (compareTwoDateWithStringParams(lift, firstLifts[index]) == 1) {
              lift = firstLifts[index];
            }
        }
      }
      return lift;
    },
    delayDurationTotal(voyage, category) {
      let dur = moment.duration(moment(null));
      let other_delays = voyage.other_delays.filter((e) => {
        return e.category == category;
      });
      other_delays.map((e) => {
        if (e.from != "" && e.from != null && e.to != "" && e.to != null) {
          let firstDur = calculateDuration(e.from, e.to);
          dur = dur.add(firstDur.days(), "days");
          dur = dur.add(firstDur.hours(), "hours");
          dur = dur.add(firstDur.minutes(), "minutes");
        }
      });
      let result = dur.days() * 24 + dur.hours() + dur.minutes() / 60;
      return Math.round((result + Number.EPSILON) * 100) / 100;
    },
    showAllMethod() {
      this.setModuleShowToTrueAction();
      if (!this.showAll) {
        this.showAll = true;
        this.setAllVoyagesAction()
          .then(() => {
            this.initialize();
            this.setModuleShowToFalseAction();
          })
          .catch((error) => {
            this.setModuleShowToFalseAction();
            this.logoutAction();
          });
      } else {
        this.showAll = false;
        this.setVoyagesAction()
          .then(() => {
            this.initialize();
            this.setModuleShowToFalseAction();
          })
          .catch((error) => {
            this.setModuleShowToFalseAction();
            this.logoutAction();
          });
      }
    },
    showActionDetailsMethod(item) {
      this.selectedAction = { ...item };
      this.showActionDetails = true;
    },
    undoAction() {
      this.undoAnctionFunctionAction({
        id: this.historyTable[0].id,
        shift: this.getShift,
      });
    },
  },
  mounted() {
    this.setModuleShowToTrueAction();
    this.setCodesAction();
    if (!this.showAll) {
      this.setVoyagesAction()
        .then(() => {
          this.initialize();
          this.setCranesAction();
          this.setModuleShowToFalseAction();
        })
        .catch((error) => {
          this.setModuleShowToFalseAction();
          this.logoutAction();
        });
    } else {
      this.setAllVoyagesAction()
        .then(() => {
          this.initialize();
          this.setCranesAction();
          this.setModuleShowToFalseAction();
        })
        .catch((error) => {
          this.setModuleShowToFalseAction();
          this.logoutAction();
        });
    }
  },
};
</script>
<style scoped>
.tableRow {
  cursor: pointer;
}
.tableRow:active {
  background-color: white;
}
.imgForLoading {
  margin-top: 4%;
  height: 300px;
  width: 344px;
}
.successMessage {
  text-align: center;
  color: #008000a8;
}
.failedMessage {
  text-align: center;
  color: red;
}
</style>
