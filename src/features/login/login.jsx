import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { user } from '../../services/user'
import { useDispatch, useSelector } from '../../store'

import classes from './styles.module.scss'

export const Login = () => {
  const { dispatch } = useDispatch()
  
  const loginError = useSelector(state => state.user.error)
  const registerSuccess = useSelector(state => state.user.isSignedup)
  
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const onUserNameChange = React.useCallback((e) => {
    setUsername(e.target.value)
  }, [setUsername])
  
  const onPasswordChange = React.useCallback((e) => {
    setPassword(e.target.value)
  }, [setPassword])
  
  const onSubmit = React.useCallback((e) => {
    e.preventDefault()
    
    dispatch(user.login({username, password}))
  }, [dispatch, username, password])
  
  return (
    <div className={classes.loginForm}>
      <form onSubmit={onSubmit}>
        {loginError &&
          <Alert severity='error'>{loginError}</Alert>
        }
        
        {registerSuccess &&
          <Alert severity='success'>Регистрация прошла успешно!</Alert>
        }
      
        <TextField 
          variant='outlined'
          fullWidth
          name='username'
          type='text'
          label='Username'
          onChange={onUserNameChange}
          error={!!loginError}
        />
        
        <TextField 
          variant='outlined'
          fullWidth
          name='password'
          type='password'
          label='Password'
          onChange={onPasswordChange}
          error={!!loginError}
        />
        
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  )
}