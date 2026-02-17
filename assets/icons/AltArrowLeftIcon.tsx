import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const AltArrowLeftIcon = (props: SvgProps) => (
    <Svg
        width={8}
        height={16}
        fill="none"
        {...props}
    >
        <Path
            fill={props.color || "#000"}
            fillRule="evenodd"
            d="M7.238.18a.75.75 0 0 1 .081 1.058L1.738 7.75l5.581 6.512a.75.75 0 0 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7A.75.75 0 0 1 7.238.18Z"
            clipRule="evenodd"
        />
    </Svg>
)
