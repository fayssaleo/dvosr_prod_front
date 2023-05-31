<template>
  <v-container class="form2" fluid>
    <v-row>
      <v-col cols="6" md="6" sm="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="2">
              <h3 class="pt-3 pl-3">Vessel cell phone :</h3>
              <v-row>
                <v-col cols="4 ml-3">
                  <v-switch
                    v-model="v1"
                    label="Vessel 1"
                    @change="vessel1Click"
                  ></v-switch>
                </v-col>
                <v-col cols="4">
                  <v-switch
                    v-model="v2"
                    label="Vessel 2"
                    @change="vessel2Click"
                  ></v-switch>
                </v-col>
                <v-col cols="3">
                  <v-switch
                    v-model="v3"
                    label="Vessel 3"
                    @change="vessel3Click"
                  ></v-switch>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="2">
              <div class="pl-4 pt-1">
                <h3 class="pb-3">Damaged containers ?</h3>

                <v-row>
                  <v-col cols="12" class="py-0 my-0"
                    ><v-switch
                      v-model="firstFormData.dm_y"
                      label="In Yard"
                      @change="damagedContainerInYardClick"
                    ></v-switch
                  ></v-col>
                  <v-col cols="12" class="py-0 my-0"
                    ><v-switch
                      v-model="firstFormData.dm_g"
                      label="In Gangway"
                      @change="damagedContainerInGangwayClick"
                    ></v-switch
                  ></v-col>
                  <v-col cols="12" class="py-0 my-0"
                    ><v-switch
                      v-model="firstFormData.imo_class"
                      label="IMO Class 1.4 - 6,2 - 7 Container onboard ?"
                      @change="OpenPositionDialog"
                    ></v-switch
                  ></v-col>
                  <v-col cols="12" v-if="firstFormData.imo_class">
                    <v-text-field
                      v-model="firstFormData.imo_class_ps_onb"
                      label="Position :"
                      class="mb-0 pb-0 pr-4 mt-4"
                      outlined
                      clearable
                      :mask="['##-##-##']"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </div>
              <v-card-actions style="justify-content: end"> </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card elevation="2">
              <v-row class="mb-0 pb-0">
                <v-col class="pl-8 mb-0 pb-0" cols="6">
                  <h3 class="pb-2 mb-2">Hatch covers :</h3>
                  <v-row class="pa-0 ma-0">
                    <v-col cols="12" class="pa-0 ma-0 pr-r"
                      ><!--v-text-field
                        v-model="firstFormData.gear_boxes_num"
                        
                        type="number"
                        class="pr-4"
                        outlined
                        clearable
                        :min="0"
                      ></v-text-field-->

                      <integer-plusminus
                        v-model="firstFormData.hatch_covers_num"
                        :min="0"
                        :step="1"
                        class="mb-4 mr-3"
                      >
                        <v-text-field
                          label="Number :"
                          v-model="firstFormData.hatch_covers_num"
                          class="ma-0 pa-0 text-justify"
                          clearable
                          type="number"
                          min="0"
                        ></v-text-field>

                        <template slot="decrement">-</template>

                        <template slot="increment">+</template>
                      </integer-plusminus>
                    </v-col>
                    <v-col cols="12" class="pa-0 ma-0">
                      <!--integer-plusminus
                        v-model="firstFormData.hatch_covers_moves"
                        :min="0"
                        :step="2"
                        class="mb-4 mr-3"
                      >
                        <v-text-field
                          label="Moves :"
                          v-model="firstFormData.hatch_covers_moves"
                          class="ma-0 pa-0 text-justify"
                          clearable
                          type="number"
                          @change="movesChange"
                        ></v-text-field>

                        <template slot="decrement">-</template>

                        <template slot="increment">+</template>
                      </integer-plusminus-->
                      <h3 class="pb-2 mb-2 pl-2">
                        Moves : {{ HatchCoversChangeMovesValue }}
                      </h3>
                    </v-col>
                    <v-col
                      cols="12"
                      class="pa-0 ma-0 pr-r"
                      style="visibility: hidden"
                      ><!--v-text-field
                        v-model="firstFormData.gear_boxes_num"
                        
                        type="number"
                        class="pr-4"
                        outlined
                        clearable
                        :min="0"
                      ></v-text-field-->

                      <integer-plusminus
                        v-model="firstFormData.hatch_covers_num_40"
                        :min="0"
                        :step="1"
                        class="mb-4 mr-3"
                      >
                        <v-text-field
                          label="Number (40ft):"
                          v-model="firstFormData.hatch_covers_num_40"
                          class="ma-0 pa-0 text-justify"
                          clearable
                          type="number"
                          min="0"
                        ></v-text-field>

                        <template slot="decrement">-</template>

                        <template slot="increment">+</template>
                      </integer-plusminus>
                    </v-col>

                    <v-switch
                      class="pa-0 ma-0 mb-5 mt-2"
                      v-model="firstFormData.any_hydraulic_couvers"
                      label="Any hydraulic hatch covers ?"
                    ></v-switch>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <h3 class="pb-2 mb-2">
                    Gear boxes (Total : {{ totalGearBoxes }})
                  </h3>
                  <v-row class="pa-0 ma-0">
                    <v-col cols="12" class="pa-0 ma-0 pr-r"
                      ><!--v-text-field
                        v-model="firstFormData.gear_boxes_num"
                        
                        type="number"
                        class="pr-4"
                        outlined
                        clearable
                        :min="0"
                      ></v-text-field-->

                      <integer-plusminus
                        v-model="firstFormData.gear_boxes_num"
                        :min="0"
                        :step="1"
                        class="mb-4 mr-3"
                      >
                        <v-text-field
                          label="Number (20ft):"
                          v-model="firstFormData.gear_boxes_num"
                          class="ma-0 pa-0 text-justify"
                          clearable
                          type="number"
                          min="0"
                        ></v-text-field>

                        <template slot="decrement">-</template>

                        <template
                          slot="increment"
                          @click="gearboxesChangeMovesValue"
                          >+</template
                        >
                      </integer-plusminus>
                    </v-col>
                    <v-col cols="12" class="pa-0 ma-0 pr-r"
                      ><!--v-text-field
                        v-model="firstFormData.gear_boxes_num"
                        
                        type="number"
                        class="pr-4"
                        outlined
                        clearable
                        :min="0"
                      ></v-text-field-->

                      <integer-plusminus
                        v-model="firstFormData.gear_boxes_num_40"
                        :min="0"
                        :step="1"
                        class="mb-4 mr-3"
                      >
                        <v-text-field
                          label="Number (40ft):"
                          v-model="firstFormData.gear_boxes_num_40"
                          class="ma-0 pa-0 text-justify"
                          clearable
                          type="number"
                          min="0"
                        ></v-text-field>

                        <template slot="decrement">-</template>

                        <template slot="increment">+</template>
                      </integer-plusminus>
                    </v-col>
                    <v-col cols="12" class="pa-0 ma-0">
                      <!--integer-plusminus
                        v-model="firstFormData.gear_boxes_moves"
                        :min="0"
                        :step="2"
                        class="mb-4 mr-3"
                      >
                        <v-text-field
                          label="Moves :"
                          v-model="firstFormData.gear_boxes_moves"
                          class="ma-0 pa-0 text-justify"
                          clearable
                          type="number"
                          @change="movesChange"
                        ></v-text-field>

                        <template slot="decrement">-</template>

                        <template slot="increment">+</template>
                      </integer-plusminus-->
                      <h3 class="pb-2 mb-2 pl-2">
                        Moves : {{ gearboxesChangeMovesValue }}
                      </h3>
                    </v-col>
                  </v-row>

                  <!--v-text-field
                    v-model="firstFormData.gear_boxes_moves"
                    label="Moves:"
                    type="number"
                    class="pr-4"
                    outlined
                    clearable
                    :min="0"
                  ></v-text-field-->
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" md="6" sm="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="2">
              <v-row>
                <v-col cols="6">
                  <div class="pl-4">
                    <div class="pb-2">First Line</div>

                    <vc-date-picker
                      v-model="first_line_datetime"
                      mode="dateTime"
                      is24hr
                      @input="dateChange('first_line_datetime')"
                    >
                      <template v-slot="{ inputValue, inputEvents }">
                        <v-text-field
                          label="Date"
                          outlined
                          :value="inputValue"
                          v-on="inputEvents"
                          v-model="firstFormData.first_line_datetime"
                          class="mb-0 pb-0 pr-4"
                          clearable
                          v-mask="'##/##/#### ##:##'"
                          placeholder="DD/MM/YYYY HH:mm"
                          prepend-inner-icon="mdi-calendar-clock"
                        >
                        </v-text-field>
                      </template>
                    </vc-date-picker>

                    <!--v-text-field
                      v-model="firstFormData.num_mooring_r_fore"
                      label="Number of Mooring ropes(Before) :"
                      class="mb-0 pb-0 pr-4"
                      type="number"
                      outlined
                      clearable
                      :min="0"
                    ></v-text-field-->
                    <div class="pb-2">Number of Moorning Ropes</div>
                    <integer-plusminus
                      v-model="firstFormData.num_mooring_r_aft"
                      :min="0"
                      :step="1"
                      class="mb-0 pb-0 pr-4"
                    >
                      <v-text-field
                        label="After :"
                        v-model="firstFormData.num_mooring_r_aft"
                        class="ma-0 pa-0 text-justify"
                        clearable
                      ></v-text-field>

                      <template slot="decrement">-</template>

                      <template slot="increment">+</template>
                    </integer-plusminus>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="pb-2">Vessel All Fast</div>

                  <vc-date-picker
                    v-model="vessel_all_fast"
                    mode="dateTime"
                    is24hr
                    @input="dateChange('vessel_all_fast')"
                  >
                    <template v-slot="{ inputValue, inputEvents }">
                      <v-text-field
                        label="Date"
                        outlined
                        :value="inputValue"
                        v-on="inputEvents"
                        v-model="firstFormData.vessel_all_fast"
                        class="mb-0 pb-0 pr-4"
                        clearable
                        v-mask="'##/##/#### ##:##'"
                        placeholder="DD/MM/YYYY HH:mm"
                        prepend-inner-icon="mdi-calendar-clock"
                      >
                      </v-text-field>
                    </template>
                  </vc-date-picker>

                  <!--v-text-field
                    v-model="firstFormData.num_mooring_r_aft"
                    label="Number of Mooring ropes(After) :"
                    class="mb-0 pb-0 pr-4"
                    type="number"
                    outlined
                    clearable
                    :min="0"
                  ></v-text-field-->
                  <div class="pb-2">Number of Moorning Ropes</div>
                  <integer-plusminus
                    v-model="firstFormData.num_mooring_r_fore"
                    :min="0"
                    :step="1"
                    class="mb-4 mr-3"
                  >
                    <v-text-field
                      label="Forward :"
                      v-model="firstFormData.num_mooring_r_fore"
                      class="mb-0 pb-0 pr-4"
                      clearable
                    ></v-text-field>

                    <template slot="decrement">-</template>

                    <template slot="increment">+</template>
                  </integer-plusminus>
                </v-col>
              </v-row>
              <div class="pb-0 mb-0">
                <v-row>
                  <v-col cols="6" class="pl-7"
                    ><vc-date-picker
                      v-model="gangway_secured"
                      mode="dateTime"
                      is24hr
                      @input="dateChange('gangway_secured')"
                    >
                      <template v-slot="{ inputValue, inputEvents }">
                        <v-text-field
                          label="Gangway Secured"
                          outlined
                          :value="inputValue"
                          v-on="inputEvents"
                          v-model="firstFormData.gangway_secured"
                          class="mb-0 pb-0 pr-4"
                          clearable
                          v-mask="'##/##/#### ##:##'"
                          placeholder="DD/MM/YYYY HH:mm"
                          prepend-inner-icon="mdi-calendar-clock"
                        >
                        </v-text-field>
                      </template> </vc-date-picker
                  ></v-col>
                  <v-col cols="6"
                    ><vc-date-picker
                      v-model="lashers_onboard"
                      mode="dateTime"
                      is24hr
                      @input="dateChange('lashers_onboard')"
                    >
                      <template v-slot="{ inputValue, inputEvents }">
                        <v-text-field
                          label="Lashers onboard"
                          outlined
                          :value="inputValue"
                          v-on="inputEvents"
                          v-model="firstFormData.lashers_onboard"
                          class="mb-0 pb-0 pr-4"
                          clearable
                          v-mask="'##/##/#### ##:##'"
                          placeholder="DD/MM/YYYY HH:mm"
                          prepend-inner-icon="mdi-calendar-clock"
                        >
                        </v-text-field>
                      </template> </vc-date-picker
                  ></v-col>
                  <v-col cols="12"
                    ><v-switch
                      class="pl-7"
                      v-model="firstFormData.dwuscfb"
                      label="Did we Use Safety cage for Boarding?"
                    ></v-switch
                  ></v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
          <!-- -->
          <v-col col="12" class="mb-0 pb-0">
            <v-card>
              <div class="pl-4 pt-1 visselArrived">
                <v-switch
                  v-model="firstFormData.vawgd"
                  label="Vessel arrived with gangway down?"
                  class="mb-0 pb-0"
                ></v-switch>
                <v-switch
                  v-model="firstFormData.vawsnrog"
                  label="Vessel arrived with safety net ready on gangway?"
                  class="mb-0 pb-0 pt-0 mt-0"
                ></v-switch>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" style="text-align: end">
            <div class="fontsize mt-4 pt-4">
              <v-dialog v-model="dialog3" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="light-blue accent-3"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    width="100%"
                  >
                    Save
                  </v-btn>
                </template>
                <v-card
                  v-if="
                    verifyMoves &&
                    verifyMoves2 &&
                    !allFastNotSupFirstLine &&
                    !lashersOnBoardNotSupFirstLine &&
                    !gangwaySecuredNotSupFirstLine &&
                    !checkImoClassPos
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
                    <v-btn depressed color="" @click="dialog3 = false"
                      >Cancel</v-btn
                    >
                    <v-btn depressed color="primary" @click="saveAll">OK</v-btn>
                  </v-card-actions>
                </v-card>
                <v-card v-else>
                  <v-card-title class="text-h5 error lighten-2">
                    WARNING
                  </v-card-title>
                  <v-card-text class="mt-4 test">
                    <h2 v-if="!verifyMoves" class="my-3 py-3">
                      - Hacth cover moves value must be pair !
                    </h2>
                    <h2 v-if="!verifyMoves2" class="my-3 py-3">
                      - Gear box moves value must be pair !
                    </h2>
                    <h2 v-if="allFastNotSupFirstLine" class="my-3 py-3">
                      - Vessel All Fast must be superior than First Line !
                    </h2>
                    <h2 v-if="lashersOnBoardNotSupFirstLine" class="my-3 py-3">
                      - Lashers Onboard must be superior than First Line !
                    </h2>
                    <h2 v-if="lashersOnBoardNotSupFirstLine" class="my-3 py-3">
                      - Gangway Secured must be superior than First Line !
                    </h2>
                    <h2 v-if="checkImoClassPos" class="my-3 py-3">
                      - When IMO Class is checked at least one container
                      position must be inserted !
                    </h2>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn depressed color="primary" @click="dialog3 = false"
                      >OK</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
