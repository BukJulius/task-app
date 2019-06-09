<template>
  <div v-if="data" class="customer-list-item" :class="{ 'header': header }">
    <div class="col-details">
      <span class="col-name">{{ data.fullName }}</span>
      <span class="col-email">{{ data.emailAddress }}</span>
      <span class="col-address">{{ data.address | address }}</span>
    </div>
    <div class="col-actions">
      <ui-button v-if="data.id" label="Edit" bordered @click="editCustomer(data.id)" />
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    address(value) {
      if (!value) return
      return `${value.street} ${value.houseNumber}, ${value.city} ${value.zipCode}`
    }
  },

  props: {
    data: { type: Object, default: undefined },
    header: Boolean
  },

  methods: {
    editCustomer(id) {
      if (!id) return
      this.$router.push({ name: 'CustomerDetails', params: { customerId: id } })
    }
  }
}
</script>

<style scoped>
.customer-list-item,
.col-details,
.col-actions {
  display: flex;
}

.col-details,
.col-actions {
  margin-top: auto;
  margin-bottom: auto;
}

.customer-list-item {
  padding: .5rem 1rem;
}

.customer-list-item:nth-child(even) {
  background-color: var(--light-grey);
}

.col-details {
  width: 100%;
}

.col-details > * {
  line-height: 3rem;
  min-width: 8rem;
}

.col-actions {
  min-width: 10rem;
}

.col-name {
  width: 25%;
}

.col-email {
  width: 30%;
  min-width: 10rem;
}

.col-address {
  width: 45%;
  min-width: 10rem;
}

.header {
  font-weight: 600;
}

@media screen and (max-width: 44rem) {
  .customer-list-item {
    flex-wrap: wrap;
  }
}

@media screen and (min-width: 44.0625rem) {
  .col-actions {
    justify-content: space-around;
  }
}
</style>
