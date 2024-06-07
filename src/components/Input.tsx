import { Show } from "solid-js"

type Props = {
  type?: string
  name?: string
  label?: string
}

export default function Input(props: Props) {
  return (
    <div class="flex flex-col gap-1">
      <Show when={props.label}>
        <label class="text-sm">{props.label}</label>
      </Show>
      <input type={props.type} name={props.name} class="border-2 p-2" />
    </div>
  )
}
