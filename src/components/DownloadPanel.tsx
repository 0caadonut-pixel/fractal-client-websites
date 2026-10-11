import { Download as DownloadIcon, ExternalLink, FileText } from "lucide-react";
import { Button } from "./Button";
import { CommunityButton } from "./CommunityButton";
import {
  download,
  getDownloadHref,
  getDownloadState,
  isLocalDownload,
  statusLabels,
} from "../config/download";

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd className={`${value ? "" : "muted"} ${mono ? "checksum" : ""}`.trim()}>{value || "not yet provided"}</dd>
    </div>
  );
}

export function DownloadPanel() {
  const state = getDownloadState();
  const href = getDownloadHref();
  const local = isLocalDownload();

  return (
    <section className="panel" aria-labelledby="download-panel-title">
      <div className="panel__head">
        <h2 id="download-panel-title">{download.productName}</h2>
        <span className="status-pill">
          <span className="status-dot" data-state={state} aria-hidden="true" />
          {statusLabels[state]}
        </span>
      </div>

      {state === "available" && href ? (
        <div className="stack">
          <Button href={href} download={local} block>
            <DownloadIcon size={18} aria-hidden="true" />
            download {download.versionLabel ? `version ${download.versionLabel}` : "fractal client"}
            {!local && <span className="visually-hidden"> (opens in a new tab)</span>}
          </Button>
          {download.releaseNotesUrl && (
            <Button href={download.releaseNotesUrl} variant="secondary" block>
              <FileText size={18} aria-hidden="true" />
              release notes
              <span className="visually-hidden"> (opens in a new tab)</span>
            </Button>
          )}
        </div>
      ) : (
        <div className="stack">
          <div className="notice" role="status">
            <strong>
              {state === "temporarily-unavailable"
                ? "The client is temporarily unavailable."
                : state === "unconfigured"
                  ? "The download is not configured."
                  : "There is no download yet."}
            </strong>
            <span>
              {state === "temporarily-unavailable"
                ? "Check the community server for updates on when it returns."
                : state === "unconfigured"
                  ? "This release is marked available, but no valid download destination has been set."
                  : "No client release has been published through this website. Nothing is being downloaded."}
            </span>
          </div>
          <Button variant="primary" block to="/community">
            <ExternalLink size={18} aria-hidden="true" />
            visit the community page
          </Button>
          <CommunityButton block label="join the discord" />
        </div>
      )}

      <dl className="meta">
        <Row label="version" value={download.versionLabel} />
        <Row label="release date" value={download.releaseDate} />
        <Row label="file format" value={download.fileFormat} />
        <Row label="file size" value={download.fileSize} />
        <Row label="minecraft version" value={download.minecraftVersion} />
        <Row label="sha-256 checksum" value={download.checksum} mono />
      </dl>
    </section>
  );
}
