// src/services/reservasService.js
// Servicio de API para el CRUD de reservas
// Utiliza MockAPI como backend simulado

// ⚠️ IMPORTANTE: Reemplaza esta URL con tu propia URL de MockAPI
// Crea tu recurso en https://mockapi.io con los campos:
// id, nombreCliente, fechaHora, cantidadPersonas, estado
const BASE_URL = 'https://6a17aced1878294b597bb9be.mockapi.io/api/v1'

/**
 * Manejo centralizado de errores de fetch
 */
const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.text().catch(() => 'Error desconocido')
    throw new Error(`Error ${res.status}: ${error}`)
  }
  return res.json()
}

/**
 * GET — Obtener todas las reservas
 * @returns {Promise<Reserva[]>}
 */
export const obtenerReservas = async () => {
  const res = await fetch(`${BASE_URL}/reservas`)
  return handleResponse(res)
}

/**
 * POST — Crear una nueva reserva
 * @param {{ nombreCliente, fechaHora, cantidadPersonas, estado }} datos
 * @returns {Promise<Reserva>}
 */
export const crearReserva = async (datos) => {
  const res = await fetch(`${BASE_URL}/reservas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  return handleResponse(res)
}

/**
 * PUT — Actualizar una reserva existente
 * @param {string} id
 * @param {Partial<Reserva>} datos
 * @returns {Promise<Reserva>}
 */
export const actualizarReserva = async (id, datos) => {
  const res = await fetch(`${BASE_URL}/reservas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  return handleResponse(res)
}

/**
 * DELETE — Eliminar una reserva
 * @param {string} id
 * @returns {Promise<void>}
 */
export const eliminarReserva = async (id) => {
  const res = await fetch(`${BASE_URL}/reservas/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}
