/// <reference types="vinxi/types/client" />

interface ImportMetaEnv {
  DB_URL: string
  SESSION_SECRET: string
  APP_USERNAME: string
  APP_PASSWORD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
