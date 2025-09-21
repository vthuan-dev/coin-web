export const validateUsername = (username: string): boolean => {
  const regex = /^[a-zA-Z0-9._]{2,24}$/
  return regex.test(username)
}

export const getUsernameError = (username: string): string => {
  if (username.length === 0) return ''
  if (username.length < 2) return 'Tên người dùng phải có ít nhất 2 ký tự'
  if (username.length > 24) return 'Tên người dùng không được quá 24 ký tự'
  if (!/^[a-zA-Z0-9._]+$/.test(username)) return 'Chỉ được sử dụng chữ cái, số, dấu chấm và gạch dưới'
  return ''
}
