// Decorative geometry only. All content and controls remain above this layer.
export function AmbientBackdrop() {
  return <div className="ambient-backdrop" aria-hidden="true">
    <div className="ambient-grid" />
    <div className="ambient-glow" />
    <svg className="signal-traces" viewBox="0 0 1440 900" preserveAspectRatio="none" focusable="false">
      <defs>
        <path id="signal-left" d="M0 230 H28 V490 H66 V710 H240" />
        <path id="signal-right" d="M1440 130 H1412 V355 H1376 V570 H1300 V760 H1120" />
        <path id="signal-bottom" d="M170 900 V850 H540 L580 810 H860 L900 850 H1270 V900" />
      </defs>
      <g className="signal-rails"><use href="#signal-left" /><use href="#signal-right" /><use href="#signal-bottom" /></g>
      <g className="signal-packets"><use href="#signal-left" /><use href="#signal-right" /><use href="#signal-bottom" /></g>
      <g className="signal-nodes"><circle cx="66" cy="490" r="4" /><circle cx="1376" cy="355" r="4" /><circle cx="580" cy="810" r="4" /><circle cx="860" cy="810" r="4" /></g>
    </svg>
    <div className="code-fragments"><span>{'{ }'}</span><span>{'</>'}</span><span>{'=>'}</span><span>{'[ ]'}</span><span>{'01'}</span><span>{'/* */'}</span></div>
  </div>;
}
