<template>
  <div class="customers-page">
    <h1>Customers</h1>

    <div class="list-actions">
      <ui-button label="+ Add Customer" @click="registerCustomer" />
    </div>

    <ui-loader-overlay :loading="isLoading">
      <customer-list :data="customers" />
    </ui-loader-overlay>
  </div>
</template>

<script>
import CustomerList from '@src/components/partials/CustomerList'
import Api from '@src/scripts/api'

export default {
  components: {
    CustomerList
  },

  data() {
    return {
      isLoading: false,
      customers: undefined
    }
  },

  created() {
    this.loadCustomers()
  },

  methods: {
    async loadCustomers() {
      this.isLoading = true
      const data = await Api.call('all-customers')
      if (data) {
        this.customers = data
      }
      this.isLoading = false
    },

    registerCustomer() {
      this.$router.push({ name: 'NewCustomer' })
    }
  }
}
</script>

<style scoped>
.customers-page {
  max-width: 80rem;
}

.list-actions {
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
}
</style>
