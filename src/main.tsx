import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MaintenancePage from './MaintenancePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaintenancePage />
  </StrictMode>,
)
