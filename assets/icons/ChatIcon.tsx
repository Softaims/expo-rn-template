import Svg, { SvgProps, Path } from "react-native-svg"
export const ChatIcon = (props: SvgProps) => (
    <Svg
        width={13}
        height={13}
        fill="none"
        {...props}
    >
        <Path
            stroke={props.color || "#000000"}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.495 11.693a6 6 0 1 0-2.187-2.188L.526 11.84a.5.5 0 0 0 .632.632l2.337-.779Z"
        />
    </Svg>
)
