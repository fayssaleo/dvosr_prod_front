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
                    v-if="data.item.id == ShowNewVoyage.craneChanged1"
                    :class="showAfter ? 'afterText' : 'beforeText'"
                    >{{ data.item.craneId }}</span
                  >
                  <span v-else>{{ data.item.craneId }}</span>
                </template>
                <template slot="item" slot-scope="data">
                  <span
                    v-if="data.item.id == ShowNewVoyage.craneChanged1"
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
                  Disch of Gear Boxes and/or Hatch Covers before 1st Lift
                </h3>
              </center>
            </div>

            <v-text-field
              label="From(Date/Time)"
              outlined
              v-model="secondFormData.dgbohc_bfl_from"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.dgbohc_bfl_from !=
                crane_voyagesOld.dgbohc_bfl_from
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
              v-model="secondFormData.dgbohc_bfl_to"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.dgbohc_bfl_to != crane_voyagesOld.dgbohc_bfl_to
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <v-text-field
              label="Number of gear boxes:"
              v-model="secondFormData.dgbohc_bfl_num_gb"
              class="mb-0 pb-0"
              :disabled="secondFormData.crane_id == ''"
              type="number"
              :class="
                crane_voyagesNew.dgbohc_bfl_num_gb !=
                crane_voyagesOld.dgbohc_bfl_num_gb
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            ></v-text-field>

            <v-text-field
              label="Number of Hatch covers:"
              v-model="secondFormData.dgbohc_bfl_num_hc"
              class="mb-0 pb-0"
              :disabled="secondFormData.crane_id == ''"
              type="number"
              :class="
                crane_voyagesNew.dgbohc_bfl_num_hc !=
                crane_voyagesOld.dgbohc_bfl_num_hc
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            ></v-text-field>

            <center>
              If spreaders discharged by the ship itself specify number,
              position and duration of handling spreaders by the ship.
            </center>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              label="Crane Boom Down"
              outlined
              v-model="secondFormData.cbd"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.cbd != crane_voyagesOld.cbd
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <div class="pt-0 pb-4">
              <center>
                <h3 class="title">Disch of ship's Spreaders before 1st Lift</h3>
              </center>
            </div>

            <v-text-field
              label="From(Date/Time)"
              outlined
              v-model="secondFormData.dss_bfl_from"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.dss_bfl_from != crane_voyagesOld.dss_bfl_from
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
              v-model="secondFormData.dss_bfl_to"
              v-mask="'##/##/#### ##:##'"
              placeholder="DD/MM/YYYY HH:mm"
              prepend-inner-icon="mdi-calendar-clock"
              :disabled="secondFormData.crane_id == ''"
              :class="
                crane_voyagesNew.dss_bfl_to != crane_voyagesOld.dss_bfl_to
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            >
            </v-text-field>

            <v-text-field
              label="Number of spreaders: "
              v-model="secondFormData.dss_bfl_num_sp"
              class="mb-0 pb-0"
              :disabled="secondFormData.crane_id == ''"
              type="number"
              :class="
                crane_voyagesNew.dss_bfl_num_sp !=
                crane_voyagesOld.dss_bfl_num_sp
                  ? showAfter
                    ? 'afterText'
                    : 'beforeText'
                  : ''
              "
            ></v-text-field>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="From Bay : "
                  v-model="secondFormData.dss_bfl_fb"
                  class="mb-0 pb-0"
                  :disabled="secondFormData.crane_id == ''"
                  type="number"
                  :class="
                    crane_voyagesNew.dss_bfl_fb != crane_voyagesOld.dss_bfl_fb
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="6"
                ><v-select
                  outlined
                  label="Disch by NS or Wires?: "
                  :items="['NS', 'Wires']"
                  filled
                  v-model="secondFormData.dss_bfl_fb_dnw"
                  :disabled="secondFormData.crane_id == ''"
                  :class="
                    crane_voyagesNew.dss_bfl_fb_dnw !=
                    crane_voyagesOld.dss_bfl_fb_dnw
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                </v-select
              ></v-col>
            </v-row>
          </v-col>
        </v-row>
      </form>
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
.theWall {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  z-index: 10000;
}
</style>
<script>
import { FormatDateStringToSimpleFrenchDateTime } from "../../../helpers/helpers";

export default {
  name: "Voyageform",

  data: () => ({
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
    crane_voyage: [],
    crane_voyagesOld: {},
    crane_voyagesNew: {},
  }),
  props: ["ShowOldVoyage", "ShowNewVoyage", "showAfter", "cranes"],

  computed: {},
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
        };
      } else {
        this.secondFormData.cbd = FormatDateStringToSimpleFrenchDateTime(
          this.crane_voyage.cbd
        );
        this.secondFormData.dgbohc_bfl_from =
          FormatDateStringToSimpleFrenchDateTime(
            this.crane_voyage.dgbohc_bfl_from
          );
        this.secondFormData.dgbohc_bfl_to =
          FormatDateStringToSimpleFrenchDateTime(
            this.crane_voyage.dgbohc_bfl_to
          );
        this.secondFormData.dgbohc_bfl_num_gb =
          this.crane_voyage.dgbohc_bfl_num_gb;
        this.secondFormData.dgbohc_bfl_num_hc =
          this.crane_voyage.dgbohc_bfl_num_hc;
        this.secondFormData.dss_bfl_from =
          FormatDateStringToSimpleFrenchDateTime(
            this.crane_voyage.dss_bfl_from
          );
        this.secondFormData.dss_bfl_to = FormatDateStringToSimpleFrenchDateTime(
          this.crane_voyage.dss_bfl_to
        );
        this.secondFormData.dss_bfl_num_sp = this.crane_voyage.dss_bfl_num_sp;
        this.secondFormData.dss_bfl_fb_dnw = this.crane_voyage.dss_bfl_fb_dnw;
        this.secondFormData.dss_bfl_fb = this.crane_voyage.dss_bfl_fb;
      }
    },
  },
  mounted() {},
  watch: {
    showAfter(newValue, old) {
      this.setFormData();
    },
  },
};
</script>
