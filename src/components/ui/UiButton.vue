<template>
  <button :type="type" class="ui-button" :class="style" :disabled="disabled"
    :title="title || label" @click="$emit('click')">
    <span class="button-label">{{ label }}</span>
  </button>
</template>

<script>
export default {
  name: 'ui-button',

  props: {
    type: { type: String, default: undefined },
    label: { type: String, default: undefined },
    title: { type: String, default: undefined },
    disabled: Boolean,
    bordered: Boolean,
    circle: Boolean
  },

  computed: {
    style() {
      const sizeStyle = this.circle && 'circle'
      const fillStyle = this.bordered ? 'bordered' : 'solid'
      return `${sizeStyle} ${fillStyle}`
    }
  }
}
</script>

<style scoped>
.ui-button {
  display: block;
  font-size: .75rem;
  line-height: 1rem;
  padding: .75rem 2rem;
  min-width: 8rem;
  border-width: 1px;
  border-style: solid;
  border-radius: var(--button-radius);
  position: relative;
  text-align: center;
  text-transform: uppercase;
  font-family: var(--main-font);
  font-weight: 700;
  transition: all var(--button-time) ease-in-out;
}

.ui-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: var(--button-radius);
  box-shadow: 0 .5rem 1rem var(--button-color);
  opacity: .3;
  transition: opacity var(--button-time) ease-in-out;
}

.ui-button:focus {
  outline: none;
}

.ui-button:hover {
  transform: translateY(1px);
  opacity: .9;
  cursor: pointer;
}

.ui-button:hover::before {
  opacity: .15;
}

.ui-button.solid {
  background-color: var(--button-color);
  border-color: var(--button-color);
}

.ui-button.solid .button-label {
  color: var(--button-text-color);
}

.ui-button.bordered {
  background-color: transparent;
  border-color: var(--button-color);
}

.ui-button.bordered .button-label {
  color: var(--button-color);
}

.ui-button.circle {
  width: 2.625rem;
  min-width: 0;
  padding-left: .25rem;
  padding-right: .25rem;
}
</style>
