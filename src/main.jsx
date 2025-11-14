import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Fix mobile viewport height
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

// Set initial viewport height
setViewportHeight()

// Recalculate on resize and orientation change
window.addEventListener('resize', setViewportHeight)
window.addEventListener('orientationchange', () => {
  setTimeout(setViewportHeight, 100)
})

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


