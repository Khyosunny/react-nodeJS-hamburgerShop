import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import { Main, Register, Login } from '../pages'
import { Layout } from '../components'
import Auth from '../hoc/auth'

export default function AppRouter() {
  return (
    <div>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Auth(Main, null)} />
            <Route exact path="/login" component={Auth(Login, false)} />
            <Route exact path="/register" component={Auth(Register, false)} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </Router>
    </div>
  )
}
