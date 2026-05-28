// src/router/RutaProtegida.jsx
// Componente que protege rutas privadas.
// Si no hay sesión activa en LocalStorage, redirige al login.

import { Navigate } from 'react-router-dom'
import { haySesion } from '../utils/localStorage'

/**
 * Envuelve rutas que requieren sesión activa.
 * Si no hay sesión → redirige a /login automáticamente.
 */
const RutaProtegida = ({ children }) => {
  if (!haySesion()) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default RutaProtegida
