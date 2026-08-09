import * as LucideIcons from "lucide-react";

/**
 * Resolve a Lucide icon by name string (as stored in JSON content files).
 * Falls back to a generic square icon if the name doesn't match,
 * so a typo in JSON never crashes the page.
 */
export function getIcon(name) {
  return LucideIcons[name] || LucideIcons.Square;
}
