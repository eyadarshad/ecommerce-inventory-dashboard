import React from 'react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      type="button" 
      onClick={toggleTheme} 
      className="theme-toggle-btn"
      aria-label="Toggle visual theme"
    >
      <span className="theme-toggle-indicator">
        {theme === 'light' ? '☀ Light' : '☾ Dark'}
      </span>
    </button>
  )
}

export default ThemeToggle
