import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

// import {
//   chat, send,
//   mine, search,
//   detail, invite,
//   login, register,
//   group, groupDetail, groupModify,
//   admin as FriendList, 
//   notFound as NotFound,
// } from './pages'

import {
  mine,
  login, register,
  admin as FriendList, 
  notFound as NotFound,
} from './pages'


const App = () => (
  // exact: 完全匹配       ['/', '/foo']
  // strict: 严格匹配      ['/', '/foo', '/foo/']
  // senstive: 大小写匹配  ['/', '/foo', '/Foo']
  <Switch>
    <Route exact path='/' render={({location}) => {
      return localStorage.getItem('token') ?  (<FriendList />) : (<Redirect from='/' to={{pathname: '/login', state:{from:location}}} />)
    }} />
    <Route path='/login' component={login} />
    <Route path='/register' component={register} />
    <Route path='/admin' render={() => <FriendList />} />
    <Route path='/mine' component={mine} />
    <Route render={() => <NotFound />} />
  </Switch>
)

export default App

