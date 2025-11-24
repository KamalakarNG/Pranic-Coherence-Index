import React, { useEffect, useState } from "react";
import PranicDashboard from "./components/PranicDashboard";

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setDeferredPrompt(null);
    });
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const showInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') setInstalled(true);
    setDeferredPrompt(null);
  };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'flex-end', padding:12}}>
        {!installed && deferredPrompt && (
          <button onClick={showInstall} style={{padding:'8px 12px', borderRadius:8, background:'#06b6d4', color:'#012'}}>
            Install App
          </button>
        )}
      </div>
      <PranicDashboard />
    </div>
  );
}
