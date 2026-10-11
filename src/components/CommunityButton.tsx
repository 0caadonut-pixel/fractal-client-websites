import { MessageCircle } from "lucide-react";
import { Button } from "./Button";
import { site } from "../config/site";

interface CommunityButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "sm";
  block?: boolean;
  label?: string;
}

/** Every community button in the app renders through this component and reads site.communityUrl. */
export function CommunityButton({ variant = "secondary", size = "md", block, label = "join discord" }: CommunityButtonProps) {
  return (
    <Button href={site.communityUrl} variant={variant} size={size} block={block}>
      <MessageCircle size={18} aria-hidden="true" />
      {label}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </Button>
  );
}
