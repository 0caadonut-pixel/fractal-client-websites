import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <div className="page-intro">
      {eyebrow && (
        <span className="eyebrow">
          <span className="eyebrow__dot" aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <h1>{title}</h1>
      {children}
    </div>
  );
}
