import React from 'react'
import MainRouts from './routes/MainRouts'
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <MainRouts />
    </BrowserRouter>
  )
}
