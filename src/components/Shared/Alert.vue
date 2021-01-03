<template>
  <v-alert
    dark
    color="#2A3B4D"
    class="white--text"
    dismissible
    @input="onClose"
    :value="true"
  >{{ text }}</v-alert>
  <!-- <v-alert color="info" dismissible @input="onClose" :value="true">{{ text }}</v-alert> -->
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>