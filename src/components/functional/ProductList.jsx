import React from 'react'
import ProductCard from './ProductCard'
import CardWrapper from './CardWrapper'

export function ProductList({
  products,
  onDeleteProduct,
  onUpdateStock,
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  categories,
  onResetFilters
}) {
  const isFiltered = searchQuery !== '' || categoryFilter !== 'all' || stockFilter !== 'all'

  return (
    <CardWrapper
      title="Product Inventory"
      subtitle={`Showing ${products.length} catalog items`}
      action={
        isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="btn-clear-filters"
          >
            Reset Filters
          </button>
        )
      }
      className="product-list-card"
    >
      <div className="filter-toolbar">
        <div className="search-field-box">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by product name or notes..."
            className="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="search-clear-btn"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-dropdowns">
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => onStockFilterChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by stock status"
          >
            <option value="all">All Stock Levels</option>
            <option value="in-stock">In Stock (&gt; 10 units)</option>
            <option value="low-stock">Low Stock (1 - 10 units)</option>
            <option value="out-of-stock">Out of Stock (0 units)</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="empty-inventory-state">
          <div className="empty-icon-wrapper">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <h4>No inventory records found</h4>
          <p>
            {isFiltered
              ? 'No products matched your active search query or filter selection.'
              : 'Your stock catalog is currently empty. Add your first item using the form.'}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="btn-primary-reset"
            >
              Clear Active Filters
            </button>
          )}
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={onDeleteProduct}
              onUpdateStock={onUpdateStock}
            />
          ))}
        </div>
      )}
    </CardWrapper>
  )
}

export default ProductList
