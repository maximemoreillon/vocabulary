import Button from "~/components/Button"
import { action, useAction } from "@solidjs/router"
import { logout } from "~/api/auth"

const logoutAction = action(logout, "logout")

export default function LogoutButton() {
  const logoutUsedAction = useAction(logoutAction)

  return <Button onclick={() => logoutUsedAction()}>Logout</Button>
}
