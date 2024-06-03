import './App.css'
import { Toaster } from 'react-hot-toast'
import { Router } from './routes/Router'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div>
        <a href="https://frameonesoftware.com" target="_blank">
          <img src="/logo.png" className="logo" alt="Frame One Software Logo" />
        </a>
      </div>
      <div>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
