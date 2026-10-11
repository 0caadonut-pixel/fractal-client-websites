import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  variant?: Variant;
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  (
    | { to: string; href?: never; download?: never }
    | { href: string; to?: never; download?: boolean }
  );

export function Button({ variant = "primary", size = "md", block, className = "", children, ...rest }: ButtonProps) {
  const cls = ["btn", `btn--${variant}`, size === "sm" ? "btn--sm" : "", block ? "btn--block" : "", className]
    .filter(Boolean)
    .join(" ");

  if ("to" in rest && rest.to !== undefined) {
    return (
      <Link to={rest.to} className={cls}>
        {children}
      </Link>
    );
  }

  const { href, download } = rest as { href: string; download?: boolean };
  if (download) {
    // Same-origin file served from /public: use the native download attribute.
    return (
      <a href={href} className={cls} download>
        {children}
      </a>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
