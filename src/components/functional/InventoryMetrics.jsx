import React from 'react'

export function InventoryMetrics({ metrics }) {
  const { totalItems, totalUnits, totalValuation, lowStockCount, outOfStockCount } = metrics

  const formattedValuation = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(totalValuation || 0)

  return (
    <section className="metrics-grid">
      <div className="metric-card">
        <div className="metric-icon metric-icon-blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
        <div className="metric-details">
          <span className="metric-label">Total Unique Products</span>
          <strong className="metric-value">{totalItems}</strong>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon metric-icon-emerald">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>
        <div className="metric-details">
          <span className="metric-label">Total Units in Stock</span>
          <strong className="metric-value">{totalUnits}</strong>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon metric-icon-indigo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </div>
        <div className="metric-details">
          <span className="metric-label">Inventory Valuation</span>
          <strong className="metric-value">{formattedValuation}</strong>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon metric-icon-amber">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="metric-details">
          <span className="metric-label">Low Stock Warnings</span>
          <strong className="metric-value">{lowStockCount}</strong>
        </div>
      </div>

      <div className="metric-card">
        <div className="metric-icon metric-icon-rose">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </div>
        <div className="metric-details">
          <span className="metric-label">Out of Stock</span>
          <strong className="metric-value">{outOfStockCount}</strong>
        </div>
      </div>
    </section>
  )
}

export default InventoryMetrics
