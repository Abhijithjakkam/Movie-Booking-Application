import { Outlet, Navigate } from 'react-router-dom'
import { getAuthToken } from './accountService';
const PrivateRoutes = () => {


    const user = getAuthToken();
    
    return(
        user ? <Outlet/> : <Navigate to="/login"/>
    )
}
export default PrivateRoutes