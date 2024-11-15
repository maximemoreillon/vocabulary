import Button from "~/components/Button"
import { action, redirect } from "@solidjs/router"
import { oAuthLogin } from "~/lib/oidc"

const oAuthLoginAction = action(async () => {
  const redirectUrl = await oAuthLogin()
  throw redirect(redirectUrl.toString())
}, "oauthLogin")

export default function OauthLoginButton() {
  return (
    <form action={oAuthLoginAction} method="post">
      <Button type="submit">Login with Oauth</Button>
    </form>
  )
}
