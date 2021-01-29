import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Main, Register, Login, UploadProduct, Cart } from '../pages'
import { Layout } from '../components'
import Auth from '../hoc/auth'

export default function AppRouter() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Auth(Main, null)} />
          <Route exact path="/login" component={Auth(Login, false)} />
          <Route exact path="/register" component={Auth(Register, false)} />
          <Route exact path="/upload" component={Auth(UploadProduct, true)} />
          <Route exact path="/cart" component={Auth(Cart, true)} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Router>
  )
}
