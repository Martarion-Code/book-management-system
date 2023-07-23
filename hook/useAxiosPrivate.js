import { useEffect } from "react";
import { axiosPrivate } from "../src/api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";


const useAxiosPrivate = async  () =>{
    const refreshToken =  useRefreshToken();
    const {auth} = useAuth();
    useEffect(() => {
        
       const requestInterceptor = axiosPrivate.interceptors.request.use(config => 
            {
            if(!config.headers?.Authorization){
                config.headers.Authorization = "Bearer " + auth?.accessToken; 
            }
            return config;
        }, error => Promise.reject(error));

        const responseInterceptor = axiosPrivate.interceptors.response.use(response =>response, async error =>{
            const prevRequest = error?.config
            if(error?.response?.status === 403 && !prevRequest.sent){
                prevRequest.sent = true;
                const newAccessToken = await refreshToken();
                prevRequest.headers['Authorization'] = "Bearer " + newAccessToken;
                return axiosPrivate(prevRequest);

            }
            return Promise.reject(error);
        })
        
    
      return () => {
        axiosPrivate.interceptors.request.eject();
        axiosPrivate.interceptors.response.eject();
      }
    }, [])
    
}


export default useAxiosPrivate;