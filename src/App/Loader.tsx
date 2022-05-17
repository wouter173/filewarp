type Props = {
  bgClassList: string;
  fgClassList: string;
  value: number;
  max: number;

  size?: number;
  strokeWidth?: number;
};

export default function Loader(props: Props) {
  const size = props.size || 32;
  const strokeWidth = props.strokeWidth || 2;
  const viewbox = `0 0 ${size} ${size}`;

  const radius = (size - strokeWidth) / 2;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * props.value) / props.max;

  return (
    <svg className="w-full h-full" viewBox={viewbox}>
      <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} className={props.bgClassList}></circle>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className={props.fgClassList}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ strokeDasharray: dashArray, strokeDashoffset: dashOffset }}
      ></circle>
    </svg>
  );
}
