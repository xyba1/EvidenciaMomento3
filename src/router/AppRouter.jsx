// src/router/AppRouter.jsx
// Configuración central de rutas de la aplicación

import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Panel from '../pages/Panel'
import RutaProtegida from './RutaProtegida'

const AppRouter = () => {
  return (
    <Routes>
      {/* Ruta pública — Login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta protegida — Panel principal de reservas */}
      <Route
        path="/panel"
        element={
          <RutaProtegida>
            <Panel />
          </RutaProtegida>
        }
      />

      {/* Redirección por defecto a login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRouter
