import { Show } from "solid-js"

type Props = {
  type?: string
  name?: string
  label?: string
  value?: string | number | undefined | null
}

export default function Input(props: Props) {
  return (
    <Show when={props.type !== "hidden"}>
      <div class="flex flex-col gap-1">
        <Show when={props.label}>
          <label class="text-sm">{props.label}</label>
        </Show>
        <input
          type={props.type}
          name={props.name}
          class="p-2 bg-dark-300 rounded"
          value={(props.value || "") as string | number | string[] | undefined}
        />
      </div>
    </Show>
  )
}
