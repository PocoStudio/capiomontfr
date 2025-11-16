import Logo from '../../assets/default/logo/logo_base_bleu-clair-ligth_28_28.png';
import { Link } from 'react-router-dom'; 

const anneeActuelle = new Date().getFullYear();

export const FooterCard = () => {
  return (
    <div 
      className="
        footer-card-style 
        
        /* 2. MODIFIÉ: px pour les côtés, py pour la hauteur (py-2) */
        px-4 sm:px-6 py-2
        
        /* 3. MODIFIÉ: 3 colonnes sur mobile ET desktop */
        grid grid-cols-3 
        
        items-center
        gap-4 /* Garde un espacement sur mobile */
      "
    >
      
      <Link 
        to="/cgu" 
        className="
          text-sm opacity-80 hover:opacity-100 transition-opacity
          justify-self-start /* Toujours à gauche */
        "
      >
        CGU
      </Link>

      <div className="opacity-80 justify-self-center">
        <img src={Logo} alt="Capiomont Logo" className='max-w-3xs'/>
      </div>

      <span className="
          text-sm opacity-80
          justify-self-end /* Toujours à droite */
        "
      >
        © {anneeActuelle} Capiomont
      </span>

    </div>
  );
};