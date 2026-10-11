import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "../data/faq";

export function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const base = useId();

  return (
    <div className="faq">
      {items.map((item) => {
        const open = openId === item.id;
        const buttonId = `${base}-btn-${item.id}`;
        const panelId = `${base}-panel-${item.id}`;
        return (
          <div className="faq__item" key={item.id}>
            <h3 className="faq__q">
              <button
                id={buttonId}
                type="button"
                className="faq__btn"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span>{item.question}</span>
                <ChevronDown size={20} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} className="faq__panel" data-open={open}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
