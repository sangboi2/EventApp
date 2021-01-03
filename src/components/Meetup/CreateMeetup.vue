<template>
  <v-container fluid>
    <v-form @submit.prevent="onCreateMeetup" class="pl-2">
      <h2 class="primary--text pl-3 text">Create a new Event</h2>
      <v-container fluid>
        <v-row justify="space-around">
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              dense
              name="title"
              label="Title"
              id="Title"
              v-model="title"
              prepend-icon="mdi-folder-plus-outline"
              required
              clearable
              :rules="inputRules2"
            ></v-text-field>
            <v-text-field
              dense
              name="subtitle"
              label="Subtitle"
              id="subtitle"
              v-model="subtitle"
              prepend-icon="mdi-subtitles-outline"
              required
              clearable
              :rules="inputRules2"
            ></v-text-field>
            <v-text-field
              name="location"
              label="Location"
              id="Location"
              v-model="location"
              prepend-icon="mdi-map-marker"
              required
              clearable
              :rules="inputRules2"
            ></v-text-field>
            <v-textarea
              clearable
              name="description"
              label="Description"
              id="description"
              v-model="description"
              prepend-icon="mdi-pencil-outline"
              required
              :rules="inputRules2"
            ></v-textarea>
            <v-icon left>mdi-paperclip</v-icon>
            <v-btn class="text-capitalize" depressed small @click="onPickFile"
              >Upload Image</v-btn
            >
            <input
              clearable
              type="file"
              style="display: none"
              ref="fileInput"
              accept="image/*"
              @change="onFilePicked"
              :rules="inputRules2"
            />
            <img class="mb-8" :src="imageUrl" height="150" />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-date-picker v-model="date"></v-date-picker>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-time-picker v-model="time" format="24hr"></v-time-picker>
          </v-col>

          <!--    <v-col cols="12" sm="6" md="12">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="error" :disabled="!formIsValid" type="submit">
                Post
                <v-icon right>mdi-upload-outline</v-icon>
              </v-btn>
            </v-card-actions>
          </v-col>-->
          <v-container
            fill-height
            fluid
            pl-8
            ma-0
            pb-12
            pt-4
            class="text-center"
          >
            <v-layout fill-height align-end pb-0 mb-0>
              <v-flex xs12>
                <v-btn
                  small
                  class="green text-capitalize"
                  :disabled="!formIsValid"
                  type="submit"
                >
                  Post
                  <v-icon right>mdi-upload-outline</v-icon>
                </v-btn>
                <v-btn
                  @click="clear"
                  depressed
                  small
                  class="ml-4 text-capitalize"
                  >Clear</v-btn
                >
              </v-flex>
            </v-layout>
          </v-container>
        </v-row>
      </v-container>
    </v-form>
  </v-container>

  <!--  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="grey--text">Create a new post</h2>
      </v-flex>
    </v-layout>
    <v-layout row d-flex align-content-start flex-wrap>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="Title"
                v-model="title"
                prepend-icon="mdi-folder-plus-outline"
                required
                clearable
                :rules="inputRules2"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="Location"
                v-model="location"
                prepend-icon="mdi-map-marker"
                required
                clearable
                :rules="inputRules2"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
  <v-btn raised class="error" @click="onPickFile">Upload Image</v-btn>-->
  <!--<v-file-input
                accept="image/*"
                label="Upload file"
                @click="onPickFile"
                @change="onFilePicked"
  ></v-file-input>-->
  <!--               <input
                clearable
                type="file"
                style="display:none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
                :rules="inputRules2"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150" />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                clearable
                name="description"
                label="Description"
                id="description"
                v-model="description"
                rows="3"
                prepend-icon="mdi-card-text-outline"
                required
                :rules="inputRules2"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose A Date & Time</h4>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
  <v-date-picker v-model="date"></v-date-picker>-->
  <!-- {{date}} -->
  <!--  </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
  <v-time-picker v-model="time" format="24hr"></v-time-picker>-->
  <!-- {{time}} -->
  <!--   </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
  <v-btn class="error" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>-->
  <!-- {{submittableDateTime}} It's just debug system-->
  <!--      </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container-->
</template>

<script>
export default {
  data() {
    return {
      menu: false,
      title: "",
      subtitle: "",
      location: "",
      imageUrl: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      image: null,
      inputRules2: [(v) => v.length >= 1 || "This field is required."],
    };
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        subtitle: this.subtitle,
        location: this.location,
        imageUrl: this.imageUrl, //storing images like this it is not good, coz the string file is obviuosly big
        // Instead we should store the file as a binary file in the database
        image: this.image,
        description: this.description,
        date: this.submittableDateTime,
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file!");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    clear() {
      this.title = "";
      this.location = "";
      this.subtitle = "";
      this.description = "";
      this.imageUrl = null;
    },
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.subtitle !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);
      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/[1]);
        const minutes = this.time.match(/:(\d+)/)[1];
        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      //console.log(date);
      return date;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>>

