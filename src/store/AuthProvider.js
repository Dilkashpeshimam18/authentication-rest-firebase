import React, { useState } from 'react'
import AuthContext from './auth-context'
import { useHistory } from 'react-router-dom'

const AuthProvider = (props) => {
    const [token, setToken] = useState(null)
    const userIsLoggedIn = !!token

    const login = (token) => {
        setToken(token)
    }

    const logout = () => {
        setToken(null)
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