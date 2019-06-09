<template>
  <div class="ui-input">
    <label :class="[{'not-empty': value, 'has-error': error}, touchedClass]">
      <input :value="value" :type="type" :maxlength="maxLength" :disabled="disabled" :readonly="readonly"
        placeholder=" " @input="valueChanged" @focus="gotFocus" @blur="lostFocus">
      <span class="input-name">{{ label }}</span>
      <span class="input-error">{{ error }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ui-input',

  props: {
    label: { type: String, default: undefined },
    value: { type: String, default: undefined },
    error: { type: String, default: undefined },
    type: { type: String, default: 'text' },
    maxLength: { type: [String, Number], default: '256' },
    disabled: Boolean,
    readonly: Boolean
  },

  data() {
    return {
      isTouched: false
    }
  },

  computed: {
    touchedClass() {
      return this.isTouched ? 'ui-touched' : 'ui-untouched'
    }
  },

  methods: {
    valueChanged(event) {
      this.$emit('input', event.target.value)
    },

    gotFocus() {
      this.$emit('focus')
    },

    lostFocus() {
      this.isTouched = true
    }
  }
}
</script>

<style scoped>
.ui-input {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

label {
  position: relative;
  display: block;
}

input {
  font-family: var(--main-font);
  font-size: 1rem;
  line-height: 1.5;
  border: none;
  display: block;
  width: 100%;
  padding: .5rem 1rem;
  color: var(--text-color);
  outline: none;
  background-position: 100% 100%;
  background-repeat: no-repeat;
  background-size: 200% 1px;
  background-image: linear-gradient(to right, var(--text-color) 0, var(--text-color) 50%, var(--input-color) 50%, var(--input-color) 100%);
  transition: background-position var(--input-time) ease-in-out;
}

.input-name {
  color: var(--text-color);
  line-height: 1.5;
  display: block;
  position: absolute;
  top: .5rem;
  left: 1rem;
  font-weight: 400;
  transition: all var(--input-time) ease-in-out;
}

.input-error {
  font-size: .75rem;
  color: var(--error-color);
  position: absolute;
  bottom: -1rem;
  opacity: 0;
  transition: opacity var(--input-time) ease-in-out;
}

.ui-touched .input-error {
  opacity: 1;
}

input:focus {
  background-position: 0 100%;
}

.not-empty .input-name,
input:focus + .input-name {
  font-size: .75rem;
  top: -1rem;
  left: 0;
}

.has-error.ui-touched > input {
  --input-color: var(--error-color);
}

.has-error.ui-touched > .input-name {
  color: var(--error-color);
}

.ui-input input:read-only {
  background: none;
}
</style>
