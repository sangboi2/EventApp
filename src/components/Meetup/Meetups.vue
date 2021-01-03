<template>
  <v-main>
    <v-container fluid>
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
      <v-layout
        row
        wrap
        v-for="item in items"
        :key="item.id"
        class="mt-0 mb-2"
        v-else
      >
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card :color="item.color" outlined>
            <!-- v-for="item in items" :key="item.id" can also loop inside card class-->
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-card class="mx-auto" max-width="400">
                    <v-img
                      class="img align-end"
                      height="200px"
                      :src="item.imageUrl"
                      @click="onLoadMeetup(item.id)"
                    ></v-img>
                  </v-card>
                </v-flex>
                <v-flex xs6 sm8 md9>
                  <v-btn color="black" icon class="float-right mr-1">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                  <v-card-title class="headline primary--text">
                    <div>
                      <h3 v-text="item.title">{{ item.title }}</h3>

                      <div class="text--disabled" style="font-size: 12px">
                        {{ item.date | date }}
                      </div>
                      <div>
                        <p style="font-size: 16px; color: #000">
                          {{ item.subtitle }}
                        </p>
                      </div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-list-item-avatar class="ml-2" color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        alt=""
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Evan You</v-list-item-title>
                    </v-list-item-content>

                    <v-icon class="ml-2"> mdi-heart </v-icon>
                    <span class="subheading">256</span>
                    <span class="ml-2">·</span>
                    <v-icon class="ml-2">mdi-bookmark</v-icon>
                    <span class="ml-2">·</span>
                    <v-icon class="ml-2"> mdi-share-variant </v-icon>
                    <span class="subheading mr-4">45</span>

                    <v-btn
                      depressed
                      small
                      color="primary"
                      v-on="on"
                      :to="'/meetups/' + item.id"
                      class="mr-2 text-capitalize"
                    >
                      See more
                      <!-- <v-icon right color="black">mdi-chevron-right</v-icon> -->
                    </v-btn>
                    <!-- <v-btn
                    outlined
                    rounded
                    class="ma-2 text-capitalize"
                    color="error"
                    :to="'/meetups/' + item.id"
                    v-on="on"
                  >
                    View more
                    <span class="text-lowercase">more</span>
                    <v-icon left>mdi-chevron-right</v-icon>
                    </v-btn>-->
                  </v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>
<script>
export default {
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    },
  },
  computed: {
    items() {
      return this.$store.getters.loadedMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>

<style>
.img {
  cursor: pointer;
}

/* it affects delimitter indicator*/

/* .v-btn::before {
  background-color: wheat;
} */
/* .v-btn::after {
  background-color: transparent;
} */
/* .v-icon::before {
  background-color: transparent;
} */
</style>