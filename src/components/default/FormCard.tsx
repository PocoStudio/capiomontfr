import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

export interface FormData {
  nomComplet: string;
  email: string;
  sujet: string;
  message: string;
}

export interface FormErrors {
  nomComplet?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

export const MAX_MESSAGE_CHARS = 4000;
const NOM_MAX_CHARS = 40;
const SUJET_MAX_CHARS = 40;
const EMAIL_MAX_CHARS = 80;

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  validationErrors: FormErrors;
  setValidationErrors: React.Dispatch<React.SetStateAction<FormErrors>>; 
  isLoading: boolean;
  handleSubmit: (event: React.FormEvent) => void;
  isTurnstileReady?: boolean; 
}

export const FormCard = ({ 
  formData, 
  setFormData, 
  validationErrors, 
  setValidationErrors,
  isLoading, 
  handleSubmit,
}: Props) => {
  

  const [tempWarning, setTempWarning] = useState<Partial<FormErrors>>({});

  const [shakeField, setShakeField] = useState<string | null>(null);


  useEffect(() => {

    if (Object.keys(tempWarning).length > 0) {

      const timer = setTimeout(() => {
        setTempWarning({}); 
      }, 2000);
      

      return () => clearTimeout(timer);
    }
  }, [tempWarning]);


  const triggerShake = (fieldId: string) => {
    setShakeField(fieldId);
    setTimeout(() => setShakeField(null), 500); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    let limitExceeded = false;
    if (id === 'nomComplet' && value.length > NOM_MAX_CHARS) limitExceeded = true;
    if (id === 'sujet' && value.length > SUJET_MAX_CHARS) limitExceeded = true;
    if (id === 'email' && value.length > EMAIL_MAX_CHARS) limitExceeded = true;
    if (id === 'message' && value.length > MAX_MESSAGE_CHARS) limitExceeded = true;

    if (limitExceeded) {
      triggerShake(id);
      setTempWarning(prev => ({ ...prev, [id]: "Longueur max atteinte" }));
      return; 
    }


    setTempWarning(prev => ({ ...prev, [id]: undefined }));


    if (validationErrors[id as keyof FormErrors]) {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [id]: undefined,
      }));
    }


    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const messageCharCount = formData.message.length;
  

  const getErrorMessage = (field: keyof FormErrors) => {
    if (validationErrors[field]) {
      return <p className="text-xs text-red-500 mt-1">{validationErrors[field]}</p>;
    }
    if (tempWarning[field]) {
      return <p className="text-xs text-orange-500 mt-1">{tempWarning[field]}</p>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
      {/* Nom & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nomComplet" className="block text-sm font-medium opacity-80 mb-1">
            Nom Complet
          </label>
          <input
            type="text" 
            id="nomComplet" 
            value={formData.nomComplet}
            onChange={handleInputChange} 
            className={`
              form-input 
              ${validationErrors.nomComplet ? 'has-error' : ''}
              ${shakeField === 'nomComplet' ? 'animate-shake' : ''}
            `}
          />
          {getErrorMessage('nomComplet')}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium opacity-80 mb-1">
            Email
          </label>
          <input
            type="text" 
            id="email" 
            value={formData.email}
            onChange={handleInputChange} 
            maxLength={EMAIL_MAX_CHARS + 1}
            className={`
              form-input
              ${validationErrors.email ? 'has-error' : ''}
              ${shakeField === 'email' ? 'animate-shake' : ''}
            `}
          />
          {getErrorMessage('email')}
        </div>
      </div>

      {/* Sujet */}
      <div>
        <label htmlFor="sujet" className="block text-sm font-medium opacity-80 mb-1">
          Sujet
        </label>
        <input
          type="text" 
          id="sujet" 
          value={formData.sujet}
          onChange={handleInputChange} 
          className={`
            form-input
            ${validationErrors.sujet ? 'has-error' : ''}
            ${shakeField === 'sujet' ? 'animate-shake' : ''}
          `}
        />
        {getErrorMessage('sujet')}
      </div>

      {/* Message */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="message" className="block text-sm font-medium opacity-80">
            Message
          </label>
          <span className={`text-xs ${messageCharCount > MAX_MESSAGE_CHARS ? 'text-red-500' : 'opacity-60'}`}>
            {messageCharCount}/{MAX_MESSAGE_CHARS}
          </span>
        </div>
        <textarea
          id="message" 
          value={formData.message}
          onChange={handleInputChange} 
          rows={6}
          className={`
            resize-none
            form-input
            ${validationErrors.message || tempWarning.message ? 'has-error' : ''}
            ${shakeField === 'message' ? 'animate-shake' : ''}
          `}
        />
        {getErrorMessage('message')}
      </div>
      
      {/* Bouton d'envoi */}
      <div className="flex items-center justify-between gap-4 mt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="
            menu-bar-link active 
            flex items-center gap-2 
            px-5 py-2.5 rounded-xl
            text-sm font-medium
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isLoading ? 'Envoi en cours...' : (
            <>
              Envoyer <Send size={16} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};