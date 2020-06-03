import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({ setLogin, setPassword, wrongPassword, authorize }) => {
    return (
        <div className="start-page">
            <div className="start-page__picture"></div>
            <form className="start-page__form">
                <h1 className="start-page__title">Login</h1>
                <input type="text" className="start-page__input-field" placeholder="Enter login"
                    onChange={event => setLogin(event.target.value)}></input>
                <input type="password" className="start-page__input-field" placeholder="Enter password"
                    onChange={event => setPassword(event.target.value)}></input>
                <p className={wrongPassword}>Incorrect password or login</p>
                <Link to="/register">register</Link>
                <button type="button" className="start-page__register-button" onClick={() => authorize()}>Go!</button>
            </form>
        </div>
    )
}

export default Login
