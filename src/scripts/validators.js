const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  requiredValidator,
  minLengthValidator,
  emailValidator,
  validateForm
}

function requiredValidator(value) {
  if (!value || value.trim().length === 0) {
    return 'Required'
  } else {
    return null
  }
}

function minLengthValidator(value, minLength) {
  if (!minLength) minLength = 3
  value = value && value.trim() || ''
  if (value.length > 0 && value.length < minLength) {
    return `Minimum length ${minLength} symbols`
  }
  return null
}

function emailValidator(value) {
  if (value && !emailRegex.test(value.trim())) {
    return 'Email not valid'
  } else {
    return null
  }
}

function validateForm(errors) {
  for (const key in errors) {
    if (errors[key]) {
      return false
    }
  }
  return true
}
