<template>
  <form class="ui-form" novalidate @submit="submit">
    <slot />
  </form>
</template>

<script>
export default {
  name: 'ui-form',

  methods: {
    submit(event) {
      event.preventDefault()

      const elementList = this.$el.getElementsByClassName('ui-untouched')
      if (elementList && elementList.length > 0) {
        const list = Array.from(elementList)
        list.forEach(element => {
          element.classList.add('ui-touched')
          element.classList.remove('ui-untouched')
        })
      }

      this.$emit('submit', event)
    }
  }
}
</script>
