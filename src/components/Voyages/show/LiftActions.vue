<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="crane_voyages"
            hide-default-footer
            class="elevation-1"
          >
            <template v-slot:item="{ item }">
              <tr class="tableRow">
                <td class="text-xs-right">
                  {{ item.craneId }}
                </td>
                <td
                  class="text-xs-right"
                  :class="
                    item.ffl != item.fflOld
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  <span>{{
                    showAfter
                      ? item.ffl != "" && item.ffl != null
                        ? item.ffl
                        : "Empty"
                      : item.fflOld != "" && item.fflOld != null
                      ? item.fflOld
                      : "Empty"
                  }}</span>
                </td>
                <td
                  class="text-xs-right"
                  :class="
                    item.fll != item.fllOld
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  <span>{{
                    showAfter
                      ? item.fll != "" && item.fll != null
                        ? item.fll
                        : "Empty"
                      : item.fllOld != "" && item.fllOld != null
                      ? item.fllOld
                      : "Empty"
                  }}</span>
                </td>
                <td
                  class="text-xs-right"
                  :class="
                    item.sfl != item.sflOld
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  {{
                    showAfter
                      ? item.sfl != "" && item.sfl != null
                        ? item.sfl
                        : "Empty"
                      : item.sflOld != "" && item.sflOld != null
                      ? item.sflOld
                      : "Empty"
                  }}
                </td>
                <td
                  class="text-xs-right"
                  :class="
                    item.slf != item.slfOld
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  <span>{{
                    showAfter
                      ? item.slf != "" && item.slf != null
                        ? item.slf
                        : "Empty"
                      : item.slfOld != "" && item.slfOld != null
                      ? item.slfOld
                      : "Empty"
                  }}</span>
                </td>
                <td
                  class="text-xs-right"
                  :class="
                    item.tfl != item.tflOld
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  <span>{{
                    showAfter
                      ? item.tfl != "" && item.tfl != null
                        ? item.tfl
                        : "Empty"
                      : item.tflOld != "" && item.tflOld != null
                      ? item.tflOld
                      : "Empty"
                  }}</span>
                </td>
                <td
                  class="text-xs-right"
                  :class="
                    item.tll != item.tllOld
                      ? showAfter
                        ? 'afterText'
                        : 'beforeText'
                      : ''
                  "
                >
                  <span>{{
                    showAfter
                      ? item.tll != "" && item.tll != null
                        ? item.tll
                        : "Empty"
                      : item.tllOld != "" && item.tllOld != null
                      ? item.tllOld
                      : "Empty"
                  }}</span>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
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
import { FormatDateStringToSimpleFrenchDateTime } from "../../../helpers/helpers";
export default {
  name: "AddLift",
  props: ["ShowOldVoyage", "ShowNewVoyage", "showAfter", "cranes"],

  data: () => ({
    dialog: false,
    cranevalue: "",
    liftvalue: "",
    timevalue: "",
    liftchoices: [
      "1st First Lift",
      "1st Last Lift",
      "2nd First Lift",
      "2nd Last Lift",
      "3rd First Lift",
      "3rd Last Lift",
    ],

    headers: [
      {
        text: "Crane ID",
        align: "start",
        sortable: false,
        value: "craneId",
      },
      { text: "1st FIRST LIFT", value: "ffl", sortable: false },
      { text: "1st LAST LIFT", value: "fll", sortable: false },
      { text: "2nd FIRST LIFT", value: "sfl", sortable: false },
      { text: "2nd LAST LIFT", value: "sll", sortable: false },
      { text: "3rd FIRST LIFT", value: "tfl", sortable: false },
      { text: "3rd LAST LIFT", value: "tll", sortable: false },
    ],

    newTask: null,
    crane_voyages: [],
  }),

  methods: {
    reloadTable() {
      this.crane_voyages = this.ShowNewVoyage.crane_voyages.map((e) => {
        const craneId = this.cranes.filter((c) => c.id == e.crane_id);
        return {
          crane_id: e.crane_id,
          voyage_id: this.ShowNewVoyage.id,
          craneId: craneId[0].craneId,
          ffl: FormatDateStringToSimpleFrenchDateTime(e.ffl),
          fll: FormatDateStringToSimpleFrenchDateTime(e.fll),
          sfl: FormatDateStringToSimpleFrenchDateTime(e.sfl),
          sll: FormatDateStringToSimpleFrenchDateTime(e.sll),
          tfl: FormatDateStringToSimpleFrenchDateTime(e.tfl),
          tll: FormatDateStringToSimpleFrenchDateTime(e.tll),
        };
      });
      //get the fucking old ones and merge it with the new ones here
      this.crane_voyages = this.crane_voyages.map((e) => {
        const oldCraneVoyage = this.ShowOldVoyage.crane_voyages.filter(
          (c) => c.crane_id == e.crane_id
        )[0];
        const craneId = this.cranes.filter((c) => c.id == e.crane_id);

        if (
          oldCraneVoyage &&
          Object.keys(oldCraneVoyage).length === 0 &&
          Object.getPrototypeOf(oldCraneVoyage) === Object.prototype
        ) {
          return {
            crane_id: e.crane_id,
            voyage_id: this.ShowNewVoyage.id,
            craneId: craneId[0].craneId,
            ffl: e.ffl,
            fflOld: "",
            fll: e.fll,
            fllOld: "",
            sfl: e.sfl,
            sflOld: "",
            sll: e.sll,
            sllOld: "",
            tfl: e.tfl,
            tflOld: "",
            tll: e.tll,
            tllOld: "",
          };
        } else
          return {
            crane_id: e.crane_id,
            voyage_id: this.ShowNewVoyage.id,
            craneId: craneId[0].craneId,
            ffl: e.ffl,
            fflOld: FormatDateStringToSimpleFrenchDateTime(oldCraneVoyage.ffl),
            fll: e.fll,
            fllOld: FormatDateStringToSimpleFrenchDateTime(oldCraneVoyage.fll),
            sfl: e.sfl,
            sflOld: FormatDateStringToSimpleFrenchDateTime(oldCraneVoyage.sfl),
            sll: e.sll,
            sllOld: FormatDateStringToSimpleFrenchDateTime(oldCraneVoyage.sll),
            tfl: e.tfl,
            tflOld: FormatDateStringToSimpleFrenchDateTime(oldCraneVoyage.tfl),
            tll: e.tll,
            tllOld: FormatDateStringToSimpleFrenchDateTime(oldCraneVoyage.tll),
          };
      });

      //----------filling empty cranes
      this.crane_voyages = this.cranes.map((c) => {
        const crane_voyage = this.crane_voyages.filter(
          (e) => c.id == e.crane_id
        )[0];

        if (crane_voyage != null) return crane_voyage;
        else
          return {
            crane_id: c.id,
            voyage_id: "",
            craneId: c.craneId,
            ffl: "",
            fflOld: "",
            fll: "",
            fllOld: "",
            sfl: "",
            sflOld: "",
            sll: "",
            sllOld: "",
            tfl: "",
            tflOld: "",
            tll: "",
            tllOld: "",
          };
      });
    },
  },

  mounted() {
    this.reloadTable();
  },
};
</script>
<style lang="scss" scoped>
.beforeText {
  * {
    color: #ff5722 !important;
    font-weight: 900;
  }
  td {
    color: #ff5722 !important;
    font-weight: 900;
  }
}
.afterText {
  * {
    color: #4caf50 !important;
    font-weight: 900;
  }
  td {
    color: #4caf50 !important;
    font-weight: 900;
  }
}
</style>
