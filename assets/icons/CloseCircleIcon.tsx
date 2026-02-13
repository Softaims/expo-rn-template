import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const CloseCircleIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={18}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill || "#26291F"}
            fillRule="evenodd"
            d="M17.333 8.667A8.667 8.667 0 1 1 0 8.667a8.667 8.667 0 0 1 17.333 0ZM6.04 6.04a.65.65 0 0 1 .92 0l1.707 1.707 1.707-1.707a.65.65 0 1 1 .919.92L9.586 8.667l1.707 1.707a.65.65 0 0 1-.92.919L8.668 9.586 6.96 11.293a.65.65 0 1 1-.92-.92l1.707-1.706L6.04 6.96a.65.65 0 0 1 0-.92Z"
            clipRule="evenodd"
        />
    </Svg>
)
