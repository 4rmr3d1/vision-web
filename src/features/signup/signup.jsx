import React from 'react'
import { TextField, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { user } from '../../services/user'
import { useDispatch, useSelector } from '../../store'

import classes from './styles.module.scss'

export const Signup = () => {
  const { dispatch } = useDispatch()
  
  const registerError = useSelector(state => state.user.error)
  
  const [registrationData, setRegistarationData] = React.useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
  })
  
  const onNameChange = React.useCallback(e => {
    setRegistarationData({...registrationData, name: e.target.value})
  }, [registrationData])
  
  const onSurnameChange = React.useCallback(e => {
    setRegistarationData({...registrationData, surname: e.target.value})
  }, [registrationData])
  
  const onEmailChange = React.useCallback(e => {
    setRegistarationData({...registrationData, email: e.target.value})
  }, [registrationData])
  
  const onPhoneChange = React.useCallback(e => {
    setRegistarationData({...registrationData, phone: e.target.value})
  }, [registrationData])
  
  const onPasswordChange = React.useCallback(e => {
    setRegistarationData({...registrationData, password: e.target.value})
  }, [registrationData])
  
  const onSubmit = React.useCallback(e => {
    e.preventDefault()
    
    dispatch(user.signup({ ...registrationData }))
  }, [dispatch, registrationData])
  
  const hasErrors = React.useMemo(() => {
    return registerError || null
  }, [registerError])
  
  return (
    <div className={classes.singupForm}>
      <form onSubmit={onSubmit}>
        {registerError?.message &&
          <Alert severity='error'>{registerError?.message}</Alert>
        }
      
        <TextField 
          variant='outlined'
          fullWidth
          name='name'
          type='text'
          label='Name'
          onChange={onNameChange}
          error={!!hasErrors?.name}
          helperText={registerError?.name}
        />
        
        <TextField 
          variant='outlined'
          fullWidth
          name='surname'
          type='text'
          label='Surname'
          onChange={onSurnameChange}
          error={!!hasErrors?.surname}
          helperText={registerError?.surname}
          
        />
      
        <TextField 
          variant='outlined'
          fullWidth
          name='email'
          type='email'
          label='Email'
          onChange={onEmailChange}
          helperText={registerError?.user?.email}
          
        />
        
        <TextField 
          variant='outlined'
          fullWidth
          name='phone'
          type='text'
          label='Phone'
          onChange={onPhoneChange}
          error={!!hasErrors?.phone}
          helperText={registerError?.phone}
        />
        
        <TextField 
          variant='outlined'
          fullWidth
          name='password'
          type='password'
          label='Password'
          onChange={onPasswordChange}
          error={!!hasErrors?.user?.password}
          helperText={registerError?.user?.password}
        />
        
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
        >
          Sign Up
        </Button>
      </form>
    </div>
  )
}