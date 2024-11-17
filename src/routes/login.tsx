import Button from "~/components/Button"
import Input from "~/components/Input"
import {
  action,
  createAsync,
  Navigate,
  query,
  redirect,
  useSubmission,
} from "@solidjs/router"
import { login } from "~/lib/auth"
import { Show } from "solid-js"
import { FaSolidRightToBracket } from "solid-icons/fa"

const isOidcAvailable = query(async () => {
  "use server"
  return !!process.env.OIDC_AUTHORITY
}, "isOidcAvailable")

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
  const oidcAvailable = createAsync(async () => isOidcAvailable())

  return (
    <div class="mx-auto max-w-sm ">
      <h1 class="text-6xl my-12 text-center">Login</h1>

      <Show when={oidcAvailable}>
        <div class="text-center">
          <Navigate href="/api/oauth/login" />
        </div>
      </Show>

      <Show when={!oidcAvailable}>
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
