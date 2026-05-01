import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { store } from './redux/store.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
        <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1E293B',
                color: '#F1F5F9',
                border: '1px solid #334155',
              },
              success: {
                iconTheme: {
                  primary: '#6C63FF',
                  secondary: '#F1F5F9',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#F1F5F9',
                },
              },
            }}
          />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>
)
