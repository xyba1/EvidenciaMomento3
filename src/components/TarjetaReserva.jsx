// src/components/TarjetaReserva.jsx
// Tarjeta individual de reserva con todas sus acciones.
// Muestra info del cliente, estado, y botones de acción.

import { Users, Calendar, Pencil, Trash2, CheckCircle } from 'lucide-react'
import './TarjetaReserva.css'

// Formato de fecha legible
const formatearFecha = (fechaStr) => {
  try {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleString('es-CO', {
      day: '2-digit', month: 'short',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return fechaStr
  }
}

// Badge de estado con color según el valor
const BadgeEstado = ({ estado }) => {
  const clases = {
    'Confirmada': 'badge badge-confirmada',
    'En Espera':  'badge badge-espera',
    'Finalizada': 'badge badge-finalizada',
  }
  const puntos = {
    'Confirmada': '●',
    'En Espera':  '●',
    'Finalizada': '●',
  }

  return (
    <span className={clases[estado] || 'badge'}>
      {puntos[estado]} {estado}
    </span>
  )
}

const TarjetaReserva = ({ reserva, onEditar, onEliminar, onFinalizar }) => {
  const { nombreCliente, fechaHora, cantidadPersonas, estado } = reserva

  return (
    <div className={`tarjeta-reserva animate-in ${estado === 'Finalizada' ? 'finalizada' : ''}`}>

      {/* Encabezado: nombre + estado */}
      <div className="tarjeta-header">
        <h3 className="tarjeta-nombre">{nombreCliente}</h3>
        <BadgeEstado estado={estado} />
      </div>

      {/* Detalles */}
      <div className="tarjeta-detalles">
        <div className="tarjeta-detalle">
          <Calendar size={14} />
          <span>{formatearFecha(fechaHora)}</span>
        </div>
        <div className="tarjeta-detalle">
          <Users size={14} />
          <span>{cantidadPersonas} {cantidadPersonas === 1 ? 'persona' : 'personas'}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="tarjeta-acciones">
        {/* Marcar como finalizada (solo si no está finalizada) */}
        {estado !== 'Finalizada' && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onFinalizar(reserva)}
            title="Marcar como finalizada"
          >
            <CheckCircle size={14} />
            <span>Finalizar</span>
          </button>
        )}

        {/* Editar */}
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => onEditar(reserva)}
          title="Editar reserva"
        >
          <Pencil size={14} />
          <span className="hide-mobile">Editar</span>
        </button>

        {/* Eliminar */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onEliminar(reserva)}
          title="Cancelar reserva"
        >
          <Trash2 size={14} />
          <span className="hide-mobile">Cancelar</span>
        </button>
      </div>
    </div>
  )
}

export default TarjetaReserva
