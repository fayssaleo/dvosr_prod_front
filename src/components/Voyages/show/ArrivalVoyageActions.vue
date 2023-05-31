<template>
  <v-container class="form2" fluid>
    <v-row>
      <div class="theWall"></div>
      <v-col cols="6" md="6" sm="12">
        <v-row>
          <v-col cols="12">
            <v-card elevation="2">
              <v-row>
                <v-col cols="11" class="py-0 my-0 ml-4 pt-4">
                  <v-text-field
                    outlined
                    label="Vessel Phone"
                    filled
                    prepend-inner-icon="mdi-cellphone-basic"
                    v-model="firstFormData.tele"
                    class="voyagevessel"
                    :class="
                      ShowNewVoyage.tele != ShowOldVoyage.tele
                        ? showAfter
                          ? 'afterText'
                          : 'beforeText'
                        : ''
                    "
                  ></v-text-field>
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
                      :class="
                        ShowNewVoyage.dm_y != ShowOldVoyage.dm_y
                          ? showAfter
                            ? 'afterSwitch'
                            : 'beforeSwitch'
                          : ''
                      "
                    ></v-switch
                  ></v-col>
                  <v-col cols="12" class="py-0 my-0"
                    ><v-switch
                      v-model="firstFormData.dm_g"
                      label="In Gangway"
                      :class="
                        ShowNewVoyage.dm_g != ShowOldVoyage.dm_g
                          ? showAfter
                            ? 'afterSwitch'
                            : 'beforeSwitch'
                          : ''
                      "
                    ></v-switch
                  ></v-col>
                  <v-col cols="12" class="py-0 my-0"
                    ><v-switch
                      v-model="firstFormData.imo_class"
                      label="IMO Class 1.4 - 6,2 - 7 Container onboard ?"
                      :class="
                        ShowNewVoyage.imo_class != ShowOldVoyage.imo_class
                          ? showAfter
                            ? 'afterSwitch'
                            : 'beforeSwitch'
                          : ''
                      "
                    ></v-switch
                  ></v-col>
                  <v-col cols="12" v-if="firstFormData.imo_class">
                    <v-text-field
                      v-model="firstFormData.imo_class_ps_onb"
                      label="Position :"
                      class="mb-0 pb-0 pr-4 mt-4"
                      outlined
                      :mask="['##-##-##']"
                      :class="
                        ShowNewVoyage.imo_class_ps_onb !=
                        ShowOldVoyage.imo_class_ps_onb
                          ? showAfter
                            ? 'afterText'
                            : 'beforeText'
                          : ''
                      "
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
                  <h3 class="pb-2 mb-2">
                    Hatch covers (Total : {{ totalHacthCovers }})
                  </h3>
                  <v-row class="pa-0 ma-0">
                    <v-col cols="12" class="">
                      <v-text-field
                        label="Number (20ft):"
                        v-model="firstFormData.hatch_covers_num"
                        class="ma-0 pa-0 text-justify"
                        type="number"
                        min="0"
                        :class="
                          ShowNewVoyage.hatch_covers_num !=
                          ShowOldVoyage.hatch_covers_num
                            ? showAfter
                              ? 'afterText'
                              : 'beforeText'
                            : ''
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="">
                      <v-text-field
                        label="Number (40ft):"
                        v-model="firstFormData.hatch_covers_num_40"
                        class="ma-0 pa-0 text-justify"
                        type="number"
                        min="0"
                        :class="
                          ShowNewVoyage.hatch_covers_num_40 !=
                          ShowOldVoyage.hatch_covers_num_40
                            ? showAfter
                              ? 'afterText'
                              : 'beforeText'
                            : ''
                        "
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="">
                      <h3 class="pb-2 mb-2 pl-2">
                        Moves : {{ HatchCoversChangeMovesValue }}
                      </h3>
                    </v-col>
                    <v-switch
                      class="pa-0 ma-0 mb-5 mt-2"
                      v-model="firstFormData.any_hydraulic_couvers"
                      label="Any hydraulic hatch covers ?"
                      :class="
                        ShowNewVoyage.any_hydraulic_couvers !=
                        ShowOldVoyage.any_hydraulic_couvers
                          ? showAfter
                            ? 'afterSwitch'
                            : 'beforeSwitch'
                          : ''
                      "
                    ></v-switch>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <h3 class="pb-2 mb-2">
                    Gear boxes (Total : {{ totalGearBoxes }})
                  </h3>
                  <v-row class="pa-0 ma-0">
                    <v-col cols="12" class=""
                      ><!--v-text-field
                        v-model="firstFormData.gear_boxes_num"
                        
                        type="number"
                        class="pr-4"
                        outlined
                        
                        :min="0"
                      ></v-text-field-->

                      <v-text-field
                        label="Number (20ft):"
                        v-model="firstFormData.gear_boxes_num"
                        class="ma-0 pa-0 text-justify"
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="">
                      <!--v-text-field
                        v-model="firstFormData.gear_boxes_num"
                        
                        type="number"
                        class="pr-4"
                        outlined
                        
                        :min="0"
                      ></v-text-field-->

                      <v-text-field
                        label="Number (40ft):"
                        v-model="firstFormData.gear_boxes_num_40"
                        class="ma-0 pa-0 text-justify"
                        type="number"
                        min="0"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" class="">
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

                    <v-text-field
                      label="Date"
                      outlined
                      v-model="firstFormData.first_line_datetime"
                      class="mb-0 pb-0 pr-4"
                      v-mask="'##/##/#### ##:##'"
                      placeholder="DD/MM/YYYY HH:mm"
                      prepend-inner-icon="mdi-calendar-clock"
                      :class="
                        ShowNewVoyage.first_line_datetime !=
                        ShowOldVoyage.first_line_datetime
                          ? showAfter
                            ? 'afterText'
                            : 'beforeText'
                          : ''
                      "
                    >
                    </v-text-field>

                    <div class="pb-2">Number of Moorning Ropes</div>

                    <v-text-field
                      label="After :"
                      v-model="firstFormData.num_mooring_r_fore"
                      class="ma-0 pa-0 text-justify"
                      :class="
                        ShowNewVoyage.num_mooring_r_fore !=
                        ShowOldVoyage.num_mooring_r_fore
                          ? showAfter
                            ? 'afterText'
                            : 'beforeText'
                          : ''
                      "
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="6">
                  <div class="pb-2">Vessel All Fast</div>

                  <v-text-field
                    label="Date"
                    outlined
                    v-model="firstFormData.vessel_all_fast"
                    class="mb-0 pb-0 pr-4"
                    v-mask="'##/##/#### ##:##'"
                    placeholder="DD/MM/YYYY HH:mm"
                    prepend-inner-icon="mdi-calendar-clock"
                    :class="
                      ShowNewVoyage.vessel_all_fast !=
                      ShowOldVoyage.vessel_all_fast
                        ? showAfter
                          ? 'afterText'
                          : 'beforeText'
                        : ''
                    "
                  >
                  </v-text-field>

                  <div class="pb-2">Number of Moorning Ropes</div>

                  <v-text-field
                    label="Forward :"
                    v-model="firstFormData.num_mooring_r_aft"
                    class="mb-0 pb-0 pr-4"
                    :class="
                      ShowNewVoyage.num_mooring_r_aft !=
                      ShowOldVoyage.num_mooring_r_aft
                        ? showAfter
                          ? 'afterText'
                          : 'beforeText'
                        : ''
                    "
                  ></v-text-field>
                </v-col>
              </v-row>
              <div class="pb-0 mb-0">
                <v-row>
                  <v-col cols="6" class="pl-7">
                    <v-text-field
                      label="Gangway Secured"
                      outlined
                      v-model="firstFormData.gangway_secured"
                      class="mb-0 pb-0 pr-4"
                      v-mask="'##/##/#### ##:##'"
                      placeholder="DD/MM/YYYY HH:mm"
                      prepend-inner-icon="mdi-calendar-clock"
                      :class="
                        ShowNewVoyage.gangway_secured !=
                        ShowOldVoyage.gangway_secured
                          ? showAfter
                            ? 'afterText'
                            : 'beforeText'
                          : ''
                      "
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="Lashers onboard"
                      outlined
                      v-model="firstFormData.lashers_onboard"
                      class="mb-0 pb-0 pr-4"
                      v-mask="'##/##/#### ##:##'"
                      placeholder="DD/MM/YYYY HH:mm"
                      prepend-inner-icon="mdi-calendar-clock"
                      :class="
                        ShowNewVoyage.lashers_onboard !=
                        ShowOldVoyage.lashers_onboard
                          ? showAfter
                            ? 'afterText'
                            : 'beforeText'
                          : ''
                      "
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12"
                    ><v-switch
                      class="pl-7"
                      v-model="firstFormData.dwuscfb"
                      label="Did we Use Safety cage for Boarding?"
                      :class="
                        ShowNewVoyage.dwuscfb != ShowOldVoyage.dwuscfb
                          ? showAfter
                            ? 'afterSwitch'
                            : 'beforeSwitch'
                          : ''
                      "
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
                  :class="
                    ShowNewVoyage.vawgd != ShowOldVoyage.vawgd
                      ? showAfter
                        ? 'afterSwitch'
                        : 'beforeSwitch'
                      : ''
                  "
                ></v-switch>
                <v-switch
                  v-model="firstFormData.vawsnrog"
                  label="Vessel arrived with safety net ready on gangway?"
                  class="mb-0 pb-0 pt-0 mt-0"
                  :class="
                    ShowNewVoyage.vawsnrog != ShowOldVoyage.vawsnrog
                      ? showAfter
                        ? 'afterSwitch'
                        : 'beforeSwitch'
                      : ''
                  "
                ></v-switch>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" style="text-align: end">
            <div class="fontsize mt-4 pt-4"></div>
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
import {
  FormatDateStringToSimpleFrenchDateTime,
  FormatDateStringToISO,
} from "../../../helpers/helpers.js";

