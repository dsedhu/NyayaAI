import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MiniGauge } from '../components/ProbabilityGauge';
import { CASE_TYPES } from '../data/legalData';
import {
  PlusIcon, TrashIcon, ChartIcon, ScaleIcon,
  ClockIcon, ArrowRightIcon, SparklesIcon,
} from '../components/Icons';

export default function Dashboard() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('nyayaai_cases') || '[]');
    setCases(saved);
  }, []);

  const deleteCase = (id) => {
    const updated = cases.filter((c) => c.id !== id);
    setCases(updated);
    localStorage.setItem('nyayaai_cases', JSON.stringify(updated));
  };

  const viewCase = (c) => {
    navigate('/analysis', { state: { caseData: c.caseData, savedAnalysis: c.analysis } });
  };

  const formatDate = (iso) => {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCaseTypeInfo = (id) => CASE_TYPES.find((c) => c.id === id) || { label: id, icon: '⚖️' };

  // Stats
  const totalCases = cases.length;
  const avgProbability = totalCases > 0
    ? Math.round(cases.reduce((sum, c) => sum + (c.analysis?.probability || 0), 0) / totalCases)
    : 0;
  const highestProb = totalCases > 0
    ? Math.max(...cases.map((c) => c.analysis?.probability || 0))
    : 0;

  return (
    <div className="page dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <span className="section-label">Dashboard</span>
            <h2 style={{ marginTop: '4px' }}>Your Case History</h2>
          </div>
          <Link to="/analyze" className="btn btn-primary">
            <PlusIcon size={16} color="#000" />
            New Analysis
          </Link>
        </div>

        {/* Stats */}
        {totalCases > 0 && (
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-value">{totalCases}</div>
              <div className="stat-label">Cases Analyzed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{avgProbability}%</div>
              <div className="stat-label">Average Probability</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{highestProb}%</div>
              <div className="stat-label">Highest Probability</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {cases.length > 0 ? formatDate(cases[0].createdAt) : '—'}
              </div>
              <div className="stat-label">Last Analysis</div>
            </div>
          </div>
        )}

        {/* Case List */}
        {totalCases === 0 ? (
          <div className="empty-state">
            <ScaleIcon size={64} color="#333" />
            <h3>No Cases Yet</h3>
            <p>Start your first case analysis to see results here.</p>
            <Link to="/analyze" className="btn btn-primary">
              <SparklesIcon size={16} color="#000" />
              Analyze Your First Case
            </Link>
          </div>
        ) : (
          <div className="cases-grid">
            {cases.map((c) => {
              const typeInfo = getCaseTypeInfo(c.caseData?.caseType);
              const prob = c.analysis?.probability || 0;

              return (
                <div
                  className="case-card"
                  key={c.id}
                  onClick={() => viewCase(c)}
                >
                  <div className="case-card-header">
                    <span className={`case-type-badge ${c.caseData?.caseType || 'civil'}`}>
                      {typeInfo.icon} {typeInfo.label}
                    </span>
                    <span className="case-card-date">
                      <ClockIcon size={12} color="var(--text-muted)" /> {formatDate(c.createdAt)}
                    </span>
                  </div>

                  <div className="case-card-title">
                    {c.caseData?.facts
                      ? c.caseData.facts.length > 80
                        ? c.caseData.facts.substring(0, 80) + '...'
                        : c.caseData.facts
                      : 'Case analysis'
                    }
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div className="case-card-probability">
                      <MiniGauge value={prob} />
                      <div>
                        <div className="value">{prob}%</div>
                        <div className="label">Win probability</div>
                      </div>
                    </div>

                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCase(c.id);
                      }}
                      title="Delete case"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>

                  {/* Evidence & issues summary */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                    {c.caseData?.evidenceStrength && (
                      <span className="tag" style={{ fontSize: '0.7rem' }}>
                        Evidence: {c.caseData.evidenceStrength}
                      </span>
                    )}
                    {c.caseData?.legalIssues?.slice(0, 2).map((issue, i) => (
                      <span className="tag" key={i} style={{ fontSize: '0.7rem' }}>{issue}</span>
                    ))}
                    {(c.caseData?.legalIssues?.length || 0) > 2 && (
                      <span className="tag" style={{ fontSize: '0.7rem' }}>
                        +{c.caseData.legalIssues.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
