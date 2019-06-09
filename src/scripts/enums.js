const googleLocationTypesEnum = {
  name: 'googleLocationTypes',
  enum: {
    'locality': 'city',
    'route': 'street',
    'street_number': 'houseNumber',
    'postal_code': 'zipCode'
  }
}

const enumHandler = {
  get(target, key) {
    if (typeof key === 'symbol' || key === '_isVue') return target.enum
    if (target.enum[key]) return target.enum[key]
    throw `No key: ${key} in ${target.name}.`
  },

  set(target, key) {
    throw `Can't edit ${target.name}. Key: ${key}.`
  }
}

export const googleLocationTypes = new Proxy(googleLocationTypesEnum, enumHandler)