export default {
  name: "Voyageform2",
  props: ["ShowOldVoyage", "ShowNewVoyage", "showAfter"],
  data() {
    return {
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
      },
      selectedVoyageAction: {},
    };
  },
  methods: {
    setSelectedVoyage() {
      this.selectedVoyageAction = {};
      this.firstFormData = {
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
      };
      if (this.showAfter) this.selectedVoyageAction = { ...this.ShowNewVoyage };
      else this.selectedVoyageAction = { ...this.ShowOldVoyage };
      this.firstFormData.id = this.selectedVoyageAction.id;
      this.firstFormData.tele = this.selectedVoyageAction.tele;
      this.firstFormData.vawgd = this.selectedVoyageAction.vawgd;
      this.firstFormData.vawsnrog = this.selectedVoyageAction.vawsnrog;
      this.firstFormData.dm_y = this.selectedVoyageAction.dm_y;
      this.firstFormData.dm_g = this.selectedVoyageAction.dm_g;
      this.firstFormData.imo_class = this.selectedVoyageAction.imo_class;
      this.firstFormData.imo_class_ps_onb =
        this.selectedVoyageAction.imo_class_ps_onb;
      this.firstFormData.hatch_covers_num =
        this.selectedVoyageAction.hatch_covers_num;
      this.firstFormData.hatch_covers_num_40 =
        this.selectedVoyageAction.hatch_covers_num_40;
      this.firstFormData.hatch_covers_moves =
        this.selectedVoyageAction.hatch_covers_moves;
      this.firstFormData.gear_boxes_num =
        this.selectedVoyageAction.gear_boxes_num;
      this.firstFormData.gear_boxes_num_40 =
        this.selectedVoyageAction.gear_boxes_num_40;
      this.firstFormData.any_hydraulic_couvers =
        this.selectedVoyageAction.any_hydraulic_couvers;
      this.firstFormData.gear_boxes_moves =
        this.selectedVoyageAction.gear_boxes_moves;
      this.firstFormData.first_line_datetime =
        FormatDateStringToSimpleFrenchDateTime(
          this.selectedVoyageAction.first_line_datetime
        );
      this.firstFormData.vessel_all_fast =
        FormatDateStringToSimpleFrenchDateTime(
          this.selectedVoyageAction.vessel_all_fast
        );
      this.firstFormData.num_mooring_r_fore =
        this.selectedVoyageAction.num_mooring_r_fore;
      this.firstFormData.num_mooring_r_aft =
        this.selectedVoyageAction.num_mooring_r_aft;
      this.firstFormData.gangway_secured =
        FormatDateStringToSimpleFrenchDateTime(
          this.selectedVoyageAction.gangway_secured
        );
      this.firstFormData.lashers_onboard =
        FormatDateStringToSimpleFrenchDateTime(
          this.selectedVoyageAction.lashers_onboard
        );

      this.firstFormData.dwuscfb = this.selectedVoyageAction.dwuscfb;
    },
  },
  mounted() {
    this.setSelectedVoyage();
  },
  computed: {
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
    showAfter(newValue, old) {
      this.setSelectedVoyage();
    },
  },
};
</script>
