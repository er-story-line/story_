import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import EditableLine from './line/EditableLine'
import Login from './login/Login'
import NotFoundPage from './commons/errorpages/404'

const routes = [
  { path: '/', component: EditableLine, exact: true },
  { path: '/login', component: Login },
].filter(x => !!x)

export default () => (
  <BrowserRouter>
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
)
