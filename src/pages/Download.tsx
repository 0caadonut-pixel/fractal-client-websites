import { Container } from "../components/Container";
import { DownloadPanel } from "../components/DownloadPanel";
import { PageIntro } from "../components/PageIntro";
import { CommunityButton } from "../components/CommunityButton";
import { download } from "../config/download";
import { usePageMeta } from "../hooks/usePageMeta";

const troubleshooting = [
  { q: "the download is missing", a: "If the panel says no download is available, no release has been published yet. Check the community server for announcements." },
  { q: "the link is broken", a: "Reload the page and try again. If it still fails, report the problem in the community server and include the page you used." },
  { q: "the file will not open", a: "Check that the file finished downloading and, if a checksum is shown, that it matches. Requirements depend on the actual release." },
  { q: "my game version is not supported", a: "Only the Minecraft version listed in the panel is supported. If none is listed, support has not been confirmed." },
  { q: "i have installation questions", a: "Ask in the official community server. Answers are given by community members and are not guaranteed." },
];

export default function Download() {
  usePageMeta("download", "Download fractal client, release information, installation steps and troubleshooting.");
  return (
    <>
      <Container>
        <PageIntro eyebrow="download" title="download">
          <p className="lead">Get fractal client, check the release details and find installation help.</p>
        </PageIntro>
      </Container>

      <Container as="section" className="section">
        <div className="dl-layout">
          <DownloadPanel />
          <div className="stack--lg stack">
            <section aria-labelledby="install-title" className="stack">
              <h2 id="install-title">installation</h2>
              <ol className="steps">
                <li>Download the client file from the panel once a release is available.</li>
                <li>Check the file against the checksum if one is shown.</li>
                <li>Follow the steps for the client format and Minecraft version listed on this page.</li>
                <li>Start the game and confirm the client loads.</li>
              </ol>
              <p className="card__meta">
                Exact installation requirements depend on the actual client release and will be updated when the supported format and game version are confirmed.
                {download.installGuideUrl && (
                  <>
                    {" "}
                    <a href={download.installGuideUrl} target="_blank" rel="noopener noreferrer">
                      Read the installation guide<span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                    .
                  </>
                )}
              </p>
            </section>

            <section aria-labelledby="compat-title" className="stack">
              <h2 id="compat-title">compatibility</h2>
              <p>
                {download.minecraftVersion
                  ? `Listed for Minecraft ${download.minecraftVersion}.`
                  : "No Minecraft version has been confirmed yet, so no compatibility is claimed."}
              </p>
            </section>
          </div>
        </div>
      </Container>

      <section className="section section--alt" aria-labelledby="trouble-title">
        <Container>
          <div className="split">
            <div className="section__head" style={{ marginBottom: 0 }}>
              <h2 id="trouble-title">troubleshooting</h2>
              <p>Common problems and what to try. The community can help with many issues, but not all.</p>
              <div style={{ marginTop: "var(--s3)" }}>
                <CommunityButton />
              </div>
            </div>
            <div className="trouble">
              {troubleshooting.map((t) => (
                <div key={t.q}>
                  <strong>{t.q}</strong>
                  <p>{t.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container as="section" className="section">
        <div className="stack" style={{ maxWidth: 640 }}>
          <h2>release notes</h2>
          {download.releaseNotesUrl ? (
            <p>
              <a href={download.releaseNotesUrl} target="_blank" rel="noopener noreferrer">
                Read the release notes<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          ) : (
            <p>No release notes have been published yet.</p>
          )}
        </div>
      </Container>
    </>
  );
}
