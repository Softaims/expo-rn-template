import Svg, { Path } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}

export function TrashIcon({ width = 26, height = 26, stroke = "#000", fill }: IconProps) {
  // If fill is provided, use filled version, otherwise use stroke
  if (fill) {
    return (
      <Svg width={width} height={height} viewBox="0 0 26 26" fill="none">
        <Path
          d="M9.75 2.16667C9.75 1.77704 10.0731 1.45392 10.4627 1.45392H15.5373C15.9269 1.45392 16.25 1.77704 16.25 2.16667V3.25H20.8333C21.222 3.25 21.5442 3.57312 21.5442 3.96275C21.5442 4.35238 21.222 4.67549 20.8333 4.67549H20.125L19.0373 22.2267C18.9498 23.5971 17.8056 24.6283 16.4307 24.6283H9.56927C8.19442 24.6283 7.05019 23.5971 6.96269 22.2267L5.875 4.67549H5.16667C4.778 4.67549 4.45558 4.35238 4.45558 3.96275C4.45558 3.57312 4.778 3.25 5.16667 3.25H9.75V2.16667ZM11.1725 9.84809C10.7838 9.84809 10.4616 10.1712 10.4616 10.5608V19.5515C10.4616 19.9411 10.7838 20.2642 11.1725 20.2642C11.5611 20.2642 11.8833 19.9411 11.8833 19.5515V10.5608C11.8833 10.1712 11.5611 9.84809 11.1725 9.84809ZM14.8275 9.84809C14.4388 9.84809 14.1166 10.1712 14.1166 10.5608V19.5515C14.1166 19.9411 14.4388 20.2642 14.8275 20.2642C15.2161 20.2642 15.5384 19.9411 15.5384 19.5515V10.5608C15.5384 10.1712 15.2161 9.84809 14.8275 9.84809Z"
          fill={fill}
        />
      </Svg>
    );
  }

  // Original stroke version
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
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
