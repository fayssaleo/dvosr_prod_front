<template>
  <v-app>
    <v-container>
      <v-card>
        <v-card-title> </v-card-title>

        <v-card-text>
          <div>
            <v-data-table
              :headers="headers"
              :items="codes"
              sort-by="code"
              class="elevation-1"
            >
              <template v-slot:item.description="{ item }">
                <span id="content">{{ item.description }}</span>
              </template>
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Reason CODES</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        New Code
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-text-field
                                v-model="editedItem.code"
                                label="Code"
                                :rules="[rules.required]"
                                ref="code"
                                outlined
                                filled
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12">
                              <v-select
                                :items="[
                                  'Deductible',
                                  'Operational',
                                  'Technical',
                                ]"
                                v-model="editedItem.category"
                                label="Category"
                                outlined
                                filled
                              ></v-select>
                            </v-col>
                            <v-col cols="12">
                              <v-textarea
                                v-model="editedItem.description"
                                label="Description"
                                :rules="[rules.required]"
                                ref="description"
                                outlined
                                filled
                              ></v-textarea>
                            </v-col>

                            <v-col cols="12">
                              <h3
                                class="
                                  font-weight-medium
                                  mb-2
                                  text-center
                                  error--text
                                "
                              >
                                {{ text }}
                              </h3>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed color="" @click="close">
                          Cancel
                        </v-btn>
                        <v-btn depressed color="primary" @click="openSaveCode">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        Code?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="" @click="closeDelete">Cancel</v-btn>
                        <v-btn color="error" @click="deleteItemConfirm"
                          >OK</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialog4" width="500">
                    <v-card
                      v-if="
                        editedItem.code != '' &&
                        editedItem.code != null &&
                        editedItem.description != '' &&
                        editedItem.description != null &&
                        editedItem.category != '' &&
                        editedItem.category != null
                      "
                    >
                      <v-card-title class="text-h5 grey lighten-2">
                        Confirm action
                      </v-card-title>

                      <v-card-text>
                        <h3>Are you sure you want to proceed?</h3>
                      </v-card-text>

                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn depressed color="" @click="dialog4 = false"
                          >Cancel</v-btn
                        >
                        <v-btn depressed color="primary" @click="save"
                          >OK</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                    <v-card
                      v-else-if="
                        editedItem.code == '' || editedItem.code == null
                      "
                    >
                      <v-card-title class="text-h5 error lighten-2">
                        WARNING
                      </v-card-title>

                      <v-card-text class="mt-4">
                        <h2>Insert the code first !</h2>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          depressed
                          color="primary"
                          @click="dialog4 = false"
                          >OK</v-btn
                        >
                      </v-card-actions>
                    </v-card>

                    <v-card
                      v-else-if="
                        editedItem.category == '' || editedItem.category == null
                      "
                    >
                      <v-card-title class="text-h5 error lighten-2">
                        WARNING
                      </v-card-title>

                      <v-card-text class="mt-4">
                        <h2>Select the category !</h2>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          depressed
                          color="primary"
                          @click="dialog4 = false"
                          >OK</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                    <v-card
                      v-else-if="
                        editedItem.description == '' ||
                        editedItem.description == null
                      "
                    >
                      <v-card-title class="text-h5 error lighten-2">
                        WARNING
                      </v-card-title>

                      <v-card-text class="mt-4">
                        <h2>Insert the description !</h2>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          depressed
                          color="primary"
                          @click="dialog4 = false"
                          >OK</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  depressed
                  rounded
                  color="primary"
                  class="mr-2"
                  @click="editItem(item)"
                >
                  <v-icon> mdi-pencil </v-icon>
                </v-btn>
                <v-btn
                  depressed
                  rounded
                  color="error"
                  class="mr-2"
                  @click="deleteItem(item)"
                >
                  <v-icon> mdi-delete </v-icon>
                </v-btn>
              </template>
              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
              </template>
            </v-data-table>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn depressed color="primary" @click="closeMotherDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-row>
        <v-col style="text-align: center">
          <v-dialog v-model="errorDialog" width="500">
            <template> </template>
            <v-card>
              <v-card-title class="text-h5 error lighten-2">
                WARNING
              </v-card-title>

              <v-card-text class="mt-4">
                <h2>The code has already been taken.</h2>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" @click="errorDialog = false"
                  >OK</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    text: "",
    errorDialog: false,
    dialog: false,
    dialog4: false,
    dialogDelete: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
    },
    search: "",
    codes: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "CODE",
        value: "code",
      },
      { text: "CATEGORY", value: "category" },
      { text: "DESCRIPTION", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      code: "",
      description: "",
      category: "",
    },
    defaultItem: {
      id: "",
      code: "",
      description: "",
      category: "",
    },
  }),
  computed: {
    ...mapGetters(["getCodes"]),

    CodeDialog: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      },
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Code" : "Edit Code";
    },
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
      "setCodesAction",
      "setSnackBarTosSuccess",
      "editCodesAction",
      "addCodeAction",
      "deleteCodeAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    closeMotherDialog() {
      this.CodeDialog = false;
    },
    initialize() {
      this.codes = this.getcodes;
    },
    editItem(item) {
      this.editedIndex = this.codes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.codes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.setModuleShowToTrueAction();
      this.deleteCodeAction({ id: this.editedItem.id })
        .then(() => {
          this.codes.splice(this.editedIndex, 1);

          this.setSnackBarTosSuccess("Successfully !");
          this.setModuleShowToFalseAction();
          this.closeDelete();
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
    save() {
      if (!this.$refs.code.hasError && !this.$refs.description.hasError)
        if (this.editedIndex > -1) {
          const index = this.editedIndex;
          this.setModuleShowToTrueAction();
          this.editCodesAction(this.editedItem)
            .then((item) => {
              if ((item.status = "200")) {
                Object.assign(this.codes[index], item.payload);
                this.setSnackBarTosSuccess();
                this.setModuleShowToFalseAction();
                this.dialog4 = false;
                this.close();
              } else if (item.status == "406_2") {
                this.setModuleShowToFalseAction();
                this.errorDialog = true;
              }
            })
            .catch((error) => {
              this.setModuleShowToFalseAction();
            });
        } else {
          this.setModuleShowToTrueAction();
          this.addCodeAction(this.editedItem)
            .then((response) => {
              if (response.status == "200") {
                this.setSnackBarTosSuccess();
                this.setModuleShowToFalseAction();
                this.dialog4 = false;
                this.close();
              } else if (response.status == "406_2") {
                this.errorDialog = true;
                this.setModuleShowToFalseAction();
              }
            })
            .catch((reponse) => {
              this.setModuleShowToFalseAction();
            });
        }
    },
    openSaveCode() {
      this.dialog4 = true;
    },
    openSaveSave() {
      this.dialog4 = true;
    },
  },
  mounted() {
    this.setModuleShowToTrueAction();
    this.setCodesAction()
      .then(() => {
        this.codes = this.getCodes;
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
</style>
