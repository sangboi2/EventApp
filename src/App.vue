<template>
  <v-app id="app">
    <v-navigation-drawer
      temporary
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsAuthenticated" @click.prevent="onLogout()">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-capitalize"
              >Log out</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      flat
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="light"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer"
          class="text-uppercase font-weight-bold font-weight-black"
        >
          <span class="hidden-sm-and-down primary--text">
            Bawinu
            <sup style="color: #2a3b4d">m</sup>
          </span>
        </router-link>
      </v-toolbar-title>

      <v-text-field
        flat
        solo
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Seach into Bawinu..."
        class="hidden-sm-and-down"
        v-if="userIsAuthenticated"
      ></v-text-field>
      <v-spacer></v-spacer>
      <!--  <v-toolbar-items class="hidden-xs-only"> -->
      <v-btn
        text
        color="primary"
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link"
        class="text-capitalize hidden-xs-only font-weight-bold ml-2"
      >
        <v-icon color="black" left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <!-- <v-btn
        v-if="userIsAuthenticated"
        text
        @click.prevent="onLogout()"
        class="text-capitalize hidden-xs-only"
      >
        <v-icon left>mdi-logout</v-icon>Log out
      </v-btn>-->
      <!-- </v-toolbar-items> -->

      <div class="text-center" v-if="userIsAuthenticated">
        <v-menu offset-y hidden-xs-only>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              outlined
              color="primary"
              v-bind="attrs"
              v-on="on"
              icon
              class="ml-2"
            >
              <v-icon>mdi-account-outline</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-subheader>General</v-subheader>
            <v-list-item
              v-for="menu in profileMenus"
              :key="menu.title"
              :to="menu.link"
              color="blue"
            >
              <!--v-model="item"-->
              <!--@click="onProfile"-->
              <!-- <v-icon left>{{menu.icon}}</v-icon> -->
              <v-list-item-title>
                <v-icon left>{{ menu.icon }}</v-icon>
                {{ menu.title }}
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item
              v-if="userIsAuthenticated"
              @click.prevent="onLogout()"
              class="mt-2"
            >
              <v-list-item-title>
                <v-icon left>mdi-logout</v-icon>Log out
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main fluid>
      <!-- <v-container fluid> 
      </v-container> -->
      <router-view></router-view>
    </v-main>
    <v-footer absolute app color="white" class="black--text">
      <!-- <v-col class="text-center" cols="12">
        <strong>Bawinu</strong> &copy; {{ new Date().getFullYear() }}
      </v-col> -->
      <!--  <span class="pr-4">About</span>
      <span class="pr-4">Privacy</span>
      <span class="pr-4">Terms</span>
      <span>Cookie</span>
      <v-spacer></v-spacer>
      <span>Bawinu &copy; {{ new Date().getFullYear() }}</span> -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  /*  name: "App",
  components: {
    Home
  }, */

  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      return this.$router.replace("/");
    },
  },
  computed: {
    menuItems() {
      let menuItems = [
        // { icon: "mdi-face", title: "Sign Up", link: "/signup" },
        {
          icon: "mdi-plus",
          title: "Create event",
          link: "/meetup/new",
        },
        { icon: "mdi-login", title: "Log In", link: "/signin" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "mdi-plus",
            title: "Create event",
            link: "/meetup/new",
          },
          {
            icon: "mdi-eye-outline",
            title: "View events",
            link: "/meetups",
          },
          // { icon: "mdi-account-outline", title: "Profile", link: "/profile" }
        ];
      }
      return menuItems;
    },
    profileMenus() {
      let profileMenus = [
        // { icon: "mdi-face", title: "Sign Up", link: "/signup" },
        // { icon: "mdi-login", title: "Sign In", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        profileMenus = [
          { icon: "mdi-email-outline", title: "Inbox", link: "/meetup/new" },

          {
            icon: "mdi-heart-outline",
            title: "Love",
            link: "/meetups",
          },
          {
            icon: "mdi-bell-ring-outline",
            title: "Notification",
            link: "",
          },
          {
            icon: "mdi-message-processing-outline",
            title: "Comment",
            link: "",
          },
          {
            icon: " mdi-account-outline",
            title: "Profile",
            link: "/profile",
          },
        ];
      }
      return profileMenus;
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

