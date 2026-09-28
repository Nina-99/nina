import { site } from "../data/site";

/**
 * Builds a wa.me link from the phone number in the site data.
 * Returns an empty string when there is no usable number.
 */
export function whatsappLink(message?: string) {
  const digits = site.phone.replace(/\D/g, "");
  if (!digits) return "";

  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}
