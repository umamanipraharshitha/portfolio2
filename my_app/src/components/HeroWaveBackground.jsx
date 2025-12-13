import React from "react";

export default function HeroWaveBackground() {
  return (
    <div className="hero-bg">
      <svg className="wave-top" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path d="M0,160 C360,260 720,60 1440,200 L1440,0 L0,0 Z" />
      </svg>

      <svg className="wave-bottom" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path d="M0,240 C400,120 800,360 1440,220 L1440,400 L0,400 Z" />
      </svg>
    </div>
  );
}
