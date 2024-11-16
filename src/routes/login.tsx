import Button from "~/components/Button"
import Input from "~/components/Input"
import { action, redirect, useSubmission } from "@solidjs/router"
import { login } from "~/lib/auth"
import { Show } from "solid-js"
import { FaSolidRightToBracket } from "solid-icons/fa"
import OauthLoginButton from "~/components/OauthLoginButton"

const { VITE_OIDC_AUTHORITY } = process.env

const loginAction = action(async (formData: FormData) => {
  const username = formData.get("username")?.toString()
  const password = formData.get("password")?.toString()

  if (!username) return new Error("Missing username")
  if (!password) return new Error("Missing password")

  try {
    await login({ username, password })
    return redirect("/expressions")
  } catch (error) {
    return new Error("Login failed")
  }
}, "login")

export default function Login() {
  const submission = useSubmission(loginAction)

  return (
    <div class="mx-auto max-w-sm ">
      <h1 class="text-6xl my-8 ">Login</h1>

      <Show when={VITE_OIDC_AUTHORITY}>
        <div class="text-center">
          <OauthLoginButton />
        </div>
      </Show>

      <Show when={!VITE_OIDC_AUTHORITY}>
        <form action={loginAction} method="post" class="flex flex-col gap-8 ">
          <Input label="Username" name="username" />
          <Input label="Password" name="password" type="password" />
          <div class="text-center">
            <Button type="submit" loading={submission.pending}>
              <FaSolidRightToBracket />
              <span>Login</span>
            </Button>
          </div>

          <Show when={submission.result}>
            <div class="text-center">{submission.result?.message}</div>
          </Show>
        </form>
      </Show>
    </div>
  )
}
