/* eslint-disable react/prop-types */

import useAuth from '../../hook/useAuth'

import {   Navigate,  useLocation} from 'react-router-dom';




function RequestPrivate({children, roles}) {
    const location = useLocation();
    const {auth} = useAuth();
    
    if((auth?.accessToken) && (roles.find((role) => auth?.role === role))){
        return (
            children
        )
    
    }else if((auth?.accessToken) &&  !(roles.find((role) => auth?.role === role))){
        
       return <Navigate to="/unauthorized" state={{from:location}} replace></Navigate>
        
    }else{
        return <Navigate to="/login" state={{from:location}} replace></Navigate>
    }

}

export default RequestPrivate