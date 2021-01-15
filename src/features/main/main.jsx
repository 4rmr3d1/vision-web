import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch, useSelector } from '../../store'
import { user } from '../../services/user'

import classes from './styles.module.scss'

export const Main = () => {
  const { dispatch } = useDispatch()
  
  const userData = useSelector(state => state.user.data)
  
  const onExit = React.useCallback(() => {
    localStorage.clear()
  }, [])
  
  React.useEffect(() => {
    dispatch(user.userData())
  }, [dispatch])
  
  return (
    <div className={classes.main}>
      <p> {userData?.email} </p>
      <p> {userData?.username} </p>
      <p> {userData?.name} {userData?.surname}</p>
      
      <form onSubmit={onExit}>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          fullWidth
        > 
          Exit 
        </Button>
      </form>
    </div>
  )
}