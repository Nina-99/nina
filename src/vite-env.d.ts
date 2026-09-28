/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Contact form endpoint (Formspree URL, or the Web3Forms API URL). */
  readonly VITE_CONTACT_ENDPOINT?: string;
  /** Optional access key, sent as `access_key`. Required by Web3Forms. */
  readonly VITE_CONTACT_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
