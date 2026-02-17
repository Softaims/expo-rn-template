import Svg, { Path } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export function InfoCircleIcon({width = 26, height = 26, fill = "#000" }: IconProps) {
  return (
    <Svg width={width} height={height} viewBox="0 0 26 26" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.6666 13.0007C21.6666 17.7871 17.7864 21.6673 13 21.6673C8.21351 21.6673 4.33331 17.7871 4.33331 13.0007C4.33331 8.21418 8.21351 4.33398 13 4.33398C17.7864 4.33398 21.6666 8.21418 21.6666 13.0007ZM13 17.984C13.359 17.984 13.65 17.693 13.65 17.334V12.134C13.65 11.775 13.359 11.484 13 11.484C12.641 11.484 12.35 11.775 12.35 12.134V17.334C12.35 17.693 12.641 17.984 13 17.984ZM13 8.66732C13.4786 8.66732 13.8666 9.05534 13.8666 9.53399C13.8666 10.0126 13.4786 10.4007 13 10.4007C12.5213 10.4007 12.1333 10.0126 12.1333 9.53399C12.1333 9.05534 12.5213 8.66732 13 8.66732Z"
        fill={fill}
      />
    </Svg>
  );
}
