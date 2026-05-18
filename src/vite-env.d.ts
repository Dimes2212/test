/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DADATA_API_KEY?: string;
  readonly VITE_DADATA_SECRET_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
