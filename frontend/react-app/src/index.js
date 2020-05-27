import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Chats from './Chats'
import UploadForm from './UploadForm'
import Audio from './Audio'


// const checkLogin = (login) => {
//   return 
// }

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/audio">
            <Audio />
          </Route>
          <Route path="/uploadForm">
            <UploadForm />
          </Route>
          <Route path="/chats">
            <Chats />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    )
  }
}

function LoginPage() {
  const [login, setLogin] = useState('')
  //const [password, setPassword] = useState('')

  console.log(login)

  const authorize = () => {
    window.location = "/chats";
  }

  useEffect(() => {
    console.log(login)
  }, [login])

  return (
    <div className="start-page">
      <div className="start-page__picture"></div>
      <form className="start-page__form">
        <h1 className="start-page__title">Login</h1>
        <input type="text" className="start-page__input-field" id="username" placeholder="Enter login" onChange={(event) => { setLogin(event.target.value) }}></input>
        <input type="password" className="start-page__input-field" id="password" placeholder="Enter password"></input>
        <Link to="/register">register</Link>
        <button type="button" className="start-page__register-button" onClick={() => authorize()}>Go!</button>
      </form>
    </div>
  )
}

function RegisterPage() {
  return (
    <div className="start-page">
      <div className="start-page__picture"></div>
      <form className="start-page__form">
        <h1 className="start-page__title">Register</h1>
        <input type="text" className="start-page__input-field" id="username" placeholder="Enter login"></input>
        <input type="password" className="start-page__input-field" id="password" placeholder="Enter password"></input>
        <Link to="/">login</Link>
        <button type="button" className="start-page__register-button">Go!</button>
      </form>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
