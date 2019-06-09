<template>
  <div class="customer-list">
    <customer-list-header />
    <customer-list-item v-for="item in data" :key="item.id" :data="item" />
    <ui-no-data v-if="!data" message="No registered customers" relative />
  </div>
</template>

<script>
import CustomerListHeader from '@src/components/partials/CustomerListHeader'
import CustomerListItem from '@src/components/partials/CustomerListItem'

export default {
  components: {
    CustomerListHeader,
    CustomerListItem
  },

  props: {
    data: { type: Array, default: undefined }
  },

  data() {
    return {
      header: {
        fullName: 'Full name',
        emailAddress: 'Email address',
        address: 'Address'
      }
    }
  }
}
</script>


<style scoped>
.customer-list {
  display: flex;
  flex-direction: column;
}

.ui-no-data {
  background-color: var(--light-grey);
}
</style>
