import { useEffect } from "react";
import PrivateApi from "../hooks/PrivateApi"; // Double check folder casing!

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
                // Handle 401 Unauthorized globally without logging out
                if (error.response && error.response.status === 401) {
                    console.warn(`Unauthorized access attempt to: ${error.config.url}`);
                    // You can trigger a localized alert, clear an explicit token string, 
                    // or do nothing and let the component catch the error.
                }
                return Promise.reject(error);
            }
        );

        // --- 3. CLEANUP ON UNMOUNT ---
        return () => {
            PrivateApi.interceptors.request.eject(requestInterceptor);
            PrivateApi.interceptors.response.eject(responseInterceptor);
        };
    }, []); // Empty array means this attaches exactly once on app boot

    return children;
};

export default AxiosInterceptor;