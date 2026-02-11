/// <reference types="vite/client" />

interface ImportMetaEnv {
  private readonly VITE_API_ORIGIN: string
}

interface ImportMeta {
  private readonly env: ImportMetaEnv
}