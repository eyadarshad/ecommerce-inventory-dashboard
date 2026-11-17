import React, { Component } from 'react'
import CardWrapper from '../functional/CardWrapper'

export class AuditLogger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      toastMessage: null,
      filter: 'all',
      isExpanded: true
    }
    this.toastTimer = null
    this.handleStorageChange = this.handleStorageChange.bind(this)
    this.handleClearLogs = this.handleClearLogs.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  componentDidMount() {
    try {
      const stored = localStorage.getItem('inventory_audit_logs')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          this.setState({ logs: parsed })
        }
      }
    } catch {
    }

    window.addEventListener('storage', this.handleStorageChange)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.lastAction && this.props.lastAction !== prevProps.lastAction) {
      const newEntry = {
        id: Date.now() + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        action: this.props.lastAction.action,
        title: this.props.lastAction.title,
        details: this.props.lastAction.details
      }

      this.setState(prev => ({
        logs: [newEntry, ...prev.logs]
      }))
    }

    if (prevState.logs !== this.state.logs) {
      try {
        localStorage.setItem('inventory_audit_logs', JSON.stringify(this.state.logs))
      } catch {
      }

      if (this.state.logs.length > prevState.logs.length && this.state.logs.length > 0) {
        const latest = this.state.logs[0]
        if (this.toastTimer) {
          clearTimeout(this.toastTimer)
        }

        this.setState({
          toastMessage: `${latest.action}: ${latest.title} (${latest.details})`
        })

        this.toastTimer = setTimeout(() => {
          this.setState({ toastMessage: null })
        }, 4000)
      }
    }
  }

  componentWillUnmount() {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer)
    }
    window.removeEventListener('storage', this.handleStorageChange)
  }

  handleStorageChange(e) {
    if (e.key === 'inventory_audit_logs' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue)
        if (Array.isArray(parsed)) {
          this.setState({ logs: parsed })
        }
      } catch {
      }
    }
  }

  handleClearLogs() {
    this.setState({ logs: [], toastMessage: 'Audit log history cleared.' })
    try {
      localStorage.removeItem('inventory_audit_logs')
    } catch {
    }
    if (this.toastTimer) {
      clearTimeout(this.toastTimer)
    }
    this.toastTimer = setTimeout(() => {
      this.setState({ toastMessage: null })
    }, 2500)
  }

  handleFilterChange(e) {
    this.setState({ filter: e.target.value })
  }

  toggleExpand() {
    this.setState(prev => ({ isExpanded: !prev.isExpanded }))
  }

  render() {
    const { logs, toastMessage, filter, isExpanded } = this.state

    const filteredLogs = logs.filter(item => {
      if (filter === 'all') return true
      return item.action === filter
    })

    const actionBadgeClass = (action) => {
      switch (action) {
        case 'PRODUCT_ADDED':
          return 'badge-log-added'
        case 'STOCK_UPDATED':
          return 'badge-log-updated'
        case 'ITEM_DELETED':
          return 'badge-log-deleted'
        default:
          return 'badge-log-default'
      }
    }

    const actionReadableLabel = (action) => {
      switch (action) {
        case 'PRODUCT_ADDED':
          return 'Item Added'
        case 'STOCK_UPDATED':
          return 'Stock Updated'
        case 'ITEM_DELETED':
          return 'Item Removed'
        default:
          return action
      }
    }

    return (
      <CardWrapper
        title="Audit Operation Logs"
        subtitle="Class Component lifecycle tracking"
        className="audit-logger-card"
        action={
          <div className="audit-header-controls">
            <button
              type="button"
              onClick={this.toggleExpand}
              className="btn-toggle-expand"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </button>
            {logs.length > 0 && (
              <button
                type="button"
                onClick={this.handleClearLogs}
                className="btn-clear-logs"
              >
                Clear History
              </button>
            )}
          </div>
        }
      >
        {toastMessage && (
          <div className="audit-toast-banner" role="status">
            <div className="toast-content">
              <span className="toast-dot" />
              <span>{toastMessage}</span>
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => this.setState({ toastMessage: null })}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        )}

        {isExpanded && (
          <div className="audit-body-container">
            <div className="audit-toolbar">
              <label htmlFor="audit-filter" className="audit-filter-label">
                Filter Event Type:
              </label>
              <select
                id="audit-filter"
                value={filter}
                onChange={this.handleFilterChange}
                className="audit-filter-select"
              >
                <option value="all">All Events ({logs.length})</option>
                <option value="PRODUCT_ADDED">Product Added</option>
                <option value="STOCK_UPDATED">Stock Updated</option>
                <option value="ITEM_DELETED">Item Deleted</option>
              </select>
            </div>

            {filteredLogs.length === 0 ? (
              <div className="audit-empty-state">
                <p>No operational logs recorded yet. Inventory actions will be monitored here.</p>
              </div>
            ) : (
              <div className="audit-logs-scroll">
                <ul className="audit-logs-list">
                  {filteredLogs.map(item => (
                    <li key={item.id} className="audit-log-item">
                      <div className="audit-log-header">
                        <span className={`log-badge ${actionBadgeClass(item.action)}`}>
                          {actionReadableLabel(item.action)}
                        </span>
                        <time className="audit-log-time">{item.timestamp}</time>
                      </div>
                      <div className="audit-log-body">
                        <strong className="audit-item-title">{item.title}</strong>
                        <span className="audit-item-detail">{item.details}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardWrapper>
    )
  }
}

export default AuditLogger
