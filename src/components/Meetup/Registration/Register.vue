<template>
  <v-dialog v-model="registerDialog" persistent width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        small
        color="primary"
        v-bind="attrs"
        v-on="on"
        class="text-capitalize"
      >
        {{ userIsRegistered ? "Unregister" : "Register" }}
        <!-- <v-icon right>mdi-pencil-outline</v-icon> -->
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline blue white--text" v-if="userIsRegistered"
        >Unregistered from Event?</v-card-title
      >
      <v-card-title class="headline blue white--text" v-else
        >Register for Event?</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text class="mt-4 font-weight-bold black--text"
        >You can always change your decision late on.</v-card-text
      >
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          small
          class="text-capitalize"
          @click="registerDialog = false"
          >Cancel</v-btn
        >
        <v-btn
          small
          depressed
          color="primary"
          class="text-capitalize"
          @click="onAgree()"
        >
          <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["itemId"],
  data() {
    return {
      registerDialog: false,
    };
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch("unregisterUserFromEvent", this.itemId);
      } else {
        this.$store.dispatch("registerUserForEvent", this.itemId);
      }
    },
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex((itemId) => {
          return itemId === this.itemId;
        }) >= 0
      );
    },
  },
};
</script>
