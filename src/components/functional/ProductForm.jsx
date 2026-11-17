import React, { useState, useRef, useEffect } from 'react'
import CardWrapper from './CardWrapper'

const DEFAULT_CATEGORIES = [
  'Electronics',
  'Apparel',
  'Home & Kitchen',
  'Books',
  'Health & Beauty',
  'Sports & Outdoors'
]

export function ProductForm({ onAddProduct }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics',
    price: '',
    stock: '',
    description: ''
  })

  const [formError, setFormError] = useState('')

  const titleInputRef = useRef(null)

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (formError) {
      setFormError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedTitle = formData.title.trim()
    const numericPrice = parseFloat(formData.price)
    const numericStock = parseInt(formData.stock, 10)

    if (!trimmedTitle) {
      setFormError('Product title is required.')
      titleInputRef.current?.focus()
      return
    }

    if (isNaN(numericPrice) || numericPrice < 0) {
      setFormError('Please enter a valid non-negative price.')
      return
    }

    if (isNaN(numericStock) || numericStock < 0) {
      setFormError('Please enter a valid non-negative stock quantity.')
      return
    }

    onAddProduct({
      title: trimmedTitle,
      category: formData.category,
      price: numericPrice,
      stock: numericStock,
      description: formData.description.trim()
    })

    setFormData({
      title: '',
      category: formData.category,
      price: '',
      stock: '',
      description: ''
    })

    setFormError('')

    if (titleInputRef.current) {
      titleInputRef.current.focus()
    }
  }

  return (
    <CardWrapper
      title="Add New Product"
      subtitle="Enter catalog specifications to register inventory"
      className="product-form-card"
    >
      <form onSubmit={handleSubmit} className="product-form" noValidate>
        {formError && (
          <div className="form-error-banner" role="alert">
            {formError}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="product-title" className="form-label">
            Product Title <span className="required-star">*</span>
          </label>
          <input
            id="product-title"
            ref={titleInputRef}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            className="form-input"
            required
          />
        </div>

        <div className="form-row-2">
          <div className="form-field">
            <label htmlFor="product-category" className="form-label">
              Category <span className="required-star">*</span>
            </label>
            <select
              id="product-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {DEFAULT_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="product-price" className="form-label">
              Unit Price ($) <span className="required-star">*</span>
            </label>
            <input
              id="product-price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="product-stock" className="form-label">
            Initial Stock Quantity <span className="required-star">*</span>
          </label>
          <input
            id="product-stock"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
            step="1"
            className="form-input"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="product-description" className="form-label">
            Description <span className="optional-tag">(Optional)</span>
          </label>
          <textarea
            id="product-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Short product overview or warehouse notes..."
            rows={3}
            className="form-textarea"
          />
        </div>

        <button type="submit" className="btn-submit-product">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add to Inventory
        </button>
      </form>
    </CardWrapper>
  )
}

export default ProductForm
