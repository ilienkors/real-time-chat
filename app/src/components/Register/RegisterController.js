import React, { useState } from 'react'
import RegisterView from './RegisterView'

const RegisterController = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [wrongLogin, setWrongLogin] = useState('start-page__wrong-text')
    const [wrongPassword, setWrongPassword] = useState('start-page__wrong-text')
    const [wrongPasswordText, setWrongPasswordText] = useState('')

    const postUser = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    const register = () => {
        if (password === repeatPassword) {
            if (password.trim() !== '' && repeatPassword.trim() !== '') {
                setWrongPassword('start-page__wrong-text')
                postUser('http://localhost:5000/api/user/register', { login, password })
                    .then((data) => {
                        if (data.message === 'USERNAME_IS_NOT_AVAILABLE') {
                            setWrongPasswordText('Please enter password')
                            setWrongLogin(wrongLogin + ' start-page__wrong-text_show')
                        } else {
                            localStorage.setItem('userId', data.userId)
                            window.location = 'http://localhost:3000/'
                        }
                    });
            } else {
                setWrongPasswordText('Please enter password')
                setWrongPassword(wrongPassword + ' start-page__wrong-text_show')
            }

        } else {
            setWrongPasswordText('Passwords doesn\'t match')
            setWrongPassword(wrongPassword + ' start-page__wrong-text_show')
        }

    }

    return <RegisterView
        setLogin={setLogin}
        setPassword={setPassword}
        setRepeatPassword={setRepeatPassword}
        wrongLogin={wrongLogin}
        wrongPassword={wrongPassword}
        wrongPasswordText={wrongPasswordText}
        register={register}
    ></RegisterView>
}

export default RegisterController
