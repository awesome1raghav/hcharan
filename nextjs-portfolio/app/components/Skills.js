export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <p className="eyebrow reveal">// 03 — SKILLS</p>
        <h2 className="section-title reveal">TECHNICAL ECOSYSTEM</h2>
        <p className="skills__lead reveal">Not a checklist — a system. Here&apos;s how the pieces connect.</p>

        <div className="skills__diagram reveal">
          <svg viewBox="0 0 900 520" className="tree" role="img" aria-label="Skills architecture: HIMA CHARAN branches into AI, Backend and Agentic AI, each with sub-skills.">
            {/* connectors */}
            <g className="tree__lines" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M450 78 L450 150" />
              <path d="M450 150 C450 200 170 170 170 210" />
              <path d="M450 150 C450 200 450 190 450 210" />
              <path d="M450 150 C450 200 730 170 730 210" />
              {/* AI leaves */}
              <path d="M170 258 C170 300 80 300 80 340" />
              <path d="M170 258 C170 300 170 300 170 340" />
              <path d="M170 258 C170 300 260 300 260 340" />
              {/* Backend leaves */}
              <path d="M450 258 C450 300 360 300 360 340" />
              <path d="M450 258 C450 300 450 300 450 340" />
              <path d="M450 258 C450 300 540 300 540 340" />
              {/* Agentic leaves */}
              <path d="M730 258 C730 300 640 300 640 340" />
              <path d="M730 258 C730 300 730 300 730 340" />
              <path d="M730 258 C730 300 820 300 820 340" />
            </g>
            {/* animated pulse */}
            <g className="tree__pulse" fill="none" stroke="var(--accent)" strokeWidth="1.5">
              <path d="M450 78 L450 150" />
              <path d="M450 150 C450 200 170 170 170 210" />
              <path d="M450 150 C450 200 450 190 450 210" />
              <path d="M450 150 C450 200 730 170 730 210" />
            </g>

            {/* root */}
            <g className="node node--root">
              <rect x="330" y="40" width="240" height="40" rx="4" />
              <text x="450" y="65">HIMA CHARAN</text>
            </g>
            {/* branches */}
            <g className="node node--branch">
              <rect x="90" y="210" width="160" height="46" rx="4" />
              <text x="170" y="238">AI</text>
            </g>
            <g className="node node--branch">
              <rect x="370" y="210" width="160" height="46" rx="4" />
              <text x="450" y="238">BACKEND</text>
            </g>
            <g className="node node--branch">
              <rect x="650" y="210" width="160" height="46" rx="4" />
              <text x="730" y="238">AGENTIC AI</text>
            </g>
            {/* leaves */}
            <g className="node node--leaf">
              <rect x="30" y="340" width="100" height="36" rx="4" /><text x="80" y="362">ML</text>
              <rect x="120" y="340" width="100" height="36" rx="4" /><text x="170" y="362">LLMs</text>
              <rect x="210" y="340" width="100" height="36" rx="4" /><text x="260" y="362">CV</text>

              <rect x="310" y="340" width="100" height="36" rx="4" /><text x="360" y="362">APIs</text>
              <rect x="400" y="340" width="100" height="36" rx="4" /><text x="450" y="362">DATABASES</text>
              <rect x="490" y="340" width="100" height="36" rx="4" /><text x="540" y="362">CLOUD</text>

              <rect x="590" y="340" width="100" height="36" rx="4" /><text x="640" y="362">AGENTS</text>
              <rect x="680" y="340" width="100" height="36" rx="4" /><text x="730" y="362">RAG</text>
              <rect x="770" y="340" width="100" height="36" rx="4" /><text x="820" y="362">TOOLS</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
