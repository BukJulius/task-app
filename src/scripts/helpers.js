export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = parseFloat('0.' + Math.random().toString().replace('0.', '') + new Date().getTime()) * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function copyObject(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function objectEqual(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
