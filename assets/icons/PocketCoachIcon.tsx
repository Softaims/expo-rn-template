import * as React from "react"
import Svg, { SvgProps, Path, Rect } from "react-native-svg"

export const PocketCoachIcon = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <Rect
      width={32}
      height={32}
      fill={props.fill || "#3B82F6"}
      rx={6}
    />
    <Path
      fill="#FFFFFF"
      d="M16 8l6 4v6c0 3.31-2.69 6-6 6s-6-2.69-6-6v-6l6-4zm0 2.5l-4 2.67V18c0 2.21 1.79 4 4 4s4-1.79 4-4v-4.83l-4-2.67z"
    />
  </Svg>
)
