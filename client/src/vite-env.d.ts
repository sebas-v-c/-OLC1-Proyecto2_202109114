/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_QC_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
