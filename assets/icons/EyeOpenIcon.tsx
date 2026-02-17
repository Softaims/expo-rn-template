import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export const EyeOpenIcon = (props: SvgProps) => (
    <Svg
        width={18}
        height={14}
        fill="none"
        {...props}
    >
        <Path
            fill={props.fill || "#26291F"}
            d="M6.717 6.933a1.95 1.95 0 1 1 3.9 0 1.95 1.95 0 0 1-3.9 0Z"
        />
        <Path
            fill={props.fill || "#26291F"}
            fillRule="evenodd"
            d="M0 6.933c0 1.421.368 1.9 1.105 2.857 1.47 1.91 3.937 4.077 7.562 4.077 3.624 0 6.09-2.167 7.561-4.077.737-.957 1.105-1.436 1.105-2.857 0-1.42-.368-1.899-1.105-2.856C14.758 2.167 12.291 0 8.667 0 5.042 0 2.576 2.166 1.105 4.077.368 5.034 0 5.513 0 6.933Zm8.667-3.25a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z"
            clipRule="evenodd"
        />
    </Svg>
)
