import { JSX } from "solid-js";

interface BadgeProps {
  children: JSX.Element;
  class?: string;
}

export default function Badge(props: BadgeProps) {
  return (
    <span
      class={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${props.class || ""}`}
    >
      {props.children}
    </span>
  );
}
