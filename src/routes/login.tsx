import Button from "~/components/Button"
import Input from "~/components/Input"
import { action, redirect, useSubmission } from "@solidjs/router"
import { login } from "~/api/auth"
import { Show } from "solid-js"

const loginAction = action(async (formData: FormData) => {
  const username = String(formData.get("username"))
  const password = String(formData.get("password"))
  await login({ username, password })
  return redirect("/expressions")
}, "login")

export default function Home() {
  const submission = useSubmission(loginAction)

  return (
    <>
      <h1>Login</h1>

      <form action={loginAction} method="post" class="my-8 flex flex-col gap-8">
        <Input label="Username" name="username" />
        <Input label="Password" name="password" type="password" />

        <Button type="submit">Login</Button>
      </form>

      <Show when={submission.result}>{submission.result}</Show>
      <Show when={submission.error}>{submission.error}</Show>
    </>
  )
}
