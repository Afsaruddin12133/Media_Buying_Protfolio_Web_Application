import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';

export default function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  const { whatsappUrl } = portfolioData.personalInfo;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Tooltip */}
      <span
        style={{
          background: 'rgba(6,9,19,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#f8fafc',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.06em',
          padding: '6px 12px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(8px)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        Chat on WhatsApp
      </span>

      {/* Button */}
      <div style={{ position: 'relative' }}>
        {/* Pulsing ring */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'rgba(37,211,102,0.35)',
            animation: 'wa-ping 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            background: 'rgba(37,211,102,0.15)',
            animation: 'wa-ping 2s ease-in-out infinite',
            animationDelay: '0.5s',
          }}
        />

        {/* Icon bubble */}
        <div
          style={{
            position: 'relative',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25d366 0%, #128c7e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered
              ? '0 0 0 4px rgba(37,211,102,0.25), 0 8px 32px rgba(37,211,102,0.5)'
              : '0 4px 20px rgba(37,211,102,0.4)',
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.526 5.855L0 24l6.335-1.506A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.784 9.784 0 0 1-4.988-1.365l-.358-.212-3.76.894.94-3.651-.233-.374A9.795 9.795 0 0 1 2.182 12c0-5.421 4.397-9.818 9.818-9.818 5.42 0 9.818 4.397 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z" />
          </svg>
        </div>
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes wa-ping {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.6); opacity: 0;   }
          100% { transform: scale(1.6); opacity: 0;   }
        }
      `}</style>
    </a>
  );
}
