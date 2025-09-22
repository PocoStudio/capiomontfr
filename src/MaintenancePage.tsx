import { useEffect, useState } from 'react'
import pixelConstructGif from './assets/pixelconstruct.gif'
import './MaintenancePage.css'

export default function MaintenancePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-500 ${
        showContent ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <svg 
          className="spinner w-16 h-16" 
          viewBox="0 0 66 66" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle 
            className="spinner-path"
            fill="none" 
            strokeWidth="6" 
            strokeLinecap="round" 
            cx="33" 
            cy="33" 
            r="30"
          />
        </svg>
      </div>

      <div className={`min-h-screen bg-white font-['Red_Hat_Text'] transition-opacity duration-500 ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="center">
          
          <div className="flex justify-center mb-6">
            <img 
              src={pixelConstructGif} 
              alt="Construction en cours" 
              className="w-32 h-32 md:w-40 md:h-40 object-contain"
            />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 text-center">
            SITE{' '}
            <span className="diagonal-text-effect">
              INDISPONIBLE
            </span>
          </h1>
          
          <p className="max-w-lg mx-auto leading-relaxed text-center text-gray-600 mb-6 px-4">
            Pour toute demande ou information, nous vous invitons à nous contacter par e-mail à l'adresse suivante :{' '}
            <a 
              href="mailto:contact@capiomont.fr"
              className="text-gray-800 font-medium hover:text-red-600 transition-colors duration-300 no-underline"
            >
              contact@capiomont.fr
            </a>
          </p>

          {/* Indicateur de maintenance */}
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-gray-700 text-sm font-medium">Maintenance en cours...</span>
            </div>
          </div>

        </div>
      </div>


    </>
  )
}