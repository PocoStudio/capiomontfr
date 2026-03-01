import { useEffect, useState } from 'react'
import pixelConstructGif from '../../assets/special/maintenance-page/pixelconstruct.gif'
import '../../styles/special/maintenance-page/style.css'

export default function MaintenancePage() {
  const [showContent, setShowContent] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

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

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-gray-700 text-sm font-medium">Maintenance en cours...</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="info-button w-8 h-8 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                aria-label="Plus d'informations"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-700" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </button>
              
            </div>
          </div>

        </div>
      </div>

      {showInfo && (
        <div className="popup-overlay" onClick={() => setShowInfo(false)}>
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowInfo(false)}
              className="popup-close"
              aria-label="Fermer"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
            
            <div className="popup-content">
              <div className="flex items-start gap-3 mb-6">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-gray-600 mt-0.5 flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <p className="text-gray-700 leading-relaxed text-left">
                  Le site est actuellement en maintenance. Merci de votre compréhension et de votre patience.
                </p>
              </div>
              <a 
                href="https://statuts.capiomont.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="status-link"
              >
                <span>Voir les statuts en temps réel</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}


    </>
  )
}