.fontsize {
  font-size: 1.25rem;
}
.v-text-field {
  margin: 0;
  padding: 0;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import Datepicker from "../../date&time/Datepicker.vue";
import Dialog from "../../dialog/Dialog";
import {
  compareTwoDate,
  FormatDateStringToISO,
} from "../../../helpers/helpers.js";
import { formatToSimpleFormatDD_MM_YYYY_H_M_S } from "../../../helpers/helpers.js";
import { IntegerPlusminus } from "vue-integer-plusminus";
export default {
  name: "Voyageform2",
  components: { Datepicker, Dialog, IntegerPlusminus },
  data() {
    return {
      datepickervessel: new Date(),
      datepickerfirstline: new Date(),
      datepickerpaperwork: new Date(),
      firstFormData: {
        id: "",
        vawgd: false,
        vawsnrog: false,
        dm_y: "",
        dm_g: "",
        hatch_covers_num: null,
        hatch_covers_num_40: null,
        hatch_covers_moves: null,
        gear_boxes_num: null,
        gear_boxes_num_40: null,
        gear_boxes_moves: null,
        any_hydraulic_couvers: "",
        first_line_datetime: "",
        vessel_all_fast: "",
        num_mooring_r_fore: null,
        num_mooring_r_aft: null,
        gangway_secured: "",
        lashers_onboard: "",
        dwuscfb: false,
        imo_class: false,
        imo_class_ps_onb: "",
        tele: "",
      },
      first_line_datetime: new Date(),
      vessel_all_fast: new Date(),
      gangway_secured: new Date(),
      lashers_onboard: new Date(),
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      v1: false,
      v2: false,
      v3: false,
    };
  },
  methods: {
    ...mapActions([
      "saveOrUpdateVoyageAction",
      "damageContainerSetterAction",
      "vesselArrivedWithSetterAction",
      "hatchCoversGearBoxesSetterAction",
      "firstLineVesselAllFastSetterAction",
      "setSnackBarTosSuccess",
      "setSnackBarTosFailed",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
      "teleSetterAction",
    ]),
    vessel1Click() {
      this.firstFormData.tele = this.v1 ? "v1" : null;
      this.v2 = false;
      this.v3 = false;
    },
    vessel2Click() {
      this.firstFormData.tele = this.v2 ? "v2" : null;
      this.v3 = false;
      this.v1 = false;
    },
    vessel3Click() {
      this.firstFormData.tele = this.v3 ? "v3" : null;
      this.v1 = false;
      this.v2 = false;
    },
    dateChange(input) {
      this.firstFormData[input] = formatToSimpleFormatDD_MM_YYYY_H_M_S(
        this[input]
      );
    },
    damageContainerSave() {
      this.damageContainerSetterAction({
        dm_y: this.firstFormData.dm_y,
        dm_g: this.firstFormData.dm_g,
        imo_class: this.firstFormData.imo_class,
        imo_class_ps_onb: this.firstFormData.imo_class_ps_onb,
      });
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction().then((response) => {
        if (response.status == "200") {
          this.setSnackBarTosSuccess();
          this.setModuleShowToFalseAction();
          this.dialog2 = false;
        } else if (response.status == "406_2") {
          this.setSnackBarTosFailed("Please chose the voyage first !");
          this.setModuleShowToFalseAction();
          this.dialog2 = false;
        }
      });
    },
    vesselArrivedWithSave() {
      this.setModuleShowToTrueAction();
      this.vesselArrivedWithSetterAction({
        vawgd: this.firstFormData.vawgd,
        vawsnrog: this.firstFormData.vawsnrog,
      });
      this.saveOrUpdateVoyageAction().then((response) => {
        if (response.status == "200") {
          this.setSnackBarTosSuccess();
          this.setModuleShowToFalseAction();

          this.dialog1 = false;
        } else if (response.status == "406_2") {
          this.setSnackBarTosFailed("Please chose the voyage first !");
          this.setModuleShowToFalseAction();

          this.dialog1 = false;
        }
      });
    },
    hatchCoversGearBoxesSave() {
      this.hatchCoversGearBoxesSetterAction({
        hatch_covers_num: this.firstFormData.hatch_covers_num,
        hatch_covers_num_40: this.firstFormData.hatch_covers_num_40,
        hatch_covers_moves: this.firstFormData.hatch_covers_moves,
        gear_boxes_num: this.firstFormData.gear_boxes_num,
        gear_boxes_num_40: this.firstFormData.gear_boxes_num_40,
        gear_boxes_moves: this.firstFormData.gear_boxes_moves,
        any_hydraulic_couvers: this.firstFormData.any_hydraulic_couvers,
      });
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction().then((response) => {
        if (response.status == "200") {
          this.setSnackBarTosSuccess();
          this.setModuleShowToFalseAction();

          this.dialog3 = false;
        } else if (response.status == "406_2") {
          this.setSnackBarTosFailed("Please chose the voyage first !");
          this.setModuleShowToFalseAction();

          this.dialog3 = false;
        }
      });
    },
    firstLineVesselAllFastSave() {
      this.firstLineVesselAllFastSetterAction({
        first_line_datetime: this.firstFormData.first_line_datetime,
        num_mooring_r_fore: this.firstFormData.num_mooring_r_fore,
        vessel_all_fast: this.firstFormData.vessel_all_fast,
        num_mooring_r_aft: this.firstFormData.num_mooring_r_aft,
        gangway_secured: this.firstFormData.gangway_secured,
        lashers_onboard: this.firstFormData.lashers_onboard,
        dwuscfb: this.firstFormData.dwuscfb,
      });
      this.setModuleShowToTrueAction();
      this.saveOrUpdateVoyageAction().then((response) => {
        if (response.status == "200") {
          this.setSnackBarTosSuccess();
          this.setModuleShowToFalseAction();
          this.dialog4 = false;
        } else if (response.status == "406_2") {
          this.setSnackBarTosFailed("Please chose the voyage first !");
          this.setModuleShowToFalseAction();
          this.dialog4 = false;
        }
      });
    },
    OpenPositionDialog() {
      if (this.firstFormData.imo_class) this.dialog5 = true;
    },
    closePositionDialog() {
      if (!this.firstFormData.imo_class_ps_onb)
        this.firstFormData.imo_class = false;
      this.dialog5 = false;
    },
    damagedContainerInYardClick() {
      if (this.firstFormData.dm_y && this.firstFormData.dm_g)
        this.firstFormData.dm_g = false;
    },
    damagedContainerInGangwayClick() {
      if (this.firstFormData.dm_g && this.firstFormData.dm_y)
        this.firstFormData.dm_y = false;
    },
    movesChange() {
      if (
        this.firstFormData.hatch_covers_moves != "" &&
        this.firstFormData.hatch_covers_moves != null
      )
        this.firstFormData.hatch_covers_moves = parseInt(
          this.firstFormData.hatch_covers_moves
        );
      if (
        this.firstFormData.gear_boxes_moves != "" &&
        this.firstFormData.gear_boxes_moves != null
      )
        this.firstFormData.gear_boxes_moves = parseInt(
          this.firstFormData.gear_boxes_moves
        );
    },
    saveAll() {
      this.setModuleShowToTrueAction();
      this.damageContainerSetterAction({
        dm_y: this.firstFormData.dm_y,
        dm_g: this.firstFormData.dm_g,
        imo_class: this.firstFormData.imo_class,
        imo_class_ps_onb: this.firstFormData.imo_class_ps_onb,
      });
      this.vesselArrivedWithSetterAction({
        vawgd: this.firstFormData.vawgd,
        vawsnrog: this.firstFormData.vawsnrog,
      });
      this.hatchCoversGearBoxesSetterAction({
        hatch_covers_num: this.firstFormData.hatch_covers_num,
        hatch_covers_num_40: this.firstFormData.hatch_covers_num_40,
        hatch_covers_moves: this.firstFormData.hatch_covers_moves,
        gear_boxes_num: this.firstFormData.gear_boxes_num,
        gear_boxes_num_40: this.firstFormData.gear_boxes_num_40,
        gear_boxes_moves: this.firstFormData.gear_boxes_moves,
        any_hydraulic_couvers: this.firstFormData.any_hydraulic_couvers,
      });
      this.firstLineVesselAllFastSetterAction({
        first_line_datetime: this.firstFormData.first_line_datetime,
        num_mooring_r_fore: this.firstFormData.num_mooring_r_fore,
        vessel_all_fast: this.firstFormData.vessel_all_fast,
        num_mooring_r_aft: this.firstFormData.num_mooring_r_aft,
        gangway_secured: this.firstFormData.gangway_secured,
        lashers_onboard: this.firstFormData.lashers_onboard,
        dwuscfb: this.firstFormData.dwuscfb,
      });
      this.teleSetterAction({
        tele: this.firstFormData.tele,
      });

      this.saveOrUpdateVoyageAction().then((response) => {
        if (response.status == "200") {
          this.setSnackBarTosSuccess();
          this.setModuleShowToFalseAction();
          this.dialog3 = false;
        } else if (response.status == "406_2") {
          this.setSnackBarTosFailed("Please chose the voyage first !");
          this.setModuleShowToFalseAction();
          this.dialog3 = false;
        }
      });
    },
  },
  mounted() {
    if (this.getVoyageToEditOrSave.id != "") {
      this.firstFormData.id = this.getVoyageToEditOrSave.id;
      this.firstFormData.vawgd = this.getVoyageToEditOrSave.vawgd;
      this.firstFormData.vawsnrog = this.getVoyageToEditOrSave.vawsnrog;
      this.firstFormData.dm_y = this.getVoyageToEditOrSave.dm_y;
      this.firstFormData.dm_g = this.getVoyageToEditOrSave.dm_g;
      this.firstFormData.imo_class = this.getVoyageToEditOrSave.imo_class;
      this.firstFormData.imo_class_ps_onb =
        this.getVoyageToEditOrSave.imo_class_ps_onb;
      this.firstFormData.hatch_covers_num =
        this.getVoyageToEditOrSave.hatch_covers_num;
      this.firstFormData.hatch_covers_num_40 =
        this.getVoyageToEditOrSave.hatch_covers_num_40;
      this.firstFormData.hatch_covers_moves =
        this.getVoyageToEditOrSave.hatch_covers_moves;
      this.firstFormData.gear_boxes_num =
        this.getVoyageToEditOrSave.gear_boxes_num;
      this.firstFormData.gear_boxes_num_40 =
        this.getVoyageToEditOrSave.gear_boxes_num_40;
      this.firstFormData.any_hydraulic_couvers =
        this.getVoyageToEditOrSave.any_hydraulic_couvers;
      this.firstFormData.gear_boxes_moves =
        this.getVoyageToEditOrSave.gear_boxes_moves;
      this.firstFormData.first_line_datetime =
        this.getVoyageToEditOrSave.first_line_datetime;
      this.firstFormData.vessel_all_fast =
        this.getVoyageToEditOrSave.vessel_all_fast;
      this.firstFormData.num_mooring_r_fore =
        this.getVoyageToEditOrSave.num_mooring_r_fore;
      this.firstFormData.num_mooring_r_aft =
        this.getVoyageToEditOrSave.num_mooring_r_aft;
      this.firstFormData.gangway_secured =
        this.getVoyageToEditOrSave.gangway_secured;
      this.firstFormData.lashers_onboard =
        this.getVoyageToEditOrSave.lashers_onboard;
      this.firstFormData.dwuscfb = this.getVoyageToEditOrSave.dwuscfb;
      this.firstFormData.tele = this.getVoyageToEditOrSave.tele;
      if (this.firstFormData.tele == "v1") this.v1 = true;
      else if (this.firstFormData.tele == "v2") this.v2 = true;
      else if (this.firstFormData.tele == "v3") this.v3 = true;
      this.first_line_datetime = new Date(
        FormatDateStringToISO(
          this.firstFormData.first_line_datetime
            ? this.firstFormData.first_line_datetime
            : ""
        )
      );

      this.vessel_all_fast = new Date(
        FormatDateStringToISO(
          this.firstFormData.vessel_all_fast
            ? this.firstFormData.vessel_all_fast
            : ""
        )
      );
      this.gangway_secured = new Date(
        FormatDateStringToISO(
          this.firstFormData.gangway_secured
            ? this.firstFormData.gangway_secured
            : ""
        )
      );
      this.lashers_onboard = new Date(
        FormatDateStringToISO(
          this.firstFormData.lashers_onboard
            ? this.firstFormData.lashers_onboard
            : ""
        )
      );
    }
  },
  computed: {
    ...mapGetters(["getVoyageToEditOrSave"]),
    verifyMoves() {
      if (
        this.firstFormData.hatch_covers_moves != "" &&
        this.firstFormData.hatch_covers_moves != ""
      ) {
        return this.firstFormData.hatch_covers_moves % 2 == 0;
      } else return true;
    },
    verifyMoves2() {
      if (
        this.firstFormData.gear_boxes_moves != "" &&
        this.firstFormData.gear_boxes_moves != ""
      ) {
        return this.firstFormData.gear_boxes_moves % 2 == 0;
      } else return true;
    },
    allFastNotSupFirstLine() {
      if (
        this.firstFormData.vessel_all_fast != "" &&
        this.firstFormData.vessel_all_fast != null &&
        this.firstFormData.first_line_datetime != "" &&
        this.firstFormData.first_line_datetime
      ) {
        let d1 = new Date(
          FormatDateStringToISO(this.firstFormData.vessel_all_fast)
        );
        let d2 = new Date(
          FormatDateStringToISO(this.firstFormData.first_line_datetime)
        );
        return compareTwoDate(d1, d2) != 1;
      } else return false;
    },
    lashersOnBoardNotSupFirstLine() {
      if (
        this.firstFormData.lashers_onboard != "" &&
        this.firstFormData.lashers_onboard != null &&
        this.firstFormData.first_line_datetime != "" &&
        this.firstFormData.first_line_datetime
      ) {
        let d1 = new Date(
          FormatDateStringToISO(this.firstFormData.lashers_onboard)
        );
        let d2 = new Date(
          FormatDateStringToISO(this.firstFormData.first_line_datetime)
        );
        return compareTwoDate(d1, d2) != 1;
      } else return false;
    },
    gangwaySecuredNotSupFirstLine() {
      if (
        this.firstFormData.gangway_secured != "" &&
        this.firstFormData.gangway_secured != null &&
        this.firstFormData.first_line_datetime != "" &&
        this.firstFormData.first_line_datetime
      ) {
        let d1 = new Date(
          FormatDateStringToISO(this.firstFormData.gangway_secured)
        );
        let d2 = new Date(
          FormatDateStringToISO(this.firstFormData.first_line_datetime)
        );
        return compareTwoDate(d1, d2) != 1;
      } else return false;
    },
    totalHacthCovers() {
      let ft20 = 0;
      let ft40 = 0;
      if (
        this.firstFormData.hatch_covers_num != "" &&
        this.firstFormData.hatch_covers_num != null
      )
        ft20 = parseInt(this.firstFormData.hatch_covers_num + "");
      if (
        this.firstFormData.hatch_covers_num_40 != "" &&
        this.firstFormData.hatch_covers_num_40 != null
      )
        ft40 = parseInt(this.firstFormData.hatch_covers_num_40 + "");
      return ft20 + ft40;
    },
    totalGearBoxes() {
      let ft20 = 0;
      let ft40 = 0;
      if (
        this.firstFormData.gear_boxes_num != "" &&
        this.firstFormData.gear_boxes_num != null
      )
        ft20 = parseInt(this.firstFormData.gear_boxes_num + "");
      if (
        this.firstFormData.gear_boxes_num_40 != "" &&
        this.firstFormData.gear_boxes_num_40 != null
      )
        ft40 = parseInt(this.firstFormData.gear_boxes_num_40 + "");
      return ft20 + ft40;
    },
    gearboxesChangeMovesValue() {
      let ft20 = 0;
      let ft40 = 0;
      if (
        this.firstFormData.gear_boxes_num != "" &&
        this.firstFormData.gear_boxes_num != null
      )
        ft20 = parseInt(this.firstFormData.gear_boxes_num + "");
      if (
        this.firstFormData.gear_boxes_num_40 != "" &&
        this.firstFormData.gear_boxes_num_40 != null
      )
        ft40 = parseInt(this.firstFormData.gear_boxes_num_40 + "");
      this.firstFormData.gear_boxes_moves = ft20 * 2 + ft40 * 2;
      return this.firstFormData.gear_boxes_moves;
    },
    HatchCoversChangeMovesValue() {
      let ft20 = 0;
      let ft40 = 0;
      if (
        this.firstFormData.hatch_covers_num != "" &&
        this.firstFormData.hatch_covers_num != null
      )
        ft20 = parseInt(this.firstFormData.hatch_covers_num + "");
      if (
        this.firstFormData.hatch_covers_num_40 != "" &&
        this.firstFormData.hatch_covers_num_40 != null
      )
        ft40 = parseInt(this.firstFormData.hatch_covers_num_40 + "");
      this.firstFormData.hatch_covers_moves = ft20 * 2 + ft40 * 2;
      return this.firstFormData.hatch_covers_moves;
    },
    checkImoClassPos() {
      if (this.firstFormData.imo_class) {
        return (
          this.firstFormData.imo_class_ps_onb == "" ||
          this.firstFormData.imo_class_ps_onb == null
        );
      } else {
        return false;
      }
    },
  },
  watch: {
    dialog5(newValue, old) {
      if (!newValue) this.closePositionDialog();
    },
  },
};
</script>
