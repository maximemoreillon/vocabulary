import { JSXElement, Show } from "solid-js"

type Props = {
  href?: string
  onclick?: any
  children?: JSXElement
  type?: "submit" | "reset" | "button" | undefined
  disabled?: boolean
}

const className =
  "rounded px-4 py-2 bg-primary-500 text-dark shadow disabled:opacity-50 inline-flex items-center gap-2"
export default function Button(props: Props) {
  return (
    <>
      <Show when={props.href}>
        <a href={props.href} class={className}>
          {props.children}
        </a>
      </Show>
      <Show when={!props.href}>
        <button
          onclick={props.onclick}
          type={props.type}
          disabled={props.disabled}
          class={className}
        >
          {props.children}
        </button>
      </Show>
    </>
  )
}
