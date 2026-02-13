import * as React from "react";
import Svg, { G, Rect, Path, SvgProps } from "react-native-svg";

export const LockForgotIcon = (props: SvgProps) => (
  <Svg
    width={112}
    height={114}
    viewBox="0 0 112 114"
    fill="none"
    {...props}
  >
    <G opacity={0.6}>
      <Rect
        x={15.0422}
        y={39.4373}
        width={58.301}
        height={48.2028}
        rx={13.4013}
        transform="rotate(-17.9255 15.0422 39.4373)"
        fill="#929292"
      />
      <Rect
        x={45.9872}
        y={47.9949}
        width={5.02549}
        height={13.4013}
        rx={2.51275}
        transform="rotate(-15.9938 45.9872 47.9949)"
        fill="#929292"
      />
      <Path
        d="M28.4692 35.8646C25.5376 30.787 23.608 17.3938 37.1956 12.4504C41.7249 10.8026 52.6035 10.3249 58.6581 26.1723"
        stroke="#929292"
        strokeWidth={4.0458}
      />
    </G>
    <Rect
      x={40.5245}
      y={40.2053}
      width={72.3535}
      height={59.8212}
      rx={16.6315}
      transform="rotate(12.0745 40.5245 40.2053)"
      fill="#929292"
    />
    <Rect
      x={68.473}
      y={68.6047}
      width={6.2368}
      height={16.6315}
      rx={3.1184}
      transform="rotate(14.0062 68.473 68.6047)"
      fill="white"
    />
    <Path
      d="M57.1711 44.697C57.1711 37.4207 63.4079 21.8287 81.0789 24.9471C86.9694 25.9866 98.9577 32.2234 95.6314 53.0128"
      stroke="#929292"
      strokeWidth={4.57366}
    />
  </Svg>
);
