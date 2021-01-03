<template>
  <v-dialog v-model="deleteDialog" persistent max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" class="text-capitalize">
        Delete
        <v-icon right color="error">mdi-trash-can-outline</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline error text-capitalize white--text"
        >Delete Item</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <div>
          <h3 class="pt-4 primary--text">
            Are you sure that you want to delete this?
          </h3>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text small class="primary--text" @click="deleteDialog = false"
          >Cancel</v-btn
        >
        <v-btn depressed small class="error" @click="onDelete()">
          <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      deleteDialog: false,
    };
  },
  methods: {
    onDelete() {
      this.editDialog = false;
      this.$store.dispatch("deleteDataItem");
    },
  },
};
</script>

<style lang="scss" scoped>
/* .v-btn::before {
  background-color: transparent;
} */
</style> 
