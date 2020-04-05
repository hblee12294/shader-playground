import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
