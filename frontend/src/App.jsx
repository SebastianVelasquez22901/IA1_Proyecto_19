import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chatbox from './components/Chatbot/Chatbot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Chatbox />
      </div>
    </>
  )
}

export default App
