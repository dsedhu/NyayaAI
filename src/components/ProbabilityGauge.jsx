import React, { useState, useEffect } from 'react';

export default function ProbabilityGauge({ value = 0, size = 280, animate = true }) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!animate) {
      setCurrentValue(value);
      return;
    }
    let start = 0;
    const duration = 1800;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.round(eased * value));
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [value, animate]);

  const center = size / 2;
  const strokeWidth = 14;
  const radius = center - strokeWidth - 8;
  const circumference = 2 * Math.PI * radius;
  // Show 270 degrees of arc (3/4 circle)
  const arcLength = circumference * 0.75;
  const offset = arcLength - (arcLength * currentValue) / 100;
  // Rotate to start from bottom-left
  const rotation = 135;

  const getColor = (val) => {
    if (val >= 70) return '#4CAF50';
    if (val >= 45) return '#FFD700';
    return '#EF5350';
  };

  const color = getColor(currentValue);

  return (
    <div className="gauge-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(${rotation} ${center} ${center})`}
        />

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = rotation + (270 * tick) / 100;
          const rad = (angle * Math.PI) / 180;
          const innerR = radius - strokeWidth / 2 - 4;
          const outerR = radius - strokeWidth / 2 - 12;
          return (
            <line
              key={tick}
              x1={center + innerR * Math.cos(rad)}
              y1={center + innerR * Math.sin(rad)}
              x2={center + outerR * Math.cos(rad)}
              y2={center + outerR * Math.sin(rad)}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Filled arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(${rotation} ${center} ${center})`}
          filter="url(#glow)"
          style={{ transition: animate ? 'none' : 'stroke-dashoffset 1s ease' }}
        />

        {/* End dot */}
        {currentValue > 0 && (() => {
          const endAngle = rotation + (270 * currentValue) / 100;
          const endRad = (endAngle * Math.PI) / 180;
          return (
            <circle
              cx={center + radius * Math.cos(endRad)}
              cy={center + radius * Math.sin(endRad)}
              r={strokeWidth / 2 + 2}
              fill={color}
              opacity="0.4"
            />
          );
        })()}
      </svg>

      <div className="gauge-label">
        <div className="gauge-percent" style={{ color }}>{currentValue}%</div>
        <div className="gauge-subtitle">Winning Probability</div>
      </div>
    </div>
  );
}

// Mini ring for dashboard cards
export function MiniGauge({ value = 0, size = 40 }) {
  const center = size / 2;
  const strokeWidth = 3.5;
  const radius = center - strokeWidth - 1;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * value) / 100;

  const getColor = (val) => {
    if (val >= 70) return '#4CAF50';
    if (val >= 45) return '#FFD700';
    return '#EF5350';
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mini-ring">
      <circle
        cx={center} cy={center} r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={center} cy={center} r={radius}
        fill="none"
        stroke={getColor(value)}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}
