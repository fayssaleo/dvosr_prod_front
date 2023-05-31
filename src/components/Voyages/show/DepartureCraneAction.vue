<template>
  <v-app>
    <v-container fluid>
      <form @submit.prevent="() => {}">
        <v-row>
          <div class="theWall"></div>
          <v-col cols="12" md="6">
            <div class="crane-dropdown">
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
                <template slot="selection" slot-scope="data">
                  <span
                    v-if="data.item.id == ShowNewVoyage.craneChanged2"
                    :class="showAfter ? 'afterText' : 'beforeText'"
                    >{{ data.item.craneId }}</span
                  >
                  <span v-else>{{ data.item.craneId }}</span>
                </template>
                <template slot="item" slot-scope="data">
                  <span
                    v-if="data.item.id == ShowNewVoyage.craneChanged2"
                    :class="showAfter ? 'afterText' : 'beforeText'"
                    >{{ data.item.craneId }}</span
                  >
                  <span v-else>{{ data.item.craneId }}</span>
                </template>
              </v-select>
            </div>

            <div class="pb-4">
              <center>
                <h3 class="title">
                  Load of Gear Boxes &/or Hatch Covers after Last Lift
                </h3>
              </center>
            </div>

            <v-text-field
              label="From(Date/Time)"
              outlined
              v-model="secondFormData.lgbohc_all_from"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.lgbohc_all_from !=
                crane_voyagesOld.lgbohc_all_from
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <v-text-field
              label="To(Date/Time)"
              outlined
              v-model="secondFormData.lgbohc_all_to"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.lgbohc_all_to != crane_voyagesOld.lgbohc_all_to
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <v-row>
              <v-col cols="6"
                ><v-text-field
                  label="Number of gear boxes:"
                  v-model="secondFormData.lgbohc_all_num_gb"
                  class="mb-0 pb-0"
                  :disabled="secondFormData.crane_id == ''"
                  type="number"
                  :class="
                    crane_voyagesNew.lgbohc_all_num_gb !=
                    crane_voyagesOld.lgbohc_all_num_gb
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  label="GB In Bay :"
                  v-model="secondFormData.lgbohc_all_inbay"
                  class="mb-0 pb-0"
                  :disabled="secondFormData.crane_id == ''"
                  type="number"
                  :class="
                    crane_voyagesNew.lgbohc_all_inbay !=
                    crane_voyagesOld.lgbohc_all_inbay
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  label="Number of Hatch covers:"
                  v-model="secondFormData.lgbohc_all_hc"
                  class="mb-0 pb-0"
                  :disabled="secondFormData.crane_id == ''"
                  type="number"
                  :class="
                    crane_voyagesNew.lgbohc_all_hc !=
                    crane_voyagesOld.lgbohc_all_hc
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                ></v-text-field
              ></v-col>
              <v-col cols="6"
                ><v-text-field
                  label="HC In Bay :"
                  v-model="secondFormData.lgbohc_all_inbay_hatch_covers"
                  class="mb-0 pb-0"
                  :disabled="secondFormData.crane_id == ''"
                  type="number"
                  :class="
                    crane_voyagesNew.lgbohc_all_inbay_hatch_covers !=
                    crane_voyagesOld.lgbohc_all_inbay_hatch_covers
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                ></v-text-field
              ></v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Crane Boom Up"
              outlined
              v-model="secondFormData.cbu"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.cbu != crane_voyagesOld.cbu
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <div class="pt-0 pb-4">
              <center>
                <h3 class="title">Load Of Ship's Spreaders after Last Lift</h3>
              </center>
            </div>

            <v-text-field
              label="From(Date/Time)"
              outlined
              v-model="secondFormData.lss_all_from"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.lss_all_from != crane_voyagesOld.lss_all_from
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <v-text-field
              label="To(Date/Time)"
              outlined
              v-model="secondFormData.lss_all_to"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.lss_all_to != crane_voyagesOld.lss_all_to
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <v-text-field
              label="Number of ship's spreaders : "
              v-model="secondFormData.lss_all_num_ss"
              class="mb-0 pb-0"
              :disabled="secondFormData.crane_id == ''"
              type="number"
              :class="
                crane_voyagesNew.lss_all_num_ss !=
                crane_voyagesOld.lss_all_num_ss
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
              ></v-text-field
            >

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="In Bay : "
                  v-model="secondFormData.lss_all_ib"
                  class="mb-0 pb-0"
                  :disabled="secondFormData.crane_id == ''"
                  type="number"
                  :class="
                    crane_voyagesNew.lss_all_ib != crane_voyagesOld.lss_all_ib
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  outlined
                  label="Loaded by NS or Wires?: "
                  :items="['NS', 'Wires']"
                  filled
                  v-model="secondFormData.lss_all_ib_lnw"
                  :disabled="secondFormData.crane_id == ''"
                  :class="
                    crane_voyagesNew.lss_all_ib_lnw !=
                    crane_voyagesOld.lss_all_ib_lnw
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                </v-select>
              </v-col>
            </v-row>

            <center>
              <v-row class="positionOnBoardZIndex">
                <v-col cols="10"
                  ><v-switch
                    v-model="pgb_r_co"
                    label="Positions for gear boxes required by C/O ?"
                    :class="
                      ShowNewVoyage.pgb_r_co != ShowOldVoyage.pgb_r_co
                        ? showAfter
                          ? 'afterSwitch'
                          : 'beforeSwitch'
                        : ''
                    "
                  ></v-switch
                ></v-col>
                <v-col cols="2"
                  ><v-icon
                    class="mt-3"
                    @click="openPositionDialog"
                    style="cursor: pointed"
                    :class="
                      ShowNewVoyage.pgb_r_co_reason !=
                      ShowOldVoyage.pgb_r_co_reason
                        ? showAfter
                          ? 'afterText'
                          : 'beforeText'
                        : ''
                    "
                    >mdi-comment-text</v-icon
                  ></v-col
                >
              </v-row>
            </center>
          </v-col>
        </v-row>
      </form>
      <v-row
        ><v-col style="text-align: center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }"> </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                Reason given by C/O :
              </v-card-title>

              <v-card-text>
                <div
                  class="mt-4"
                  :class="
                    ShowNewVoyage.pgb_r_co_reason !=
                    ShowOldVoyage.pgb_r_co_reason
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  {{ pgb_r_co_reason }}
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
    </v-container>
  </v-app>
