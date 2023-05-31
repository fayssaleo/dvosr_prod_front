<template>
  <v-data-table
    hide-default-footer
    :headers="headers"
    :items="other_delays"
    class="elevation-1"
  >
    <template v-slot:item="{ item }">
      <tr class="tableRow">
        <td class="text-xs-right">{{ item.crane }}</td>
        <td class="text-xs-right">{{ item.from }}</td>
        <td class="text-xs-right">{{ item.to }}</td>
        <td class="text-xs-right">{{ item.code }}</td>
        <td class="text-xs-right">{{ item.category }}</td>
        <td class="text-xs-right" id="content">{{ item.reason }}</td>
        <td class="text-xs-right">
          <v-btn
            depressed
            rounded
            color="primary"
            class="mr-2 voyageButton"
            @click="editItem(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            depressed
            rounded
            color="error"
            class="mr-2 voyageButton"
            @click="deleteItem(item)"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
          <v-btn
            depressed
            rounded
            color="#66BB6A"
            class="voyageButton"
            @click="showSelectedRow(item)"
          >
            <v-icon color="white"> mdi-eye </v-icon>
          </v-btn>
        </td>
      </tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Delays</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="openAdd"
            >
              New Delay
            </v-btn>
          </template>
          <DelayDepartureAdd
            v-if="dialog"
            :selectedOtherDelay="selectedOtherDelay"
            v-model="dialog"
            @refreshTable="refreshTable"
          />
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed color="" @click="closeDelete">Cancel</v-btn>
              <v-btn depressed color="error" @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
import DelayDepartureAdd from "./DelayDepartureAdd.vue";
import CraneModule from "../../../store/craneModule";
import { mapGetters, mapActions } from "vuex";
import VoyageModule from "../../../store/voyageModule";

export default {
  components: {
    DelayDepartureAdd,
    CraneModule,
    VoyageModule,
  },
  name: "DelayTable",
  props: {
    notearrival: String,
  },
  data: () => ({
    dialogShowDetails: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Crane ID", value: "crane" },
      { text: "From", value: "from" },
      { text: "To", value: "to" },
      { text: "Code", value: "code" },
      { text: "Category", value: "category" },
      { text: "Reason", value: "reason" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    other_delays: [],
    editedIndex: -1,
    selectedOtherDelay: {
      id: "",
      from: "",
      to: "",
      reason: "",
      comment: "",
      dep_arr: "dep",
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
      dep_arr: "dep",
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
  }),

  computed: {
    ...mapGetters(["getCranes", "getVoyageToEditOrSave", "getShift"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    ...mapActions([
      "setCranesAction",
      "saveOrUpdateVoyageAction",
      "deleteOtherDelayAction",
      "setSnackBarTosSuccess",
      "setSnackBarTosFailed",

      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    editItem(item) {
      this.editedIndex = this.other_delays.indexOf(item);
      this.selectedOtherDelay = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.other_delays.indexOf(item);
      this.selectedOtherDelay = Object.assign({}, item);

      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.setModuleShowToTrueAction();
      this.deleteOtherDelayAction({
        id: this.selectedOtherDelay.id,
        shift: this.getShift,
      })
        .then(() => {
          this.other_delays = this.other_delays.filter((d) => {
            return d.id != this.selectedOtherDelay.id;
          });
          this.setSnackBarTosSuccess();
          this.setModuleShowToFalseAction();
          this.closeDelete();
        })
        .catch((error) => {
          this.setModuleShowToFalseAction();
        });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.selectedOtherDelay = Object.assign(
          {},
          this.defaulselectedOtherDelay
        );
        this.editedIndex = -1;
      });
    },
    openAdd() {
      this.selectedOtherDelay = this.defaulselectedOtherDelay;
    },
    refreshTable() {
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction()
        .then((response) => {
          if (response.status == "200") {
            this.setSnackBarTosSuccess();
            this.setModuleShowToFalseAction();
            this.dialog = false;
            this.reloadTable();
          } else if (response.status == "406_2") {
            this.setSnackBarTosFailed("Please chose the voyage first !");
            this.setModuleShowToFalseAction();
            this.dialog = false;
          }
        })
        .catch((error) => {
          this.setModuleShowToFalseAction();
        });

      return false;
    },
    reloadTable() {
      if (this.getVoyageToEditOrSave.id != "") {
        const delays = this.getVoyageToEditOrSave.other_delays.filter((e) => {
          return e.dep_arr == "dep";
        });

        this.other_delays = delays.map((d) => {
          const craneId = this.getCranes.filter((c) => c.id == d.crane_id);
          return {
            id: d.id,
            crane: craneId[0].craneId,
            crane_id: d.crane_id,
            code_id: d.code_id,
            from: d.from,
            to: d.to,
            reason: d.reason,
            comment: d.comment,
            code: d.code,
            category: d.category,
            dep_arr: d.dep_arr,
            voyage_id: d.voyage_id,
          };
        });
      }
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
    this.setModuleShowToTrueAction();
    this.setCranesAction()
      .then(() => {
        this.reloadTable();
        this.setModuleShowToFalseAction();
      })
      .catch((error) => {
        this.setModuleShowToFalseAction();
      });
  },
};
</script>
<style scoped>
#content {
  overflow: hidden;
  width: 100px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.tableRow {
  cursor: pointer;
}
.tableRow:active {
  background-color: white;
}
.border {
  border: 1px solid black;
}
</style>
