// src/utils/localStorage.js
// Utilidades para manejar la sesión del anfitrión en LocalStorage

const SESSION_KEY = 'tabletrack_session'

/**
 * Guarda la sesión del anfitrión en LocalStorage
 * @param {{ nombre: string, turno: string }} datos
 */
export const guardarSesion = (datos) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(datos))
}

/**
 * Obtiene la sesión activa del anfitrión
 * @returns {{ nombre: string, turno: string } | null}
 */
export const obtenerSesion = () => {
  const data = localStorage.getItem(SESSION_KEY)
  return data ? JSON.parse(data) : null
}

/**
 * Verifica si hay una sesión activa
 * @returns {boolean}
 */
export const haySesion = () => {
  return localStorage.getItem(SESSION_KEY) !== null
}

/**
 * Elimina la sesión activa (logout)
 */
export const cerrarSesion = () => {
  localStorage.removeItem(SESSION_KEY)
}
