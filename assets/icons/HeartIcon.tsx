import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const HeartIcon = (props: SvgProps) => (
    <Svg
        width={14}
        height={12}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.color || "#000000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 11.5S.5 8 .5 3.875A3.375 3.375 0 0 1 3.875.5c1.412 0 2.621.77 3.125 2 .504-1.23 1.713-2 3.125-2A3.375 3.375 0 0 1 13.5 3.875C13.5 8 7 11.5 7 11.5Z"
        />
    </Svg>
)
