<template>
  <v-app>
    <v-data-table
      :headers="historyHeaders"
      :items="historyTable"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item="{ item }">
        <tr class="tableRow" @click="showActionDetailsMethod(item)">
          <td class="text-xs-right">
            {{ item.firstname }}
          </td>
          <td class="text-xs-right">
            {{ item.lastname }}
          </td>
          <td class="text-xs-right">
            {{ item.username }}
          </td>
          <td class="text-xs-right">{{ item.action }}</td>
          <td class="text-xs-right">{{ item.shift }}</td>
          <td class="text-xs-right">{{ item.date }}</td>
        </tr>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-dialog
            v-model="showActionDetails"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }"> </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="showActionDetails = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>
                  <v-row>
                    <v-col
                      >Voyage : {{ editedItem.voy_no }} - Vessel :
                      {{ editedItem.vessel_name }} - Action Date :
                      {{ actionSelected ? actionSelected.date : "" }} - By :
                      {{ actionSelected ? actionSelected.username : "" }}</v-col
                    >
                  </v-row>
                </v-toolbar-title>
                <v-spacer></v-spacer>

                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <ActionDetails
                v-if="showActionDetails"
                :ShowNewVoyage="ShowNewVoyage"
                :ShowOldVoyage="ShowOldVoyage"
              />
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import ActionDetails from "./ActionDetails.vue";