</template>
<style lang="scss" scoped>
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
.theWall {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: 10000;
}
.positionOnBoardZIndex {
  * {
    z-index: 10000000000000;
  }
}
</style>
<script>
import { FormatDateStringToSimpleFrenchDateTime } from "../../../helpers/helpers";

export default {
  name: "Voyageform",
  props: ["ShowOldVoyage", "ShowNewVoyage", "showAfter", "cranes"],
  data: () => ({
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
      lss_all_ib_lnw: "",
      crane_id: "",
    },
    pgb_r_co: 0,
    pgb_r_co_reason: "",
    crane_voyages: [],
    crane_voyage: [],
    crane_voyagesOld: {},
    crane_voyagesNew: {},
    dialog: false,
  }),

  methods: {
    onChange() {
      let count = 0;
      this.crane_voyage = {};
      this.crane_voyagesOld = {};
      this.crane_voyagesNew = {};
      this.crane_voyagesOld = {
        ...this.ShowOldVoyage.crane_voyages.filter((c) => {
          return c.crane_id == this.secondFormData.crane_id;
        })[0],
      };
      this.crane_voyagesNew = {
        ...this.ShowNewVoyage.crane_voyages.filter((c) => {
          return c.crane_id == this.secondFormData.crane_id;
        })[0],
      };

      this.setFormData();
    },
    setFormData() {
      if (this.showAfter) {
        this.crane_voyage = { ...this.crane_voyagesNew };
      } else {
        this.crane_voyage = { ...this.crane_voyagesOld };
      }
      if (
        this.crane_voyage &&
        Object.keys(this.crane_voyage).length === 0 &&
        Object.getPrototypeOf(this.crane_voyage) === Object.prototype
      ) {
        this.secondFormData = {
          id: this.secondFormData.id,
          crane_id: this.secondFormData.crane_id,
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
        };
      } else {
        this.secondFormData.cbu = FormatDateStringToSimpleFrenchDateTime(
          this.crane_voyage.cbu
        );
        this.secondFormData.lgbohc_all_from =
          FormatDateStringToSimpleFrenchDateTime(
            this.crane_voyage.lgbohc_all_from
          );
        this.secondFormData.lgbohc_all_to =
          FormatDateStringToSimpleFrenchDateTime(
            this.crane_voyage.lgbohc_all_to
          );
        this.secondFormData.lss_all_from =
          FormatDateStringToSimpleFrenchDateTime(
            this.crane_voyage.lss_all_from
          );
        this.secondFormData.lss_all_to = FormatDateStringToSimpleFrenchDateTime(
          this.crane_voyage.lss_all_to
        );
        this.secondFormData.lgbohc_all_num_gb =
          this.crane_voyage.lgbohc_all_num_gb;
        this.secondFormData.lgbohc_all_hc = this.crane_voyage.lgbohc_all_hc;
        this.secondFormData.lgbohc_all_inbay =
          this.crane_voyage.lgbohc_all_inbay;
        this.secondFormData.lgbohc_all_inbay_hatch_covers =
          this.crane_voyage.lgbohc_all_inbay_hatch_covers;
        this.secondFormData.lss_all_num_ss = this.crane_voyage.lss_all_num_ss;
        this.secondFormData.lss_all_ib = this.crane_voyage.lss_all_ib;
        this.secondFormData.lss_all_ib_lnw = this.crane_voyage.lss_all_ib_lnw;
      }
    },
    closePositionDialog() {
      this.dialog = false;
    },
    openPositionDialog() {
      this.dialog = true;
    },
  },
  watch: {
    showAfter(newValue, old) {
      if (this.showAfter) {
        this.pgb_r_co = this.ShowNewVoyage.pgb_r_co;
        this.pgb_r_co_reason = this.ShowNewVoyage.pgb_r_co_reason;
      } else {
        this.pgb_r_co = this.ShowOldVoyage.pgb_r_co;
        this.pgb_r_co_reason = this.ShowOldVoyage.pgb_r_co_reason;
      }
      this.setFormData();
    },
  },
  mounted() {
    if (this.showAfter) {
      this.pgb_r_co = this.ShowNewVoyage.pgb_r_co;
      this.pgb_r_co_reason = this.ShowNewVoyage.pgb_r_co_reason;
    } else {
      this.pgb_r_co = this.ShowOldVoyage.pgb_r_co;
      this.pgb_r_co_reason = this.ShowOldVoyage.pgb_r_co_reason;
    }
  },
};
</script>
