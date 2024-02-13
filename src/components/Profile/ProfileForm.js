import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const passwordInpurRef=useRef();
  const Ctx=useContext(AuthContext)

  console.log(Ctx.token);

  
  const passwordHandler=(event)=>{
    event.preventDefault();
    let enteredPassword=passwordInpurRef.current.value;
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDa_jbUsg5x1ywvKesSXurNjxjYY7Hn2BU',
    {
      method:'POST',
      body:JSON.stringify({
        idToken:Ctx.token,
        password:enteredPassword,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    ).then(res=>{
      return res.json()
    }).then(data=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <form className={classes.form} onSubmit={passwordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordInpurRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
