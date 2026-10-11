const tabs = ["combat", "render", "movement", "hud", "settings"];

/** Decorative marketing illustration. It is not a screenshot of the real client. */
export function HeroMockup() {
  return (
    <figure style={{ margin: 0 }}>
      <div
        className="mock"
        role="img"
        aria-label="Illustrative mockup of a dark client settings menu with a category sidebar and toggle controls. Not a screenshot of the real client."
      >
        <div className="mock__bar" aria-hidden="true">
          <i /><i /><i />
          <span>fractal client</span>
        </div>
        <div className="mock__body" aria-hidden="true">
          <div className="mock__side">
            {tabs.map((t) => (
              <div key={t} className="mock__tab" data-active={t === "render"}>{t}</div>
            ))}
          </div>
          <div className="mock__main">
            <div className="mock__row"><span>Example toggle</span><span className="mock__switch" data-on="true" /></div>
            <div className="mock__row"><span>Example slider</span><span className="mock__slider" /></div>
            <div className="mock__row"><span>Example option</span><span className="mock__switch" data-on="false" /></div>
            <div className="mock__row"><span>Example toggle</span><span className="mock__switch" data-on="true" /></div>
            <div className="mock__note">illustration only</div>
          </div>
        </div>
      </div>
    </figure>
  );
}
