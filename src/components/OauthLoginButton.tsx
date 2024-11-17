import Button from "~/components/Button"
import { action, redirect } from "@solidjs/router"
import { getAuthorizationUrl } from "~/lib/oidc"

const oAuthLoginAction = action(async () => {
  const authorizationUrl = await getAuthorizationUrl()
  if (!authorizationUrl) return
  throw redirect(authorizationUrl)
}, "oauthLogin")

export default function OauthLoginButton() {
  return (
    <form action={oAuthLoginAction} method="post">
      <Button type="submit">Login with Oauth</Button>
    </form>
  )
}
