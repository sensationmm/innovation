export const makeArrayFromIndexedObject = (obj) => {
  return Object.keys(obj).map((k) => obj[k])
}
