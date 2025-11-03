import { useRef } from 'react';

const TURNSTILE_SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

interface TurnstileConfig {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
}

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, config: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
  }
}

export const useTurnstile = (config: TurnstileConfig) => {
  const widgetIdRef = useRef<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const loadScriptAndExecute = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      const createAndExecuteWidget = () => {
        if (!window.turnstile) {
          reject(new Error('Turnstile API non disponible'));
          return;
        }

        if (!containerRef.current) {
          const container = document.createElement('div');
          container.style.cssText = 'position:fixed;left:-9999px;width:1px;height:1px';
          document.body.appendChild(container);
          containerRef.current = container;
        }

        try {
          if (widgetIdRef.current) {
            try {
              window.turnstile.remove(widgetIdRef.current);
            } catch (e) {}
          }

          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: config.sitekey,
            theme: config.theme || 'auto',
            size: 'invisible',
            callback: (token: string) => resolve(token),
            'error-callback': () => reject(new Error('Échec de la vérification')),
          });

          window.turnstile.execute(widgetIdRef.current);
        } catch (error) {
          reject(error);
        }
      };

      const existingScript = document.querySelector(`script[src*="turnstile"]`);
      
      if (existingScript && window.turnstile) {
        setTimeout(createAndExecuteWidget, 50);
      } else if (existingScript) {
        existingScript.addEventListener('load', () => setTimeout(createAndExecuteWidget, 50));
      } else {
        const script = document.createElement('script');
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => setTimeout(createAndExecuteWidget, 50);
        script.onerror = () => reject(new Error('Erreur chargement script'));
        document.body.appendChild(script);
      }
    });
  };

  return { executeChallenge: loadScriptAndExecute };
};