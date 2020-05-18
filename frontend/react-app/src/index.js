import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    }

    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUuid(login, password) {
    fetch('http://localhost:5000/getUser/' + login + '/' + password)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.user_uuid);
      });
  }

  handleLoginChange(event) {
    this.setState({ login: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    this.getUuid(this.state.login, this.state.password)
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.login} onChange={this.handleLoginChange} />
        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
        <button>Login</button>
      </form>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
