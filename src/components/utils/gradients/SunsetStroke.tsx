import { Sunset } from "./Sunset";
import classNames from "./sunset-stroke.module.css";

export const SunsetStroke = ({ strokeWidth }: { strokeWidth: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className={classNames.sunset}
        style={{ "--stroke-width": strokeWidth } as React.CSSProperties}
    >
        <rect
            className={classNames.stroke}
            x="1.5"
            y="1.5"
            stroke="url(#sunset-gradient)"
            strokeWidth="var(--stroke-width)"
            fill="none"
        />
        <Sunset />
    </svg>
);
