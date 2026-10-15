import { useId } from 'react';

const COLORS = ['var(--color-portal)', 'var(--color-green-lime)'];
const RING_COUNT = 14;
const SHAPE_VARIANTS = 3;

const createRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const createRingPath = (radius: number, seed: number, points = 96) => {
  const random = createRandom(seed);
  const waves = [2, 3, 5, 9, 13].map((frequency) => ({
    frequency,
    amplitude: 0.012 + random() * 0.018,
    phase: random() * Math.PI * 2,
  }));

  const coordinates = Array.from({ length: points }, (_, i) => {
    const angle = (i / points) * Math.PI * 2;
    const offset = waves.reduce(
      (sum, { frequency, amplitude, phase }) =>
        sum + amplitude * Math.sin(frequency * angle + phase),
      0,
    );
    const r = radius * (1 + offset);
    return `${(100 + r * Math.cos(angle)).toFixed(1)} ${(100 + r * Math.sin(angle)).toFixed(1)}`;
  });

  return `M${coordinates.join(' L')}Z`;
};

const RINGS = Array.from({ length: RING_COUNT }, (_, i) => {
  const radius = 26 + i * (66 / (RING_COUNT - 1));
  const shapes = Array.from({ length: SHAPE_VARIANTS }, (_, k) =>
    createRingPath(radius, i * 10 + k),
  );
  return {
    color: COLORS[i % 2],
    shapes,
    morphDuration: `${1.1 + (i % 4) * 0.25}s`,
    spinDuration: `${3 + i * 0.6}s`,
    clockwise: i % 2 === 0,
  };
});

interface PortalProps {
  className?: string;
}

const Portal = ({ className }: PortalProps) => {
  const glowId = useId();

  return (
    <svg className={`overflow-visible ${className ?? ''}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" strokeLinejoin="round" filter={`url(#${glowId})`}>
        {RINGS.map(({ color, shapes, morphDuration, spinDuration, clockwise }) => (
          <g
            key={shapes[0]}
            className="animate-spin motion-reduce:animate-none"
            style={{
              transformOrigin: '100px 100px',
              animationDuration: spinDuration,
              animationDirection: clockwise ? 'normal' : 'reverse',
            }}
          >
            <path d={shapes[0]} stroke={color} strokeWidth={2.4}>
              <animate
                attributeName="d"
                dur={morphDuration}
                repeatCount="indefinite"
                values={[...shapes, shapes[0]].join(';')}
              />
            </path>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default Portal;
