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
      <div>
        <h1>Sign Up to Bawinu</h1>
        <div>
          <h4 class="grey--text font-weight-medium">
            It's so easy and simple.
          </h4>
        </div>
      </div>
    </v-row>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card outlined>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      autofocus
                      outlined
                      prepend-inner-icon="mdi-account-outline"
                      name="email"
                      label="Enter e-mail address"
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
                      prepend-inner-icon="mdi-lock-open-outline"
                      name="password"
                      label="Choose Password"
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
                    <v-text-field
                      outlined
                      prepend-inner-icon="mdi-lock-outline"
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparedPasswords]"
                      clearable
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <!--:disabled:"loading" is removed for duplicating name reason-->
                    <v-btn
                      depressed
                      class="text-capitalize"
                      rounded
                      x-large
                      block
                      type="submit"
                      :loading="loading"
                      color="success"
                      @click="loader = 'loading'"
                      clearable
                      :disabled="!formIsValid"
                    >
                      Sign Up
                      <span slot="loader" class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      inputRules: [(v) => v.length >= 1 || "E-mail address is required."],
      inputRules2: [
        (v) =>
          v.length >= 1 ||
          "Your password must contain between 6 and 50 characters.",
      ],
    };
  },
  methods: {
    onSignup() {
      // Use vuex
      /* console.log({
        email: this.email,
        password: this.passwrod,
        confirmpassword: this.confirmPassword
      }); */
      this.$store.dispatch("signUserUp", {
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
    comparedPasswords() {
      return this.password !== this.confirmPassword
        ? " The password and confirm password you entered don't match"
        : null;
      /*  return this.confirmPassword === this.password
        ? "Password match"
        : " Passwords do not match"; */
      // The problem is solved by replacing doubles quotation  ""  with true
    },
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
      return (
        this.email !== "" && this.password !== "" && this.confirmPassword !== ""
      );
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
