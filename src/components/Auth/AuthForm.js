import { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoding]=useState(false);
  const emailInputRef=useRef();
  const passwordInputRef=useRef();

  const Ctx=useContext(AuthContext);

  const history=useHistory();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value;
    const enteredPassword=passwordInputRef.current.value;
    setIsLoding(true)
    let url;
    if(isLogin){
      console.log(isLogin);
      //here we are logic the credential data
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDa_jbUsg5x1ywvKesSXurNjxjYY7Hn2BU'
    } else{
      console.log(isLogin);
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
    .then((res)=> {
      setIsLoding(false)
      if(res.ok){
        //... 
        console.log("response is ok guru");
        return res.json();
      }else{
       return res.json().then(data=>{
          let errorMessage='Authentication failed!';
          console.log("This things comming over hre");
         
          throw new Error(errorMessage)
        })
      }
    }).then(data=>{
      console.log(typeof(+data.expiresIn));
      history.push('/');
      Ctx.login(data.idToken)
    }).catch(err =>{
      console.log("this one is not fair")
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
