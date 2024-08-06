"use server"
// NOTE: "use server is important here!"

import { redirect } from "@solidjs/router"
import { SessionConfig, useSession } from "vinxi/http"

type Credentials = {
  username: string
  password: string
}

type UserSession = {
  username?: string
}

const {
  SESSION_SECRET = "areallylongsecretthatyoushouldreplace",
  APP_USERNAME = "user",
  APP_PASSWORD = "password",
  NODE_ENV,
} = process.env

export async function getSession() {
  const config: SessionConfig = { password: SESSION_SECRET }
  if (NODE_ENV === "development") config.cookie = { secure: false }

  return useSession(config)
}

export async function getUser() {
  const session = await getSession()
  const { username } = session.data
  if (!username) throw redirect("/login")
  return { username }
}

export async function login(credentials: Credentials) {
  const { username, password } = credentials

  if (username !== APP_USERNAME || password !== APP_PASSWORD)
    throw new Error("Invalid credentials")

  const session = await getSession()
  await session.update((d: UserSession) => (d.username = username))

  throw redirect("/")
}

export async function logout() {
  const session = await getSession()
  await session.update((d: UserSession) => (d.username = undefined))
  throw redirect("/login")
}
