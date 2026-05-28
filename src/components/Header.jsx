// src/components/Header.jsx
// Barra superior del panel. Muestra el nombre del anfitrión,
// su turno activo, y el botón de cerrar sesión.

import { useNavigate } from 'react-router-dom'
import { UtensilsCrossed, LogOut, Moon, Sun, Sunset } from 'lucide-react'
import { obtenerSesion, cerrarSesion } from '../utils/localStorage'
import './Header.css'

// Ícono según el turno del anfitrión
const iconoTurno = (turno) => {
  switch (turno) {
    case 'Mañana': return <Sun size={13} />
    case 'Tarde':  return <Sunset size={13} />
    case 'Noche':  return <Moon size={13} />
    default:       return null
  }
}

const Header = () => {
  const navigate = useNavigate()
  const sesion = obtenerSesion()

  const handleLogout = () => {
    cerrarSesion()
    navigate('/login', { replace: true })
  }

  return (
    <header className="header">
      {/* Logo */}
      <div className="header-logo">
        <UtensilsCrossed size={20} color="var(--amber-400)" />
        <span className="header-logo-text">
          Table<strong>Track</strong>
        </span>
      </div>

      {/* Info del anfitrión + logout */}
      <div className="header-right">
        {sesion && (
          <>
            {/* Nombre y turno del anfitrión activo */}
            <div className="header-host">
              <span className="host-name">{sesion.nombre}</span>
              <span className="host-turno">
                {iconoTurno(sesion.turno)}
                Turno {sesion.turno}
              </span>
            </div>

            {/* Separador visual */}
            <div className="header-divider" />

            {/* Botón cerrar sesión */}
            <button
              className="btn btn-ghost btn-logout"
              onClick={handleLogout}
              title="Cerrar sesión"
            >
              <LogOut size={15} />
              <span className="hide-mobile">Cerrar sesión</span>
            </button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
