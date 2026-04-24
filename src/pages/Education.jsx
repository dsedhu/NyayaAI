import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FUNDAMENTAL_RIGHTS, SAMPLE_PRECEDENTS } from '../data/legalData';
import { BookIcon, ScaleIcon, ArrowRightIcon, SparklesIcon } from '../components/Icons';

export default function Education() {
  const [expandedRight, setExpandedRight] = useState(null);
  const [activeTab, setActiveTab] = useState('rights');

  const allPrecedents = Object.entries(SAMPLE_PRECEDENTS).flatMap(([type, cases]) =>
    cases.map((c) => ({ ...c, caseType: type }))
  );

  return (
    <div className="page education-page">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', padding: '32px 0 40px' }}>
          <span className="section-label">Legal Education</span>
          <h1 style={{ marginBottom: '12px' }}>
            Know Your <span style={{ color: 'var(--gold)' }}>Rights</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
            Understanding your fundamental rights is the first step toward justice. 
            Here's a simple guide to the rights every Indian citizen should know.
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '40px',
        }}>
          <button
            className={`btn ${activeTab === 'rights' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveTab('rights')}
          >
            <BookIcon size={14} color={activeTab === 'rights' ? '#000' : '#FFD700'} />
            Fundamental Rights
          </button>
          <button
            className={`btn ${activeTab === 'cases' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            onClick={() => setActiveTab('cases')}
          >
            <ScaleIcon size={14} color={activeTab === 'cases' ? '#000' : '#FFD700'} />
            Landmark Cases
          </button>
        </div>

        {/* Fundamental Rights */}
        {activeTab === 'rights' && (
          <div className="rights-grid">
            {FUNDAMENTAL_RIGHTS.map((right, i) => (
              <div
                className="right-card"
                key={right.article}
                onClick={() => setExpandedRight(expandedRight === i ? null : i)}
                style={{ cursor: 'pointer' }}
              >
                <div className="right-number">{right.article}</div>
                <h3>{right.title}</h3>
                <p>{right.simplified}</p>

                {expandedRight === i && (
                  <div style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--gold-border)',
                    animation: 'fadeIn 0.3s ease',
                  }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Detailed Explanation
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      {right.description}
                    </p>
                  </div>
                )}

                <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--gold)' }}>
                  {expandedRight === i ? 'Click to collapse ↑' : 'Click to learn more →'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Landmark Cases */}
        {activeTab === 'cases' && (
          <div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
              These landmark cases have shaped Indian law. Understanding them can help you better understand legal principles.
            </p>
            <div style={{ display: 'grid', gap: '16px' }}>
              {allPrecedents.map((p, i) => (
                <div className="precedent-card" key={i} style={{ background: 'var(--dark-2)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-lg)', padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                      {p.name}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span className="tag">{p.year}</span>
                      <span className={`case-type-badge ${p.caseType}`}>{p.caseType}</span>
                    </div>
                  </div>
                  <p style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {p.summary}
                  </p>
                  <div style={{ marginTop: '10px' }}>
                    <span className="precedent-tag">{p.relevance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '60px 0 40px' }}>
          <h3 style={{ marginBottom: '12px' }}>Want to Know How These Apply to Your Case?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
            Our AI can analyze your specific situation against these legal principles.
          </p>
          <Link to="/analyze" className="btn btn-primary btn-lg">
            <SparklesIcon size={16} color="#000" />
            Analyze My Case
            <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
