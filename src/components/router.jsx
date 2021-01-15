import React from 'react'
import { Router as BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from '../store'
import { history } from '../lib'
import { Main, Login, Signup } from '../features'

export const Router = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <PrivateRoute path='/' exact>
          <Main />
        </PrivateRoute>
        
        <Route component={Login} path='/login'/>
        
        <Route component={Signup} path='/signup'/>
      </Switch>
    </BrowserRouter>
  )
}

const PrivateRoute = ({children, ...props}) => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  
  return (
    <Route {...props} render={() => {
      return isLoggedIn 
        ? children
        : <Redirect to='/login' />
    }}/>
  )
}