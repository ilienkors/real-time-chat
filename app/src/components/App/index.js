import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Chats } from '../Chats'
import { Login } from '../Login'
import { Register } from '../Register'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/chats">
          <Chats />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
