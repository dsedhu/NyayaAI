import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { generateAnalysis, CASE_TYPES } from '../data/legalData';
import ProbabilityGauge from '../components/ProbabilityGauge';
import DisclaimerBanner from '../components/DisclaimerBanner';
import {
  CheckIcon, WarningIcon, SparklesIcon, ArrowRightIcon,
  ShieldIcon, ScaleIcon, BookIcon, DatabaseIcon, EyeIcon,
} from '../components/Icons';

export default function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const caseData = location.state?.caseData;

  useEffect(() => {
    if (!caseData) {
      navigate('/analyze');
      return;
    }

    // Simulate AI processing time
    const timer = setTimeout(() => {
      const result = generateAnalysis(caseData);
      setAnalysis(result);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [caseData, navigate]);

  const handleSave = () => {
    if (!analysis || !caseData) return;

    const savedCases = JSON.parse(localStorage.getItem('nyayaai_cases') || '[]');
    const newCase = {
      id: Date.now(),
      caseData,
      analysis,
      createdAt: new Date().toISOString(),
    };
    savedCases.unshift(newCase);
    localStorage.setItem('nyayaai_cases', JSON.stringify(savedCases));
    setSaved(true);
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading" style={{ minHeight: '60vh' }}>
          <div className="loading-spinner" />
          <p>Analyzing your case against legal precedents...</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            This typically takes a few moments
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const caseTypeLabel = CASE_TYPES.find(c => c.id === caseData.caseType)?.label || caseData.caseType;

  return (
    <div className="page analysis-page">
      {/* Hero */}
      <div className="analysis-hero">
        <span className="section-label">Analysis Complete</span>
        <h1>Your Case Insights</h1>
        <p>
          {caseTypeLabel} • {caseData.jurisdiction || 'General Jurisdiction'}
        </p>
      </div>

      {/* Probability Gauge */}
      <div className="gauge-section">
        <ProbabilityGauge value={analysis.probability} />
        <div className="confidence-range">
          Confidence Range: <span className="value">{analysis.confidenceRange[0]}% — {analysis.confidenceRange[1]}%</span>
        </div>
        <div style={{ marginTop: '12px' }}>
          <span className="tag">
            <SparklesIcon size={10} color="#FFD700" /> Confidence Score: {analysis.confidenceScore}%
          </span>
        </div>
      </div>

      {/* Key Reasons */}
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="analysis-card" style={{ marginBottom: '24px' }}>
          <div className="analysis-card-title">
            <SparklesIcon size={18} color="#FFD700" />
            Key Reasons
          </div>
          {analysis.keyReasons.map((reason, i) => (
            <div className="reason-item" key={i}>
              <span className="reason-bullet neutral" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="analysis-grid" style={{ marginBottom: '40px' }}>
        {/* Strengths */}
        <div className="analysis-card">
          <div className="analysis-card-title" style={{ color: 'var(--success)' }}>
            <CheckIcon size={18} color="#4CAF50" />
            Strengths
          </div>
          {analysis.strengths.map((s, i) => (
            <div className="sw-item" key={i}>
              <div className="sw-label">
                <span>{s.text}</span>
                <span className="high">{s.score}%</span>
              </div>
              <div className="sw-bar">
                <div
                  className="sw-bar-fill strength"
                  style={{ width: `${s.score}%`, animation: 'slideRight 1s ease-out' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Weaknesses */}
        <div className="analysis-card">
          <div className="analysis-card-title" style={{ color: 'var(--danger)' }}>
            <WarningIcon size={18} color="#EF5350" />
            Weaknesses
          </div>
          {analysis.weaknesses.map((w, i) => (
            <div className="sw-item" key={i}>
              <div className="sw-label">
                <span>{w.text}</span>
                <span className="low">{w.score}%</span>
              </div>
              <div className="sw-bar">
                <div
                  className="sw-bar-fill weakness"
                  style={{ width: `${w.score}%`, animation: 'slideRight 1s ease-out' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explainability — "Why This Result?" */}
      <div className="explainability">
        <div className="explain-card">
          <h3>
            <EyeIcon size={20} color="#FFD700" /> Why This Result?
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
            These are the factors our AI considered and their impact on the probability estimate.
          </p>
          {analysis.factors.map((f, i) => (
            <div className="factor-row" key={i}>
              <span className="factor-name">{f.name}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Weight: {f.weight}</span>
                <span className={`factor-impact ${f.impact}`}>
                  {f.impact === 'positive' ? '▲ Positive' : f.impact === 'negative' ? '▼ Negative' : '● Neutral'}
                </span>
              </div>
            </div>
          ))}

          {/* Transparency indicators */}
          <div style={{ marginTop: '24px', padding: '16px', background: 'var(--gold-muted)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <ShieldIcon size={16} color="#FFD700" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--gold)' }}>Transparency Note</span>
            </div>
            <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              This analysis is generated using pattern matching against anonymized legal datasets. 
              The AI considers evidence strength, legal precedent similarity, applicable provisions, 
              and jurisdictional factors. It does not access private data or make deterministic predictions.
            </p>
          </div>
        </div>
      </div>

      {/* Relevant Precedents */}
      <div className="container" style={{ maxWidth: '900px', margin: '40px auto' }}>
        <div className="analysis-card">
          <div className="analysis-card-title">
            <ScaleIcon size={18} color="#FFD700" />
            Relevant Legal Precedents
          </div>
          {analysis.precedents.map((p, i) => (
            <div className="precedent-card" key={i}>
              <h4>{p.name} ({p.year})</h4>
              <p>{p.summary}</p>
              <span className="precedent-tag">{p.relevance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources */}
      <div className="container" style={{ maxWidth: '900px', margin: '24px auto' }}>
        <div className="analysis-card">
          <div className="analysis-card-title">
            <DatabaseIcon size={18} color="#FFD700" />
            Data Sources
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {analysis.dataSources.map((src, i) => (
              <span className="tag" key={i}>{src}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="container" style={{ maxWidth: '900px' }}>
        <DisclaimerBanner />
      </div>

      {/* Actions */}
      <div style={{ textAlign: 'center', padding: '32px 24px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            className={`btn ${saved ? 'btn-ghost' : 'btn-primary'}`}
            onClick={handleSave}
            disabled={saved}
          >
            {saved ? '✓ Saved to Dashboard' : 'Save Analysis'}
          </button>
          <Link to="/analyze" className="btn btn-secondary">
            Analyze Another Case
          </Link>
          <Link to="/dashboard" className="btn btn-ghost">
            View Dashboard <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
