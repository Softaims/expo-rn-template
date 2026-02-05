import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const InfoCircleIcon = (props: SvgProps) => (
    <Svg
        width={15}
        height={15}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill || "#FF5050"}
            fillRule="evenodd"
            d="M14.667 7.333A7.333 7.333 0 1 1 0 7.333a7.333 7.333 0 0 1 14.667 0ZM7.333 11.55a.55.55 0 0 0 .55-.55V6.6a.55.55 0 1 0-1.1 0V11c0 .304.247.55.55.55Zm0-7.883a.733.733 0 1 1 0 1.466.733.733 0 0 1 0-1.466Z"
            clipRule="evenodd"
        />
    </Svg>
)
