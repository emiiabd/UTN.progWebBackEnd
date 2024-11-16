
const API_KEY = '9fd37d2b-132d-47a0-aada-264ba4cfb351'
const URL_API = 'http://localhost:3000'

const getUnauthenticatedHeaders = () => {
  const unnauthenticatedHeaders = new Headers()
  unnauthenticatedHeaders.set('x-api-key', API_KEY)
  unnauthenticatedHeaders.set('Content-Type', 'application/json')

  return unnauthenticatedHeaders
}

const getAuthenticatedHeaders = () => {
  const authenticatedHeaders = new Headers()
  authenticatedHeaders.set('x-api-key', API_KEY)
  authenticatedHeaders.set('Content-Type', 'application/json')
  authenticatedHeaders.set('Authorization', 'Bearer ' + sessionStorage.getItem('acces_token'))

  return authenticatedHeaders
}


/* 
como PROPAGAR un obejto: 

const POST = async (ENDPOINT, paramsOBJ) => {
  fecth(urlAPI, {
    method: 'POST',
    ...paramsOBJ
  })
*/
const POST = async (ENDPOINT, body) => {
  const token = sessionStorage.getItem('acces_token')
  
  try {
    const response = await fetch(URL_API + ENDPOINT, {
      method: 'POST',
      headers: getAuthenticatedHeaders()
      /* {
        'Content-Type': 'application/json', //Aca le indicamos al back que lo que enviamos es un JSON
        'x-api-key': API_KEY,
        'Authorization': "Bearer " + token
      } */,
      body: JSON.stringify(body)
    })
    return response.json()
}
  catch (error) {
    throw error
  }

}

const GET = async (ENDPOINT) => {
  const token = sessionStorage.getItem('acces_token')
  try {
    const response = await fetch(URL_API + ENDPOINT, {
      method: 'GET',
      headers: getAuthenticatedHeaders()
     /*  {
        'Content-Type': 'application/json', 
        'x-api-key': API_KEY,
        'Authorization': `Bearer ${token}`
      } */
    })
    return response.json()
  }
  catch (error) {
    throw error
  }
}

const PUT = async (ENDPOINT, body) => {
  const token = sessionStorage.getItem('acces_token')
  try {
    const response = await fetch(URL_API + ENDPOINT, {
      method: 'PUT',
      headers: getAuthenticatedHeaders(),
      /* {
        'Content-Type': 'application/json', 
        'x-api-key': API_KEY,
        'Authorization': `Bearer ${token}`
      }, */
      body: JSON.stringify(body)
    })
    return response.json()
  }
  catch (error) {
    throw error
  }
}

const DELETE = async (ENDPOINT) => {
  const token = sessionStorage.getItem('acces_token')
  try {
    const response = await fetch(URL_API + ENDPOINT, {
      method: 'DELETE',
      headers: getAuthenticatedHeaders()
      /* {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'Authorization': `Bearer ${token}`
      } */
    })
    return response.json()
  }
  catch (error) {
    throw error
  }
}

export { POST, GET, PUT, DELETE, getAuthenticatedHeaders, getUnauthenticatedHeaders }