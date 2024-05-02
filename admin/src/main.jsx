import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MessageContextProvider from './Context/MessageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MessageContextProvider>
    <React.StrictMode>  
        <App />      
    </React.StrictMode>
  </MessageContextProvider>
)
