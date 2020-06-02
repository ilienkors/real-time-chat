import React, { useState } from 'react'
import LoginView from './LoginView'

const LoginController = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [wrongPassword, setWrongPassword] = useState('start-page__wrong-text')

    const getUser = async (url = '') => {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        return await response.json();
    }

    const authorize = () => {
        getUser('http://localhost:5000/api/user/authorize/' + login + '/' + password)
            .then((data) => {
                if (data.message === 'WRONG_PASSWORD_OR_LOGIN')
                    setWrongPassword(wrongPassword + ' start-page__wrong-text_show')
                else {
                    localStorage.setItem('userId', data.userId)
                    window.location = 'http://localhost:3000/chats'
                }
            });
    }

    return <LoginView
        setLogin={setLogin}
        setPassword={setPassword}
        wrongPassword={wrongPassword}
        authorize={authorize}
    ></LoginView>
}

export default LoginController
