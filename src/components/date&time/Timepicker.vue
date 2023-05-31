<template>

<div>

 
  <vc-date-picker v-model="date" mode="dateTime" />
</div>


</template>
<style scoped></style>
<script>
export default {
  name: "Timepicker",
  components: {},
 data() {
    return {
      date: new Date(),
 
    };
  },
};
</script>
