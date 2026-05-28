// src/components/SkeletonReserva.jsx
// Tarjeta esqueleto que se muestra mientras cargan las reservas.
// Mejora la percepción de carga (UX).

import './SkeletonReserva.css'

const SkeletonReserva = () => (
  <div className="skeleton-card">
    <div className="skeleton-header">
      <div className="skeleton skeleton-nombre" />
      <div className="skeleton skeleton-badge" />
    </div>
    <div className="skeleton skeleton-line" />
    <div className="skeleton skeleton-line-short" />
    <div className="skeleton-actions">
      <div className="skeleton skeleton-btn" />
      <div className="skeleton skeleton-btn" />
    </div>
  </div>
)

export default SkeletonReserva
