<template>
  <v-container>
    <v-container>
      <v-layout row v-if="error">
        <v-flex xs12 sm6 offset-sm3>
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-flex>
      </v-layout>
    </v-container>
    <v-row
      align="center"
      justify="center"
      class="text-xs-center text-center mb-5"
    >
      <h1>Log In to Bawinu</h1>
    </v-row>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card outlined>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <!--:disabled:"loading" is removed for duplicating name reason-->
                    <v-text-field
                      autofocus
                      outlined
                      prepend-inner-icon="mdi-account-outline"
                      name="email"
                      label="Enter e-mail or username"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                      clearable
                      :rules="inputRules"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      outlined
                      prepend-inner-icon="mdi-lock-outline"
                      name="password"
                      label="Enter Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                      clearable
                      :rules="inputRules2"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-btn
                      depressed
                      type="submit"
                      x-large
                      rounded
                      block
                      class="primary text-capitalize"
                      :loading="loading"
                      color="primary"
                      @click="loader = 'loading'"
                      :disabled="!formIsValid"
                    >
                      Log In
                      <v-icon slot="loader" class="custom-loader"
                        >mdi-cached</v-icon
                      >
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-row
      align="center"
      justify="center"
      class="text-xs-center text-center mt-5"
    >
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <h4>
            <span class="dark--text">New to Bawinu?</span>
            <v-btn
              depressed
              color="success"
              v-on="on"
              to="/signup"
              class="ml-2 font-weight-bold text-capitalize"
            >
              Creat new account
              <!-- <v-icon right>mdi-chevron-right</v-icon> -->
            </v-btn>
          </h4>
        </template>
        <span>Sign Up for getting more experience independently</span>
      </v-tooltip>
    </v-row>

    <!--    <v-layout row wrap>
      <v-flex xs12 sm6 md6 lg12 class="text-xs-center text-center">
        <h2 class="black--text">
          Don't you have an account yet? .
          <v-btn text class="ma-2" rounded color="primary" to="/signup" dark>
            Register here
            <v-icon right>mdi-chevron-right</v-icon>
          </v-btn>
        </h2>
      </v-flex>
    </v-layout>-->
  </v-container>
</template>
<script>
//import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      //Form validation
      inputRules: [
        (v) =>
          v.length >= 1 || "Please enter a valid e-mail address or username.",
      ],
      inputRules2: [
        (v) =>
          v.length >= 1 ||
          "Your password must contain between 6 and 50 characters.",
      ],
    };
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      // To see if it works
      //console.log("Dismissed Alert");
      this.$store.dispatch("clearError");
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    formIsValid() {
      return this.email !== "" && this.password !== "";
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>