import { ThemeToggle } from '../../components/default/ThemeToggle';
import { FooterCard } from '../../components/default/FooterCard';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

const cguSections = [
  {
    id: 'cgu-1',
    title: 'I. Définitions et Objet',
    content: (
      <>
        <p>Les présentes Conditions Générales d'Utilisation (CGU) définissent les règles d'accès et d'utilisation des services proposés par <strong>Capiomont.fr</strong> et l'ensemble de ses sous-domaines.</p>
        <p>Capiomont.fr est un site de type blog personnel proposant des articles, ainsi que des sous-domaines offrant des fonctionnalités interactives telles que des espaces de connexion et des chats entre utilisateurs, sans aucune finalité commerciale.</p>
        <p>En accédant à nos services, l'utilisateur accepte sans réserve l'intégralité des présentes conditions.</p>
      </>
    ),
  },
  {
    id: 'cgu-2',
    title: 'II. Identité du Responsable du Traitement',
    content: (
      <p>Le responsable du traitement des données est l’éditeur de <strong>Capiomont.fr</strong>, agissant à titre personnel. Pour toute question ou demande, vous pouvez nous contacter à l’adresse : <strong>contact@capiomont.fr</strong>.</p>
    ),
  },
  {
    id: 'cgu-3',
    title: 'III. Champ d\'Application',
    content: (
      <>
        <p>Les présentes CGU s'appliquent à tous les visiteurs, utilisateurs et contributeurs des plateformes en ligne de <strong>Capiomont.fr</strong> ainsi que ses sous-domaines.</p>
        <p>Tout accès ou utilisation des services implique l'acceptation pleine et entière des CGU en vigueur.</p>
      </>
    ),
  },
  {
    id: 'cgu-4',
    title: 'IV. Modification des Conditions',
    content: (
      <>
        <p>Capiomont.fr se réserve le droit de modifier à tout moment les présentes CGU afin de les adapter aux évolutions des services et des obligations légales.</p>
        <p>Les modifications entrent en vigueur dès leur publication sur le site. L'utilisateur est invité à consulter régulièrement cette page.</p>
      </>
    ),
  },
  {
    id: 'cgu-5',
    title: 'V. Responsabilités des Utilisateurs',
    content: (
      <>
        <p>Les utilisateurs s'engagent à :</p>
        <ul className="list-disc list-inside pl-4">
          <li>Fournir des informations exactes et à jour lors de l'inscription sur les sous-domaines interactifs.</li>
          <li>Respecter les autres utilisateurs et éviter tout comportement nuisible, y compris dans les chats et espaces interactifs.</li>
          <li>Ne pas publier de contenu illégal, diffamatoire, haineux, offensant ou contraire aux bonnes mœurs.</li>
          <li>Assurer la confidentialité de leurs identifiants de connexion.</li>
          <li>Ne pas utiliser les services à des fins de piratage, d’envoi de spam, ou de toute activité susceptible de nuire au fonctionnement du site ou de ses sous-domaines.</li>
        </ul>
        <p>L’utilisation des services est réservée aux personnes âgées d’au moins 16 ans.</p>
        <p>Capiomont.fr se réserve le droit de modérer, supprimer ou signaler tout contenu jugé inapproprié dans les chats ou autres espaces interactifs, sans préavis ni justification.</p>
      </>
    ),
  },
  {
    id: 'cgu-6',
    title: 'VI. Droits des Utilisateurs',
    content: (
      <>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul className="list-disc list-inside pl-4">
          <li><strong>Droit d’accès :</strong> Consulter les données vous concernant.</li>
          <li><strong>Droit de rectification :</strong> Corriger des données inexactes.</li>
          <li><strong>Droit à l’effacement :</strong> Demander la suppression de vos données.</li>
          <li><strong>Droit à la limitation :</strong> Restreindre l’utilisation de vos données dans certains cas.</li>
          <li><strong>Droit d’opposition :</strong> Vous opposer au traitement pour des raisons légitimes.</li>
          <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré.</li>
        </ul>
        <p>Pour exercer ces droits, envoyez une demande à <strong>contact@capiomont.fr</strong>, accompagnée d’une preuve d’identité si nécessaire. Les demandes sont traitées dans les meilleurs délais.</p>
      </>
    ),
  },
  {
    id: 'cgu-7',
    title: 'VII. Sécurité et Confidentialité des Données',
    content: (
      <>
        <p>Capiomont.fr respecte la confidentialité des données personnelles de ses utilisateurs et met en place des mesures de protection conformes au <strong>Règlement Général sur la Protection des Données (RGPD)</strong>.</p>
        <p>Les données susceptibles d’être enregistrées incluent, sans s’y limiter : le nom, l’adresse e-mail, l’adresse IP, les informations de connexion chiffrées, les messages envoyés dans les chats, ainsi que les données fournies volontairement par l’utilisateur lors de son inscription ou de son utilisation des services.</p>
        <p>Les utilisateurs disposent d’un droit d’accès, de rectification et de suppression de leurs données personnelles. Toute demande de suppression peut être effectuée en contactant notre support à l’adresse <strong>contact@capiomont.fr</strong> et sera traitée dans les meilleurs délais.</p>
      </>
    ),
  },
  {
    id: 'cgu-8',
    title: 'VIII. Utilisation des Cookies',
    content: (
      <>
        <p>Nous utilisons des cookies strictement nécessaires au bon fonctionnement des services. Ces cookies permettent d’assurer la navigation, la sécurité, ainsi que la personnalisation de l’expérience utilisateur sur le blog et les sous-domaines interactifs.</p>
        <p>Les données collectées via les cookies peuvent inclure des informations sur les préférences de navigation, les pages visitées, les interactions avec le site ou les chats. Pour toute demande de suppression de ces données, l’utilisateur peut contacter notre support à <strong>contact@capiomont.fr</strong>, et la demande sera traitée dans les meilleurs délais.</p>
        <p>Les cookies utilisés sur ce domaine et ses sous-domaines ont uniquement pour but d’assurer le bon fonctionnement des sites et d’améliorer votre expérience de navigation. Ils ne sont en aucun cas revendus ni partagés (en dehors du domaine et de ses sous-domaines), et ne sont jamais utilisés à des fins commerciales.</p>
      </>
    ),
  },
  {
    id: 'cgu-9',
    title: 'IX. Responsabilités de Capiomont.fr',
    content: (
      <>
        <p>Capiomont.fr s’efforce de fournir un service fiable et sécurisé mais ne peut garantir l’absence totale d’erreurs ou d’interruptions, notamment sur les sous-domaines interactifs.</p>
        <p>Nous ne saurions être tenus responsables des dommages résultant de l’utilisation du site, de ses sous-domaines ou des informations qu’ils contiennent.</p>
      </>
    ),
  },
  {
    id: 'cgu-10',
    title: 'X. Propriété Intellectuelle',
    content: (
      <>
        <p>Le contenu de Capiomont.fr et de ses sous-domaines (textes, images, logos, codes sources) est protégé par les lois sur la propriété intellectuelle.</p>
        <p>Toute reproduction, diffusion ou utilisation non autorisée est strictement interdite.</p>
      </>
    ),
  },
  {
    id: 'cgu-11',
    title: 'XI. Résiliation et Suppression de Compte',
    content: (
      <>
        <p>Capiomont.fr se réserve le droit de suspendre ou supprimer un compte utilisateur sur ses sous-domaines en cas de non-respect des présentes CGU, sans préavis.</p>
        <p>L’utilisateur peut à tout moment demander la suppression définitive de son compte en contactant <strong>contact@capiomont.fr</strong>. La demande sera traitée dans les meilleurs délais.</p>
      </>
    ),
  },
  {
    id: 'cgu-12',
    title: 'XII. Force Majeure',
    content: (
      <p>Capiomont.fr ne pourra être tenu responsable en cas de retard ou d’inexécution de ses obligations dues à des événements imprévus tels que catastrophes naturelles, pannes de réseau, cyberattaques, conflits sociaux ou toute autre cause échappant à son contrôle.</p>
    ),
  },
  {
    id: 'cgu-13',
    title: 'XIII. Droit Applicable et Litiges',
    content: (
      <>
        <p>Les présentes CGU sont régies par le droit français.</p>
        <p>En cas de litige, les tribunaux compétents seront ceux du ressort du siège social de Capiomont.fr.</p>
      </>
    ),
  },
  {
    id: 'cgu-14',
    title: 'VX. Mentions Légales', 
    content: (
      <>
        <p><strong>Éditeur du site :</strong> Capiomont.fr</p>
        <p><strong>Responsable de la publication :</strong> Capiomont.fr</p>
        <p><strong>Hébergement :</strong> Synology NAS Personnel / Ionos Company</p>
        <p><strong>Contact :</strong> contact@capiomont.fr</p>
        <p><strong>Statut :</strong> Capiomont.fr est édité à titre personnel et ne constitue pas une entité commerciale enregistrée. Aucun numéro SIRET n’est applicable.</p>
      </>
    ),
  },
  {
    id: 'cgu-15',
    title: 'XV. Destinataires des Données',
    content: (
      <>
        <p>Les données ne sont pas transmises à des tiers à des fins commerciales. Elles peuvent être partagées uniquement avec :</p>
        <ul className="list-disc list-inside pl-4">
          <li><strong>Prestataires techniques :</strong> Hébergeur Synology NAS pour le stockage et la maintenance ainsi que Ionos pour le domaine.</li>
          <li><strong>Autorités compétentes :</strong> En cas de demande légale ou judiciaire.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cgu-16',
    title: 'XVI. Sécurité des Données',
    content: (
      <>
        <p>Nous mettons en place des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou altération. Cela inclut l’utilisation de protocoles sécurisés (HTTPS) et la restriction d’accès aux données.</p>
        <p>Toutefois, aucun système n’étant infaillible, nous ne pouvons garantir une sécurité absolue.</p>
      </>
    ),
  },
  {
    id: 'cgu-17',
    title: 'XVII. Contact et Support Technique',
    content: (
      <>
        <p>Pour toute question relative aux présentes CGU ou à l’utilisation des services, vous pouvez contacter notre support à l’adresse <strong>contact@capiomont.fr</strong>.</p>
        <p>Le support technique est disponible par e-mail. Les réponses seront fournies dans les meilleurs délais.</p>
      </>
    ),
  },
];



export const CguPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <div className='hidden'>
          <ThemeToggle />
        </div>
        
        <header className="mb-8 md:mb-12">
          <h1 className="typewriter-title text-3xl md:text-5xl font-bold text-center">
            Conditions Générales d'Utilisation - Capiomont.fr
          </h1>
        </header>

        <main className="max-w-4xl mx-auto">
          
          <div className="flex flex-col gap-6">
            
            {cguSections.map((section) => (
              <div key={section.id} className="bento-card-glass p-6 md:p-8">
                
                <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary">
                  {section.title}
                </h2>
                
                <div className="flex flex-col gap-4 text-sm opacity-90 leading-relaxed">
                  {section.content}
                </div>

              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <a 
              href="/" 
              className="
                menu-bar-link /* On réutilise le style des boutons du menu */
                flex items-center gap-2 
                px-4 py-2.5 rounded-xl
                text-sm font-medium
              "
            >
              <ArrowLeft size={16} />
              Retour à l'accueil
            </a>
          </div>

        </main>

        <footer className="mt-8 md:mt-12 max-w-3xl mx-auto">
          <FooterCard />
        </footer>
        
      </div>
    </div>
  );
};