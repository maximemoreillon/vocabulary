// This is unused as it didn't work
import { query, redirect, useLocation } from "@solidjs/router"
import { oAuthCallback } from "~/lib/oidc"

const oAuthCallbackQuery = query(async (search: string) => {
  await oAuthCallback(`http://localhost:3000/oauth/callback${search}`)
}, "oAuthCallback")

export default function OauthCallback() {
  const { search } = useLocation()
  oAuthCallbackQuery(search)

  return <div>Hello</div>
}
