import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Main, Register, Login } from '../pages'
import Navbar from '../components/Navbar'
import Auth from '../hoc/auth'

export default function AppRouter() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
        </Switch>
      </Router>
    </div>
  )
}
