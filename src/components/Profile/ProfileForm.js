import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
const ProfileForm = () => {
  const newPasswordRef = useRef()
  const { token } = useContext(AuthContext)
  const history = useHistory()
  const submitHandler = (e) => {
    e.preventDefault()
    const newPassword = newPasswordRef.current.value

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBWWfW_5MR5cXuXnuE16kWYHtlQTLwtxfM', {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: newPassword,
        returnSecureToken: false
      }),
      headers: { 'Content-Type': 'application/json' }

    }).then((res) => {

      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Something went wrong')
      }
    }).then((data) => {
      console.log(data)
      history.replace('/')

    }).catch((err) => {
      console.log(err)
    })

  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} minLength='7' type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
