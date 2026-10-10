export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <p className="eyebrow reveal">// 01 — ABOUT</p>
        <h2 className="about__statement reveal">
          I DON&apos;T JUST BUILD SOFTWARE.<br />
          <span className="accent">I BUILD SYSTEMS THAT THINK.</span>
        </h2>
        <p className="about__intro reveal">
          I&apos;m Hima Charan — an AI-focused developer exploring intelligent systems,
          backend architecture and agentic AI. I take complicated problems, break
          them down, and turn them into systems that actually work in the real world.
        </p>

        <ol className="capabilities">
          <li className="capability reveal">
            <span className="capability__no">01</span>
            <span className="capability__name">AI&nbsp;SYSTEMS</span>
            <span className="capability__desc">Models, inference &amp; intelligent pipelines.</span>
          </li>
          <li className="capability reveal">
            <span className="capability__no">02</span>
            <span className="capability__name">BACKEND</span>
            <span className="capability__desc">APIs, data &amp; resilient architecture.</span>
          </li>
          <li className="capability reveal">
            <span className="capability__no">03</span>
            <span className="capability__name">AGENTIC&nbsp;AI</span>
            <span className="capability__desc">Autonomous agents, tools &amp; orchestration.</span>
          </li>
          <li className="capability reveal">
            <span className="capability__no">04</span>
            <span className="capability__name">PROBLEM&nbsp;SOLVING</span>
            <span className="capability__desc">Decomposing hard problems into working systems.</span>
          </li>
        </ol>
      </div>
    </section>
  );
}
