<template>
  <v-app>
    <v-row>
      <v-col cols="12" class="mb-0 pb-0">
        <template>
          <v-data-table
            :headers="headers2"
            :items="timestamps2"
            hide-default-footer
            item-key="name"
            class="elevation-1 tableheader"
          >
            <template v-slot:item="{ item }">
              <tr class="rowSelect" @click="rowClicked(item)">
                <td style="width: 45%">{{ item.operation }}</td>
                <td style="width: 45%">{{ item.date }}</td>

                <td
                  style="width: 10%"
                  v-if="item.commentValue != '' && item.commentValue != null"
                >
                  <v-icon color="primary">mdi-comment</v-icon>
                </td>
                <td style="width: 10%" v-else>
                  <v-icon>mdi-comment-outline</v-icon>
                </td>
              </tr>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title style="font-size: 25px; font-weight: bold"
                  >Vessel departure</v-toolbar-title
                >
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>

                <v-dialog v-model="dialog">
                  <template v-slot:activator="{ on, attrs }"> </template>
                  <v-card>
                    <AddDelay
                      v-if="dialog"
                      v-model="dialog"
                      @reloadTable="reloadTable"
                      :selectedDepartureChoice="selectedDepartureChoice2"
                    />
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialog3" width="500px">
                  <template v-slot:activator="{ on, attrs }"> </template>
                  <v-card>
                    <AddDelay2
                      v-if="dialog3"
                      v-model="dialog3"
                      @reloadTable="reloadTable"
                      :selectedDepartureChoice="selectedDepartureChoice"
                    />
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-col cols="12" class="mb-0 pb-0">
        <template>
          <v-data-table
            :headers="headers2"
            :items="timestamps4"
            hide-default-footer
            hide-default-header
            item-key="name"
            class="elevation-1 tableheaderTerminalReadeness"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td style="width: 45%">{{ item.operation }}</td>
                <td
                  v-if="item.date != '' && item.date != null"
                  style="width: 60%"
                >
                  {{ item.date }}
                </td>
                <td v-else style="width: 60%">
                  <v-btn color="primary" dark @click="openSave">
                    <v-icon left> mdi-clock-time-eight-outline </v-icon> Take
                    Time
                  </v-btn>
                </td>

                <td style="width: 10%"></td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-col cols="12" class="mb-0 pb-0">
        <template>
          <v-data-table
            :headers="headers2"
            :items="timestamps5"
            hide-default-footer
            hide-default-header
            item-key="name"
            class="elevation-1 tableheader"
          >
            <template v-slot:item="{ item }">
              <tr class="rowSelect" @click="rowClicked(item)">
                <td style="width: 45%">{{ item.operation }}</td>
                <td style="width: 45%">{{ item.date }}</td>

                <td
                  style="width: 10%"
                  v-if="item.commentValue != '' && item.commentValue != null"
                >
                  <v-icon color="primary">mdi-comment</v-icon>
                </td>
                <td style="width: 10%" v-else>
                  <v-icon>mdi-comment-outline</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-col cols="12" class="mt-1 pt-1 mb-1 pb-1">
        <v-data-table
          :headers="headers"
          :items="timestamps"
          hide-default-footer
          hide-default-header
          class="elevation-1 tableheader"
        >
          <template v-slot:item="{ item }">
            <tr class="rowSelect" @click="rowClicked2(item)">
              <td style="width: 30%">{{ item.operation }}</td>
              <td style="width: 30%">FROM : {{ item.from }}</td>
              <td style="width: 30%">TO : {{ item.to }}</td>
              <td
                style="width: 10%"
                v-if="item.commentValue != '' && item.commentValue != null"
              >
                <v-icon color="primary">mdi-comment</v-icon>
              </td>
              <td style="width: 10%" v-else>
                <v-icon>mdi-comment-outline</v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
      <v-col cols="12" class="mt-0 pt-0 mb-0 pb-0">
        <template>
          <v-data-table
            :headers="headers3"
            :items="timestamps3"
            hide-default-footer
            hide-default-header
            item-key="name"
            class="elevation-1 tableheader mt-0 pt-0 mb-0 pb-0"
          >
            <template v-slot:item="{ item }">
              <tr class="rowSelect mb-4 pb-4" @click="rowClicked(item)">
                <td style="width: 27%; padding-bottom: 22px !important">
                  {{ item.operation }}
                </td>
                <td style="width: 36%; padding-bottom: 22px !important">
                  {{ item.date }}
                </td>
                <td style="width: 27%; padding-bottom: 22px !important">
                  Manoeuvre sequence : {{ item.manoeuvre_sequence }}
                </td>
                <td
                  style="width: 10%; padding-bottom: 22px !important"
                  v-if="item.commentValue != '' && item.commentValue != null"
                >
                  <v-icon color="primary">mdi-comment</v-icon>
                </td>
                <td style="width: 10%; padding-bottom: 22px !important" v-else>
                  <v-icon>mdi-comment-outline</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-col>
      <v-dialog v-model="dialog4" width="500">
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
            <v-btn depressed color="" @click="dialog4 = false">Cancel</v-btn>
            <v-btn depressed color="primary" @click="saveDelay">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-dialog v-model="errorDialog" width="500">
      <template> </template>
      <v-card>
        <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

        <v-card-text class="mt-4">
          <h2>Vessel Cell Phone is still selected !</h2>
          <br /><br />
          <h3 class="error--text">
            Please deselect the vessel cell phone first !
          </h3>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="errorDialog = false"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<style scoped>
