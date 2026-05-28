// src/App.jsx — Configuración principal del enrutador
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
