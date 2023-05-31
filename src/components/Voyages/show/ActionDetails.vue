<template>
  <v-app>
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="#3949AB"
        centered
        dark
        icons-and-text
      >
        <v-switch
          v-model="showAfter"
          inset
          :label="showAfter ? 'AFTER' : 'BEFORE'"
          :class="showAfter ? 'afterButton' : 'beforeButton'"
          style="
            float: left;
            margin-left: 11px;
            margin-right: auto;
            min-width: 132px;
          "
        ></v-switch>
        <v-tabs-slider></v-tabs-slider>

        <v-tab
          href="#arrival"
          :class="
            ShowNewVoyage.sectionChanged == 'voyageArrivalSection' ||
            ShowNewVoyage.sectionChanged == 'craneArrivalSection' ||
            ShowNewVoyage.sectionChanged == 'liftArrivalSection' ||
            ShowNewVoyage.sectionChanged == 'DelayArr'
              ? showAfter
                ? 'afterText'
                : 'beforeText'
              : ''
          "
        >
          Arrival
          <v-icon>mdi-location-enter</v-icon>
        </v-tab>

        <v-tab
          href="#departure"
          :class="
            ShowNewVoyage.sectionChanged == 'voyageDepartureSection' ||
            ShowNewVoyage.sectionChanged == 'craneDepartuerSection' ||
            ShowNewVoyage.sectionChanged == 'DelayDep'
              ? showAfter
                ? 'afterText'
                : 'beforeText'
              : ''
          "
        >
          Departure
          <v-icon>mdi-location-exit</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item :key="'arrival'" :value="'arrival'">
          <v-card>
            <v-tabs
              v-model="tab2"
              background-color="#ECEFF1"
              centered
              dark
              icons-and-text
              class="arrivaleTabs arrivaleTabsChanged"
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab
                href="#voyage"
                class="black--text"
                :class="
                  ShowNewVoyage.sectionChanged == 'voyageArrivalSection'
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                Voyage infos
                <v-icon color="black">mdi-ferry</v-icon>
              </v-tab>

              <v-tab
                href="#crane"
                class="black--text"
                :class="
                  ShowNewVoyage.sectionChanged == 'craneArrivalSection'
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                Crane info
                <v-icon color="black">mdi-boom-gate-arrow-up-outline</v-icon>
              </v-tab>
              <v-tab
                href="#lift"
                class="black--text"
                :class="
                  ShowNewVoyage.sectionChanged == 'liftArrivalSection'
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                Lifts info
                <v-icon color="black">mdi-pier-crane</v-icon>
              </v-tab>
              <v-tab
                href="#delays"
                class="black--text"
                :class="
                  ShowNewVoyage.sectionChanged == 'DelayArr'
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                Delays info
                <v-icon color="black">mdi-timetable</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab2">
              <v-tab-item :key="'voyage1'" :value="'voyage'">
                <v-card flat>
                  <ArrivalVoyageActions
                    :ShowNewVoyage="ShowNewVoyage"
                    :ShowOldVoyage="ShowOldVoyage"
                    :showAfter="showAfter"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="'crane1'" :value="'crane'">
                <v-card flat>
                  <ArrivalCraneAction
                    :ShowNewVoyage="ShowNewVoyage"
                    :ShowOldVoyage="ShowOldVoyage"
                    :showAfter="showAfter"
                    :cranes="cranes"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="'lift1'" :value="'lift'">
                <v-card flat>
                  <LiftActions
                    :ShowNewVoyage="ShowNewVoyage"
                    :ShowOldVoyage="ShowOldVoyage"
                    :showAfter="showAfter"
                    :cranes="cranes"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="'delays1'" :value="'delays'">
                <v-card flat>
                  <DelayArrivalActions
                    :ShowNewVoyage="ShowNewVoyage"
                    :ShowOldVoyage="ShowOldVoyage"
                    :showAfter="showAfter"
                    :cranes="cranes"
                    :dep_arr="'arr'"
                  />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-tab-item>
        <v-tab-item :key="'departure'" :value="'departure'">
          <v-card>
            <v-tabs
              v-model="tab3"
              background-color="#546E7A"
              centered
              dark
              icons-and-text
              class="departureTabs arrivaleTabsChanged"
            >
              <v-tabs-slider></v-tabs-slider>

              <v-tab
                href="#crane"
                :class="
                  ShowNewVoyage.sectionChanged == 'craneDepartuerSection'
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                Crane info
                <v-icon>mdi-boom-gate-arrow-down-outline</v-icon>
              </v-tab>
              <v-tab
                href="#voyage"
                :class="
                  ShowNewVoyage.sectionChanged == 'voyageDepartureSection'
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                Voyage infos
                <v-icon>mdi-ferry</v-icon>
              </v-tab>
              <v-tab
                href="#delays"
                :class="
                  ShowNewVoyage.sectionChanged == 'DelayDep'
                    ? showAfter
                      ? 'afterText'
                      : 'beforeText'
                    : ''
                "
              >
                Delays info
                <v-icon>mdi-timetable</v-icon>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab3">
              <v-tab-item :key="'voyage2'" :value="'voyage'">
                <v-card flat>
                  <DepartureVoyageActions
                    :ShowNewVoyage="ShowNewVoyage"
                    :ShowOldVoyage="ShowOldVoyage"
                    :showAfter="showAfter"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="'crane2'" :value="'crane'">
                <v-card flat>
                  <DepartureCraneAction
                    :ShowNewVoyage="ShowNewVoyage"
                    :ShowOldVoyage="ShowOldVoyage"
                    :showAfter="showAfter"
                    :cranes="cranes"
                  />
                </v-card>
              </v-tab-item>
              <v-tab-item :key="'delays2'" :value="'delays'">
                <v-card flat>
                  <DelayArrivalActions
                    :ShowNewVoyage="ShowNewVoyage"
                    :ShowOldVoyage="ShowOldVoyage"
                    :showAfter="showAfter"
                    :cranes="cranes"
                    :dep_arr="'dep'"
                  />
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-app>
</template>

<script>
import ArrivalVoyageActions from "./ArrivalVoyageActions";
import ArrivalCraneAction from "./ArrivalCraneAction";
import DepartureCraneAction from "./DepartureCraneAction";
import DepartureVoyageActions from "./DepartureVoyageActions";
import LiftActions from "./LiftActions";
import DelayArrivalActions from "./DelayArrivalActions";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ArrivalVoyageActions,
    ArrivalCraneAction,
    LiftActions,
    DelayArrivalActions,
    DepartureCraneAction,
    DepartureVoyageActions,
  },
  props: ["ShowNewVoyage", "ShowOldVoyage"],
  data() {
    return {
      tab: null,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tab2: null,
      tab3: null,
      voyage: {},
      showAfter: true,
      cranes: [],
    };
  },
  methods: {
    ...mapActions([
      "setCranesAction",
      "setModuleShowToTrueAction",
      "setModuleShowToFalseAction",
    ]),
    initialize() {
      if (this.cranes.length == 0) {
        this.setModuleShowToTrueAction();
        this.setCranesAction()
          .then(() => {
            this.cranes = this.getCranes;

            this.setModuleShowToFalseAction();
          })
          .catch(() => {
            this.setModuleShowToFalseAction();
          });
      }
    },
  },
  computed: {
    ...mapGetters(["getCranes"]),
  },
  mounted() {
    this.initialize();
  },
};
</script>
