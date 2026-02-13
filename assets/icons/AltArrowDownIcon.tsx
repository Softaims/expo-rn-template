import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
export function AltArrowDownIcon(props: SvgProps) {
    return (
        <Svg
            width={11}
            height={5}
            fill="none"
            {...props}
        >
            <Path
                fill={props.color || "#000"}
                fillRule="evenodd"
                d="M.12.175A.5.5 0 0 1 .825.12l4.342 3.721 4.34-3.72a.5.5 0 1 1 .652.759l-4.667 4a.5.5 0 0 1-.65 0L.174.88A.5.5 0 0 1 .12.175Z"
                clipRule="evenodd"
            />
        </Svg>
    );
}
