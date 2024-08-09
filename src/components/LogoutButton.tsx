import Button from "~/components/Button"
import { action, useAction } from "@solidjs/router"
import { logout } from "~/api/auth"
import { FaSolidRightFromBracket } from "solid-icons/fa"

const logoutAction = action(logout, "logout")

export default function LogoutButton() {
  const logoutUsedAction = useAction(logoutAction)

  return (
    <Button onclick={() => logoutUsedAction()}>
      <FaSolidRightFromBracket />
    </Button>
  )
}
