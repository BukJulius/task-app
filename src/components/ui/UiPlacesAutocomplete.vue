<template>
  <div class="ui-places-autocomplete">
    <ui-input ref="autocomplete" v-model="search" :label="label" :disabled="disabled"
      max-length="512" @focus="geolocate" />
  </div>
</template>

<script>
import { googleLocationTypes } from '@src/scripts/enums'
import GoogleMaps from 'google-maps'

export default {
  name: 'ui-places-autocomplete',

  props: {
    label: { type: String, default: undefined },
    value: { type: String, default: undefined },
    disabled: Boolean
  },

  data() {
    return {
      search: undefined,
      autocomplete: undefined,
      inputElement: undefined,
      placeDataNames: {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        postal_code: 'short_name'
      }
    }
  },

  created() {
    this.initMaps()
  },

  beforeDestroy() {
    if (this.inputElement) {
      this.inputElement.removeEventListener('keydown', this.preventSubmit)
      this.inputElement = undefined
    }
    this.autocomplete = undefined
    GoogleMaps.release()
  },

  methods: {
    initMaps() {
      GoogleMaps.KEY = 'AIzaSyCBj9C-M1uvwR-OO_-RBIAiWsapiXi73as'
      GoogleMaps.VERSION = '3.37'
      GoogleMaps.LIBRARIES = ['places']
      GoogleMaps.LANGUAGE = 'en'
      GoogleMaps.REGION = 'LT'
      GoogleMaps.load(this.loadMaps)
    },

    loadMaps() {
      this.inputElement = this.$refs.autocomplete.$el.childNodes[0].childNodes[0]
      this.inputElement.addEventListener('keydown', this.preventSubmit)
      this.autocomplete = new google.maps.places.Autocomplete(
        this.inputElement, { types: ['geocode']})

      this.autocomplete.setFields(['address_component'])
      this.autocomplete.addListener('place_changed', this.placeChanged)
    },

    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setPosition)
      }
    },

    setPosition(position) {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      })
      this.autocomplete.setBounds(circle.getBounds())
    },

    placeChanged() {
      const place = this.autocomplete.getPlace()
      if (!place.address_components) return

      const address = {
        city: undefined,
        street: undefined,
        houseNumber: undefined,
        zipCode: undefined
      }

      const { placeDataNames } = this
      place.address_components.forEach(item => this.setValue(address, item, placeDataNames))
      this.$emit('input', address)
    },

    setValue(target, item, names) {
      if (!target || !item || !names) return
      const addressType = item.types[0]
      if (names[addressType]) {
        target[googleLocationTypes[addressType]] = item[names[addressType]]
      }
    },

    preventSubmit(event) {
      if (event.keyCode !== 13) return

      event.preventDefault()
      return false
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
</style>
