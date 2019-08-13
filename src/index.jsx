import { hot } from 'react-hot-loader/root'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import 'semantic-ui-css/semantic.min.css'
import './styles/bootstrap.less'

export default hot(App)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
)
