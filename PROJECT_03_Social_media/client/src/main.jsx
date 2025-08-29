import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx';
import {ToastContainer} from 'react-toastify'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
       <App/>
       <ToastContainer position="top-center"/>
  </UserProvider>
  </BrowserRouter>
)
