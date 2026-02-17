import * as React from "react"
import Svg, { SvgProps, Ellipse, Path } from "react-native-svg"
export const CameraIcon = (props: SvgProps) => (
    <Svg
        width={props.width || 47}
        height={props.height || 42}
        fill="none"
        {...props}
    >
        <Ellipse
            cx={23.25}
            cy={24.029}
            stroke={props.color || "#000000"}
            strokeWidth={2.5}
            rx={7.333}
            ry={7.273}
        />
        <Path
            stroke={props.color || "#000000"}
            strokeWidth={2.5}
            d="M18.361 41h9.778c6.866 0 10.3 0 12.765-1.635a9.737 9.737 0 0 0 2.698-2.676c1.648-2.446 1.648-5.85 1.648-12.66 0-6.81 0-10.214-1.648-12.66a9.739 9.739 0 0 0-2.698-2.676c-2.466-1.634-5.9-1.634-12.766-1.634h-9.777c-6.867 0-10.3 0-12.766 1.634a9.738 9.738 0 0 0-2.698 2.676C1.25 13.814 1.25 17.218 1.25 24.024v.005c0 6.81 0 10.214 1.648 12.66a9.737 9.737 0 0 0 2.698 2.676c2.466 1.634 5.899 1.634 12.765 1.634Z"
        />
        <Path
            stroke={props.color || "#000000"}
            strokeLinecap="round"
            strokeWidth={2.5}
            d="M37.91 16.756h-1.222M29.36 1H17.14"
        />
    </Svg>
)
