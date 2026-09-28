import { site } from "../data/site";

/**
 * Contact form delivery.
 *
 * The endpoint is read at build time, so it has to be set in Vercel's
 * environment variables (not only in a local .env file) to reach production.
 *
 * These values end up in the client bundle. That is by design: Formspree form
 * ids and Web3Forms access keys are meant to be public and are protected by
 * domain allow-lists on the provider side. Never put a real secret here.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
const KEY = import.meta.env.VITE_CONTACT_KEY?.trim();

export const isContactConfigured = Boolean(ENDPOINT);

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

/** Builds a wa.me link from the phone number in the site data. */
export function whatsappLink(message?: string) {
  const digits = site.phone.replace(/\D/g, "");
  if (!digits) return "";

  const query = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${query}`;
}

/** Composes the message a visitor would send over WhatsApp from the form. */
export function whatsappMessageFromForm(payload: Partial<ContactPayload>) {
  return [
    payload.name ? `Hola, soy ${payload.name}.` : "Hola!",
    payload.message ?? "",
    payload.email ? `Mi email: ${payload.email}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Sends the message to the configured endpoint. Throws when it is not
 * configured or the request fails, so the caller can be honest about it
 * instead of showing a fake success.
 */
export async function sendContactMessage(payload: ContactPayload) {
  if (!ENDPOINT) {
    throw new Error("El formulario todavía no está conectado.");
  }

  // Formspree takes a flat body; Web3Forms additionally wants `access_key`.
  const body = KEY ? { access_key: KEY, ...payload } : payload;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`El envío falló (${response.status}).`);
  }
}
