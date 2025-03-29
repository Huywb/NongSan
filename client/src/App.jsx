import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header></Header>
      <div className='min-h-[80vh]'>
        <Outlet></Outlet> 
      </div>
      <Footer></Footer>
    </div>
  )
}

export default App
