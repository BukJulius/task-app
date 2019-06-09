<template>
  <div class="ui-no-data" :class="{'relative': relative}">
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
export default {
  name: 'ui-no-data',

  props: {
    message: { type: String, default: 'No data' },
    relative: Boolean
  }
}
</script>

<style scoped>
.ui-no-data {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
}

.relative {
  position: relative;
}
</style>
