<template>
  <div>
    <v-card>
      <v-tabs v-model="tab" background-color="normal">
        <v-tab> <v-icon>mdi-boom-gate-arrow-down-outline</v-icon> </v-tab>
        <v-tab> <v-icon>mdi-ferry</v-icon> </v-tab>
        <v-tab> <v-icon>mdi-timetable</v-icon></v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="item in items" :key="item.tab">
          <v-card
            :min-height="
              $vuetify.breakpoint.md
                ? '40rem'
                : $vuetify.breakpoint.lg
                ? '40rem'
                : $vuetify.breakpoint.xl
                ? '38rem'
                : ''
            "
            :height="$vuetify.breakpoint.xl ? '40rem' : ''"
            v-if="item.tab == 1"
            ><VoyageformDub
          /></v-card>
          <v-card min-height="32rem" max-height="40rem" v-if="item.tab == 2">
            <Departureform />
          </v-card>

          <v-card max-height="40rem" v-if="item.tab == 3">
            <DelayDeparture />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import Departureform from "./Departureform.vue";
import DelayDeparture from "./DelayDeparture.vue";
import VoyageformDub from "../../vessel arrival/add/Voyageform_dub.vue";
export default {
  name: "Vessel_departure",
  components: { Departureform, DelayDeparture, VoyageformDub },
  props: {
    //prop pour afficher les differents forms
    formtype: String,
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: "1" },
        { tab: "2" },
        { tab: "3" },
        { tab: "4" },
        { tab: "5" },
        { tab: "6" },
      ],
    };
  },
};
</script>
