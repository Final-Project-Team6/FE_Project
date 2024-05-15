export const addHyphenToPhoneNum = (value: string) => {
  if (!value) return ''

  value = value.replace(/\D/g, '')

  let formattedValue = ''

  if (value.length <= 3) {
    formattedValue = value
  } else if (value.length <= 7) {
    formattedValue = value.slice(0, 3) + '-' + value.slice(3)
  } else if (value.length <= 10) {
    formattedValue =
      value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7)
  } else {
    formattedValue =
      value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11)
  }

  return formattedValue
}
