import React, { useState } from 'react';

interface ElevenLabsDemoProps {
  className?: string;
}

const ElevenLabsDemo: React.FC<ElevenLabsDemoProps> = ({ className }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Frase impactante per il creator di ebook AI
  const impactfulPhrase = "Trasforma le tue idee in storie che cambiano il mondo - ogni parola ha il potere di ispirare, ogni voce può toccare l'anima.";
  
  const handlePlayText = async () => {
    setIsPlaying(true);
    // Placeholder per futura integrazione con ElevenLabs API
    console.log('Riproduzione audio della frase:', impactfulPhrase);
    
    // Simulazione di riproduzione audio
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className={`elevenlabs-demo ${className || ''}`}>
      <div style={{
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{
          fontSize: '1.8rem',
          marginBottom: '1.5rem',
          fontWeight: 'bold'
        }}>
          🎙️ CREATOR EBOOK AI
        </h1>
        
        <blockquote style={{
          fontSize: '1.1rem',
          lineHeight: '1.6',
          fontStyle: 'italic',
          marginBottom: '2rem',
          padding: '1rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          border: 'none'
        }}>
          "{impactfulPhrase}"
        </blockquote>
        
        <button
          onClick={handlePlayText}
          disabled={isPlaying}
          style={{
            background: isPlaying ? '#6c757d' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: isPlaying ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: '600'
          }}
        >
          {isPlaying ? '🎵 Riproduzione in corso...' : '▶️ Ascolta con ElevenLabs'}
        </button>
        
        <p style={{
          marginTop: '1rem',
          fontSize: '0.9rem',
          opacity: '0.8'
        }}>
          Powered by AI • Elevato da ElevenLabs
        </p>
      </div>
    </div>
  );
};

export default ElevenLabsDemo;