export default {
  data: () => ({
    historyHeaders: [
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Username", value: "username" },
      { text: "Action", value: "action" },
      { text: "Shift", value: "shift" },
      { text: "Date", value: "date", sortable: false },
    ],

    showActionDetails: false,
    initialVoyage: {
      sectionChanged: "",
      craneChanged1: "",
      craneChanged2: "",
      action_id: "",
      pgb_r_co: null,
      pgb_r_co_reason: null,
      vawgd: false,
      vawsnrog: false,
      dm_y: false,
      dm_g: false,
      hatch_covers_num: 0,
      hatch_covers_num_40: 0,
      hatch_covers_moves: 0,
      gear_boxes_num: 0,
      gear_boxes_num_40: 0,
      gear_boxes_moves: 0,
      any_hydraulic_couvers: 0,
      first_line_datetime: null,
      vessel_all_fast: null,
      gangway_secured: null,
      lashers_onboard: null,
      num_mooring_r_fore: 0,
      num_mooring_r_aft: 0,
      dwuscfb: false,
      imo_class: false,
      imo_class_ps_onb: null,
      last_lift_from: null,
      last_lift_to: null,
      last_lift_comment: null,
      lf_from: null,
      lf_to: null,
      lf_comment: null,
      agent_onboard_from: null,
      agent_onboard_to: null,
      agent_onboard_comment: null,
      safety_net_gangway_from: null,
      safety_net_gangway_to: null,
      safety_net_gangway_comment: null,
      pilot_onboard_from: null,
      pilot_onboard_to: null,
      pilot_onboard_comment: null,
      tugs_arrived_from: null,
      tugs_arrived_to: null,
      tugs_arrived_comment: null,
      unmooring_forward_from: null,
      unmooring_forward_to: null,
      unmooring_forward_comment: null,
      unmooring_aft_from: null,
      unmooring_aft_to: null,
      unmooring_aft_comment: null,
      last_line_from: null,
      last_line_to: null,
      last_line_comment: null,
      vessel_id: 14,
      id: "",
      comments: null,
      manoeuvre_sequence: "",
      crane_voyages: [],
      other_delays: [],
      vessel: {
        vessel_name: null,
        service: null,
        eta: null,
        etd: null,
        voy_no: null,

        id: null,
      },
    },
    voyageArrivalSection: [
      "vawgd",
      "vawsnrog",
      "dm_y",
      "dm_g",
      "hatch_covers_num",
      "hatch_covers_num_40",
      "hatch_covers_moves",
      "gear_boxes_num",
      "gear_boxes_num_40",
      "gear_boxes_moves",
      "any_hydraulic_couvers",
      "first_line_datetime",
      "vessel_all_fast",
      "num_mooring_r_fore",
      "num_mooring_r_aft",
      "gangway_secured",
      "lashers_onboard",
      "dwuscfb",
      "imo_class",
      "imo_class_ps_onb",
      "tele",
    ],
    craneArrivalSection: [
      "cbd",
      "dgbohc_bfl_from",
      "dgbohc_bfl_to",
      "dgbohc_bfl_num_gb",
      "dgbohc_bfl_num_hc",
      "dss_bfl_from",
      "dss_bfl_to",
      "dss_bfl_num_sp",
      "dss_bfl_fb_dnw",
      "dss_bfl_fb",
    ],
    liftArrivalSection: ["ffl", "fll", "sfl", "sll", "tfl", "tll"],
    voyageDepartureSection: [
      "unmooring_aft_from",
      "unmooring_aft_to",
      "unmooring_aft_comment",
      "unmooring_forward_from",
      "unmooring_forward_to",
      "unmooring_forward_comment",
      "last_lift_to",
      "last_lift_comment",
      "lf_to",
      "lf_comment",
      "agent_onboard_to",
      "agent_onboard_comment",
      "safety_net_gangway_to",
      "safety_net_gangway_comment",
      "pilot_onboard_to",
      "pilot_onboard_comment",
      "tugs_arrived_to",
      "tugs_arrived_comment",
      "last_line_to",
      "last_line_comment",
      "unmooring_aft_from",
      "manoeuvre_sequence",
    ],
    craneDepartuerSection: [
      "cbu",
      "lgbohc_all_from",
      "lgbohc_all_to",
      "lgbohc_all_num_gb",
      "lgbohc_all_hc",
      "lgbohc_all_inbay",
      "lgbohc_all_inbay_hatch_covers",
      "lss_all_from",
      "lss_all_to",
      "lss_all_num_ss",
      "lss_all_ib",
      "lss_all_ib_lnw",
      "pgb_r_co",
      "pgb_r_co_reason",
    ],
    initialCraneVoyage: {
      cbd: "",
      dgbohc_bfl_from: "",
      dgbohc_bfl_to: "",
      dgbohc_bfl_num_gb: "",
      dgbohc_bfl_num_hc: "",
      dss_bfl_from: "",
      dss_bfl_to: "",
      dss_bfl_num_sp: "",
      dss_bfl_fb_dnw: "",
      dss_bfl_fb: "",
      crane_id: "",
      ffl: "",
      fll: "",
      sfl: "",
      sll: "",
      tfl: "",
      tll: "",
      lgbohc_all_from: "",
      lgbohc_all_to: "",
      lgbohc_all_num_gb: "",
      lgbohc_all_hc: "",
      lgbohc_all_inbay: "",
      lss_all_from: "",
      lss_all_to: "",
      lss_all_num_ss: "",
      lss_all_ib: "",
      lss_all_ib_lnw: "",
      cbu: "",
      id: "",
    },
    initialOther_delay: {
      id: "",
      from: "",
      to: "",
      reason: "",
      comment: "",
      dep_arr: "",
      crane_id: "",
      code_id: "",
      code: "",
      category: "",
    },
    historicVoyages: [],
    historicVoyagesOld: [],
    ShowNewVoyage: {},
    ShowOldVoyage: {},
    showOld: false,
    actionSelected: null,
  }),
  components: {
    ActionDetails,
  },
  props: ["historyTable", "editedItem"],
  computed: {
    ...mapGetters(["getActionDetails"]),
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
      "setActionDetailsAction",
      "setModuleShowToFalseAction",
      "setModuleShowToTrueAction",
    ]),
    showActionDetailsMethod(item) {
      this.ShowNewVoyage = {
        ...this.historicVoyages.filter((e) => {
          return e.action_id == item.id;
        })[0],
      };
      this.ShowOldVoyage = {
        ...this.historicVoyagesOld.filter((e) => {
          return e.action_id == item.id;
        })[0],
      };
      console.log("hdhdhhd", item);
      this.actionSelected = item;
      this.showActionDetails = true;
    },

    initialize() {
      let initialVoyageModel = { ...this.initialVoyage };
      initialVoyageModel.vessel = { ...this.editedItem };

      let initialVoyageModelOld = JSON.parse(
        JSON.stringify(initialVoyageModel)
      );
      //all filling proces from here
      let reversedReversedHistoryTable = [...this.historyTable].reverse();
      reversedReversedHistoryTable.map((historyAction) => {
        initialVoyageModel.action_id = historyAction.id;
        initialVoyageModelOld.action_id = historyAction.id;
        initialVoyageModelOld = JSON.parse(JSON.stringify(initialVoyageModel));
        let thisActionDetails = this.getActionDetails.filter((aD) => {
          return aD.action_id == historyAction.id;
        });

        thisActionDetails.map((actionDetails) => {
          initialVoyageModel.craneChanged1 = "";
          initialVoyageModel.craneChanged2 = "";
          initialVoyageModel.sectionChanged = "";
          if (actionDetails.table_name == "voyages") {
            if (
              this.voyageArrivalSection.indexOf(actionDetails.column_name) != -1
            ) {
              initialVoyageModel.sectionChanged = "voyageArrivalSection";
            } else if (
              this.voyageDepartureSection.indexOf(actionDetails.column_name) !=
              -1
            ) {
              initialVoyageModel.sectionChanged = "voyageDepartureSection";
            }
            if (actionDetails.newvalue != "Empty") {
              initialVoyageModel[actionDetails.column_name] =
                actionDetails.newvalue;
            } else {
              initialVoyageModel[actionDetails.column_name] = null;
            }
            if (actionDetails.oldvalue != "Empty") {
              initialVoyageModelOld[actionDetails.column_name] =
                actionDetails.oldvalue;
            } else {
              initialVoyageModelOld[actionDetails.column_name] = null;
            }

            return;
          }
          if (actionDetails.table_name == "crane_voyages") {
            let exist = false;
            initialVoyageModel.crane_voyages =
              initialVoyageModel.crane_voyages.map((e) => {
                if (
                  this.craneArrivalSection.indexOf(actionDetails.column_name) !=
                  -1
                ) {
                  initialVoyageModel.sectionChanged = "craneArrivalSection";
                  initialVoyageModel.craneChanged1 = actionDetails.line_id;
                } else if (
                  this.craneDepartuerSection.indexOf(
                    actionDetails.column_name
                  ) != -1
                ) {
                  initialVoyageModel.craneChanged2 = actionDetails.line_id;
                  initialVoyageModel.sectionChanged = "craneDepartuerSection";
                } else if (
                  this.liftArrivalSection.indexOf(actionDetails.column_name) !=
                  -1
                ) {
                  initialVoyageModel.sectionChanged = "liftArrivalSection";
                }
                if (e.crane_id == actionDetails.line_id) {
                  if (actionDetails.newvalue != "Empty") {
                    e[actionDetails.column_name] = actionDetails.newvalue;
                  } else {
                    e[actionDetails.column_name] = null;
                  }
                  exist = true;
                  return e;
                } else {
                  return e;
                }
              });
            initialVoyageModelOld.crane_voyages =
              initialVoyageModelOld.crane_voyages.map((e) => {
                if (e.crane_id == actionDetails.line_id) {
                  if (actionDetails.oldvalue != "Empty") {
                    e[actionDetails.column_name] = actionDetails.oldvalue;
                  } else {
                    e[actionDetails.column_name] = null;
                  }
                  exist = true;
                  return e;
                } else {
                  return e;
                }
              });

            if (!exist) {
              if (
                this.craneArrivalSection.indexOf(actionDetails.column_name) !=
                -1
              ) {
                initialVoyageModel.sectionChanged = "craneArrivalSection";
                initialVoyageModel.craneChanged1 = actionDetails.line_id;
              } else if (
                this.craneDepartuerSection.indexOf(actionDetails.column_name) !=
                -1
              ) {
                initialVoyageModel.craneChanged2 = actionDetails.line_id;
                initialVoyageModel.sectionChanged = "craneDepartuerSection";
              } else if (
                this.liftArrivalSection.indexOf(actionDetails.column_name) != -1
              ) {
                initialVoyageModel.sectionChanged = "liftArrivalSection";
              }
              let initialCrane_voyage = { ...this.initialCraneVoyage };
              let initialCrane_voyageOld = { ...this.initialCraneVoyage };
              if (actionDetails.newvalue != "Empty") {
                initialCrane_voyage[actionDetails.column_name] =
                  actionDetails.newvalue;
              } else {
                initialCrane_voyage[actionDetails.column_name] = null;
              }
              if (actionDetails.oldvalue != "Empty") {
                initialCrane_voyageOld[actionDetails.column_name] =
                  actionDetails.oldvalue;
              } else {
                initialCrane_voyageOld[actionDetails.column_name] = null;
              }
              initialCrane_voyage.crane_id = actionDetails.line_id;
              initialCrane_voyageOld.crane_id = actionDetails.line_id;
              initialVoyageModel.crane_voyages.push(initialCrane_voyage);
              initialVoyageModelOld.crane_voyages.push(initialCrane_voyageOld);
            }
            return;
          }
          if (actionDetails.table_name == "other_delays") {
            if (
              actionDetails.column_name == "Delete Dep Delay" ||
              actionDetails.column_name == "Delete Arr Delay"
            ) {
              if (actionDetails.column_name == "Delete Dep Delay") {
                initialVoyageModel.sectionChanged = "DelayDep";
              } else {
                initialVoyageModel.sectionChanged = "DelayArr";
              }
              initialVoyageModel.other_delays =
                initialVoyageModel.other_delays.filter((e) => {
                  if (e.id != actionDetails.line_id) {
                    console.log("fink :", e);

                    return true;
                  }
                  return false;
                });
              if (actionDetails.column_name == "Delete") {
                console.log(
                  "initialVoyageModel.sectionChanged 2",
                  initialVoyageModel
                );
              }
              return;
            } else {
              let exist = false;
              initialVoyageModel.other_delays =
                initialVoyageModel.other_delays.map((e) => {
                  if (e.id == actionDetails.line_id) {
                    if (e.dep_arr == "dep") {
                      initialVoyageModel.sectionChanged = "DelayDep";
                    } else {
                      initialVoyageModel.sectionChanged = "DelayArr";
                    }
                    if (actionDetails.newvalue != "Empty") {
                      e[actionDetails.column_name] = actionDetails.newvalue;
                    } else {
                      e[actionDetails.column_name] = null;
                    }
                    exist = true;
                    return e;
                  } else {
                    return e;
                  }
                });
              initialVoyageModelOld.other_delays =
                initialVoyageModelOld.other_delays.map((e) => {
                  if (e.id == actionDetails.line_id) {
                    if (actionDetails.oldvalue != "Empty") {
                      e[actionDetails.column_name] = actionDetails.oldvalue;
                    } else {
                      e[actionDetails.column_name] = null;
                    }
                    exist = true;
                    return e;
                  } else {
                    return e;
                  }
                });

              if (!exist) {
                let initialOther_delay = { ...this.initialOther_delay };
                if (actionDetails.column_name == "dep_arr") {
                  if (actionDetails.newvalue == "dep") {
                    initialVoyageModel.sectionChanged = "DelayDep";
                  } else {
                    initialVoyageModel.sectionChanged = "DelayArr";
                  }
                }
                if (actionDetails.newvalue != "Empty") {
                  initialOther_delay[actionDetails.column_name] =
                    actionDetails.newvalue;
                } else {
                  initialOther_delay[actionDetails.column_name] = null;
                }
                initialOther_delay.id = actionDetails.line_id;
                initialVoyageModel.other_delays.push(initialOther_delay);
              }
              return;
            }
          }
        });

        this.historicVoyages.push(
          JSON.parse(JSON.stringify(initialVoyageModel))
        );
        this.historicVoyagesOld.push(
          JSON.parse(JSON.stringify(initialVoyageModelOld))
        );
      });
    },
  },
  mounted() {
    this.setModuleShowToTrueAction();
    if (this.historyTable.length > 0) {
      this.setActionDetailsAction({ id: this.editedItem.id })
        .then(() => {
          this.initialize();
          this.setModuleShowToFalseAction();
        })
        .catch((error) => {
          this.setModuleShowToFalseAction();
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
</style>
