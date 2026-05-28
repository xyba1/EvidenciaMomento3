// src/pages/Panel.jsx
// Panel principal de gestión de reservas.
// Implementa CRUD completo: GET, POST, PUT, DELETE con la API.
// Incluye filtros por estado, skeletons, y manejo de errores.

import { useState, useEffect, useCallback } from 'react'
import { Plus, RefreshCw, Loader2 } from 'lucide-react'
import Header from '../components/Header'
import TarjetaReserva from '../components/TarjetaReserva'
import FormularioReserva from '../components/FormularioReserva'
import SkeletonReserva from '../components/SkeletonReserva'
import EstadoVacio from '../components/EstadoVacio'
import {
  obtenerReservas,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} from '../services/reservasService'
import { confirmarEliminacion, alertaExito, alertaError } from '../utils/alerts'
import { obtenerSesion } from '../utils/localStorage'
import './Panel.css'

// Opciones de filtro por estado
const FILTROS = ['Todas', 'Confirmada', 'En Espera', 'Finalizada']

const Panel = () => {
  // ── Estado principal ─────────────────────────────────────
  const [reservas, setReservas]           = useState([])
  const [cargando, setCargando]           = useState(true)      // carga inicial
  const [guardando, setGuardando]         = useState(false)     // POST/PUT en progreso
  const [error, setError]                 = useState(null)      // error de API
  const [filtro, setFiltro]               = useState('Todas')   // filtro activo
  const [modalAbierto, setModalAbierto]   = useState(false)
  const [reservaEditar, setReservaEditar] = useState(null)      // null = nueva reserva

  const sesion = obtenerSesion()

  // ── GET: Cargar todas las reservas ───────────────────────
  const cargarReservas = useCallback(async () => {
    setCargando(true)
    setError(null)
    try {
      const data = await obtenerReservas()
      setReservas(data)
    } catch (err) {
      setError('No se pudo conectar con el servidor. Verifica tu API.')
      console.error('Error al cargar reservas:', err)
    } finally {
      setCargando(false)
    }
  }, [])

  // Carga inicial al montar el componente
  useEffect(() => {
    cargarReservas()
  }, [cargarReservas])

  // ── POST / PUT: Guardar reserva (crear o editar) ─────────
  const handleGuardar = async (datos) => {
    setGuardando(true)
    try {
      if (reservaEditar) {
        // Actualizar reserva existente (PUT)
        const actualizada = await actualizarReserva(reservaEditar.id, datos)
        setReservas(prev =>
          prev.map(r => r.id === reservaEditar.id ? actualizada : r)
        )
        alertaExito('¡Reserva actualizada!', `Los datos de ${datos.nombreCliente} fueron guardados`)
      } else {
        // Crear nueva reserva (POST)
        const nueva = await crearReserva(datos)
        setReservas(prev => [nueva, ...prev])
        alertaExito('¡Reserva creada!', `Reserva para ${datos.nombreCliente} registrada`)
      }
      cerrarModal()
    } catch (err) {
      alertaError('Error al guardar', err.message)
    } finally {
      setGuardando(false)
    }
  }

  // ── PUT especial: Marcar como Finalizada ─────────────────
  const handleFinalizar = async (reserva) => {
    try {
      const actualizada = await actualizarReserva(reserva.id, { ...reserva, estado: 'Finalizada' })
      setReservas(prev =>
        prev.map(r => r.id === reserva.id ? actualizada : r)
      )
      alertaExito('Mesa finalizada', `La reserva de ${reserva.nombreCliente} fue marcada como finalizada`)
    } catch (err) {
      alertaError('Error', err.message)
    }
  }

  // ── DELETE: Eliminar reserva con confirmación ────────────
  const handleEliminar = async (reserva) => {
    // Confirmación obligatoria con SweetAlert2 (según spec)
    const confirmado = await confirmarEliminacion(reserva.nombreCliente)
    if (!confirmado) return

    try {
      await eliminarReserva(reserva.id)
      setReservas(prev => prev.filter(r => r.id !== reserva.id))
      alertaExito('Reserva cancelada', `La reserva de ${reserva.nombreCliente} fue eliminada`)
    } catch (err) {
      alertaError('Error al eliminar', err.message)
    }
  }

  // ── Modal helpers ────────────────────────────────────────
  const abrirModalNuevo = () => {
    setReservaEditar(null)
    setModalAbierto(true)
  }

  const abrirModalEditar = (reserva) => {
    setReservaEditar(reserva)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setReservaEditar(null)
  }

  // ── Filtrado en cliente (PLUS según spec) ────────────────
  const reservasFiltradas = filtro === 'Todas'
    ? reservas
    : reservas.filter(r => r.estado === filtro)

  // ── Estadísticas rápidas ─────────────────────────────────
  const stats = {
    total:      reservas.length,
    confirmada: reservas.filter(r => r.estado === 'Confirmada').length,
    espera:     reservas.filter(r => r.estado === 'En Espera').length,
    finalizada: reservas.filter(r => r.estado === 'Finalizada').length,
  }

  return (
    <div className="panel-page">
      {/* Barra superior */}
      <Header />

      <main className="panel-main">

        {/* ── Bienvenida + stats ── */}
        <section className="panel-top animate-in">
          <div>
            <h1 className="panel-titulo">
              Turno {sesion?.turno}
            </h1>
            <p className="panel-subtitulo">
              Bienvenido, <span className="text-accent">{sesion?.nombre}</span>
            </p>
          </div>

          {/* Tarjetas de estadísticas */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-numero">{stats.total}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card stat-confirmada">
              <span className="stat-numero">{stats.confirmada}</span>
              <span className="stat-label">Confirmadas</span>
            </div>
            <div className="stat-card stat-espera">
              <span className="stat-numero">{stats.espera}</span>
              <span className="stat-label">En espera</span>
            </div>
            <div className="stat-card stat-finalizada">
              <span className="stat-numero">{stats.finalizada}</span>
              <span className="stat-label">Finalizadas</span>
            </div>
          </div>
        </section>

        {/* ── Barra de acciones + filtros ── */}
        <section className="panel-toolbar animate-in" style={{ animationDelay: '0.1s' }}>
          {/* Filtros por estado */}
          <div className="filtros">
            {FILTROS.map(f => (
              <button
                key={f}
                className={`filtro-btn ${filtro === f ? 'active' : ''}`}
                onClick={() => setFiltro(f)}
              >
                {f}
                {f !== 'Todas' && (
                  <span className="filtro-count">
                    {f === 'Confirmada' && stats.confirmada}
                    {f === 'En Espera'  && stats.espera}
                    {f === 'Finalizada' && stats.finalizada}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Acciones */}
          <div className="toolbar-acciones">
            {/* Refrescar */}
            <button
              className="btn btn-ghost"
              onClick={cargarReservas}
              disabled={cargando}
              title="Recargar reservas"
            >
              {cargando
                ? <Loader2 size={15} className="spin" />
                : <RefreshCw size={15} />
              }
              <span className="hide-mobile">Actualizar</span>
            </button>

            {/* Nueva reserva */}
            <button className="btn btn-primary" onClick={abrirModalNuevo}>
              <Plus size={16} />
              Nueva reserva
            </button>
          </div>
        </section>

        {/* ── Error de API ── */}
        {error && (
          <div className="error-banner animate-in">
            <span>⚠️ {error}</span>
            <button className="btn btn-ghost btn-sm" onClick={cargarReservas}>
              Reintentar
            </button>
          </div>
        )}

        {/* ── Grid de reservas ── */}
        <section
          className="reservas-grid animate-in"
          style={{ animationDelay: '0.15s' }}
        >
          {/* Skeletons durante la carga inicial */}
          {cargando && Array.from({ length: 6 }).map((_, i) => (
            <SkeletonReserva key={i} />
          ))}

          {/* Lista de reservas filtradas */}
          {!cargando && reservasFiltradas.map(reserva => (
            <TarjetaReserva
              key={reserva.id}
              reserva={reserva}
              onEditar={abrirModalEditar}
              onEliminar={handleEliminar}
              onFinalizar={handleFinalizar}
            />
          ))}

          {/* Estado vacío */}
          {!cargando && reservasFiltradas.length === 0 && !error && (
            <EstadoVacio
              filtroActivo={filtro}
              onNuevaReserva={abrirModalNuevo}
            />
          )}
        </section>
      </main>

      {/* ── Modal de crear / editar ── */}
      {modalAbierto && (
        <FormularioReserva
          reservaEditar={reservaEditar}
          onGuardar={handleGuardar}
          onCerrar={cerrarModal}
          cargando={guardando}
        />
      )}
    </div>
  )
}

export default Panel
