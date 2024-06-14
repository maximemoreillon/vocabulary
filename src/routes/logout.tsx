import Button from "~/components/Button"
import { action, redirect, useSubmission } from "@solidjs/router"
import { logout } from "~/api/auth"

const logoutAction = action(async () => {
  "use server"

  await logout()
}, "logout")

export default function Home() {
  return (
    <>
      <h1>Logout</h1>

      <Button onclick={logoutAction}>Logout</Button>
    </>
  )
}
