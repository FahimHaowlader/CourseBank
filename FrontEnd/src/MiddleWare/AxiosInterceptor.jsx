import { useEffect } from "react";
import PrivateApi from "../Hooks/PrivateApi";

const AxiosInterceptor = ({ children }) => {

    useEffect(() => {
        // --- 1. REQUEST INTERCEPTOR ---
        const requestInterceptor = PrivateApi.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // --- 2. RESPONSE INTERCEPTOR ---
        const responseInterceptor = PrivateApi.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                // 🛡️ Guard: If the 401 happened during a logout request, swallow it cleanly
                if (error.config?.url?.includes('/logout')) {
                    return Promise.reject(error);
                }

                // Handle 401 Unauthorized globally without forcing a loop
                if (error.response && error.response.status === 401) {
                    console.warn(`[401 Unauthorized] Access restricted for endpoint: ${error.config.url}`);
                    
                    // Safe spot for global side-effects if needed in the future, 
                    // like clearing local storage cache structures.
                }
                
                return Promise.reject(error);
            }
        );

        // --- 3. CLEANUP ON UNMOUNT ---
        return () => {
            PrivateApi.interceptors.request.eject(requestInterceptor);
            PrivateApi.interceptors.response.eject(responseInterceptor);
        };
    }, []); // Attaches seamlessly once on application boot

    return children;
};

export default AxiosInterceptor;