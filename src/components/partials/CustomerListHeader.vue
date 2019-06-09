<template>
  <div class="customer-list-item">
    <div class="col-details">
      <span class="col-name">Full name</span>
      <span class="col-email">Email address</span>
      <span class="col-address">Address</span>
    </div>
    <div class="col-actions" />
  </div>
</template>

<style scoped>
.customer-list-item,
.col-details {
  display: flex;
}

.customer-list-item {
  padding: .5rem 1rem;
  font-weight: 600;
}

.customer-list-item:nth-child(even) {
  background-color: var(--light-grey);
}

.col-details {
  margin-top: auto;
  margin-bottom: auto;
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

@media screen and (max-width: 44rem) {
  .customer-list-item {
    flex-wrap: wrap;
  }
}
</style>
