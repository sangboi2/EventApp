<template>
  <v-container fluid>
    <v-layout>
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
    <!--Before dynamic menu is created-->
    <v-layout row wrap>
      <!--  <v-flex left xs12 sm6 class="text-xs-center text-sm-right">
        <div>
          <v-btn class="ma-2" rounded color="error" to="/meetups" dark>
            Explore news
            <v-icon right>mdi-chevron-double-right</v-icon>
          </v-btn>
        </div>
      </v-flex> -->
    </v-layout>

    <v-layout row wrap m-0 xs12 sm6 lg12 v-if="!loading">
      <v-flex class="text-center">
        <v-carousel
          cycle
          show-arrows-on-hover
          hide-delimiter-background
          delimiter-icon="mdi-circle-outline"
        >
          <v-carousel-item
            v-for="item in items"
            :key="item.id"
            :src="item.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
            style="cursor: pointer"
            @click="onLoadMeetup(item.id)"
          >
            <v-container
              fill-height
              fluid
              pl-8
              ma-0
              pb-12
              pt-4
              class="text-left"
            >
              <v-layout fill-height align-end pb-0 mb-0>
                <v-flex xs12>
                  <h1>
                    <span
                      class="headline white--text font-weight-bold"
                      v-text="item.title"
                    ></span>
                  </h1>
                </v-flex>
              </v-layout>
            </v-container>
            <!--<div class="carousel-title">
              <h1>
                <span>{{item.title}}</span>
              </h1>
            </div>-->
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap mt-2>
      <v-flex left xs12 sm6 md6 lg12 class="text-xs-center text-center">
        <h1 class="dark--text font-weight-black">
          Be the first to see and know!
        </h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg12 class="text-xs-center text-center">
        <div>
          <v-btn
            depressed
            class="ma-2"
            color="primary  text-capitalize"
            v-for="menu in menus"
            :key="menu.title"
            :to="menu.link"
          >
            {{ menu.title }}
            <v-icon right color="black">{{ menu.icon }}</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  // It's been moved to store to make dynamically vuex!
  /*  data() {
    return {
      meetups: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
          id: "fsfsfsdf",
          title: "Meetup in New York"
        }
      ]
    };
  }, */
  data: () => ({
    //justify: ["center"],
  }),
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetups/" + id);
    },
  },
  computed: {
    items() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
    menus() {
      let menus = [
        {
          icon: "mdi-eye-outline",
          title: "View Events",
          link: "/meetups",
        },
        //{ icon: "mdi-plus", title: "Create Event", link: "/meetup/new" },
      ];
      if (this.userIsAuthenticated) {
        menus = [];
      }
      return menus;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
};
</script>
<style scoped>
/* .carousel-title {
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
  bottom: 50px;
  background-color: inherit;
  color: wheat;
  padding: 20px;
} */
.headline {
  text-transform: uppercase;
  font-size: 50px !important;
  color: wheat !important;
}
</style>
