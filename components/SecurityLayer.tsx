
import React, { useEffect } from 'react';

interface SecurityLayerProps {
  children: React.ReactNode;
}

const SecurityLayer: React.FC<SecurityLayerProps> = ({ children }) => {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Disable Keyboard Shortcuts (Inspect, View Source, Save, Print)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
      }
      
      // Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C (DevTools)
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
      }
    };

    // 3. Console Warning (Self-XSS Protection)
    const showConsoleWarning = () => {
      const warningTitle = 'display: block; color: red; font-size: 40px; font-weight: bold; text-shadow: 1px 1px 0px black;';
      const warningText = 'display: block; color: black; font-size: 16px; font-weight: bold;';
      
      console.clear();
      console.log('%cPARE!', warningTitle);
      console.log('%cEste é um recurso de navegador voltado para desenvolvedores. Se alguém lhe disse para copiar e colar algo aqui, é uma tentativa de roubo de dados.', warningText);
    };

    // Add Listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    // Initial warning
    showConsoleWarning();
    
    // Optional: Re-show warning if console is cleared or used
    const interval = setInterval(showConsoleWarning, 5000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  // 4. Disable User Select (CSS)
  return (
    <div 
      className="select-none" 
      style={{ 
        WebkitUserSelect: 'none', 
        MozUserSelect: 'none', 
        msUserSelect: 'none', 
        userSelect: 'none' 
      }}
      onCopy={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};

export default SecurityLayer;
