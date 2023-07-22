import axios from '../src/api/axios';
import useAuth from './useAuth'


async function useRefreshToken() {
    const {setAuth} = useAuth();

    const response = await axios.get("/v1/refresh", {
        withCredentials:true
    })

    setAuth(prev => {
        return {
            ...prev,
            accessToken: response.data.accessToken, 
        }

    })

    return response.data.access.token;
}

export default useRefreshToken