.panel {
  background-color: #fff59d;
  padding: 1rem;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import { formatToSimpleFormatDD_MM_YYYY_H_M_S } from "../../../helpers/helpers";
import AddDelay from "./AddDelay.vue";
import AddDelay2 from "./AddDelay2.vue";
export default {
  name: "AddLift",
  components: { AddDelay, AddDelay2 },
  data: () => ({
    errorDialog: false,
    selectedDepartureChoice: {
      id: "",
      to: "",
      operation: "",
      manoeuvre_sequence: "",
    },
    selectedDepartureChoice2: {
      id: "",
      operation: "",
      name: "",
      from: "",
      to: "",
      comment: "",
      commentValue: "",
    },
    timeReadiness: {
      id: "",
      to: "",
      operation: "",
      manoeuvre_sequence: "",
    },
    cranevalue: "",
    liftvalue: "",
    timevalue: "",
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialog4: false,
    comments: "",
    headers: [
      {
        text: "operation",
        align: "start",
        sortable: false,
        value: "operation",
        class: "title ",
      },
      {
        text: "From(Date/Time)",
        value: "from",
        sortable: false,
        class: "title ",
      },
      { text: "To(Date/Time)", value: "to", sortable: false, class: "title " },
      {
        text: "Comment",
        value: "",
        sortable: false,
        class: " title header",
      },
    ],
    headers2: [
      {
        text: "operation",
        align: "start",
        sortable: false,
        value: "operation",
        class: "title ",
        style: { "background-color": "black" },
      },
      {
        text: "(Date/Time)",
        value: "date",
        sortable: false,
        class: " title header",
      },
      {
        text: "Comment",
        value: "",
        sortable: false,
        class: " title header",
      },
    ],
    headers3: [
      {
        text: "operation",
        align: "start",
        sortable: false,
        value: "operation",
        class: "title ",
        style: { "background-color": "black" },
      },
      {
        text: "(Date/Time)",
        value: "date",
        sortable: false,
        class: " title header",
      },
      {
        text: "Manoeuvre sequence",
        value: "manoeuvre_sequence",
        sortable: false,
        class: " title header",
      },
      {
        text: "Comment",
        value: "",
        sortable: false,
        class: " title header",
      },
    ],
    timestamps: [],
    timestamps2: [],
    timestamps3: [],
    timestamps4: [],
    timestamps5: [],
  }),
  methods: {
    ...mapActions([
      "saveOrUpdateVoyageAction",
      "commentsSetterAction",
      "setSnackBarTosSuccess",
      "setSnackBarTosFailed",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "vesselDepartureSetter2Action",
    ]),
    initialize() {
      this.comments = this.getVoyageToEditOrSave.comments;
      this.timestamps = [
        {
          operation: "Unmooring Aft",
          from: this.getVoyageToEditOrSave.unmooring_aft_from,
          fromName: "unmooring_aft_from",
          to: this.getVoyageToEditOrSave.unmooring_aft_to,
          toName: "unmooring_aft_to",
          comment: "unmooring_aft_comment",
          commentValue: this.getVoyageToEditOrSave.unmooring_aft_comment,
        },
        {
          operation: "Unmooring Forward",
          from: this.getVoyageToEditOrSave.unmooring_forward_from,
          fromName: "unmooring_forward_from",
          to: this.getVoyageToEditOrSave.unmooring_forward_to,
          toName: "unmooring_forward_to",
          comment: "unmooring_forward_comment",
          commentValue: this.getVoyageToEditOrSave.unmooring_forward_comment,
        },
      ];
      this.timestamps2 = [
        {
          operation: "Last Lift",
          date: this.getVoyageToEditOrSave.last_lift_to,
          to: "last_lift_to",
          comment: "last_lift_comment",
          commentValue: this.getVoyageToEditOrSave.last_lift_comment,
        },
        {
          operation: "Lashing Finished",
          date: this.getVoyageToEditOrSave.lf_to,
          to: "lf_to",
          comment: "lf_comment",
          commentValue: this.getVoyageToEditOrSave.lf_comment,
        },
      ];
      this.timestamps4 = [
        {
          operation: "Terminal Readiness ",
          date: this.getVoyageToEditOrSave.agent_onboard_to,
          to: "agent_onboard_to",
          comment: "agent_onboard_comment",
          commentValue: this.getVoyageToEditOrSave.agent_onboard_comment,
        },
      ];

      this.timestamps5 = [
        {
          operation: "Safety Net Off + Gangway up",
          date: this.getVoyageToEditOrSave.safety_net_gangway_to,
          to: "safety_net_gangway_to",
          comment: "safety_net_gangway_comment",
          commentValue: this.getVoyageToEditOrSave.safety_net_gangway_comment,
        },
        {
          operation: "Pilot Onboard",
          date: this.getVoyageToEditOrSave.pilot_onboard_to,
          to: "pilot_onboard_to",
          comment: "pilot_onboard_comment",
          commentValue: this.getVoyageToEditOrSave.pilot_onboard_comment,
        },
        {
          operation: "Tugs arrived ",
          date: this.getVoyageToEditOrSave.tugs_arrived_to,
          to: "tugs_arrived_to",
          comment: "tugs_arrived_comment",
          commentValue: this.getVoyageToEditOrSave.tugs_arrived_comment,
        },
      ];

      this.timestamps3 = [
        {
          operation: "Last Line",
          date: this.getVoyageToEditOrSave.last_line_to,
          to: "last_line_to",
          comment: "last_line_comment",
          commentValue: this.getVoyageToEditOrSave.last_line_comment,
          manoeuvre_sequence: this.getVoyageToEditOrSave.manoeuvre_sequence,
        },
      ];
    },
    close() {
      this.dialog = false;
    },
    reloadTable() {
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction()
        .then((response) => {
          if (response.status == "200") {
            this.initialize();
            this.setSnackBarTosSuccess();
            this.setModuleShowToFalseAction();
            this.dialog = false;
            this.dialog3 = false;
          } else if (response.status == "406_2") {
            this.setSnackBarTosFailed("Please chose the voyage first !");
            this.setModuleShowToFalseAction();
            this.dialog = false;
            this.dialog3 = false;
          }
        })
        .catch((error) => {
          this.logoutAction();
        });

      return false;
    },
    OpenPositionDialog() {
      this.dialog2 = true;
    },
    closeAndSavePositionDialog() {
      this.commentsSetterAction({ comments: this.comments });
      this.saveOrUpdateVoyageAction().then((response) => {
        if (response.status == "200") {
          this.setSnackBarTosSuccess();
        } else if (response.status == "406_2") {
          this.setSnackBarTosFailed("Please chose the voyage first !");
        }
      });
      this.dialog2 = false;
    },
    closePositionDialog() {
      this.dialog2 = false;
    },
    rowClicked(item) {
      if (
        item.operation == "Last Lift" &&
        this.getVoyageToEditOrSave.tele != "" &&
        this.getVoyageToEditOrSave.tele != null
      ) {
        this.errorDialog = true;
      } else {
        this.selectedDepartureChoice.to = item.to;
        this.selectedDepartureChoice.operation = item.operation;
        this.selectedDepartureChoice.commentValue = item.commentValue;
        this.selectedDepartureChoice.comment = item.comment;
        this.selectedDepartureChoice.manoeuvre_sequence =
          item.manoeuvre_sequence;
        this.dialog3 = true;
      }
    },
    rowClicked2(item) {
      this.selectedDepartureChoice2.from = item.fromName;
      this.selectedDepartureChoice2.to = item.toName;
      this.selectedDepartureChoice2.operation = item.operation;
      this.selectedDepartureChoice2.commentValue = item.commentValue;
      this.selectedDepartureChoice2.comment = item.comment;

      this.dialog = true;
    },
    openSave() {
      this.dialog4 = true;
    },
    saveDelay() {
      this.vesselDepartureSetter2Action({
        to: "agent_onboard_to",
        comment: "agent_onboard_comment",
        commentValue: "",
        toValue: formatToSimpleFormatDD_MM_YYYY_H_M_S(new Date()),
        manoeuvre_sequence: "",
      });
      this.dialog4 = false;

      this.dialog = this.reloadTable();
    },
  },
  computed: {
    ...mapGetters(["getVoyageToEditOrSave"]),
  },
  mounted() {
    this.initialize();
  },
};
</script>
<style scoped>
.rowSelect {
  cursor: pointer;
}
</style>
