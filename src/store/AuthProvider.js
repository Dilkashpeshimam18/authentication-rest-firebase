import React, { useState } from 'react'
import AuthContext from './auth-context'

const AuthProvider = (props) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null
    })
    const userIsLoggedIn = !!token

    const login = (token, expiredTime) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem('token')
    }

    const authValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: login,
        logout: logout
    }
    return <AuthContext.Provider value={authValue}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthProvider