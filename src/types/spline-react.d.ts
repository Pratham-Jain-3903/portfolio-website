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

declare module '@splinetool/react-spline/next' {
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

// react-spline is no longer imported directly; kept for type-compat during transition.
declare module '@splinetool/runtime' {
    export class Application {
        constructor(canvas: HTMLCanvasElement);
        load(url: string): Promise<void>;
        dispose?: () => void;
    }
}