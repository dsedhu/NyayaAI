import React from 'react';
import { WarningIcon } from './Icons';

export default function DisclaimerBanner({ compact = false }) {
  if (compact) {
    return (
      <div className="disclaimer-banner" style={{ maxWidth: '100%', margin: '16px 0' }}>
        <WarningIcon size={20} color="#FFA726" />
        <div>
          <div className="text">
            <strong style={{ color: '#FFA726' }}>Disclaimer:</strong> This is AI-assisted analysis, not legal advice. Consult a qualified lawyer for actual legal decisions.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="disclaimer-banner">
      <WarningIcon size={24} color="#FFA726" />
      <div>
        <div className="title">Important Ethical Disclaimer</div>
        <div className="text">
          NyayaAI provides <strong>AI-assisted probability-based insights only</strong>. This is <strong>not legal advice</strong> and
          should not be treated as a substitute for professional legal consultation. Results are generated from pattern
          analysis of anonymized legal datasets and may not account for all case-specific nuances. Always consult a
          qualified legal professional before making legal decisions.
        </div>
      </div>
    </div>
  );
}
