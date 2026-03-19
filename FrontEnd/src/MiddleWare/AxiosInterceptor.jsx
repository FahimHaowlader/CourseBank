import { useEffect } from "react";
import PrivateApi from "../Hooks/PrivateApi";
import { useAuth } from "../Contexts/Auth.Context.jsx";

const AxiosInterceptor = ({ children }) => {
    const { logOut } = useAuth(); // Using the logOut function from your Context

    useEffect(() => {
        // --- 1. REQUEST INTERCEPTOR ---
        const requestInterceptor = PrivateApi.interceptors.request.use(
            (config) => {
                // Add a custom header or log "Hello"
                console.log("Hello! Request is being sent to:", config.url);
                
                // Example: Adding a custom header named 'X-Greeting'
                config.headers['X-Greeting'] = 'Hello-From-React';
                
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // --- 2. RESPONSE INTERCEPTOR ---
        const responseInterceptor = PrivateApi.interceptors.response.use(
            (response) => {
                // Any status code 2xx triggers this
                return response;
            },
            (error) => {
                // Handle 401 Unauthorized (Expired Token)
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized! Calling logOut...");
                    logOut(); // This clears your user state and redirects
                }
                return Promise.reject(error);
            }
        );

        // --- 3. CLEANUP ---
        return () => {
            PrivateApi.interceptors.request.eject(requestInterceptor);
            PrivateApi.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut]); // Fixed: logOut is the dependency here

    return children;
};

export default AxiosInterceptor;