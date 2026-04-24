import React from 'react';
import { Link } from 'react-router-dom';
import {
  ScaleIcon, BrainIcon, ShieldIcon, ChartIcon,
  GlobeIcon, MicIcon, BookIcon, DocumentIcon,
  ArrowRightIcon, SparklesIcon, EyeIcon, DatabaseIcon,
} from '../components/Icons';
import DisclaimerBanner from '../components/DisclaimerBanner';

const FEATURES = [
  {
    icon: <BrainIcon size={22} color="#FFD700" />,
    title: 'AI-Powered Analysis',
    text: 'Advanced pattern recognition analyzes your case against thousands of similar legal situations to provide probability-based insights.',
  },
  {
    icon: <EyeIcon size={22} color="#FFD700" />,
    title: 'Full Transparency',
    text: 'Understand exactly why our AI reached its conclusion. Every factor, precedent, and legal principle is explained clearly.',
  },
  {
    icon: <ShieldIcon size={22} color="#FFD700" />,
    title: 'Privacy First',
    text: 'Your case details are encrypted and never shared. We use anonymized datasets and keep your information strictly confidential.',
  },
  {
    icon: <BookIcon size={22} color="#FFD700" />,
    title: 'Legal Education',
    text: 'Learn about your fundamental rights, relevant legal provisions, and similar case outcomes in simple, jargon-free language.',
  },
  {
    icon: <GlobeIcon size={22} color="#FFD700" />,
    title: 'Multilingual Support',
    text: 'Available in English and major Indian languages to ensure access for every citizen, regardless of language preference.',
  },
  {
    icon: <MicIcon size={22} color="#FFD700" />,
    title: 'Voice Input',
    text: 'Describe your case verbally for easier input. Especially designed for users who prefer speaking over typing.',
  },
];

const STEPS = [
  { num: 1, title: 'Describe Your Case', desc: 'Answer simple guided questions about your legal situation — no legal jargon needed.' },
  { num: 2, title: 'AI Analyzes Patterns', desc: 'Our AI examines your case against legal precedents, statutes, and similar case outcomes.' },
  { num: 3, title: 'Get Clear Insights', desc: 'Receive probability-based insights with detailed explanations of strengths and weaknesses.' },
  { num: 4, title: 'Understand & Decide', desc: 'Review the analysis, learn about your rights, and make informed decisions about next steps.' },
];

export default function Home() {
  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-badge">
          <SparklesIcon size={14} color="#FFD700" />
          AI-Powered Legal Insights Platform
        </div>
        <h1>
          Understand Your Legal Case<br />
          with <span className="gold">NyayaAI</span>
        </h1>
        <p className="hero-subtitle">
          Get AI-assisted probability-based insights for your legal cases. 
          Simple, transparent, and designed for every citizen of India.
        </p>
        <div className="hero-actions">
          <Link to="/analyze" className="btn btn-primary btn-lg">
            Analyze My Case
            <ArrowRightIcon size={18} />
          </Link>
          <Link to="/education" className="btn btn-secondary btn-lg">
            Know Your Rights
          </Link>
        </div>

        {/* Trust indicators */}
        <div style={{ display: 'flex', gap: '32px', marginTop: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Cases Analyzed', value: '50,000+' },
            { label: 'Legal Precedents', value: '10,000+' },
            { label: 'User Trust Score', value: '4.8/5' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-label">Features</span>
          <h2 className="section-title">Everything You Need to Understand Your Case</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 48px' }}>
            Built for common citizens — no legal background required.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="card" key={f.title}>
              <div className="card-header">
                <div className="card-icon">{f.icon}</div>
                <div className="card-title">{f.title}</div>
              </div>
              <p className="card-text">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="steps-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">How It Works</span>
          <h2 className="section-title">Four Simple Steps to Legal Clarity</h2>
          <div className="steps-grid">
            {STEPS.map((s) => (
              <div className="step-card" key={s.num}>
                <div className="step-number">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section container">
        <span className="section-label">Trust & Credibility</span>
        <h2 className="section-title">Built on Verified Legal Data</h2>
        <div className="trust-badges">
          <div className="trust-badge">
            <div className="trust-badge-icon"><DatabaseIcon size={24} color="#FFD700" /></div>
            <span>Anonymized Datasets</span>
          </div>
          <div className="trust-badge">
            <div className="trust-badge-icon"><ShieldIcon size={24} color="#FFD700" /></div>
            <span>End-to-End Encrypted</span>
          </div>
          <div className="trust-badge">
            <div className="trust-badge-icon"><EyeIcon size={24} color="#FFD700" /></div>
            <span>Fully Transparent AI</span>
          </div>
          <div className="trust-badge">
            <div className="trust-badge-icon"><DocumentIcon size={24} color="#FFD700" /></div>
            <span>Verified Precedents</span>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container">
        <DisclaimerBanner />
      </div>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '60px 24px 80px' }}>
        <h2 style={{ marginBottom: '16px' }}>Ready to Understand Your Case?</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '1rem' }}>
          Get AI-assisted insights in minutes — completely free.
        </p>
        <Link to="/analyze" className="btn btn-primary btn-lg">
          Start Your Analysis
          <ArrowRightIcon size={18} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 <span className="gold">NyayaAI</span> — AI for Legal Insights. This is not a law firm and does not provide legal advice.</p>
      </footer>
    </div>
  );
}
