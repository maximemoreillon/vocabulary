// NOTE: "use server is important here!"
"use server"

import { redirect, cache } from "@solidjs/router"
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
    return await useSession(config)
  } catch (error) {
    throw redirect("/login")
  }
}

export async function getUser() {
  const session = await getSession()
  const { username, access_token } = session.data
  if (access_token) {
    // TODO: get user from Token
    const userFromToken = await getUserFromToken(access_token)
    return userFromToken
  } else if (username) return { username }
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

// TODO: figure out if this needs to be a cache or action
export const enforceAuthCache = cache(async () => {
  await enforceAuth()
}, "enforceAuth")

export const getUserCache = cache(async () => {
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
