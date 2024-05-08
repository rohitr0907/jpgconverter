import { useState } from 'react'
import './App.css'
import Baselayout from './components/Baselayout'
import { Box } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Box>
    <Baselayout></Baselayout>
    </Box>
  )
}

export default App
