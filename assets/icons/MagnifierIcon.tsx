import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const MagnifierIcon = (props: SvgProps) => (
    <Svg
        width={19}
        height={19}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill || "#26291F"}
            fillOpacity={0.5}
            fillRule="evenodd"
            d="M8.883 1.3a7.583 7.583 0 1 0 0 15.167 7.583 7.583 0 0 0 0-15.167ZM0 8.883a8.883 8.883 0 1 1 15.608 5.805l2.835 2.836a.65.65 0 0 1-.92.919l-2.835-2.835A8.883 8.883 0 0 1 0 8.884Z"
            clipRule="evenodd"
        />
    </Svg>
)
