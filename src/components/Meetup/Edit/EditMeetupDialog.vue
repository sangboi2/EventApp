<template>
  <v-dialog v-model="editDialog" persistent width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab text small v-bind="attrs" v-on="on" class="text-capitalize">
        <v-icon color="black">mdi-pencil-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline blue white--text">Edit Date</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-date-picker
          v-model="editableDate"
          style="width: 100%"
          actions
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
        </v-date-picker>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template>
          <div scope="{ save, close}">
            <v-btn
              depressed
              small
              class="mr-2"
              @click.native="editDialog = false"
              >Close</v-btn
            >
            <v-btn
              depressed
              small
              class="primary"
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
      editableDate: null,
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.item.date);
      const newDay = new Date(this.editableDate).getUTCDate();
      const newMonth = new Date(this.editableDate).getUTCMonth();
      const newYear = new Date(this.editableDate).getUTCFullYear();
      newDate.setUTCDate(newDay);
      newDate.setUTCMonth(newMonth);
      newDate.setUTCFullYear(newYear);
      this.$store.dispatch("updateMeetupData", {
        id: this.item.id,
        date: newDate,
      });
      this.editDialog = false;
    },
  },
  created() {
    this.editableDate = new Date(this.item.date).toISOString().substr(0, 10);
  },
};
</script>
<style lang="scss" scoped>
/* .v-btn::before {
  background-color: transparent;
}
.v-icon::before {
  background-color: transparent;
} */
</style>