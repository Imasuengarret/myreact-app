import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Garret from './Garret'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Garret/>
   <h1 className='text-sm font-bold'>tailwindcss v4</h1>
    </>
  )
}

export default App
