import { useSearchParams } from "@solidjs/router"
import Button from "./Button"
import { FaSolidRepeat } from "solid-icons/fa"

export default function ModeToggle() {
  const [searchParams, setSearchParams] = useSearchParams()

  function toggleMode() {
    const { guessing = "writing" } = searchParams
    const newGuessing = guessing === "meaning" ? "writing" : "meaning"
    setSearchParams({ ...searchParams, guessing: newGuessing })
  }

  return (
    <Button onclick={toggleMode}>
      <FaSolidRepeat />
      <span>Toggle mode</span>
    </Button>
  )
}
