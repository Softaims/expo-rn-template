import Svg, { Path, Circle } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export function HelpCircleIcon({ width = 24, height = 24, stroke = "#000" }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
      />
    </Svg>
  );
}
