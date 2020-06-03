import React from 'react'
import { Link } from 'react-router-dom'

const Register = ({setLogin, setPassword, setRepeatPassword, wrongLogin, wrongPassword, wrongPasswordText, register}) => {
    return (
        <div className="start-page">
            <div className="start-page__picture"></div>
            <form className="start-page__form">
                <h1 className="start-page__title">Register</h1>
                <input type="text" className="start-page__input-field" id="username" placeholder="Enter login"
                 onChange={event => setLogin(event.target.value)}></input>
                <p className={wrongLogin}>This login is already taken</p>
                <input type="password" className="start-page__input-field" placeholder="Enter password"
                    onChange={event => setPassword(event.target.value)}></input>
                <input type="password" className="start-page__input-field" placeholder="Repeat password"
                    onChange={event => setRepeatPassword(event.target.value)}></input>
                <p className={wrongPassword}>{wrongPasswordText}</p>
                <Link to="/">login</Link>
                <button type="button" className="start-page__register-button" onClick={() => register()}>Go!</button>
            </form>
        </div>
    )
}

export default Register
