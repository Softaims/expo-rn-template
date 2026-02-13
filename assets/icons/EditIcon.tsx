import Svg, { Path } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
}

export function EditIcon({ width = 24, height = 24, stroke = "#000" }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"
      />
    </Svg>
  );
}
