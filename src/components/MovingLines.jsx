import { useEffect, useRef } from "react";

const TEAL = "#3397c1";
const LINE_HEIGHT = 4;
const LINE_COUNT = 90;

function getPalette(isTeal) {
  return isTeal
    ? { primary: "#ffffff", secondary: TEAL }
    : { primary: "#ffffff", secondary: TEAL };
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createLine(width, height) {
  const isDual = Math.random() > 0.55;
  const totalWidth = randomBetween(40, 220);
  const segments = [];

  if (isDual) {
    const primaryWidth = randomBetween(totalWidth * 0.4, totalWidth * 0.7);
    segments.push({ offset: 0, width: primaryWidth, role: "primary" });
    segments.push({
      offset: primaryWidth,
      width: totalWidth - primaryWidth,
      role: "secondary",
    });
  } else {
    segments.push({
      offset: 0,
      width: totalWidth,
      role: Math.random() > 0.5 ? "primary" : "secondary",
    });
  }

  return {
    x: randomBetween(-totalWidth, width),
    y: randomBetween(40, height - 40),
    segments,
    totalWidth,
    speed: randomBetween(0.6, 2.4),
  };
}

function spawnLine(width, height) {
  const line = createLine(width, height);
  line.x = -line.totalWidth - randomBetween(0, 200);
  return line;
}

export default function MovingLines({ isTeal }) {
  const canvasRef = useRef(null);
  const linesRef = useRef([]);
  const frameRef = useRef(0);
  const paletteRef = useRef(getPalette(isTeal));

  useEffect(() => {
    paletteRef.current = getPalette(isTeal);
  }, [isTeal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      linesRef.current = Array.from({ length: LINE_COUNT }, () =>
        createLine(width, height)
      );
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const palette = paletteRef.current;
      ctx.clearRect(0, 0, width, height);

      linesRef.current = linesRef.current.map((line) => {
        let { x } = line;
        x += line.speed;

        if (x > width) {
          return spawnLine(width, height);
        }

        for (const segment of line.segments) {
          ctx.fillStyle = palette[segment.role];
          ctx.fillRect(
            x + segment.offset,
            line.y,
            segment.width,
            LINE_HEIGHT
          );
        }

        return { ...line, x };
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
