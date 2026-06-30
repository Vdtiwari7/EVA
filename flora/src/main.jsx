import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Deck from '../flora_wm_recommedation_v1.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Deck />
  </StrictMode>
)
