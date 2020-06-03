import React, { useEffect } from 'react'
import ChatsView from './ChatsView'

const ChatsController = () => {
    const getLogin = async (url = '') => {
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


    useEffect(() => {
        getLogin('http://localhost:5000/api/user/login/' + localStorage.getItem('userId'))
            .then((data) => {
                if (!data.hasOwnProperty('login'))
                    window.location = 'http://localhost:3000/'
                else
                    localStorage.setItem('login', data.login)
            });
    }, [])


    return <ChatsView />
}

export default ChatsController
