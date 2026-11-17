import React from 'react'

export function ProductCard({ product, onDelete, onUpdateStock }) {
  const { id, title, category, price, stock, description } = product

  const stockBadgeClass =
    stock > 10
      ? 'badge-in-stock'
      : stock > 0
      ? 'badge-low-stock'
      : 'badge-out-of-stock'

  const stockBadgeLabel =
    stock > 10
      ? 'In Stock'
      : stock > 0
      ? `Low Stock (${stock} left)`
      : 'Out of Stock'

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)

  const handleDecrement = (e) => {
    e.stopPropagation()
    if (stock > 0) {
      onUpdateStock(id, stock - 1)
    }
  }

  const handleIncrement = (e) => {
    e.stopPropagation()
    onUpdateStock(id, stock + 1)
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete(id)
  }

  return (
    <article className="product-card">
      <div className="product-card-top">
        <div className="product-category-row">
          <span className="product-category-tag">{category}</span>
          <span className={`stock-badge ${stockBadgeClass}`}>
            {stockBadgeLabel}
          </span>
        </div>
        <h4 className="product-card-title">{title}</h4>
        {description && (
          <p className="product-card-desc">{description}</p>
        )}
      </div>

      <div className="product-card-middle">
        <div className="product-price-box">
          <span className="price-caption">Unit Price</span>
          <span className="product-price">{formattedPrice}</span>
        </div>

        <div className="product-stock-counter">
          <span className="stock-caption">Stock Level</span>
          <div className="stock-stepper">
            <button
              type="button"
              className="stepper-btn"
              onClick={handleDecrement}
              disabled={stock <= 0}
              aria-label="Decrease stock"
            >
              -
            </button>
            <span className="stepper-value">{stock}</span>
            <button
              type="button"
              className="stepper-btn"
              onClick={handleIncrement}
              aria-label="Increase stock"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {stock === 0 && (
        <div className="stock-alert-banner stock-alert-critical">
          Item depleted. Reorder needed immediately.
        </div>
      )}

      {stock > 0 && stock <= 5 && (
        <div className="stock-alert-banner stock-alert-warning">
          Critical stock threshold reached ({stock} remaining).
        </div>
      )}

      <div className="product-card-footer">
        <span className="product-total-val">
          Subtotal: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price * stock)}
        </span>
        <button
          type="button"
          className="btn-delete-product"
          onClick={handleDelete}
          title="Remove from inventory"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Delete
        </button>
      </div>
    </article>
  )
}

export default ProductCard
