const validarNombre = (name) => name && /^[a-zA-Z0-9]*$/.test(name)
const validarEmail = (email) => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export {
  validarEmail,
  validarNombre
}