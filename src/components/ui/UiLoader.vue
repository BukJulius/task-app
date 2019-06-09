<template>
  <div class="ui-loader" :class="{'loader-center': center, 'on-top': onTop}" :style="loaderSize" />
</template>

<script>
export default {
  name: 'ui-loader',

  props: {
    size: { type: Number, default: undefined },
    center: Boolean,
    onTop: Boolean
  },

  computed: {
    loaderSize() {
      const { size } = this
      const sizeValue = `${ size || 3 }rem`
      return {
        width: sizeValue,
        height: sizeValue
      }
    }
  }
}
</script>

<style scoped>
.ui-loader {
  position: relative;
}

.ui-loader.loader-center {
  margin: auto;
}

.ui-loader::before {
  content: '';
  height: 100%;
  width: 100%;
  border: 6px solid var(--blue);
  border-bottom-color: var(--grey);
  position: absolute;
  left: 0;
  border-radius: 50%;
  animation: loader-spin 1.5s infinite ease-in-out;
}

.on-top {
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
}

@-moz-keyframes loader-spin {
  from {
    -moz-transform: rotate(0deg);
  }

  to {
    -moz-transform: rotate(360deg);
  }
}

@-webkit-keyframes loader-spin {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes loader-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
