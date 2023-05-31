<template>
  <div>
    <v-card class="vesselArrivalCard">
      <v-tabs v-model="tab">
        <v-tab> <v-icon>mdi-ferry</v-icon> </v-tab>
        <v-tab> <v-icon>mdi-boom-gate-arrow-up-outline</v-icon> </v-tab>
        <v-tab> <v-icon>mdi-pier-crane</v-icon> </v-tab>
        <v-tab> <v-icon>mdi-timetable</v-icon> </v-tab>
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
                ? '40rem'
                : '75rem'
            "
            v-if="item.tab == 1"
            ><Voyageform2
          /></v-card>
          <v-card
            :min-height="
              $vuetify.breakpoint.md
                ? '40rem'
                : $vuetify.breakpoint.lg
                ? '40rem'
                : $vuetify.breakpoint.xl
                ? '40rem'
                : '65rem'
            "
            v-if="item.tab == 2"
            ><Voyageform
          /></v-card>

          <v-card min-height="27rem" v-if="item.tab == 3">
            <AddLift />
          </v-card>
          <v-card v-if="item.tab == 4">
            <DelayTable notearrival="false"
          /></v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<style scoped>
.v-tab-item {
  margin: 0;
  padding: 0;
}
.v-card {
  margin: 0;
  padding: 0;
}
</style>
<script>
import Voyageform from "./Voyageform.vue";
import Voyageform2 from "./Voyageform2.vue";

import AddLift from "./AddLift.vue";
import DelayTable from "./DelayTable";
export default {
  name: "Vessel_arrival",
  components: { Voyageform, AddLift, Voyageform2, DelayTable },
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
