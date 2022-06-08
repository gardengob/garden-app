export const generateCode = () => {
  let code = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < 8; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length))

  return code
}
