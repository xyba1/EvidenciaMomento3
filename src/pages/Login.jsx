// src/pages/Login.jsx
// Módulo de ingreso del anfitrión.
// Guarda nombre y turno en LocalStorage y redirige al panel.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UtensilsCrossed, Clock, Users, BarChart2, Loader2 } from 'lucide-react'
import { guardarSesion, haySesion } from '../utils/localStorage'
import { alertaError } from '../utils/alerts'
import './Login.css'
import { Navigate } from 'react-router-dom'

// Turnos disponibles para el anfitrión
const TURNOS = ['Mañana', 'Tarde', 'Noche']

// Características decorativas del panel izquierdo
const FEATURES = [
  { icon: <Users size={16} />, texto: 'Gestión de reservas en tiempo real' },
  { icon: <Clock size={16} />, texto: 'Control de turnos por anfitrión' },
  { icon: <BarChart2 size={16} />, texto: 'Seguimiento de estado de mesas' },
]

const Login = () => {
  // Si ya hay sesión activa, redirige directo al panel
  if (haySesion()) return <Navigate to="/panel" replace />

  const [nombre, setNombre] = useState('')
  const [turno, setTurno] = useState('')
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación de campos
    if (!nombre.trim()) {
      alertaError('Nombre requerido', 'Por favor ingresa tu nombre completo')
      return
    }
    if (!turno) {
      alertaError('Turno requerido', 'Selecciona el turno que vas a cubrir')
      return
    }

    setCargando(true)

    // Simular breve carga para mejor UX
    setTimeout(() => {
      // Guardar sesión en LocalStorage
      guardarSesion({ nombre: nombre.trim(), turno })
      navigate('/panel')
    }, 600)
  }

  return (
    <div className="login-page">

      {/* ── Panel decorativo izquierdo ── */}
      <div className="login-deco">
        <div className="deco-grid" />
        <div className="deco-content">
          {/* Logo */}
          <div className="deco-logo">
            Table<span>Track</span>
          </div>
          <p className="deco-tagline">Gestor de Reservas</p>

          {/* Features */}
          <div className="deco-features">
            {FEATURES.map((f, i) => (
              <div className="deco-feature" key={i}>
                <div className="deco-feature-icon">{f.icon}</div>
                <span>{f.texto}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Panel del formulario ── */}
      <div className="login-form-panel">
        <div className="login-form-wrapper">

          {/* Ícono del logo en móvil */}
          <UtensilsCrossed
            size={32}
            color="var(--amber-400)"
            style={{ marginBottom: 20 }}
            className="hide-desktop"
          />

          <h1 className="login-title">Bienvenido</h1>
          <p className="login-subtitle">
            Registra tu turno para comenzar a gestionar las reservas
          </p>

          <form className="login-form" onSubmit={handleSubmit}>

            {/* Campo nombre */}
            <div className="input-group">
              <label className="input-label" htmlFor="nombre">
                Nombre completo
              </label>
              <input
                id="nombre"
                className="input"
                type="text"
                placeholder="Ej: María González"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                autoFocus
              />
            </div>

            {/* Selector de turno */}
            <div className="input-group">
              <label className="input-label">Turno</label>
              <div className="turno-grid">
                {TURNOS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`turno-btn ${turno === t ? 'active' : ''}`}
                    onClick={() => setTurno(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de ingreso */}
            <button
              type="submit"
              className="btn btn-primary login-btn"
              disabled={cargando}
            >
              {cargando ? (
                <>
                  <Loader2 size={16} className="spinner-icon" />
                  Ingresando...
                </>
              ) : (
                'Ingresar al panel'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
