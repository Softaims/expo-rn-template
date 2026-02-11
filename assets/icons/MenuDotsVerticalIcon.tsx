import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const MenuDotsVerticalIcon = (props: SvgProps) => (
    <Svg
        width={4}
        height={14}
        fill="none"
        {...props}
    >
        <Path
            fill={props.color || "#000"}
            d="M1.54 3.081A1.54 1.54 0 1 1 1.54 0a1.54 1.54 0 0 1 0 3.081ZM1.54 8.474a1.54 1.54 0 1 1 0-3.081 1.54 1.54 0 0 1 0 3.081ZM1.54 13.867a1.54 1.54 0 1 1 0-3.082 1.54 1.54 0 0 1 0 3.082Z"
        />
    </Svg>
)
