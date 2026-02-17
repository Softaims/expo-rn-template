import Svg, { Path } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export function ChevronRightIcon({ width = 24, height = 24, stroke = "#000" }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m9 18 6-6-6-6"
      />
    </Svg>
  );
}
