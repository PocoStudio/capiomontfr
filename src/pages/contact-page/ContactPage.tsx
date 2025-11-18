import React, { useState, useRef } from 'react';
import { MenuBar } from '../../components/default/MenuBar';
import { ThemeToggle } from '../../components/default/ThemeToggle';
import { FooterCard } from '../../components/default/FooterCard';
import { Mail, MessageSquare, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypewriterTitle } from '../../components/default/TypewriterTitle';
import { FormCard, MAX_MESSAGE_CHARS } from '../../components/default/FormCard';
import type { FormData, FormErrors } from '../../components/default/FormCard';
import { ResponseToast } from '../../components/default/ResponseToast';
import type { ToastType } from '../../components/default/ResponseToast';
import { useTurnstile } from '../../hooks/useTurnstile';

const BASE_URL = 'https://contact.api.capiomont.fr';
// const BASE_URL = 'http://localhost:3001'; 
const API_URL = `${BASE_URL}/api/v0/send-mail/contact`;
const TURNSTILE_SITE_KEY = '0x4AAAAAAB-HDY3lGyZ5Ymsb';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ContactPage = () => {
  const [selectedOption, setSelectedOption] = useState<'email' | 'form'>('form');

  const [formData, setFormData] = useState<FormData>({
    nomComplet: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<ToastType>('success');

  const formRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  const { executeChallenge, resetChallenge } = useTurnstile({
    sitekey: TURNSTILE_SITE_KEY,
    theme: 'auto',
  });

  const scrollToTarget = (ref: React.RefObject<HTMLElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setStatusMessage(message);
    setStatusType(type);
  };

  const clientSideValidate = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.nomComplet) errors.nomComplet = "Le nom est requis.";
    if (formData.nomComplet.length > 40) errors.nomComplet = "Le nom ne doit pas dépasser 40 caractères.";
    if (!formData.email) errors.email = "L'email est requis.";
    if (formData.email.length > 80) errors.email = "L'email ne doit pas dépasser 80 caractères.";
    if (formData.email && !emailRegex.test(formData.email)) errors.email = "L'adresse email n'est pas valide.";
    if (!formData.sujet) errors.sujet = "Le sujet est requis.";
    if (formData.sujet.length > 40) errors.sujet = "Le sujet ne doit pas dépasser 40 caractères.";
    if (!formData.message) errors.message = "Le message est requis.";
    if (formData.message.length > MAX_MESSAGE_CHARS)
      errors.message = `Le message dépasse la limite de ${MAX_MESSAGE_CHARS} caractères.`;
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendApiRequest = async (token: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken: token }),
      });

      if (response.status === 429) {
        const result = await response.json();
        const errorMsg = result.error || '';
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? Math.ceil(parseInt(retryAfter) / 60) : 5;
        
        if (errorMsg.includes("Trop de requêtes depuis cette IP") || errorMsg.includes("20")) {
          showToast(
            "Votre IP a été bloquée (trop d'envois). Contactez-nous par <a href='mailto:contact@capiomont.fr' class='underline'>email</a>.",
            'ipBlock'
          );
        } else if (errorMsg.includes("5 minutes")) {
          showToast(
            `Merci de patienter ${waitTime} minutes avant d'envoyer un nouveau formulaire.`,
            'rateLimit'
          );
        } else if (errorMsg.includes("5 messages par jour")) {
          showToast(
            "Vous avez atteint la limite de 5 messages par jour. Contactez-nous par <a href='mailto:contact@capiomont.fr' class='underline'>email</a>.",
            'rateLimit'
          );
        } else {
          showToast(
            `Trop de requêtes. Veuillez attendre ${waitTime} minute${waitTime > 1 ? 's' : ''} avant de réessayer.`,
            'rateLimit'
          );
        }
        
        resetChallenge().catch(console.error);
        return;
      }

      if (response.status === 403) {
        const result = await response.json();
        showToast(
          result.error || "Vérification de sécurité échouée. Veuillez réessayer.",
          'warning'
        );
        
        resetChallenge().catch(console.error);
        return;
      }

      const result = await response.json();
      
      if (response.ok) {
        showToast(
          "Message envoyé avec succès ! Nous vous contacterons par email dans les plus brefs délais.",
          'success'
        );
        setFormData({ nomComplet: '', email: '', sujet: '', message: '' });
        
        resetChallenge().catch(console.error);
      } else {
        const errorMsg = result.errors ? result.errors[0].msg : result.error;
        
        if (errorMsg && (errorMsg.includes("5 messages par jour") || errorMsg.includes("limite journalière"))) {
          showToast(
            "Votre IP a été bloquée (trop d'envois). Contactez-nous par <a href='mailto:contact@capiomont.fr' class='underline'>email</a>.",
            'ipBlock'
          );
        } else {
          showToast(
            `Erreur: ${errorMsg}. Contactez-nous par <a href='mailto:contact@capiomont.fr' class='underline'>email</a>.`,
            'error'
          );
        }
        
        resetChallenge().catch(console.error);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      showToast(
        "Erreur de connexion. Contactez-nous par <a href='mailto:contact@capiomont.fr' class='underline'>email</a>.",
        'error'
      );
      
      resetChallenge().catch(console.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (isLoading) {
      console.log('Soumission déjà en cours, ignorée');
      return;
    }
    
    setValidationErrors({});
    setStatusMessage(null);
    
    if (!clientSideValidate()) return;
    
    setIsLoading(true);
    
    try {
      const token = await executeChallenge();
      await sendApiRequest(token);
    } catch (error) {
      console.error('Erreur Turnstile:', error);
      showToast("Erreur lors de la vérification de sécurité.", 'warning');
      setIsLoading(false);
      
      resetChallenge().catch(console.error);
    }
  };

  const handleSelectOption = (option: 'email' | 'form') => {
    setSelectedOption(option);
    setTimeout(() => {
        if (option === 'form') {
            scrollToTarget(formRef);
        } else {
            scrollToTarget(emailRef);
        }
    }, 100); 
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">

        <header className="mb-8 md:mb-12">
          <div className="flex justify-between items-center w-full">
            <TypewriterTitle text="Contact" />
            <ThemeToggle />
          </div>
          <div className="flex justify-center mt-4">
            <MenuBar />
          </div>
        </header>

        <main className="max-w-4xl mx-auto">

          <div className="max-w-xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

              <motion.button
                onClick={() => handleSelectOption('form')}
                className={`
                  bento-card-glass p-6 text-center relative
                  transition-colors
                  ${selectedOption === 'form' ? 'bg-gray-200 dark:bg-slate-700' : ''}
                `}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronRight size={24} className="absolute top-6 right-6 opacity-40" />
                <MessageSquare size={32} className="mx-auto mb-3 text-primary dark:text-primary" />
                <h3 className="text-xl font-semibold">Via Formulaire</h3>
                <p className="text-sm opacity-70 mt-1">Simple et rapide.</p>
              </motion.button>

              <motion.button
                onClick={() => handleSelectOption('email')}
                className={`
                  bento-card-glass p-6 text-center relative
                  transition-colors
                  ${selectedOption === 'email' ? 'bg-gray-200 dark:bg-slate-700' : ''}
                `}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChevronRight size={24} className="absolute top-6 right-6 opacity-40" />
                <Mail size={32} className="mx-auto mb-3 text-primary dark:text-primary" />
                <h3 className="text-xl font-semibold">Par Email</h3>
                <p className="text-sm opacity-70 mt-1">Le moyen le plus courant.</p>
              </motion.button>

            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedOption === 'email' ? (
              <motion.div
                key="email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                ref={emailRef}
              >
                <div className="bento-card-glass p-6 md:p-8 flex flex-col items-center text-center">
                  <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-primary">
                    Envoyer un e-mail
                  </h2>
                  <p className="opacity-80 mb-6">Une question, une suggestion ou une demande de contact ? N'hésitez pas à nous solliciter.</p>
                  <a
                    href="mailto:contact@capiomont.fr"
                    className="menu-bar-link active flex items-center gap-3 px-6 py-4 rounded-xl text-lg font-medium"
                  >
                    <Mail size={24} />
                    contact@capiomont.fr
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                ref={formRef}
              >
                <div className="bento-card-glass p-6 md:p-8">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold mb-2 text-primary dark:text-primary">
                      Formulaire de Contact
                    </h2>
                    <p className="opacity-80 max-w-lg mx-auto">
                      Pour toute information relative à nos projets, demandes professionnelles ou prise de contact, nous vous invitons à remplir ce formulaire.
                    </p>
                  </div>
                  <FormCard
                    formData={formData}
                    setFormData={setFormData}
                    validationErrors={validationErrors}
                    setValidationErrors={setValidationErrors}
                    isLoading={isLoading}
                    handleSubmit={handleSubmit}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </main>

        <footer className="mt-8 md:mt-12 max-w-3xl mx-auto">
          <FooterCard />
        </footer>

        {statusMessage && (
          <ResponseToast
            message={statusMessage}
            type={statusType}
            onClose={() => setStatusMessage(null)}
          />
        )}
      </div>
    </div>
  );
};