export default function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact__glow" aria-hidden="true"></div>
      <div className="wrap contact__inner">
        <p className="eyebrow reveal">// TRANSMISSION ENDPOINT</p>
        <p className="contact__prompt reveal">HAVE AN IDEA?</p>
        <h2 className="contact__headline reveal">
          LET&apos;S BUILD<br />SOMETHING <span className="accent">REAL.</span>
        </h2>

        <div className="contact__links reveal">
          <a className="contact__link" href="mailto:hello@himacharan.dev">[ EMAIL ]</a>
          <a className="contact__link" href="#" target="_blank" rel="noopener">[ LINKEDIN ]</a>
          <a className="contact__link" href="#" target="_blank" rel="noopener">[ GITHUB ]</a>
        </div>

        <div className="contact__wordmark reveal">HIMA CHARAN</div>
        <p className="contact__foot">© 2026 Hima Charan · AI · Backend · Agentic AI</p>
      </div>
    </section>
  );
}
