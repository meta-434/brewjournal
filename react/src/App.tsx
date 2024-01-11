import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello World</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      <p>This is a placeholder for BrewJournal's landing page while backend development is ongoing.</p>
    </>
  )
}

export default App
