import Svg, { Path } from "react-native-svg";

interface TrashIconProps {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export function TrashIcon({
  width = 24,
  height = 24,
  fill = "none",
  stroke = "#000",
}: TrashIconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
      <Path
        d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14ZM10 11v6M14 11v6"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
