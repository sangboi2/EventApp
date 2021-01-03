<template>
  <v-dialog v-model="editDialog" persistent width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn small fab text v-bind="attrs" v-on="on" class="text-capitalize">
        <v-icon color="black">mdi-pencil-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline blue white--text">Edit Time</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-time-picker
          v-model="editableTime"
          full-width
          actions
          format="24hr"
          class="mt-2"
        >
          <!-- <template>
            <v-spacer></v-spacer>
            <div scope="{ save, close}">
              <v-btn text class="blue--text darken-1" @click.native="editDialog = false">Close</v-btn>
              <v-btn text class="blue--text darken-1" @click.native="onSaveChanges()">
                <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Save Changes
              </v-btn>
            </div>
          </template>-->
        </v-time-picker>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template>
          <v-spacer></v-spacer>
          <div scope="{ save, close}">
            <v-btn
              depressed
              class="mr-2"
              small
              @click.native="editDialog = false"
              >Close</v-btn
            >
            <v-btn
              depressed
              small
              color="primary"
              @click.native="onSaveChanges()"
            >
              <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Save
              Changes
            </v-btn>
          </div>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      editDialog: false,
      editableTime: null,
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.item.date);
      const hours = this.editableTime.match(/^(\d+)/[1]);
      const minutes = this.editableTime.match(/:(\d+)/)[1];
      newDate.setHours(hours);
      newDate.setMinutes(minutes);
      this.$store.dispatch("updateMeetupData", {
        id: this.item.id,
        date: newDate,
      });
      this.editDialog = false;
    },
  },
  created() {
    let date = new Date(this.item.date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    this.editableTime = hours + ":" + minutes;
    this.editableDate = new Date(this.item.date).toTimeString().substr(0, 10);
  },
};
</script>
<style lang="scss" scoped>
/* .v-btn::before {
  background-color: transparent;
}
.v-btn::after {
  background-color: transparent;
}
.v-icon::before {
  background-color: transparent;
} */
</style>