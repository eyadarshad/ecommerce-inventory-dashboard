import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/functional/Header'
import InventoryMetrics from './components/functional/InventoryMetrics'
import ProductForm from './components/functional/ProductForm'
import ProductList from './components/functional/ProductList'
import AuditLogger from './components/class/AuditLogger'

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Sony WH-1000XM5 Wireless Headphones',
    category: 'Electronics',
    price: 399.99,
    stock: 14,
    description: 'Industry leading noise canceling headphones with dual processors.'
  },
  {
    id: 'prod-2',
    title: 'Apple MacBook Air M3 13-inch',
    category: 'Electronics',
    price: 1099.00,
    stock: 6,
    description: 'Thin and fast laptop with 8-core CPU and unified memory.'
  },
  {
    id: 'prod-3',
    title: 'Ergonomic Office Task Chair',
    category: 'Home & Kitchen',
    price: 189.50,
    stock: 0,
    description: 'Breathable mesh back with adjustable lumbar support and 3D armrests.'
  },
  {
    id: 'prod-4',
    title: 'Ceramic Pour-Over Coffee Dripper',
    category: 'Home & Kitchen',
    price: 24.99,
    stock: 22,
    description: 'Handcrafted ceramic dripper for artisanal manual coffee brewing.'
  },
  {
    id: 'prod-5',
    title: 'Heavyweight Cotton Crewneck Tee',
    category: 'Apparel',
    price: 32.00,
    stock: 3,
    description: '100% combed ring-spun organic cotton with reinforced stitching.'
  },
  {
    id: 'prod-6',
    title: 'Clean Code: Handbook of Agile Software',
    category: 'Books',
    price: 44.50,
    stock: 18,
    description: 'Classic engineering principles and best refactoring practices.'
  }
]

function DashboardContent() {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('inventory_products')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch {
    }
    return INITIAL_PRODUCTS
  })

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [stockFilter, setStockFilter] = useState('all')
  const [lastAction, setLastAction] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('inventory_products', JSON.stringify(products))
    } catch {
    }
    document.title = `StockFlow (${products.length} Products) - Inventory Dashboard`
  }, [products])

  const categories = useMemo(() => {
    const set = new Set()
    products.forEach(p => {
      if (p.category) set.add(p.category)
    })
    return Array.from(set).sort()
  }, [products])

  const metrics = useMemo(() => {
    const totalItems = products.length
    const totalUnits = products.reduce((acc, curr) => acc + (curr.stock || 0), 0)
    const totalValuation = products.reduce((acc, curr) => acc + ((curr.price || 0) * (curr.stock || 0)), 0)
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 10).length
    const outOfStockCount = products.filter(p => p.stock === 0).length

    return {
      totalItems,
      totalUnits,
      totalValuation,
      lowStockCount,
      outOfStockCount
    }
  }, [products])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter

      let matchesStock = true
      if (stockFilter === 'in-stock') {
        matchesStock = product.stock > 10
      } else if (stockFilter === 'low-stock') {
        matchesStock = product.stock > 0 && product.stock <= 10
      } else if (stockFilter === 'out-of-stock') {
        matchesStock = product.stock === 0
      }

      return matchesSearch && matchesCategory && matchesStock
    })
  }, [products, searchQuery, categoryFilter, stockFilter])

  const handleAddProduct = useCallback((newProductData) => {
    const newId = 'prod-' + Date.now().toString(36)
    const newProduct = {
      id: newId,
      ...newProductData
    }

    setProducts(prev => [newProduct, ...prev])

    setLastAction({
      action: 'PRODUCT_ADDED',
      title: newProduct.title,
      details: `Added with ${newProduct.stock} units @ $${newProduct.price.toFixed(2)}`
    })
  }, [])

  const handleDeleteProduct = useCallback((id) => {
    const target = products.find(p => p.id === id)
    if (!target) return

    setProducts(prev => prev.filter(p => p.id !== id))

    setLastAction({
      action: 'ITEM_DELETED',
      title: target.title,
      details: 'Product removed from active catalog'
    })
  }, [products])

  const handleUpdateStock = useCallback((id, nextStock) => {
    let target = null
    let prevStock = 0

    setProducts(prev =>
      prev.map(p => {
        if (p.id === id) {
          target = p
          prevStock = p.stock
          return { ...p, stock: Math.max(0, nextStock) }
        }
        return p
      })
    )

    if (target) {
      setLastAction({
        action: 'STOCK_UPDATED',
        title: target.title,
        details: `Stock changed from ${prevStock} to ${Math.max(0, nextStock)} units`
      })
    }
  }, [])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setCategoryFilter('all')
    setStockFilter('all')
  }, [])

  return (
    <div className="dashboard-app">
      <Header
        totalProducts={metrics.totalItems}
        lowStockCount={metrics.lowStockCount}
      />

      <main className="dashboard-main-content">
        <InventoryMetrics metrics={metrics} />

        <div className="dashboard-layout-grid">
          <section className="dashboard-sidebar-column">
            <ProductForm onAddProduct={handleAddProduct} />
            <AuditLogger lastAction={lastAction} />
          </section>

          <section className="dashboard-content-column">
            <ProductList
              products={filteredProducts}
              onDeleteProduct={handleDeleteProduct}
              onUpdateStock={handleUpdateStock}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              categoryFilter={categoryFilter}
              onCategoryChange={setCategoryFilter}
              stockFilter={stockFilter}
              onStockFilterChange={setStockFilter}
              categories={categories}
              onResetFilters={handleResetFilters}
            />
          </section>
        </div>
      </main>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  )
}

export default App
