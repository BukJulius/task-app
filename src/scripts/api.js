function call(method, payload) {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = methods[method](payload)
      resolve(result)
    }, 1000)
  })
}

const methods = {
  'save-customer': (payload) => {
    const content = JSON.stringify(payload)
    const key = `id_${payload.id}`
    localStorage.setItem(key, content)
  },

  'customer': (id) => {
    const key = `id_${id}`
    return getCustomer(key)
  },

  'all-customers': () => {
    const customers = []
    const storageKeys = Object.keys(localStorage)
    storageKeys.forEach((key) => {
      if (key.startsWith('id_')) {
        customers.push(getCustomer(key))
      }
    })
    return customers.length > 0 && customers
  }
}

function getCustomer(key) {
  const content = localStorage.getItem(key)
  if (content) return JSON.parse(content)
}

export default {
  call
}
