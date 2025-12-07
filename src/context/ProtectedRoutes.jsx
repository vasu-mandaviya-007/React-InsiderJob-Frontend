import React, { useContext } from "react"
import { AppContext } from "./AppContext"
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, roles }) => {

     const { Role } = useContext(AppContext);

     if (Role && !roles.includes(Role)) {
          console.log(Role)
          return (
               roles.includes('user')
                    ?
                    <Navigate to="/recruiter" />
                    :
                    <Navigate to="/" />

          )
     }
     return children;

}

export default ProtectedRoute;