import Svg, { Path } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export function PersonIcon({ width = 24, height = 24, stroke = "#000" }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 21c0-2.761-3.582-5-8-5s-8 2.239-8 5m8-8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      />
    </Svg>
  );
}
