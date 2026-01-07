import { useState } from 'react'

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Vite + React + TypeScript + Tailwind
        </h1>
        <div className="bg-gray-800 p-8 rounded-lg">
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App