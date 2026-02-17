import Svg, { Path, Rect } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export function CardIcon({ width = 24, height = 24, stroke = "#000" }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Rect
        width={20}
        height={14}
        x={2}
        y={5}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        rx={2}
      />
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2 10h20"
      />
    </Svg>
  );
}
