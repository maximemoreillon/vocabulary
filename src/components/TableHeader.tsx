import { useSearchParams } from "@solidjs/router"
import { FaSolidArrowDown, FaSolidArrowUp } from "solid-icons/fa"
import { Show } from "solid-js"

type Props = {
  text: string
  field: string
}

export default function TableHeader(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sortIsUsed = () => searchParams.sort === props.field
  const sortDescIsUsed = () => searchParams.order === "desc"

  function handleClick() {
    const order = sortIsUsed() && !sortDescIsUsed() ? "desc" : "asc"
    setSearchParams({ ...searchParams, sort: props.field, order })
  }

  return (
    <th>
      <button
        class="p-1 inline-flex items-center gap-2"
        onclick={() => handleClick()}
      >
        <span>{props.text}</span>
        <Show when={sortIsUsed()}>
          <Show when={sortDescIsUsed()}>
            <FaSolidArrowDown />
          </Show>
          <Show when={!sortDescIsUsed()}>
            <FaSolidArrowUp />
          </Show>
        </Show>
      </button>
    </th>
  )
}
