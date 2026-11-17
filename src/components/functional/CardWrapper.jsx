import React from 'react'

export function CardWrapper({ title, subtitle, action, children, className = '' }) {
  return (
    <div className={`card-wrapper ${className}`}>
      {(title || subtitle || action) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {action && <div className="card-action">{action}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  )
}

export default CardWrapper
