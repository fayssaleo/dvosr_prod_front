<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="crane_voyages2"
            class="elevation-1 LiftsTable"
          >
            <template v-slot:item="{ item }">
              <tr class="customClass">
                <td style="width: 80px">{{ item.liftName }}</td>
                <td>{{ item.STS1 }}</td>
                <td>{{ item.STS2 }}</td>
                <td>{{ item.STS3 }}</td>
                <td>{{ item.STS4 }}</td>
                <td>{{ item.STS5 }}</td>
                <td>{{ item.STS6 }}</td>
                <td>{{ item.STS7 }}</td>
                <td>{{ item.STS8 }}</td>
              </tr>
            </template>
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Lifts</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="checkVesselCellPone"
                >
                  EDIT TIMESTAMPTS
                </v-btn>
                <v-dialog v-model="dialog" max-width="500px">
                  <template> </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">EDIT TIMESTAMPTS</span>
                    </v-card-title>
                    <LiftDelay
                      v-if="dialog"
                      v-model="dialog"
                      @refreshTable="refreshTable"
                    />
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-dialog v-model="errorDialog" width="500">
        <template> </template>
        <v-card>
          <v-card-title class="text-h5 error lighten-2"> WARNING </v-card-title>

          <v-card-text class="mt-4">
            <h2>No Vessel Cell Phone is Selected !</h2>
            <br /><br />
            <h3 class="error--text">
              Please select a vessel cell phone first !
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
    </v-container>
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
import LiftDelay from "./LiftDelay.vue";
export default {
  name: "AddLift",
  components: { LiftDelay },
  data: () => ({
    errorDialog: false,
    dialog: false,
    cranevalue: "",
    liftvalue: "",
    timevalue: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    addLiftDatetime: new Date(),
    liftchoices: [
      "1st First Lift",
      "1st Last Lift",
      "2nd First Lift",
      "2nd Last Lift",
      "3rd First Lift",
      "3rd Last Lift",
    ],
    cranes: [],
    headers: [
      {
        text: "Lifts",
        align: "start",
        sortable: false,
        value: "liftName",
      },
      { text: "STS1", value: "STS1", sortable: false },
      { text: "STS2", value: "STS2", sortable: false },
      { text: "STS3", value: "STS3", sortable: false },
      { text: "STS4", value: "STS4", sortable: false },
      { text: "STS5", value: "STS5", sortable: false },
      { text: "STS6", value: "STS6", sortable: false },
      { text: "STS7", value: "STS7", sortable: false },
      { text: "STS8", value: "STS8", sortable: false },
    ],

    newTask: null,
    crane_voyages: [],
    crane_voyages2: [],
  }),
  methods: {
    ...mapActions([
      "setCranesAction",
      "saveOrUpdateVoyageAction",
      "setSnackBarTosSuccess",
      "setSnackBarTosFailed",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    checkVesselCellPone() {
      if (
        this.getVoyageToEditOrSave.tele == "" ||
        this.getVoyageToEditOrSave.tele == null
      ) {
        this.dialog = false;
        this.errorDialog = true;
      } else {
        this.dialog = true;
      }
    },
    initialize() {
      if (this.cranes.length == 0) {
        this.setModuleShowToTrueAction();
        this.setCranesAction()
          .then(() => {
            this.cranes = this.getCranes;
            this.reloadTable();
            this.setModuleShowToFalseAction();
          })
          .catch(() => {
            this.setModuleShowToFalseAction();
          });
      } else {
        this.reloadTable();
      }
    },
    addToMenu() {
      this.lifts.push({
        crane: this.cranevalue,
        lift: this.liftvalue,
        date: this.timevalue,
      });
    },
    onCraneChange(value) {
      this.cranevalue = value;
    },
    onLiftChange(value) {
      this.liftvalue = value;
    },
    gettime(value) {
      this.timevalue = value;
    },
    close() {
      this.dialog = false;
    },
    refreshTable() {
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction()
        .then((response) => {
          if (response.status == "200") {
            this.setSnackBarTosSuccess();
            this.setModuleShowToFalseAction();
            this.dialog = false;
            this.initialize();
          } else if (response.status == "406_2") {
            this.setSnackBarTosFailed("Please chose the voyage first !");
            this.setModuleShowToFalseAction();
            this.dialog = false;
          }
        })
        .catch(() => {
          this.setModuleShowToFalseAction();
        });
      return false;
    },
    reloadTable() {
      this.crane_voyages = this.getVoyageToEditOrSave.crane_voyages.map((e) => {
        const craneId = this.cranes.filter((c) => c.id == e.crane_id);
        return {
          crane_id: e.crane_id,
          voyage_id: this.getVoyageToEditOrSave.id,
          craneId: craneId[0].craneId,
          ffl: e.ffl,
          fll: e.fll,
          sfl: e.sfl,
          sll: e.sll,
          tfl: e.tfl,
          tll: e.tll,
          fofl: e.fofl,
          foll: e.foll,
          fifl: e.fifl,
          fill: e.fill,
          sifl: e.sifl,
          sill: e.sill,
          sevfl: e.sevfl,
          sevll: e.sevll,
          eifl: e.eifl,
          eill: e.eill,
          nfl: e.nfl,
          nll: e.nll,
          tenfl: e.tenfl,
          tenll: e.tenll,
        };
      });
      this.crane_voyages = this.cranes.map((c) => {
        const crane_voyage = this.crane_voyages.filter(
          (e) => c.id == e.crane_id
        )[0];
        if (crane_voyage != null) return crane_voyage;
        else
          return {
            crane_id: c.id,
            voyage_id: this.getVoyageToEditOrSave.id,
            craneId: c.craneId,
            ffl: "",
            fll: "",
            sfl: "",
            sll: "",
            tfl: "",
            tll: "",
            fofl: "",
            foll: "",
            fifl: "",
            fill: "",
            sifl: "",
            sill: "",
            sevfl: "",
            sevll: "",
            eifl: "",
            eill: "",
            nfl: "",
            nll: "",
            tenfl: "",
            tenll: "",
          };
      });
      this.crane_voyages2 = [
        {
          liftName: "1st FL",
          lift: "ffl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "1st LL",
          lift: "fll",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "2nd FL",
          lift: "sfl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "2nd LL",
          lift: "sll",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "3rd FL",
          lift: "tfl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "3rd LL",
          lift: "tll",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "4th FL",
          lift: "fofl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "4th LL",
          lift: "foll",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "5th FL",
          lift: "fifl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "5th LL",
          lift: "fill",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "6th FL",
          lift: "sifl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "6th LL",
          lift: "sill",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "7th FL",
          lift: "sevfl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "7th LL",
          lift: "sevll",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "8th FL",
          lift: "eifl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "8th LL",
          lift: "eill",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "9th FL",
          lift: "nfl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "9th LL",
          lift: "nll",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "10th FL",
          lift: "tenfl",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
        {
          liftName: "10th LL",
          lift: "tenll",
          STS1: "",
          STS2: "",
          STS3: "",
          STS4: "",
          STS5: "",
          STS6: "",
          STS7: "",
          STS8: "",
        },
      ];

      this.cranes.map((c) => {
        const crane_voyage = this.crane_voyages.filter(
          (e) => c.id == e.crane_id
        )[0];
        if (crane_voyage != null) {
          this.crane_voyages2.map((e) => {
            e[c.craneId] = crane_voyage[e.lift];
          });
        }
      });

      console.log("this lifts : ", this.crane_voyages2);
    },
  },
  computed: {
    ...mapGetters(["getCranes", "getVoyageToEditOrSave"]),
  },
  mounted() {
    this.initialize();
  },
};
</script>
