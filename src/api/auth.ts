// NOTE: "use server is important here!"
"use server"

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
  VOCABULARY_SESSION_SECRET = "areallylongsecretthatyoushouldreplace",
  VOCABULARY_USERNAME = "user",
  VOCABULARY_PASSWORD = "password",
  LOGIN_URL,
  NODE_ENV,
} = process.env

export async function getSession() {
  const config: SessionConfig = { password: VOCABULARY_SESSION_SECRET }
  if (NODE_ENV === "development") config.cookie = { secure: false }

  try {
    return await useSession(config)
  } catch (error) {
    throw redirect("/login")
  }
}

export async function getUser(redirectToLogin: boolean) {
  const session = await getSession()
  const { username } = session.data
  if (!username && redirectToLogin) throw redirect("/login")
  return { username }
}

export async function login(credentials: Credentials) {
  const { username, password } = credentials
  if (LOGIN_URL) {
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "content-type": "application/json",
      },
    }

    const { status } = await fetch(LOGIN_URL, options)
    if (status !== 200) throw new Error("Login failed")
  } else {
    if (username !== VOCABULARY_USERNAME || password !== VOCABULARY_PASSWORD)
      throw new Error("Invalid credentials")
  }

  const session = await getSession()
  await session.update((d: UserSession) => (d.username = username))
}

export async function logout() {
  const session = await getSession()
  await session.update((d: UserSession) => (d.username = undefined))
  throw redirect("/login")
}
