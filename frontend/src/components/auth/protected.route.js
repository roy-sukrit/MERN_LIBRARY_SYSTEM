
import {Route,Redirect} from 'react-router-dom'
import React from 'react'
import Auth from './auth'

export const ProtectedRoute  = ({component:Component ,isAuth,...rest}) => {
    return (
        <Route {...rest}
         render={props=>{
             if(isAuth||Auth.isAuthenticated()){
            return <Component {...props} />
             }
             else{
                 return <Redirect to=
                 
                 {{

                    pathname:"/login",
                    state:{
                    from:props.location
                    }
                 
                
                }}
                     
                    
                    />
             }
            
        }}
        />
    );
}
