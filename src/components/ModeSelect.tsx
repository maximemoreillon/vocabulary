import { useSearchParams } from "@solidjs/router"
import { For } from "solid-js"

export type Mode = "writing" | "meaning" | "reading"

export default function ModeSelect() {
  const [searchParams, setSearchParams] = useSearchParams()

  const selects = [
    { value: "from", label: "From", default: searchParams.from || "writing" },
    {
      value: "guess",
      label: "guess",
      default: searchParams.guess || "meaning",
    },
  ]

  const options = [
    { value: "writing", label: "Writing" },
    { value: "reading", label: "Reading" },
    { value: "meaning", label: "Meaning" },
  ]

  function handleChange(queryParam: any, event: any) {
    const { value } = event.target
    setSearchParams({ ...searchParams, [queryParam]: value })
  }

  return (
    <div class="flex gap-2 items-center">
      <For each={selects}>
        {(select) => (
          <>
            <label>{select.label}</label>
            <select
              class="bg-primary-500 px-2 py-1 rounded"
              onchange={(e) => handleChange(select.value, e)}
            >
              <For each={options}>
                {(option) => (
                  <option
                    value={option.value}
                    selected={select.default === option.value}
                  >
                    {option.label}
                  </option>
                )}
              </For>
            </select>
          </>
        )}
      </For>
    </div>
  )
}
