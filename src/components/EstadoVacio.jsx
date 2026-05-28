// src/components/EstadoVacio.jsx
// Ilustración y mensaje cuando no hay reservas que mostrar.

import { CalendarOff } from 'lucide-react'
import './EstadoVacio.css'

const EstadoVacio = ({ filtroActivo, onNuevaReserva }) => (
  <div className="vacio-container">
    <div className="vacio-icon">
      <CalendarOff size={36} color="var(--text-muted)" />
    </div>
    <h3 className="vacio-titulo">
      {filtroActivo !== 'Todas'
        ? `Sin reservas "${filtroActivo}"`
        : 'No hay reservas aún'}
    </h3>
    <p className="vacio-desc">
      {filtroActivo !== 'Todas'
        ? 'No hay reservas con este estado en este momento.'
        : 'Crea la primera reserva del turno para comenzar.'}
    </p>
    {filtroActivo === 'Todas' && (
      <button className="btn btn-primary" onClick={onNuevaReserva}>
        Crear primera reserva
      </button>
    )}
  </div>
)

export default EstadoVacio
