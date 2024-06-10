/// <reference types="vinxi/types/client" />

interface ImportMetaEnv {
  DB_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
