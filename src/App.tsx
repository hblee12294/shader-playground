import React from 'react'
import './App.scss'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Layout } from 'commons'
import { routes } from 'configs'

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.page} />
          ))}
          <Route exact path="/">
            <Redirect to={routes[0].path} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
