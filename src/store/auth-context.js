import React, { Children, useState } from "react"

const AuthContext=React.createContext({
    token:'',
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{}
})

//chote veer this one is nother but component here whcih you will 
//return here to overlap <App/> component

export const AuthContextProvider = (props)=>{
    const [token,setToken]=useState(null)

    const userIsLoggedIn=!!token;

    const loginHandler = (token)=>{
        setToken(token)
        console.log(token);
    }

    const logoutHandler= ()=>{
        setToken(null)
    }
    

    return <AuthContext.Provider value={{
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;