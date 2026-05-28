// src/components/FormularioReserva.jsx
// Modal con formulario para crear o editar una reserva.
// Maneja validaciones y comunica el resultado al componente padre.

import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import './FormularioReserva.css'

// Estados posibles de una reserva
const ESTADOS = ['Confirmada', 'En Espera', 'Finalizada']

const FormularioReserva = ({ reservaEditar, onGuardar, onCerrar, cargando }) => {
  // Estado del formulario — si hay reserva a editar, la pre-carga
  const [form, setForm] = useState({
    nombreCliente: '',
    fechaHora: '',
    cantidadPersonas: '',
    estado: 'Confirmada',
  })

  const [errores, setErrores] = useState({})
  const esEdicion = Boolean(reservaEditar)

  // Pre-carga los datos si se está editando
  useEffect(() => {
    if (reservaEditar) {
      setForm({
        nombreCliente:    reservaEditar.nombreCliente,
        fechaHora:        reservaEditar.fechaHora,
        cantidadPersonas: reservaEditar.cantidadPersonas,
        estado:           reservaEditar.estado,
      })
    }
  }, [reservaEditar])

  // Actualiza el campo correspondiente en el estado
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Limpiar error del campo modificado
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validación de los campos requeridos
  const validar = () => {
    const nuevosErrores = {}

    if (!form.nombreCliente.trim()) {
      nuevosErrores.nombreCliente = 'El nombre del cliente es requerido'
    }
    if (!form.fechaHora) {
      nuevosErrores.fechaHora = 'La fecha y hora son requeridas'
    }
    if (!form.cantidadPersonas || Number(form.cantidadPersonas) < 1) {
      nuevosErrores.cantidadPersonas = 'Ingresa una cantidad válida (mínimo 1)'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validar()) return

    // Envía los datos al componente padre para el fetch
    onGuardar({
      ...form,
      cantidadPersonas: Number(form.cantidadPersonas),
    })
  }

  return (
    // Overlay oscuro del modal
    <div className="modal-overlay" onClick={onCerrar}>
      <div
        className="modal-content animate-in"
        onClick={(e) => e.stopPropagation()} // Evitar cierre al hacer clic dentro
      >
        {/* Encabezado del modal */}
        <div className="modal-header">
          <h2 className="modal-title">
            {esEdicion ? 'Editar reserva' : 'Nueva reserva'}
          </h2>
          <button className="btn btn-ghost modal-close" onClick={onCerrar}>
            <X size={18} />
          </button>
        </div>

        {/* Formulario */}
        <form className="modal-form" onSubmit={handleSubmit}>

          {/* Nombre del cliente */}
          <div className="input-group">
            <label className="input-label" htmlFor="nombreCliente">
              Nombre del cliente *
            </label>
            <input
              id="nombreCliente"
              name="nombreCliente"
              className={`input ${errores.nombreCliente ? 'input-error' : ''}`}
              type="text"
              placeholder="Ej: Carlos Ramírez"
              value={form.nombreCliente}
              onChange={handleChange}
              autoFocus
            />
            {errores.nombreCliente && (
              <span className="error-msg">{errores.nombreCliente}</span>
            )}
          </div>

          {/* Fecha y hora */}
          <div className="input-group">
            <label className="input-label" htmlFor="fechaHora">
              Fecha y hora *
            </label>
            <input
              id="fechaHora"
              name="fechaHora"
              className={`input ${errores.fechaHora ? 'input-error' : ''}`}
              type="datetime-local"
              value={form.fechaHora}
              onChange={handleChange}
            />
            {errores.fechaHora && (
              <span className="error-msg">{errores.fechaHora}</span>
            )}
          </div>

          {/* Cantidad de personas + Estado en fila */}
          <div className="form-row">
            <div className="input-group">
              <label className="input-label" htmlFor="cantidadPersonas">
                Personas *
              </label>
              <input
                id="cantidadPersonas"
                name="cantidadPersonas"
                className={`input ${errores.cantidadPersonas ? 'input-error' : ''}`}
                type="number"
                min="1"
                max="50"
                placeholder="Ej: 4"
                value={form.cantidadPersonas}
                onChange={handleChange}
              />
              {errores.cantidadPersonas && (
                <span className="error-msg">{errores.cantidadPersonas}</span>
              )}
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="estado">Estado</label>
              <select
                id="estado"
                name="estado"
                className="input"
                value={form.estado}
                onChange={handleChange}
              >
                {ESTADOS.map(e => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCerrar}
              disabled={cargando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={cargando}
            >
              {cargando ? (
                <>
                  <Loader2 size={15} />
                  Guardando...
                </>
              ) : (
                esEdicion ? 'Guardar cambios' : 'Crear reserva'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormularioReserva
