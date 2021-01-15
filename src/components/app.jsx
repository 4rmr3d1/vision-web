import React from 'react'
import { Router } from './router'
import { useDispatch } from '../store'
import { user } from '../services/user'

export const App = () => {
  const { dispatch } = useDispatch()
  
  React.useEffect(() => {
    dispatch(user.userData())
  }, [dispatch])
  
  return (
    <Router/>
  )
}