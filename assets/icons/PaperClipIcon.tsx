import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const PaperClipIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={19}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.stroke || "#26291F"}
            strokeLinecap="round"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            d="m5.012 14.45 6.839-6.547a1.952 1.952 0 0 0 0-2.846 2.17 2.17 0 0 0-2.974 0l-6.789 6.499a3.71 3.71 0 0 0 0 5.407c1.56 1.494 4.09 1.494 5.65 0l6.888-6.593c2.299-2.2 2.299-5.769 0-7.97C12.326.2 8.599.2 6.3 2.4L.75 7.713"
        />
    </Svg>
)
