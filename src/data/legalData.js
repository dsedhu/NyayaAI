// Mock legal data for NyayaAI

export const CASE_TYPES = [
  { id: 'civil', label: 'Civil Dispute', icon: '⚖️', desc: 'Property, contracts, damages, injunctions' },
  { id: 'criminal', label: 'Criminal Case', icon: '🔒', desc: 'Offenses, bail, trial defense' },
  { id: 'family', label: 'Family Law', icon: '👨‍👩‍👧', desc: 'Divorce, custody, maintenance, succession' },
  { id: 'property', label: 'Property Dispute', icon: '🏠', desc: 'Land, tenancy, ownership rights' },
  { id: 'labor', label: 'Labor & Employment', icon: '💼', desc: 'Wages, wrongful termination, benefits' },
];

export const JURISDICTIONS = [
  'Supreme Court of India',
  'Delhi High Court',
  'Bombay High Court',
  'Madras High Court',
  'Calcutta High Court',
  'Karnataka High Court',
  'Allahabad High Court',
  'Gujarat High Court',
  'Rajasthan High Court',
  'Kerala High Court',
  'Punjab & Haryana High Court',
  'Telangana High Court',
  'District Court',
  'Consumer Forum',
  'Labour Tribunal',
  'Family Court',
];

export const LEGAL_ISSUES = [
  'Breach of Contract',
  'Property Ownership',
  'Domestic Violence',
  'Child Custody',
  'Wrongful Termination',
  'Defamation',
  'Cheque Bounce (Section 138 NI Act)',
  'Land Acquisition',
  'Bail Application',
  'Fundamental Rights Violation',
  'Consumer Rights',
  'Inheritance Dispute',
  'Maintenance / Alimony',
  'Cybercrime',
  'Insurance Claim',
  'Tenant-Landlord Dispute',
];

export const EVIDENCE_LEVELS = [
  { id: 'strong', label: 'Strong', icon: '💪', desc: 'Documents, witnesses, records available' },
  { id: 'moderate', label: 'Moderate', icon: '📋', desc: 'Some supporting evidence' },
  { id: 'weak', label: 'Weak', icon: '📝', desc: 'Limited or circumstantial evidence' },
];

export const FUNDAMENTAL_RIGHTS = [
  {
    article: 'Article 14',
    title: 'Right to Equality',
    description: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India. This ensures that everyone is treated equally regardless of caste, religion, gender, or place of birth.',
    simplified: 'Everyone is equal in the eyes of the law. No one can be discriminated against.',
  },
  {
    article: 'Article 19',
    title: 'Right to Freedom',
    description: 'All citizens shall have the right to freedom of speech and expression, to assemble peaceably, to form associations, to move freely, to reside and settle anywhere in India, and to practise any profession or trade.',
    simplified: 'You have the right to speak freely, gather peacefully, form groups, travel anywhere in India, and choose your profession.',
  },
  {
    article: 'Article 21',
    title: 'Right to Life & Personal Liberty',
    description: 'No person shall be deprived of his life or personal liberty except according to the procedure established by law. This includes the right to live with dignity, right to education, right to privacy, and right to a clean environment.',
    simplified: 'No one can take away your life or freedom without a fair legal process. This covers your right to live with dignity.',
  },
  {
    article: 'Article 22',
    title: 'Protection Against Arrest',
    description: 'Every arrested person has the right to be informed of the grounds of arrest, consult a lawyer, and be produced before a magistrate within 24 hours.',
    simplified: 'If you are arrested, you must be told why, allowed a lawyer, and brought before a judge within 24 hours.',
  },
  {
    article: 'Article 25',
    title: 'Freedom of Religion',
    description: 'Subject to public order, morality, and health, all persons are equally entitled to freedom of conscience and the right to freely profess, practise, and propagate religion.',
    simplified: 'You are free to follow, practice, and share any religion of your choice.',
  },
  {
    article: 'Article 32',
    title: 'Right to Constitutional Remedies',
    description: 'The right to move the Supreme Court for enforcement of fundamental rights. Dr. B.R. Ambedkar called this the "heart and soul" of the Constitution.',
    simplified: 'If your fundamental rights are violated, you can go directly to the Supreme Court for protection.',
  },
];

export const SAMPLE_PRECEDENTS = {
  civil: [
    {
      name: 'Indian Oil Corporation v. NEPC India Ltd.',
      year: '2006',
      summary: 'Supreme Court upheld that contractual obligations must be honored, and damages are awarded for breach of contract when performance is not excused.',
      relevance: 'Contract enforcement',
    },
    {
      name: 'Joaquim Dias v. Smt. Rufina Dias',
      year: '2019',
      summary: 'Property dispute resolved by examining chain of title and documentary evidence. Court emphasized the importance of registered documents.',
      relevance: 'Property documentation',
    },
  ],
  criminal: [
    {
      name: 'Arnesh Kumar v. State of Bihar',
      year: '2014',
      summary: 'Supreme Court laid down guidelines against automatic arrest in cases with punishment less than 7 years. Police must follow a checklist before making an arrest.',
      relevance: 'Arrest procedures',
    },
    {
      name: 'Dataram Singh v. State of UP',
      year: '2018',
      summary: 'Bail considerations include nature of accusation, severity of punishment, character of evidence, and reasonable apprehension of witness tampering.',
      relevance: 'Bail principles',
    },
  ],
  family: [
    {
      name: 'Shilpa Sailesh v. Varun Sreenivasan',
      year: '2023',
      summary: 'Supreme Court ruled it can directly grant divorce under Article 142, even without mutual consent, to do complete justice and end irretrievable breakdown of marriage.',
      relevance: 'Divorce proceedings',
    },
    {
      name: 'Githa Hariharan v. Reserve Bank of India',
      year: '1999',
      summary: 'Mother can be the natural guardian of a minor. Court emphasized gender equality in guardianship rights.',
      relevance: 'Child custody',
    },
  ],
  property: [
    {
      name: 'Suraj Lamp & Industries v. State of Haryana',
      year: '2012',
      summary: 'Supreme Court declared that property transfers through power of attorney, will, and agreement to sell are not legally valid means of transfer.',
      relevance: 'Property transfer validity',
    },
  ],
  labor: [
    {
      name: 'Workmen of Dimakuchi Tea Estate v. Management',
      year: '1958',
      summary: 'Established principles for computing compensation in wrongful termination. Workers entitled to back wages and reinstatement.',
      relevance: 'Wrongful termination',
    },
  ],
};

