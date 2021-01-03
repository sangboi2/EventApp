<template>
  <v-dialog v-model="editDialog" persistent max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab text small v-bind="attrs" v-on="on" class="text-capitalize">
        <v-icon color="black">mdi-pencil-outline</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline blue text-capitalize white--text"
        >Edit item</v-card-title
      >
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          v-model="editedTitle"
          name="title"
          label="Title"
          id="Title"
          prepend-icon="mdi-format-title"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="editedSubtitle"
          name="subtitle"
          label="Subtitle"
          id="subtitle"
          prepend-icon="mdi-subtitles-outline"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="editedDescription"
          rows="1"
          clearable
          name="description"
          label="Description"
          id="description"
          multi-line
          prepend-icon="mdi-file-edit-outline"
          required
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed small @click="editDialog = false">Close</v-btn>
        <v-btn depressed color="primary" small @click="onSaveChanges">
          <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>Save changes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
      editedTitle: this.item.title,
      editedSubtitle: this.item.subtitle,
      editedDescription: this.item.description,
      // To close dialogbox
      editDialog: false,
    };
  },
  methods: {
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedSubtitle.trim() === "" ||
        this.editedDescription.trim() === ""
      ) {
        return;
      }
      this.editDialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.item.id,
        title: this.editedTitle,
        subtitle: this.editedSubtitle,
        description: this.editedDescription,
        //imagUrl: this.imagUrl
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/* .v-btn::before {
  background-color: transparent;
} */
</style> 
