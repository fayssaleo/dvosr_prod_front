<template>
  <v-data-table
    hide-default-footer
    :headers="headers"
    :items="other_delays"
    class="elevation-1"
  >
    <template v-slot:item="{ item }">
      <tr class="tableRow" @click="showSelectedRow(item)" :class="item.action">
        <td
          class="text-xs-right"
          :class="
            item.crane != item.craneOld
              ? showAfter
                ? 'updatedAfter'
                : 'updatedBefore'
              : ''
          "
        >
          {{ item.crane }}
        </td>
        <td
          class="text-xs-right"
          :class="
            item.from != item.fromOld
              ? showAfter
                ? 'updatedAfter'
                : 'updatedBefore'
              : ''
          "
        >
          {{ item.from }}
        </td>
        <td
          class="text-xs-right"
          :class="
            item.to != item.toOld
              ? showAfter
                ? 'updatedAfter'
                : 'updatedBefore'
              : ''
          "
        >
          {{ item.to }}
        </td>
        <td
          class="text-xs-right"
          :class="
            item.code != item.codeOld
              ? showAfter
                ? 'updatedAfter'
                : 'updatedBefore'
              : ''
          "
        >
          {{ item.code }}
        </td>
        <td
          class="text-xs-right"
          :class="
            item.category != item.categoryOld
              ? showAfter
                ? 'updatedAfter'
                : 'updatedBefore'
              : ''
          "
        >
          {{ item.category }}
        </td>
        <td
          class="text-xs-right"
          id="content"
          :class="
            item.reason != item.reasonOld
              ? showAfter
                ? 'updatedAfter'
                : 'updatedBefore'
              : ''
          "
        >
          {{ item.reason }}
        </td>
      </tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Delays</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialogShowDetails" max-width="500px">
          <v-card>
            <v-card-text class="text-h5 pt-4">
              <v-row>
                <v-col cols="12" class="border mt-5"
                  >Crane : {{ selectToShowDelay.craneId }}</v-col
                >
                <v-col cols="4" class="border">From</v-col>
                <v-col cols="8" class="border">{{
                  selectToShowDelay.from
                }}</v-col>
                <v-col cols="4" class="border">To</v-col>
                <v-col cols="8" class="border">{{
                  selectToShowDelay.to
                }}</v-col>
                <v-col cols="4" class="border">Code</v-col>
                <v-col cols="8" class="border">{{
                  selectToShowDelay.code
                }}</v-col>
                <v-col cols="4" class="border">Category</v-col>
                <v-col cols="8" class="border">{{
                  selectToShowDelay.category
                }}</v-col>
                <v-col cols="12" class="border" style="border-bottom: none"
                  >Reason :</v-col
                >
                <v-col cols="12" class="border" style="border-top: none">{{
                  selectToShowDelay.reason
                }}</v-col>
                <v-col cols="12" class="border" style="border-bottom: none"
                  >Comment :</v-col
                >
                <v-col cols="12" class="border" style="border-top: none">{{
                  selectToShowDelay.comment
                }}</v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                color="primary"
                @click="dialogShowDetails = false"
                >Close</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="reloadTable"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: ["ShowOldVoyage", "ShowNewVoyage", "showAfter", "cranes", "dep_arr"],

  name: "DelayArrivalActions",
  data: () => ({
    dialogShowDetails: false,
    dialog: false,
    headers: [
      { text: "Crane ID", value: "crane" },
      { text: "From", value: "from" },
      { text: "To", value: "to" },
      { text: "Code", value: "code" },
      { text: "Category", value: "category" },
      { text: "Reason", value: "reason" },
    ],
    other_delays: [],
    editedIndex: -1,
    selectedOtherDelay: {
      id: "",
      from: "",
      to: "",
      reason: "",
      comment: "",
      dep_arr: "",
      voyage_id: "",
      crane_id: "",
      code_id: "",
      code: "",
      category: "",
    },
    defaulselectedOtherDelay: {
      id: "",
      from: "",
      to: "",
      reason: "",
      comment: "",
      dep_arr: "",
      voyage_id: "",
      crane_id: "",
      code_id: "",
      code: "",
      category: "",
    },
    selectToShowDelay: {
      from: "",
      to: "",
      reason: "",
      comment: "",
      code: "",
      category: "",
      craneId: "",
    },
    newOther_delays: [],
    oldOther_delays: [],
    newOther_delay: {
      id: "",
      from: "",
      to: "",
      reason: "",
      comment: "",
      dep_arr: "",
      voyage_id: "",
      crane_id: "",
      crane: "",
      code_id: "",
      code: "",
      category: "",
    },
    oldOther_delay: {
      id: "",
      from: "",
      to: "",
      reason: "",
      comment: "",
      dep_arr: "",
      voyage_id: "",
      crane_id: "",
      crane: "",
      code_id: "",
      code: "",
      category: "",
    },
    updatedOther_delay: {
      id: "",
      from: "",
      fromOld: "",
      to: "",
      toOld: "",
      reason: "",
      reasonOld: "",
      comment: "",
      commentOld: "",
      dep_arr: "",
      voyage_id: "",
      crane_id: "",
      crane_idOld: "",
      crane: "",
      craneOld: "",
      code_id: "",
      code: "",
      codeOld: "",
      category: "",
      categoryOld: "",
    },
  }),
  watch: {
    showAfter(newValue, old) {
      this.reloadTable();
    },
  },
  methods: {
    reloadTable() {
      let delays = [];
      if (this.showAfter) {
        delays = [...this.newOther_delays];
      } else {
        delays = [...this.oldOther_delays];
      }

      this.other_delays = delays.map((d) => {
        const craneId = this.cranes.filter((c) => c.id == d.crane_id);
        let craneIdUpdated = [...craneId];
        let updatedOther_delay = {};
        if (this.showAfter) {
          updatedOther_delay = {
            ...this.oldOther_delays.filter((e) => {
              return e.id == d.id;
            })[0],
          };
          if (
            updatedOther_delay &&
            Object.keys(updatedOther_delay).length === 0 &&
            Object.getPrototypeOf(updatedOther_delay) === Object.prototype
          ) {
            console.log(
              "updated is empty :",
              updatedOther_delay &&
                Object.keys(updatedOther_delay).length === 0 &&
                Object.getPrototypeOf(updatedOther_delay) === Object.prototype
            );
            console.log("updated :", updatedOther_delay);
            return {
              action: "added",
              id: d.id,
              crane: craneId[0].craneId,
              craneOld: craneId[0].craneId,
              crane_id: d.crane_id,
              crane_idOld: d.crane_id,
              code_id: d.code_id,
              from: d.from,
              fromOld: d.from,
              to: d.to,
              toOld: d.to,
              reason: d.reason,
              reasonOld: d.reason,
              comment: d.comment,
              commentOld: d.comment,
              code: d.code,
              codeOld: d.code,
              category: d.category,
              categoryOld: d.category,
              dep_arr: d.dep_arr,
            };
          } else {
            if (d.crane_id != updatedOther_delay.crane_id)
              craneIdUpdated = this.cranes.filter(
                (c) => c.id == updatedOther_delay.crane_id
              );
            return {
              action: "updated",
              id: d.id,
              crane: craneId[0].craneId,
              craneOld: craneIdUpdated[0].craneId,
              crane_id: d.crane_id,
              crane_idOld: updatedOther_delay.crane_id,
              code_id: d.code_id,
              from: d.from,
              fromOld: updatedOther_delay.from,
              to: d.to,
              toOld: updatedOther_delay.to,
              reason: d.reason,
              reasonOld: updatedOther_delay.reason,
              comment: d.comment,
              commentOld: updatedOther_delay.comment,
              code: d.code,
              codeOld: updatedOther_delay.code,
              category: d.category,
              categoryOld: updatedOther_delay.category,
              dep_arr: d.dep_arr,
            };
          }
        } else {
          updatedOther_delay = {
            ...this.newOther_delays.filter((e) => {
              return e.id == d.id;
            })[0],
          };
          if (
            updatedOther_delay &&
            Object.keys(updatedOther_delay).length === 0 &&
            Object.getPrototypeOf(updatedOther_delay) === Object.prototype
          ) {
            return {
              action: "deleted",
              id: d.id,
              crane: craneId[0].craneId,
              craneOld: craneId[0].craneId,
              crane_id: d.crane_id,
              crane_idOld: d.crane_id,
              code_id: d.code_id,
              from: d.from,
              fromOld: d.from,
              to: d.to,
              toOld: d.to,
              reason: d.reason,
              reasonOld: d.reason,
              comment: d.comment,
              commentOld: d.comment,
              code: d.code,
              codeOld: d.code,
              category: d.category,
              categoryOld: d.category,
              dep_arr: d.dep_arr,
            };
          } else {
            if (d.crane_id != updatedOther_delay.crane_id)
              craneIdUpdated = this.cranes.filter(
                (c) => c.id == updatedOther_delay.crane_id
              );
            return {
              action: "updated",
              id: d.id,
              crane: craneId[0].craneId,
              craneOld: craneIdUpdated[0].craneId,
              crane_id: d.crane_id,
              crane_idOld: updatedOther_delay.crane_id,
              code_id: d.code_id,
              from: d.from,
              fromOld: updatedOther_delay.from,
              to: d.to,
              toOld: updatedOther_delay.to,
              reason: d.reason,
              reasonOld: updatedOther_delay.reason,
              comment: d.comment,
              commentOld: updatedOther_delay.comment,
              code: d.code,
              codeOld: updatedOther_delay.code,
              category: d.category,
              categoryOld: updatedOther_delay.category,
              dep_arr: d.dep_arr,
            };
          }
        }
      });
    },
    showSelectedRow(item) {
      this.selectToShowDelay.craneId = item.crane;
      this.selectToShowDelay.from = item.from;
      this.selectToShowDelay.to = item.to;
      this.selectToShowDelay.reason = item.reason;
      this.selectToShowDelay.comment = item.comment;
      this.selectToShowDelay.code = item.code;
      this.selectToShowDelay.category = item.category;

      this.dialogShowDetails = true;
    },
  },
  mounted() {
    this.newOther_delays = this.ShowNewVoyage.other_delays.filter((e) => {
      return e.dep_arr == this.dep_arr;
    });
    this.oldOther_delays = this.ShowOldVoyage.other_delays.filter((e) => {
      return e.dep_arr == this.dep_arr;
    });

    this.reloadTable();
  },
};
</script>
<style lang="scss" scoped>
#content {
  overflow: hidden;
  width: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.tableRow {
  * {
    cursor: pointer !important;
  }
}
.tableRow:active {
  background-color: white;
}
.border {
  border: 1px solid black;
}
</style>