// Simulated AI analysis function
export function generateAnalysis(caseData) {
  const { caseType, facts, evidenceStrength, jurisdiction, legalIssues } = caseData;

  // Base probability based on evidence strength
  let baseProbability = evidenceStrength === 'strong' ? 72 : evidenceStrength === 'moderate' ? 55 : 38;

  // Adjust based on number of legal issues (complexity factor)
  const complexityPenalty = Math.min((legalIssues?.length || 1) * 2, 10);
  baseProbability -= complexityPenalty;

  // Add some randomness for realism
  const variance = Math.floor(Math.random() * 10) - 5;
  const probability = Math.min(Math.max(baseProbability + variance, 15), 92);
  const confidenceLow = Math.max(probability - 12, 10);
  const confidenceHigh = Math.min(probability + 12, 95);

  const strengths = [];
  const weaknesses = [];

  if (evidenceStrength === 'strong') {
    strengths.push({ text: 'Strong documentary and testimonial evidence available', score: 85 });
    strengths.push({ text: 'Evidence supports the primary claims effectively', score: 78 });
  } else if (evidenceStrength === 'moderate') {
    strengths.push({ text: 'Some supporting evidence strengthens the case', score: 60 });
    weaknesses.push({ text: 'Evidence gaps may require additional corroboration', score: 45 });
  } else {
    weaknesses.push({ text: 'Limited evidence may weaken the primary arguments', score: 30 });
    weaknesses.push({ text: 'Opposing party may challenge the evidentiary basis', score: 35 });
  }

  if (facts && facts.length > 100) {
    strengths.push({ text: 'Detailed factual narrative provides a clear picture', score: 70 });
  } else {
    weaknesses.push({ text: 'Consider providing more detailed facts for stronger analysis', score: 40 });
  }

  strengths.push({ text: 'Applicable legal provisions support the claim', score: 65 });

  if (jurisdiction?.includes('Supreme') || jurisdiction?.includes('High')) {
    strengths.push({ text: 'Higher courts tend to have more structured proceedings', score: 60 });
  }

  weaknesses.push({ text: 'Outcome depends on judicial interpretation and case specifics', score: 50 });

  const keyReasons = [
    `Evidence strength rated as "${evidenceStrength}" — ${evidenceStrength === 'strong' ? 'significantly supports' : evidenceStrength === 'moderate' ? 'moderately supports' : 'may not sufficiently support'} your position.`,
    `Case type "${caseType}" has established legal frameworks and precedents in Indian law.`,
    `${legalIssues?.length || 0} legal issue(s) identified — ${(legalIssues?.length || 0) > 2 ? 'multi-issue cases can be more complex' : 'focused issues can lead to clearer outcomes'}.`,
    `Filing in ${jurisdiction || 'the selected jurisdiction'} — procedural compliance will be important.`,
    'Probability is based on pattern analysis of similar cases and should not be treated as a guarantee.',
  ];

  const factors = [
    { name: 'Evidence Strength', impact: evidenceStrength === 'strong' ? 'positive' : evidenceStrength === 'moderate' ? 'neutral' : 'negative', weight: 'High' },
    { name: 'Precedent Similarity', impact: 'positive', weight: 'Medium' },
    { name: 'Legal Provisions Applicability', impact: 'positive', weight: 'High' },
    { name: 'Case Complexity', impact: (legalIssues?.length || 0) > 3 ? 'negative' : 'neutral', weight: 'Medium' },
    { name: 'Jurisdictional Factors', impact: 'neutral', weight: 'Low' },
    { name: 'Factual Clarity', impact: facts && facts.length > 100 ? 'positive' : 'neutral', weight: 'Medium' },
  ];

  const precedents = SAMPLE_PRECEDENTS[caseType] || SAMPLE_PRECEDENTS.civil;

  return {
    probability,
    confidenceRange: [confidenceLow, confidenceHigh],
    confidenceScore: Math.round((probability + confidenceHigh) / 2),
    strengths,
    weaknesses,
    keyReasons,
    factors,
    precedents,
    dataSources: [
      'Indian Kanoon Legal Database (anonymized)',
      'Supreme Court Judgments Archive',
      'High Court Orders Database',
      'National Judicial Data Grid (NJDG)',
      'Legal provisions and statutory analysis',
    ],
    timestamp: new Date().toISOString(),
  };
}
