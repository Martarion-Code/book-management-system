import axios from '../src/api/axios';
import useAuth from './useAuth'


 function useRefreshToken() {
    const {setAuth} = useAuth();

    async   function refresh (){
        const response = await axios.get("/v1/refresh", {
            withCredentials:true
        })
        console.log(response.data);
    
        setAuth(prev => {
            return {
                ...prev,
                accessToken: response.data.accessToken, 
                role: response.data.role
            }
    
        })
        return response.data.accessToken;
    }
    return refresh;
}

export default useRefreshToken