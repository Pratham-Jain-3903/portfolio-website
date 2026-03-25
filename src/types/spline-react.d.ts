declare module '@splinetool/react-spline' {
    import type { ComponentType } from 'react';

    export interface SplineProps {
        scene: string;
        className?: string;
        style?: React.CSSProperties;
        onLoad?: (splineApp: unknown) => void;
    }

    const Spline: ComponentType<SplineProps>;
    export default Spline;
}