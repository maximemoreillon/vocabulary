import { FaSolidMagnifyingGlass } from "solid-icons/fa"
import Button from "./Button"
import Input from "./Input"
import { useSearchParams } from "@solidjs/router"
import { createSignal } from "solid-js"

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams()

  const [getSearch, setSearch] = createSignal("")

  function handleFormSubmit(e: SubmitEvent) {
    e.preventDefault()
    setSearchParams({ ...searchParams, search: getSearch() })
  }

  return (
    <form onsubmit={handleFormSubmit} class="flex gap-2 items-center">
      <Input
        name="search"
        placeholder="Search"
        value={getSearch()}
        oninput={({ target }) => {
          setSearch(target.value)
        }}
      />
      <Button type="submit">
        <span class="p-1">
          <FaSolidMagnifyingGlass />
        </span>
      </Button>
    </form>
  )
}
