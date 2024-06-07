import { JSXElement, Show } from "solid-js"

type Props = {
  href?: string
  onclick?: any
  children?: JSXElement
  type?: "submit" | "reset" | "button" | undefined
}

export default function Button(props: Props) {
  const className = "rounded border-2 px-4 py-2"
  return (
    <>
      <Show when={props.href}>
        <a href={props.href} class={className}>
          {props.children}
        </a>
      </Show>
      <Show when={!props.href}>
        <button onclick={props.onclick} type={props.type} class={className}>
          {props.children}
        </button>
      </Show>
    </>
  )
}
