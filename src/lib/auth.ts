// NOTE: "use server is important here!"
"use server"

import { redirect, cache, query } from "@solidjs/router"
import { SessionConfig, useSession } from "vinxi/http"
import { getUserFromToken } from "./oidc"

type Credentials = {
  username: string
  password: string
}

export type SessionContent = {
  username?: string
  // OIDC
  code_verifier?: string
  code_challenge?: string
  state?: string
  access_token?: string
  refresh_token: string
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
    // TODO: await might not be needed here
    return await useSession(config)
  } catch (error) {
    throw redirect("/login")
  }
}

// TODO: typing for user
export async function getUser(): Promise<any> {
  const session = await getSession()
  const { username, access_token } = session.data
  if (username) return { username }
  else if (access_token) return await getUserFromToken(access_token)
  else return null
}

export async function getAccessToken() {
  const session = await getSession()
  const { accewss_token } = session.data
  if (!accewss_token) return null
  return { accewss_token }
}

export async function enforceAuth() {
  const user = await getUser()
  if (!user) throw redirect("/login")
}

export const enforceAuthCache = query(async () => {
  await enforceAuth()
}, "enforceAuth")

export const getUserCache = query(async () => {
  return await getUser()
}, "getUser")

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
    // Local auth
    if (username !== VOCABULARY_USERNAME || password !== VOCABULARY_PASSWORD)
      throw new Error("Invalid credentials")
  }

  const session = await getSession()
  await session.update((d) => (d.username = username))
}

export async function logout() {
  const session = await getSession()
  await session.update((d) => (d.username = undefined))
  throw redirect("/login")
}
