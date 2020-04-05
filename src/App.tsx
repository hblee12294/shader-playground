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
          {routes.map((nav) => (
            <Route key={nav.itemId} path={nav.itemId} exact={nav.exact} component={nav.component} />
          ))}
          <Route exact path="/">
            <Redirect to={routes[0].itemId} />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
