<template>
  <div class="ui-loader-overlay">
    <div class="loader-content" :class="{ 'form-loading': active }">
      <slot />
    </div>

    <ui-loader v-if="loading" center on-top />
  </div>
</template>

<script>
export default {
  name: 'ui-loader-overlay',

  props: {
    loading: Boolean,
    disabled: Boolean
  },

  computed: {
    active() {
      return this.loading || this.disabled
    }
  }
}
</script>

<style scoped>
.ui-loader-overlay {
  position: relative;
}

.loader-content {
  transition: filter var(--overlay-time) ease-in-out;
}

.form-loading {
  filter: blur(.375rem);
}
</style>
