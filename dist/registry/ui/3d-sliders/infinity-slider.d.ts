interface Slide {
    name: string;
    img: string;
}
interface SliderConfig {
    minHeight: number;
    maxHeight: number;
    aspectRatio: number;
    gap: number;
    distortionStrength: number;
    scrollSmoothing: number;
    wheelSpeed: number;
    wheelMax: number;
    dragSpeed: number;
    dragMomentumDecay: number;
    touchSpeed: number;
}
interface InfiniteSliderProps {
    slides?: Slide[];
    config?: Partial<SliderConfig>;
}
export default function InfiniteSlider({ slides, config: configOverride, }: InfiniteSliderProps): import("react/jsx-runtime").JSX.Element;
export {};
