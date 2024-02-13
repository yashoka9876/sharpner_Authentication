import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoding]=useState(false);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  const Ctx=useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault();
    console.log("hai")
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    setIsLoding(true)
    let url;
    if(isLogin){
      //here we are logic the credential data
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDa_jbUsg5x1ywvKesSXurNjxjYY7Hn2BU'
    } else{
      // This one is when use create the stuff
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDa_jbUsg5x1ywvKesSXurNjxjYY7Hn2BU'
    }

    //here we will handle both signup and signin 

    fetch(url,
    {
      method:'POST',
      body:JSON.stringify({
        email:enteredEmail,
        password:enteredPassword,
        returnSecureToken:true
      }),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res=> {
      setIsLoding(false)
      if(res.ok){
        //... 
        return res.json();
      }else{
       return res.json().then(data=>{
          let errorMessage='Authentication failed!';
          // if(data && data.error && data.error.message){
          //   errorMessage=data.error.message;
          // } 
         
          throw new Error(errorMessage)
        })
      }
    }).then(data=>{
      Ctx.login(data.idToken)
    }).catch(err =>{
      alert(err.errorMessage)
    });


  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
       {!isLoading && <button>{isLogin ? 'Logic': 'Sinup'}</button>}
       {isLoading && <p>Loading......</p>}
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
