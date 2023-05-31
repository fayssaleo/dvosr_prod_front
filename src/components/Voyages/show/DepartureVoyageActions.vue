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
              <tr
                class="rowSelect"
                @click="rowClicked(item.commentValue, item.comment)"
              >
                <td
                  style="width: 50%"
                  :class="
                    ShowNewVoyage[item.to] != ShowOldVoyage[item.to] ||
                    ShowNewVoyage[item.comment] != ShowOldVoyage[item.comment]
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  {{ item.operation }}
                </td>
                <td
                  style="width: 50%"
                  :class="
                    ShowNewVoyage[item.to] != ShowOldVoyage[item.to]
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  {{ item.date }}
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
              </v-toolbar>
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
            <tr
              class="rowSelect"
              @click="rowClicked(item.commentValue, item.comment)"
            >
              <td
                style="width: 33%"
                :class="
                  ShowNewVoyage[item.toName] != ShowOldVoyage[item.toName] ||
                  ShowNewVoyage[item.fromName] !=
                    ShowOldVoyage[item.fromName] ||
                  ShowNewVoyage[item.comment] != ShowOldVoyage[item.comment]
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                {{ item.operation }}
              </td>
              <td
                style="width: 33%"
                :class="
                  ShowNewVoyage[item.fromName] != ShowOldVoyage[item.fromName]
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                FROM : {{ item.from }}
              </td>
              <td
                style="width: 33%"
                :class="
                  ShowNewVoyage[item.toName] != ShowOldVoyage[item.toName]
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                TO : {{ item.to }}
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
              <tr
                class="rowSelect"
                @click="rowClicked(item.commentValue, item.comment)"
              >
                <td
                  style="width: 30%"
                  :class="
                    ShowNewVoyage[item.to] != ShowOldVoyage[item.to] ||
                    ShowNewVoyage[item.comment] !=
                      ShowOldVoyage[item.comment] ||
                    ShowNewVoyage.manoeuvre_sequence !=
                      ShowOldVoyage.manoeuvre_sequence
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  {{ item.operation }}
                </td>
                <td
                  style="width: 40%"
                  :class="
                    ShowNewVoyage[item.to] != ShowOldVoyage[item.to]
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  {{ item.date }}
                </td>
                <td
                  style="width: 30%"
                  :class="
                    ShowNewVoyage.manoeuvre_sequence !=
                    ShowOldVoyage.manoeuvre_sequence
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  Manoeuvre sequence : {{ item.manoeuvre_sequence }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-col>
    </v-row>
    <v-row
      ><v-col style="text-align: center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }"> </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Comment :
            </v-card-title>

            <v-card-text>
              <div
                class="mt-4"
                :class="
                  ShowNewVoyage[commentName] != ShowOldVoyage[commentName]
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                {{ comment }}
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed color="" @click="closePositionDialog"
                >Cancel</v-btn
              >
              <v-btn depressed color="primary" @click="closePositionDialog"
                >OK</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col></v-row
    >
  </v-app>
</template>
<style scoped>
.panel {
  background-color: #fff59d;
  padding: 1rem;
}
</style>
<script>
export default {
  props: ["ShowOldVoyage", "ShowNewVoyage", "showAfter"],

  name: "DepartureVoyageActions",
  data: () => ({
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
    cranevalue: "",
    liftvalue: "",
    timevalue: "",
    dialog: false,
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
    ],
    timestamps: [],
    timestamps2: [],
    timestamps3: [],
    selectedVoyageAction: {},
    comment: "",
    commentName: "",
  }),
  methods: {
    initialize() {
      if (this.showAfter) this.selectedVoyageAction = { ...this.ShowNewVoyage };
      else this.selectedVoyageAction = { ...this.ShowOldVoyage };
      console.log("this.selectedVoyageAction", this.selectedVoyageAction);
      this.comments = this.selectedVoyageAction.comments;
      this.timestamps = [
        {
          operation: "Unmooring Aft",
          from: this.selectedVoyageAction.unmooring_aft_from,
          fromName: "unmooring_aft_from",
          to: this.selectedVoyageAction.unmooring_aft_to,
          toName: "unmooring_aft_to",
          comment: "unmooring_aft_comment",
          commentValue: this.selectedVoyageAction.unmooring_aft_comment,
        },
        {
          operation: "Unmooring Forward",
          from: this.selectedVoyageAction.unmooring_forward_from,
          fromName: "unmooring_forward_from",
          to: this.selectedVoyageAction.unmooring_forward_to,
          toName: "unmooring_forward_to",
          comment: "unmooring_forward_comment",
          commentValue: this.selectedVoyageAction.unmooring_forward_comment,
        },
      ];
      this.timestamps2 = [
        {
          operation: "Last Lift",
          date: this.selectedVoyageAction.last_lift_to,
          to: "last_lift_to",
          comment: "last_lift_comment",
          commentValue: this.selectedVoyageAction.last_lift_comment,
        },
        {
          operation: "Lashing Finished",
          date: this.selectedVoyageAction.lf_to,
          to: "lf_to",
          comment: "lf_comment",
          commentValue: this.selectedVoyageAction.lf_comment,
        },
        {
          operation: "Agent Onboard",
          date: this.selectedVoyageAction.agent_onboard_to,
          to: "agent_onboard_to",
          comment: "agent_onboard_comment",
          commentValue: this.selectedVoyageAction.agent_onboard_comment,
        },
        {
          operation: "Safety Net Off + Gangway up",
          date: this.selectedVoyageAction.safety_net_gangway_to,
          to: "safety_net_gangway_to",
          comment: "safety_net_gangway_comment",
          commentValue: this.selectedVoyageAction.safety_net_gangway_comment,
        },
        {
          operation: "Pilot Onboard",
          date: this.selectedVoyageAction.pilot_onboard_to,
          to: "pilot_onboard_to",
          comment: "pilot_onboard_comment",
          commentValue: this.selectedVoyageAction.pilot_onboard_comment,
        },
        {
          operation: "Tugs arrived ",
          date: this.selectedVoyageAction.tugs_arrived_to,
          to: "tugs_arrived_to",
          comment: "tugs_arrived_comment",
        },
      ];
      this.timestamps3 = [
        {
          operation: "Last Line",
          date: this.selectedVoyageAction.last_line_to,
          to: "last_line_to",
          comment: "last_line_comment",
          commentValue: this.selectedVoyageAction.last_line_comment,
          manoeuvre_sequence: this.selectedVoyageAction.manoeuvre_sequence,
        },
      ];
    },

    OpenPositionDialog() {
      this.dialog = true;
    },
    closePositionDialog() {
      this.dialog = false;
    },
    rowClicked(comment, commentName) {
      this.comment = comment;
      this.commentName = commentName;
      this.OpenPositionDialog();
    },
  },
  watch: {
    showAfter(newValue, old) {
      this.initialize();
    },
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
