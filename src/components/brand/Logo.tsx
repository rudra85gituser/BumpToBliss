import Svg, { Circle, Path } from "react-native-svg";

type LogoProps = {
  size?: number;
};

/**
 * BumpToBliss brand mark (mama cradling baby), traced from
 * src/assets/brand/logo-mark-ink.svg. Rendered as vector shapes so it stays
 * crisp at any size instead of needing separate PNG exports per resolution.
 */
export function Logo({ size = 36 }: LogoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 128 128">
      <Circle cx={34} cy={32} r={15} fill="#20094D" />
      <Circle cx={21.5} cy={26.5} r={5.5} fill="#20094D" />
      <Path
        d="M27 48 C26 90 56 106 84 96 C98 91 104 80 102 68"
        fill="none"
        stroke="#20094D"
        strokeWidth={14}
      />
      <Circle cx={68} cy={68} r={20} fill="#C17A63" />
      <Circle cx={76} cy={59} r={6.5} fill="#20094D" />
    </Svg>
  );
}
