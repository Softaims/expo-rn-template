import Svg, { Path } from "react-native-svg";

interface LogoutIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export function LogoutIcon({
  width = 24,
  height = 24,
  fill = "none",
  stroke = "#000",
}: LogoutIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
      <Path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
