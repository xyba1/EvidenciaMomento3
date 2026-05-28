// src/utils/alerts.js
// Configuraciones de SweetAlert2 con el tema de la app

import Swal from 'sweetalert2'

// Configuración base del tema oscuro
const baseConfig = {
  background: '#1a1a20',
  color: '#f5f4f0',
  confirmButtonColor: '#f59e0b',
  cancelButtonColor: '#374151',
  customClass: {
    popup: 'swal-custom-popup',
  },
}

/**
 * Confirmación de eliminación con SweetAlert2 (OBLIGATORIO según spec)
 * @param {string} nombreCliente
 * @returns {Promise<boolean>}
 */
export const confirmarEliminacion = async (nombreCliente) => {
  const result = await Swal.fire({
    ...baseConfig,
    title: '¿Cancelar reserva?',
    html: `<p style="color:#9c9a94;font-size:0.95rem">
      ¿Estás seguro de cancelar la reserva de <strong style="color:#f5f4f0">${nombreCliente}</strong>?
      <br/><br/>Esta acción no se puede deshacer.
    </p>`,
    icon: 'warning',
    iconColor: '#f59e0b',
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar reserva',
    cancelButtonText: 'Volver',
    reverseButtons: true,
  })
  return result.isConfirmed
}

/**
 * Alerta de éxito
 * @param {string} titulo
 * @param {string} mensaje
 */
export const alertaExito = (titulo, mensaje) => {
  Swal.fire({
    ...baseConfig,
    title: titulo,
    text: mensaje,
    icon: 'success',
    iconColor: '#10b981',
    timer: 2000,
    showConfirmButton: false,
  })
}

/**
 * Alerta de error
 * @param {string} titulo
 * @param {string} mensaje
 */
export const alertaError = (titulo, mensaje) => {
  Swal.fire({
    ...baseConfig,
    title: titulo,
    text: mensaje,
    icon: 'error',
    iconColor: '#ef4444',
    confirmButtonText: 'Entendido',
  })
}

/**
 * Alerta de éxito con redireccion
 */
export const alertaExitoRedirigir = (titulo, mensaje, ruta, navigate) => {
  Swal.fire({
    ...baseConfig,
    title: titulo,
    text: mensaje,
    icon: 'success',
    iconColor: '#10b981',
    timer: 1800,
    showConfirmButton: false,
  }).then(() => navigate(ruta))
}
