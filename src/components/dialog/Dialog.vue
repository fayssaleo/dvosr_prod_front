<template>
 <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="light-blue accent-3"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Save
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Confirm action 
        </v-card-title>

        <v-card-text>
          Are you sure you want to proceed?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped></style>
<script>
export default {
  name: "Dialog",
  components: {},
   data () {
      return {
        dialog: false,
      }
    },
};
</script>
