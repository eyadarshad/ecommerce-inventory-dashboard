import React from 'react'
import ThemeToggle from './ThemeToggle'

export function Header({ totalProducts, lowStockCount }) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <div>
          <h1 className="brand-title">StockFlow Dashboard</h1>
          <p className="brand-tagline">E-Commerce Inventory &amp; Stock Management</p>
        </div>
      </div>

      <div className="header-actions">
        <div className="header-status-pills">
          <span className="status-pill status-pill-primary">
            {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} Active
          </span>
          {lowStockCount > 0 && (
            <span className="status-pill status-pill-warning">
              {lowStockCount} Low Stock Alert
            </span>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Header
