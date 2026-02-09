import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"

export const ErrorIcon = (props: SvgProps) => (
  <Svg
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Circle
      cx={8}
      cy={8}
      r={8}
      fill={props.fill || "#EF4444"}
    />
    <Path
      fill="#FFFFFF"
      d="M8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4zm0 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
    />
  </Svg>
)
