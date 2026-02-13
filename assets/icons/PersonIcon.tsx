import Svg, { Circle, Ellipse } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}

export function PersonIcon({ width = 26, height = 26, stroke = "#000", fill }: IconProps) {
  const color = fill || stroke;

  return (
    <Svg width={width} height={height} viewBox="0 0 28 28" fill="none">
      <Circle cx="14" cy="8.39935" r="3.73333" fill={color} />
      <Ellipse cx="14.0004" cy="18.6669" rx="6.53333" ry="3.73333" fill={color} />
    </Svg>
  );
}
