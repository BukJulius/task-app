<template>
  <div class="customer-details-page">
    <div class="details-header">
      <ui-button label="<" title="Back to customers list" bordered circle @click="backToCustomers" />
      <h1>{{ title }}</h1>
    </div>
    <ui-form @submit="saveCustomer">
      <ui-loader-overlay :loading="isLoading" :disabled="noData">
        <ui-input label="Full name" :value="cutomerData.fullName" :error="errors.fullName"
          :disabled="inactive" max-length="128" @input="fullNameChanged" />
        <ui-input label="Email address" type="email" :value="cutomerData.emailAddress" :error="errors.emailAddress"
          :disabled="inactive" @input="emailAddressChanged" />
        <ui-places-autocomplete label="Address" :disabled="inactive" @input="addressChanged" />

        <div class="address-details">
          <ui-input label="City" :value="cutomerData.address.city"
            :error="errors.city" :disabled="inactive" readonly />
          <ui-input label="Street" :value="cutomerData.address.street"
            :error="errors.street" :disabled="inactive" readonly />
          <ui-input label="House number" :value="cutomerData.address.houseNumber"
            :error="errors.houseNumber" :disabled="inactive" readonly />
          <ui-input label="Zip code" :value="cutomerData.address.zipCode"
            :error="errors.zipCode" :disabled="inactive" readonly />
        </div>

        <div v-if="exists && isDisabled" class="customer-controls" @click="editCustomer">
          <ui-button type="button" label="Edit" :disabled="isLoading" />
        </div>
        <div v-else class="customer-controls">
          <ui-button v-if="exists" type="button" label="Cancel" :disabled="isLoading"
            bordered @click="cancelChanges" />
          <ui-button label="Save" :disabled="isLoading" />
        </div>
      </ui-loader-overlay>

      <ui-no-data v-if="noData" message="Customer not found" />
    </ui-form>
  </div>
</template>

<script>
import Api from '@src/scripts/api'
import Validators from '@src/scripts/validators'
import { copyObject, objectEqual, uuid } from '@src/scripts/helpers'

export default {
  data() {
    return {
      isDisabled: true,
      isLoading: false,
      isChanged: false,
      noData: false,
      cutomerData: {
        address: {}
      },
      originalCutomerData: undefined,
      errors: {
        fullName: 'Required',
        emailAddress: 'Required',
        city: 'Required',
        street: 'Required',
        houseNumber: 'Required',
        zipCode: 'Required'
      }
    }
  },

  computed: {
    customerId() {
      return this.$route.params && this.$route.params.customerId
    },

    exists() {
      return !!this.customerId
    },

    inactive() {
      return this.exists && this.isDisabled || this.isLoading
    },

    title() {
      return this.customerId ? 'Customer details' : 'Create customer'
    }
  },

  created() {
    if (this.exists) this.loadCustomer()
  },

  methods: {
    backToCustomers() {
      this.$router.push({ name: 'Customers' })
    },

    editCustomer() {
      this.isDisabled = false
      this.originalCutomerData = copyObject(this.cutomerData)
    },

    cancelChanges() {
      const { originalCutomerData: customerData, fillCustomerData } = this
      fillCustomerData(customerData)

      this.setDefaults()
    },

    fullNameChanged(value) {
      const { errors } = this
      errors.fullName = Validators.requiredValidator(value)
      if (!errors.fullName) errors.fullName = Validators.minLengthValidator(value)
      this.$set(this.cutomerData, 'fullName', value || undefined)
    },

    emailAddressChanged(value) {
      const { errors } = this
      errors.emailAddress = Validators.requiredValidator(value)
      if (!errors.emailAddress) errors.emailAddress = Validators.emailValidator(value)
      this.$set(this.cutomerData, 'emailAddress', value || undefined)
    },

    addressChanged(value) {
      const address = value || {}
      for (const key in address) {
        this.errors[key] = Validators.requiredValidator(address[key])
        this.$set(this.cutomerData.address, key, address[key] || undefined)
      }
    },

    async saveCustomer() {
      const { errors, cutomerData, originalCutomerData, exists, customerId } = this
      if (!Validators.validateForm(errors)) return

      const payload = {
        ...cutomerData,
        fullName: cutomerData.fullName.trim(),
        emailAddress: cutomerData.emailAddress.trim()
      }

      if (objectEqual(payload, originalCutomerData)) {
        this.setDefaults()
        return
      }
      this.isLoading = true

      if (exists) payload.id = customerId
      else payload.id = uuid()

      await Api.call('save-customer', payload)

      this.isLoading = false

      if (exists) this.setDefaults()
      else this.$router.replace({ name: 'CustomerDetails', params: { customerId: payload.id } })
    },

    async loadCustomer() {
      const { customerId } = this
      this.isLoading = true

      const customer = await Api.call('customer', customerId)
      if (customer) this.fillCustomerData(customer)
      else this.noData = true

      this.isLoading = false
    },

    setDefaults() {
      this.isDisabled = true
      this.originalCutomerData = undefined
    },

    fillCustomerData(data) {
      for (const key in data) {
        const method = `${key}Changed`
        if (this[method]) this[method](data[key])
      }
    }
  }
}
</script>

<style scoped>
.customer-details-page {
  max-width: 36rem;
}

.details-header,
.ui-form {
  padding: 0 2rem 2rem;
}

.details-header {
  display: flex;
}

.details-header .ui-button {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 1rem;
}

.ui-form {
  position: relative;
}

.customer-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 1rem;
}

.customer-controls .ui-button {
  margin-left: .5rem;
  margin-right: .5rem;
}

.address-details {
  display: flex;
  flex-wrap: wrap;
}

.address-details > * {
  width: 50%;
}
</style>
