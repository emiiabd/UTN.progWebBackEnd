const validarEmail = (email) => email && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
const validarNumero = (num) => num && !isNaN(num)
const validarNombre = (value) => value && value.length > 3

module.exports = {validarEmail, validarNumero, validarNombre}