import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {
  login, register, createGroup,
  admin as HomePage, 
  notFound as NotFound,
} from './pages'


const App = () => (
  // exact: 完全匹配       ['/', '/foo']
  // strict: 严格匹配      ['/', '/foo', '/foo/']
  // senstive: 大小写匹配  ['/', '/foo', '/Foo']
  <Switch>
    <Route exact path='/' render={({location}) => {
      return localStorage.getItem('[token]') ?  (<HomePage />) : (<Redirect from='/' to={{pathname: '/login', state:{from:location}}} />)
    }} />
    <Route path='/login' component={login} />
    <Route path='/register' component={register} />
    <Route path='/admin' render={() => <HomePage />} />
    <Route path='/createGroup' component={createGroup} />
    <Route render={() => <NotFound />} />
  </Switch>
)

export default App
// synaptics

