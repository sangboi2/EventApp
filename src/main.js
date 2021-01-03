import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
// import * as firebase from 'firebase'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify';
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditDate from './components/Meetup/Edit/EditMeetupDialog.vue'
import EditTime from './components/Meetup/Edit/EditTime.vue'
import Register from './components/Meetup/Registration/Register.vue'
import DeleteDialog from './components/Meetup/Edit/DeleteItem.vue'

// Date is just a function, not a component
import DateFilter from './filters/date'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)

// Register as a global component to use applicationwise
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-date-dialog', EditDate)
Vue.component('app-edit-time-dialog', EditTime)
Vue.component('app-register-dialog', Register)
Vue.component('app-delete-dialog', DeleteDialog)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBhG34VL7GXIJ0fBDB01zeTViOpSEmgO04",
      authDomain: "meetups-d15e0.firebaseapp.com",
      databaseURL: "https://meetups-d15e0.firebaseio.com",
      projectId: "meetups-d15e0",
      storageBucket: "gs://meetups-d15e0.appspot.com",
      messagingSenderId: "98757219523",
      appId: "1:98757219523:web:d26ec21e17e1471b433e76"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')

      }
    })
    this.$store.dispatch('loadMeetups')
  },
}).$mount('#app')
