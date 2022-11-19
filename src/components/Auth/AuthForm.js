import React, { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    let url;
    setIsLoading(true)
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWWfW_5MR5cXuXnuE16kWYHtlQTLwtxfM'


    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWWfW_5MR5cXuXnuE16kWYHtlQTLwtxfM'

    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then((res) => {
      setIsLoading(false)
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then((data) => {
          let errorMessage = 'Authentication Failed'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          throw new Error(errorMessage)
        })
      }
    }).then((data) => {
      console.log(data)
    }).catch((err) => {
      alert(err.message)

    })
  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading &&
            <button>
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          }
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
