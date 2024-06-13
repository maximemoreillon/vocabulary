import { redirect } from "@solidjs/router"
import { getSession } from "~/lib/session"

type Credentials = {
  username: string
  password: string
}

const { APP_USERNAME = "user", APP_PASSWORD = "password" } = process.env

export async function login(credentials: Credentials) {
  console.log("Login function")
  const { username, password } = credentials

  if (username !== APP_USERNAME || password !== APP_PASSWORD)
    throw "Invalid credentials"

  const session = await getSession()
  await session.update((d) => (d.username = username))

  throw redirect("/")
}
