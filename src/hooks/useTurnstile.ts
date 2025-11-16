import { useRef, useEffect, useState } from 'react';

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
  const currentTokenRef = useRef<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Fonction pour créer et exécuter le widget
  const createAndExecuteWidget = (): Promise<string> => {
    return new Promise((resolve, reject) => {
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
          } catch (e) {
          }
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: config.sitekey,
          theme: config.theme || 'auto',
          size: 'invisible',
          callback: (token: string) => {
            currentTokenRef.current = token;
            resolve(token);
          },
          'error-callback': () => {
            currentTokenRef.current = null;
            reject(new Error('Échec de la vérification'));
          },
          'expired-callback': () => {
            currentTokenRef.current = null;
            createAndExecuteWidget();
          },
        });

        window.turnstile.execute(widgetIdRef.current);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    const loadScriptAndInit = () => {
      const existingScript = document.querySelector('script[src*="turnstile"]');
      
      const initWidget = () => {
        setTimeout(() => {
          createAndExecuteWidget()
            .then(() => setIsReady(true))
            .catch((err) => console.error('Erreur initialisation Turnstile:', err));
        }, 50);
      };

      if (existingScript && window.turnstile) {
        initWidget();
      } else if (existingScript) {
        existingScript.addEventListener('load', initWidget);
      } else {
        const script = document.createElement('script');
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = initWidget;
        script.onerror = () => console.error('Erreur chargement script Turnstile');
        document.body.appendChild(script);
      }
    };

    loadScriptAndInit();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
        }
      }
      if (containerRef.current && containerRef.current.parentNode) {
        containerRef.current.parentNode.removeChild(containerRef.current);
      }
    };
  }, [config.sitekey, config.theme]);

  const executeChallenge = async (): Promise<string> => {
    if (currentTokenRef.current) {
      return currentTokenRef.current;
    }

    return createAndExecuteWidget();
  };

  return { 
    executeChallenge, 
    isReady
  };
};