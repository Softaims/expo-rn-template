import Svg, { Path } from "react-native-svg";

interface PlusIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export function PlusIcon({
  width = 24,
  height = 24,
  fill = "none",
  stroke = "#000",
}: PlusIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
      <Path
        d="M12 5v14M5 12h14"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
