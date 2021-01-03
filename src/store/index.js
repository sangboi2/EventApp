import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [],

    // [
    //   {
    //   imageUrl: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
    //   id: "dadada",
    //   title: "Meet in New York",
    //   date: new Date(),
    //   location: 'New York',
    //   description: 'It\'s New York'
    // },
    // {
    //   imageUrl: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
    //   id: "fafafa",
    //   title: "Meet in Paris",
    //   date: new Date(),
    //   location: 'Paris',
    //   description: 'It\'s Paris'
    // },
    // {
    //   imageUrl: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
    //   id: "ddddd",
    //   title: "Meet in Copenhagen",
    //   date: new Date(),
    //   location: 'Copenhagen',
    //   description: 'It\'s Copenhagen'
    // },
    // {
    //   imageUrl: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
    //   id: "gggg",
    //   title: "Meet in Madrid",
    //   date: new Date(),
    //   location: 'Madris',
    //   description: 'It\'s Madrid'
    // }
    // ],
    //default user
    /* user: {
      id: 'dhadhadh',
      registeredMeetups: ['fsdfsdfsd']
    } */
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForEvent(state, payload) {
      const id = payload.id
      //Extra security for checking id already register
      if (state.user.registeredMeetups.findIndex(item => item.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromEvent(state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(item => item.id ===
        payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    // to access this loadedMeetups array that hard coded value for now!!
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    // For updating and editing
    updateMeetup(state, payload) {
      const item = state.loadedMeetups.find(item => {
        return item.id === payload.id
      })
      if (payload.title) {
        item.title = payload.title
      }
      if (payload.subtitle) {
        item.subtitle = payload.subtitle
      }
      if (payload.description) {
        item.description = payload.description
      }
      if (payload.date) {
        item.date = payload.date
      }
    },
    deleteData(state, payload) {
      const item = state.loadedMeetups.find(item => {
        return item.id === payload.id
      })
      if (payload.title) {
        item.title = payload.title
      }
      if (payload.subtitle) {
        item.subtitle = payload.subtitle
      }
      if (payload.subtitle) {
        item.location = payload.location
      }
      if (payload.description) {
        item.description = payload.description
      }
      if (payload.date) {
        item.date = payload.date
      }
      /*   if (payload.imageUrl) {
          item.imageUrl = payload.imageUrl
        } */

    },

    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    registerUserForEvent({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user;
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then((data) => {
          commit('setLoading', false)
          commit('registerUserForEvent', { id: payload, fbKey: data.key })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromEvent({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      // Extra to check if bfKey exists
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromEvent', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    // To load data
    loadMeetups({ commit }) {
      commit('setLoading', true)
      // two ways of gettings data 'once and on'
      // on can be used if you want to realtime updating...
      firebase.database().ref('items').once('value')
        .then((data) => {
          // to store data list in here below array
          const items = []
          // to transform data to have a shap
          const obj = data.val()
          // to loop thru all the keys in my object
          for (let key in obj) {
            items.push({
              // Key is a firebase key that is given to us
              id: key,
              title: obj[key].title,
              subtitle: obj[key].subtitle,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              location: obj[key].location,
              creatorId: obj[key].creatorId
              // where do we call all of these?
            })
          }
          // to call above object items
          commit('setLoadedMeetups', items)
          commit('setLoading', false)
        })
        .catch(
          error => {
            console.log(error)
            commit('setLoading', true)
          }
        )
    },
    createMeetup({ commit, getters }, payload) {
      const item = {
        title: payload.title,
        subtitle: payload.subtitle,
        location: payload.location,
        imageUrl: payload.imageUrl, // becuase 
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
        // Coz firebase creates a unique id for me
        //id: 'dsjdsjdksdj'
      }
      // To reach out to the firebase
      let imageUrl
      let key
      // Auth() gives all the authentications such as functions and methods
      // Ref() function ref is super important function or method
      // Ref allows us to pass an argument which is basically denote in our database under which we want to store our data
      // That note does not have to existed yet!
      // It will start to create when you starting writing data to it
      // Push() method simply allows us to add data to list
      // Meetup is coming from const above!!
      firebase.database().ref('items').push(item)
        .then((data) => {
          key = data.key
          //const key = data.key
          //console.log(data);
          // commit('createMeetup', {

          /*Spread operator here to get our meetups data from that table object
          so basically get all the poroperties we had in there and add them to
          newly created object meetup here!!
          Use key id as value*/

          //   ...meetup,
          //   id: key
          // })
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('items/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('items').child(key).update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createMeetup', {
            ...item,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })

      //commit('createMeetup', meetup)
    },
    // To make changes in item and save it after editing
    // a payload basically is an object which holds the new data we want to store

    updateMeetupData({ commit }, payload) {

      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.subtitle) {
        updateObj.subtile = payload.subtitle
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      // Extra added
      if (payload.imageUrl) {
        updateObj.imagUrl = payload.imageUrl
      }
      /* if (payload.time) {
           updateObj.time = payload.time
         } */
      firebase.database().ref('items').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },

    // deletion
    deleteDataItem({ commit }, payload) {

      commit('setLoading', true)
      const deleteObj = {}
      if (payload.title) {
        deleteObj.title = payload.title
      }
      if (payload.subtitle) {
        deleteObj.subtile = payload.subtitle
      }
      if (payload.subtitle) {
        deleteObj.location = payload.location
      }
      if (payload.description) {
        deleteObj.description = payload.description
      }
      if (payload.date) {
        deleteObj.date = payload.date
      }

      if (payload.imageUrl) {
        deleteObj.imagUrl = payload.imageUrl
      }

      /* if (payload.imageUrl) {
        deleteObj.imagUrl = payload.imageUrl
      } */


      firebase.database().ref('items').child(payload.id).remove(deleteObj)
        .then(() => {
          commit('setLoading', false)
          commit('deleteData', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },

    signUserUp({ commit }, payload) {
      // Indication
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    // Need to call in main.js
    autoSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      })
    },
    // Need to call in main.js
    fetchUserData({ commit, getters }) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
        .then(data => {
          const dataPairs = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          //console.log(values)
          for (let key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
            // To see itemid and registrationId on console
            // console.log(registeredMeetups)
            // console.log(swappedPairs)
            const updatedUser = {
              id: getters.user.id,
              registeredMeetups: registeredMeetups,
              fbKeys: swappedPairs
            }
            commit('setLoading', false)
            commit('setUser', updatedUser)
          }
          // To check if it is in array
          //console.log(registeredMeetups)
        }).catch(error => {
          console.log(error)
          commit('setLoading', false)
        })

    },
    logout({ commit }) {
      // Firebase auth is used to remove this token from the local storage
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((itemA, itemB) => {
        return itemA.date > itemB.date
      })
    },
    featuredMeetups(getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
      return (itemId) => {
        return state.loadedMeetups.find((item) => {
          return item.id === itemId
        })
      }
    },
    // To return user from vuex
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  },
  modules: {
  }
})
