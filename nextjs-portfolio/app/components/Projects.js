export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="wrap projects__head">
        <p className="eyebrow reveal">// 02 — PROJECTS</p>
        <h2 className="section-title reveal">SELECTED SYSTEMS</h2>
      </div>

      {/* PROJECT 01 */}
      <article className="project">
        <div className="project__inner wrap">
          <div className="project__visual reveal" aria-hidden="true">
            <span className="project__ghost">01</span>
            <span className="project__visual-tag">// preview</span>
          </div>
          <div className="project__body reveal">
            <p className="project__no">PROJECT 01</p>
            <h3 className="project__name">FARMTOMARKET</h3>
            <p className="project__field">AI × AGRICULTURE × REAL-WORLD IMPACT</p>
            <p className="project__desc">
              A system that connects growers directly to markets — using AI to
              forecast demand, price fairly and cut out the layers that erode a
              farmer&apos;s margin.
            </p>
            <dl className="project__meta">
              <div><dt>ROLE</dt><dd>AI / SYSTEM DESIGN</dd></div>
              <div><dt>TECHNOLOGY</dt><dd>Python · ML · Backend</dd></div>
              <div><dt>STATUS</dt><dd><span className="dot dot--live"></span> ACTIVE</dd></div>
            </dl>
            <a className="project__link" href="#" aria-label="View FarmToMarket project">View Project →</a>
          </div>
        </div>
      </article>

      {/* PROJECT 02 */}
      <article className="project project--alt">
        <div className="project__inner wrap">
          <div className="project__visual reveal" aria-hidden="true">
            <span className="project__ghost">02</span>
            <span className="project__visual-tag">// preview</span>
          </div>
          <div className="project__body reveal">
            <p className="project__no">PROJECT 02</p>
            <h3 className="project__name">AGENTFLOW</h3>
            <p className="project__field">AGENTIC AI × ORCHESTRATION</p>
            <p className="project__desc">
              An orchestration layer where autonomous agents plan, call tools and
              hand work to each other — turning a single prompt into a coordinated
              multi-step system.
            </p>
            <dl className="project__meta">
              <div><dt>ROLE</dt><dd>ARCHITECTURE / AGENTS</dd></div>
              <div><dt>TECHNOLOGY</dt><dd>LLMs · Tooling · RAG</dd></div>
              <div><dt>STATUS</dt><dd><span className="dot dot--build"></span> IN PROGRESS</dd></div>
            </dl>
            <a className="project__link" href="#" aria-label="View AgentFlow project">View Project →</a>
          </div>
        </div>
      </article>

      {/* PROJECT 03 */}
      <article className="project">
        <div className="project__inner wrap">
          <div className="project__visual reveal" aria-hidden="true">
            <span className="project__ghost">03</span>
            <span className="project__visual-tag">// preview</span>
          </div>
          <div className="project__body reveal">
            <p className="project__no">PROJECT 03</p>
            <h3 className="project__name">CORTEX API</h3>
            <p className="project__field">BACKEND × ML INFERENCE</p>
            <p className="project__desc">
              A backend that serves ML models under real traffic — clean APIs,
              caching and observability so intelligence ships reliably, not just
              in a notebook.
            </p>
            <dl className="project__meta">
              <div><dt>ROLE</dt><dd>BACKEND / INFRA</dd></div>
              <div><dt>TECHNOLOGY</dt><dd>Python · APIs · Cloud</dd></div>
              <div><dt>STATUS</dt><dd><span className="dot dot--build"></span> PROTOTYPE</dd></div>
            </dl>
            <a className="project__link" href="#" aria-label="View Cortex API project">View Project →</a>
          </div>
        </div>
      </article>
    </section>
  );
}
