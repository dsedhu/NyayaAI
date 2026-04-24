import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CASE_TYPES, JURISDICTIONS, LEGAL_ISSUES, EVIDENCE_LEVELS } from '../data/legalData';
import { SparklesIcon, ArrowRightIcon, MicIcon } from '../components/Icons';
import DisclaimerBanner from '../components/DisclaimerBanner';

const INDIAN_LANGUAGES = [
  { code: 'en-IN', label: 'English', native: 'English' },
  { code: 'hi-IN', label: 'Hindi', native: 'हिन्दी' },
  { code: 'bn-IN', label: 'Bengali', native: 'বাংলা' },
  { code: 'te-IN', label: 'Telugu', native: 'తెలుగు' },
  { code: 'ta-IN', label: 'Tamil', native: 'தமிழ்' },
  { code: 'mr-IN', label: 'Marathi', native: 'मराठी' },
  { code: 'gu-IN', label: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn-IN', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml-IN', label: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa-IN', label: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or-IN', label: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as-IN', label: 'Assamese', native: 'অসমীয়া' },
  { code: 'ur-IN', label: 'Urdu', native: 'اردو' },
  { code: 'ne-NP', label: 'Nepali', native: 'नेपाली' },
  { code: 'sa-IN', label: 'Sanskrit', native: 'संस्कृतम्' },
];

const STEPS = [
  {
    id: 'welcome',
    botMessage: "Welcome to NyayaAI! I'll help you understand the possible outcomes of your legal case. Let's start with a few simple questions. 🏛️",
    type: 'info',
  },
  {
    id: 'caseType',
    botMessage: "What type of legal case is this?",
    type: 'select',
    options: CASE_TYPES,
  },
  {
    id: 'facts',
    botMessage: "Please describe the key facts of your case in your own words. Include what happened, when, and who is involved. Don't worry about legal language — plain words are perfect.",
    type: 'textarea',
    placeholder: 'E.g., "My landlord refused to return my security deposit of ₹50,000 after I vacated the apartment in January 2026. I have the rental agreement and payment receipts..."',
  },
  {
    id: 'evidence',
    botMessage: "How would you rate the strength of your evidence? (Documents, witnesses, records, etc.)",
    type: 'strength',
    options: EVIDENCE_LEVELS,
  },
  {
    id: 'jurisdiction',
    botMessage: "Where would this case be filed? Select the court or jurisdiction.",
    type: 'dropdown',
    options: JURISDICTIONS,
  },
  {
    id: 'legalIssues',
    botMessage: "Which legal issues are relevant to your case? You can select multiple.",
    type: 'multiselect',
    options: LEGAL_ISSUES,
  },
  {
    id: 'confirm',
    botMessage: "Great! I have all the information I need. Ready to analyze your case?",
    type: 'confirm',
  },
];

export default function CaseInput() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [caseData, setCaseData] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [selectedMulti, setSelectedMulti] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState('en-IN');
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  const speechSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const startListening = useCallback(() => {
    if (!speechSupported || isListening) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = voiceLang;
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => prev ? prev + ' ' + transcript : transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  }, [speechSupported, isListening, voiceLang]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  useEffect(() => {
    // Add initial bot message
    if (messages.length === 0) {
      addBotMessage(STEPS[0].botMessage);
      // Auto-advance from welcome after brief delay
      setTimeout(() => {
        addBotMessage(STEPS[1].botMessage);
        setCurrentStep(1);
      }, 800);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { type: 'user', text }]);
  };

  const advanceStep = (userText, dataKey, dataValue) => {
    addUserMessage(userText);

    const newData = { ...caseData, [dataKey]: dataValue };
    setCaseData(newData);

    const nextStep = currentStep + 1;
    if (nextStep < STEPS.length) {
      setTimeout(() => {
        addBotMessage(STEPS[nextStep].botMessage);
        setCurrentStep(nextStep);
      }, 500);
    }
  };

  const handleCaseTypeSelect = (ct) => {
    advanceStep(`${ct.icon} ${ct.label}`, 'caseType', ct.id);
  };

  const handleFactsSubmit = () => {
    if (!inputValue.trim()) return;
    advanceStep(inputValue.trim(), 'facts', inputValue.trim());
    setInputValue('');
  };

  const handleEvidenceSelect = (ev) => {
    advanceStep(`${ev.icon} ${ev.label} — ${ev.desc}`, 'evidenceStrength', ev.id);
  };

  const handleJurisdictionSelect = () => {
    if (!inputValue) return;
    advanceStep(inputValue, 'jurisdiction', inputValue);
    setInputValue('');
  };

  const handleMultiSelectDone = () => {
    if (selectedMulti.length === 0) return;
    advanceStep(selectedMulti.join(', '), 'legalIssues', [...selectedMulti]);
    setSelectedMulti([]);
  };

  const toggleMultiOption = (option) => {
    setSelectedMulti((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    addUserMessage("Yes, analyze my case!");

    setTimeout(() => {
      addBotMessage("Analyzing your case against legal precedents and provisions... ⚖️");
    }, 400);

    // Simulate analysis time
    setTimeout(() => {
      navigate('/analysis', { state: { caseData } });
    }, 2500);
  };

  const step = STEPS[currentStep];

  const renderInput = () => {
    if (isAnalyzing) {
      return (
        <div className="loading" style={{ padding: '40px' }}>
          <div className="loading-spinner" />
          <p>Analyzing your case...</p>
        </div>
      );
    }

    if (!step) return null;

    switch (step.type) {
      case 'info':
        return null;

      case 'select':
        return (
          <div className="chat-options">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                className="chat-option-btn"
                onClick={() => handleCaseTypeSelect(opt)}
                style={{ textAlign: 'left', padding: '14px 18px' }}
              >
                <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>{opt.icon}</span>
                <span>
                  <strong>{opt.label}</strong>
                  <br />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.desc}</span>
                </span>
              </button>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <div>
            <div style={{ position: 'relative' }}>
              <textarea
                className="chat-textarea"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={step.placeholder}
                rows={4}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleFactsSubmit();
                  }
                }}
              />
              {speechSupported && (
                <button
                  className={`voice-btn ${isListening ? 'listening' : ''}`}
                  onClick={isListening ? stopListening : startListening}
                  title={isListening ? 'Stop listening' : 'Voice input'}
                  type="button"
                  style={{
                    position: 'absolute',
                    right: '12px',
                    bottom: '12px',
                    background: isListening ? 'var(--gold)' : 'rgba(255,215,0,0.15)',
                    border: isListening ? '2px solid var(--gold)' : '2px solid rgba(255,215,0,0.3)',
                    borderRadius: '50%',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    animation: isListening ? 'voicePulse 1.5s infinite' : 'none',
                  }}
                >
                  <MicIcon size={18} color={isListening ? '#000' : '#FFD700'} />
                </button>
              )}
            </div>
            {speechSupported && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginTop: '8px',
              }}>
                <select
                  value={voiceLang}
                  onChange={(e) => setVoiceLang(e.target.value)}
                  style={{
                    background: 'var(--dark-3)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--dark-4)',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {INDIAN_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.native} ({lang.label})
                    </option>
                  ))}
                </select>
                {isListening && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    color: 'var(--gold)',
                  }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#ff4444',
                      animation: 'voicePulse 1s infinite',
                      display: 'inline-block',
                    }} />
                    Listening... speak now
                  </div>
                )}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', gap: '10px' }}>
              <button className="btn btn-primary btn-sm" onClick={handleFactsSubmit} disabled={!inputValue.trim()}>
                Continue <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        );

      case 'strength':
        return (
          <div className="strength-selector">
            {step.options.map((opt) => (
              <button
                key={opt.id}
                className="strength-option"
                onClick={() => handleEvidenceSelect(opt)}
              >
                <span className="icon">{opt.icon}</span>
                <strong>{opt.label}</strong>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{opt.desc}</div>
              </button>
            ))}
          </div>
        );

      case 'dropdown':
        return (
          <div>
            <select
              className="select-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            >
              <option value="">Select jurisdiction...</option>
              {step.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="btn btn-primary btn-sm" onClick={handleJurisdictionSelect} disabled={!inputValue}>
                Continue <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        );

      case 'multiselect':
        return (
          <div>
            <div className="multi-select">
              {step.options.map((opt) => (
                <button
                  key={opt}
                  className={`multi-pill ${selectedMulti.includes(opt) ? 'active' : ''}`}
                  onClick={() => toggleMultiOption(opt)}
                >
                  {selectedMulti.includes(opt) ? '✓ ' : ''}{opt}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {selectedMulti.length} selected
              </span>
              <button className="btn btn-primary btn-sm" onClick={handleMultiSelectDone} disabled={selectedMulti.length === 0}>
                Continue <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        );

      case 'confirm':
        return (
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button className="btn btn-primary" onClick={handleAnalyze}>
              <SparklesIcon size={16} color="#000" />
              Analyze My Case
            </button>
            <button className="btn btn-secondary" onClick={() => {
              setCurrentStep(1);
              setMessages([]);
              setCaseData({});
              addBotMessage(STEPS[0].botMessage);
              setTimeout(() => {
                addBotMessage(STEPS[1].botMessage);
                setCurrentStep(1);
              }, 400);
            }}>
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page">
      <div className="chat-container">
        <div style={{ textAlign: 'center', marginBottom: '8px', paddingTop: '16px' }}>
          <span className="section-label">Case Analysis</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Tell Us About Your Case</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            Answer simple questions — no legal jargon needed
          </p>
        </div>

        <DisclaimerBanner compact />

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.type}`}>
              {msg.type === 'bot' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <SparklesIcon size={14} color="#FFD700" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    NyayaAI
                  </span>
                </div>
              )}
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          position: 'sticky',
          bottom: 0,
          background: 'linear-gradient(transparent, var(--black) 20%)',
          padding: '24px 0',
        }}>
          {renderInput()}
        </div>
      </div>
    </div>
  );
}
