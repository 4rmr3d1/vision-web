import axios from 'axios'
import { history } from '../lib'

const API_URL = 'http://erp.apptrix.ru/api/clients'


axios.interceptors.request.use(config => {
  const access = JSON.parse(localStorage.getItem('access_token'))
  
  config.headers.Authorization = access ? `Bearer ${access}` : ''
  return config
}, error => {
  return Promise.reject(error)
})

const refreshInterceptor = axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status !== 401) {
      return Promise.reject(error)
    }
    
    const refresh_token = JSON.parse(localStorage.getItem('refresh_token'))
    
    axios.interceptors.response.eject(refreshInterceptor)
    
    if (refresh_token) {
      return axios.post(`${API_URL}/refresh/`, {refresh_token})
        .then(response => {
          localStorage.setItem('access_token', JSON.stringify(response.data.access))
          error.response.config.headers['Authorization'] = `Bearer ${response.data.access_token}`
          return axios(error.response.config)
        })
        .catch(error => {
          localStorage.clear()
          history.push('/login')
          return Promise.reject(error)
        })
    }
  }
  
)

const login = ({username, password}) => dispatch => {
  return axios.post(`${API_URL}/token/`, 
  {username, password},
  )
    .then(response => {
      dispatch({ type: '@USER/login-success', client_id: response.data.client_id })
      
      localStorage.setItem('access_token', JSON.stringify(response.data.access))
      localStorage.setItem('refresh_token', JSON.stringify(response.data.refresh))
      localStorage.setItem('client_id', JSON.stringify(response.data.client_id))
      
      history.push('/')
    })
    .catch(error => {
      dispatch({ type: '@USER/login-error', error: error?.response?.data.detail })
    })
} 

const signup = ({email, phone, password, name, surname}) => dispatch => {
  return axios.post(`${API_URL}/create/`, {
    user: {
      email,
      password,
    },
    phone,
    name,
    surname,
    invited_by: 'RU-637164',
    country_key: 'RU'
  })
    .then(response => {
      dispatch({ type: '@USER/register-success'})
      
      history.push('/login')
    })
    .catch(error => {
      dispatch({ type: '@USER/register-error', error: error.response.data })
    })
}

const userData = () => dispatch => {
  const clientId = JSON.parse(localStorage.getItem('client_id'))
  
  return axios.get(`${API_URL}/${clientId}`)
    .then(response => {
      dispatch({ type: '@USER/get-data-success', data: response.data })
      
      history.push('/')
    })
    .catch(error => {
      console.log(error)
    })
}

export const user = {
  login,
  signup,
  userData
}