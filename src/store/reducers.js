const initialState = {
  error: '',
  isSignedup: false,
  isLoggedIn: false,
  data: {
    client_id: ''
  }
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@USER/login-success':
      return {
        ...state,
        isLoggedIn: true,
        data: {
          ...state.data,
          client_id: action.client_id
        }
      }
    
    case '@USER/login-error':
      return {
        ...state,
        error: action.error,
        isLoggedIn: false,
        isSignedup: false
      }
      
    case '@USER/register-success':
      return {
        ...state,
        isSignedup: true,
        error: ''
      }
      
    case '@USER/register-error':
      return {
        ...state,
        error: action.error,
        isSignedup: false,
      }
      
    case '@USER/get-data-success':
      return {
        ...state,
        data: action.data,
        isLoggedIn: true
      }
      
    case '@USER/get-data-error':
      return {
        ...state,
        isLoggedIn: false
      }
      
    default:
      return state
  }
}
