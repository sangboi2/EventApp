<template>
  <v-container mt-2>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-linear
          absolute
          indeterminate
          color="blue"
          :width="7"
          :size="100"
          v-if="loading"
        ></v-progress-linear>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card outlined>
          <v-card-title>
            <h6 class="primary--text">{{ item.title }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog
                :item="item"
              ></app-edit-meetup-details-dialog>
              <!-- <app-delete-dialog :item="item.id"></app-delete-dialog> -->
            </template>
          </v-card-title>
          <v-card class="mx-auto">
            <v-img
              class="white--text align-end"
              height="400px"
              :src="item.imageUrl"
              style="cursor: pointer"
              @click="onItem()"
            ></v-img>
          </v-card>
          <v-card-text>
            <h2 class="info--text">
              {{ item.date | date }} - {{ item.location }}
              <span class="ml-3">
                <app-edit-date-dialog
                  :item="item"
                  v-if="userIsCreator"
                ></app-edit-date-dialog>
              </span>
              <span class="ml-3">
                <app-edit-time-dialog
                  :item="item"
                  v-if="userIsCreator"
                ></app-edit-time-dialog>
              </span>
              <div class="float-right">
                <v-space></v-space>
                <app-register-dialog
                  :itemId="item.id"
                  v-if="userIsAuthenticated && !userIsCreator"
                ></app-register-dialog>
              </div>
            </h2>
            <div>{{ item.subtitle }}</div>
          </v-card-text>

          <v-card-actions>
            <!--You can also register edit buttom here directly-->
            <!--<app-register-dialog
              :itemId="item.id"
              v-if="userIsAuthenticated && !userIsCreator"
            ></app-register-dialog>-->
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>{{ item.description }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      show: false,
      // deleteDialog: false
    };
  },
  methods: {
    onItem() {
      this.$router.push("/meetups/");
    },
    /*   onDelete() {
      this.editDialog = false;
      this.$store.dispatch("deleteData");
    } */
  },
  computed: {
    item() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id == this.item.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
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