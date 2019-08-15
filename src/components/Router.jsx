import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import EditableLine from 'src/components/line/EditableLine'
import Login from 'src/components/login/Login'
import NotFoundPage from 'src/components/commons/errorpages/404'

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
