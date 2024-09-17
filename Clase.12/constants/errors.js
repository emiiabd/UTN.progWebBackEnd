const ERRORES = {
  'INVALID_ARGUMENT': {
    'code': 1,
    'message': 'Argumento invalido',
    'name': 'INVALID_ARGUMENT',
    'action': (from, detail) => {
      console.warn('El error viene de ' + from + '\nCon el detalle: ' + detail)
      console.log('Mandar mail de notificacion de error')
    }
  },
  11000: {
    'code': 2,
    'message': 'El usuario/email ya existe',
    'name': 'DUPLICATED_KEY',
    'action': (from, detail) => {
      console.warn('El error viene de ' + from + '\nCon el detalle: ' + detail)
    }
  }
}

export { ERRORES }