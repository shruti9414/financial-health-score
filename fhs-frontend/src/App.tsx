import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [serverStatus, setServerStatus] = useState('Checking...')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/health`)
        setServerStatus('✓ Connected')
        setIsConnected(true)
      } catch (error) {
        setServerStatus('✗ Not Connected')
        setIsConnected(false)
      }
    }

    checkServer()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              💰 FHS
            </h1>
            <p className="text-gray-600">
              Financial Health Score Platform
            </p>
            <p className="text-sm text-gray-400 mt-2">
              IDBI Innovate 2026
            </p>
          </div>

          {/* Status Card */}
          <div className={`rounded-lg p-4 mb-6 ${isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="text-sm font-semibold text-gray-700">
              Server Status
            </p>
            <p className={`text-lg font-bold ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {serverStatus}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <h2 className="font-semibold text-gray-800 mb-4">Features Coming Soon</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center">
                <span className="text-primary font-bold mr-2">✓</span>
                User Registration & Login
              </p>
              <p className="flex items-center">
                <span className="text-primary font-bold mr-2">✓</span>
                Financial Health Score Calculation
              </p>
              <p className="flex items-center">
                <span className="text-primary font-bold mr-2">✓</span>
                Beautiful Dashboard
              </p>
              <p className="flex items-center">
                <span className="text-primary font-bold mr-2">✓</span>
                Loan Eligibility Assessment
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p className="font-semibold mb-1">🚀 Getting Started</p>
            <p>
              Frontend and Backend are both set up and running. Start building!
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>Frontend: React 18 + TypeScript + Tailwind</p>
            <p>Backend: Node.js + Express + MySQL</p>
            <p className="mt-2">Ready to develop 🎯</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
