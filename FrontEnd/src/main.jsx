import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AxiosInterceptor from './MiddleWare/AxiosInterceptor.jsx';
import {AuthProvider} from './Contexts/Auth.Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AxiosInterceptor>
      <App />
      </AxiosInterceptor>
    </AuthProvider>
  </StrictMode>,
)
