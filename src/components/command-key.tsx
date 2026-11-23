/* An exploded terminal key, drawn in the directory's graphite and blue palette. */
export function CommandKey() {
  return <svg className="command-key" viewBox="0 0 440 300" fill="none" aria-hidden="true">
    <defs>
      <pattern id="key-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#868684" opacity=".4" /></pattern>
      <linearGradient id="key-face" x2="1" y2="1" gradientUnits="objectBoundingBox"><stop stopColor="#40403f"/><stop offset=".7" stopColor="#1E1E1D"/><stop offset="1" stopColor="#2f2f2f"/></linearGradient>
      <linearGradient id="key-edge"><stop stopColor="#217EFF" stopOpacity=".12"/><stop offset=".52" stopColor="#217EFF"/><stop offset="1" stopColor="#217EFF" stopOpacity=".2"/></linearGradient>
    </defs>
    <rect x="20" y="18" width="400" height="264" fill="url(#key-dots)"/>
    <g stroke="#868684" opacity=".55"><path d="M20 28V18h10m380 0h10v10M20 272v10h10m380 0h10v-10"/><path d="m65 197 151 76 167-82M212 27v244" strokeDasharray="3 6"/></g>
    {[232,220,208,196].map((y,i)=><g key={y} transform={`matrix(.94 .47 -.94 .47 213 ${y-135})`}><rect width="142" height="142" rx="13" fill="#171717" stroke={i===3?'#217EFF':'#646464'}/><rect x="7" y="7" width="128" height="128" rx="9" stroke="#40403f"/>{[17,125].flatMap(x=>[17,125].map(v=><circle key={`${x}-${v}`} cx={x} cy={v} r="2" fill="#868684"/>))}</g>)}
    <path d="m98 128 115 57 115-57v22l-115 58-115-58z" fill="#171717" stroke="#40403f"/><path d="m99 149 114 57 114-57" stroke="url(#key-edge)" strokeWidth="3"/>
    <g transform="matrix(.92 .46 -.92 .46 213 68)"><rect width="126" height="126" rx="12" fill="url(#key-face)" stroke="#868684"/><rect x="5" y="5" width="116" height="116" rx="9" stroke="#868684" opacity=".28"/><path d="m35 42 21 21-21 21m29-3h26" stroke="#FAFAFA" strokeWidth="8" strokeLinejoin="round"/><text x="12" y="111" fontSize="7" fontFamily="monospace" fill="#868684">OPEN CLI</text></g>
    <path d="m296 88 30-30h45" stroke="#868684"/><circle cx="296" cy="88" r="2" fill="#217EFF"/><text x="327" y="51" fill="#aaa" fontSize="9" fontFamily="monospace">FIG. 01</text>
  </svg>;
}
