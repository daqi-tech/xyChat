import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './container/login/login'
import Register from './container/register/register'
import Chat from './component/chat/chat'
import AuthRoute from './component/authroute/authroute'
import XXInfo from './container/xxinfo/xxinfo'
import YYInfo from './container/yyinfo/yyinfo'
import Dashboard from './component/dashboard/dashboard'
import reducers from './reducer'
import './config'
import './index.css'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

// XX YY me msg 4个页面
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/xxinfo' component={XXInfo}></Route>
          <Route path='/yyinfo' component={YYInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>

      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)
