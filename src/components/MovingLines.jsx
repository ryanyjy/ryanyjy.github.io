import { useEffect, useRef } from "react";

const TEAL = "#3397c1";
const LINE_HEIGHT = 4;
const LINE_COUNT = 90;
const MIN_Y_GAP = 16;
const Y_MARGIN = 40;

function getPalette(isTeal) {
  return isTeal
    ? { primary: "#ffffff", secondary: TEAL }
    : { primary: "#ffffff", secondary: TEAL };
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function maxLineCount(height) {
  const usable = height - Y_MARGIN * 2;
  if (usable <= 0) return 1;
  return Math.max(1, Math.min(LINE_COUNT, Math.floor(usable / MIN_Y_GAP) + 1));
}

function pickLineY(existingLines, height) {
  const minY = Y_MARGIN;
  const maxY = Math.max(minY, height - Y_MARGIN - LINE_HEIGHT);

  for (let attempt = 0; attempt < 80; attempt++) {
    const y = randomBetween(minY, maxY);
    const tooClose = existingLines.some(
      (line) => Math.abs(line.y - y) < MIN_Y_GAP
    );
    if (!tooClose) return y;
  }

  let bestY = randomBetween(minY, maxY);
  let bestClearance = -1;
  for (let attempt = 0; attempt < 40; attempt++) {
    const y = randomBetween(minY, maxY);
    const clearance = existingLines.reduce(
      (min, line) => Math.min(min, Math.abs(line.y - y)),
      Infinity
    );
    if (clearance > bestClearance) {
      bestClearance = clearance;
      bestY = y;
    }
  }
  return bestY;
}

function createLine(width, height, existingLines = []) {
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
    y: pickLineY(existingLines, height),
    segments,
    totalWidth,
    speed: randomBetween(0.6, 2.4),
  };
}

function createLines(width, height) {
  const count = maxLineCount(height);
  const lines = [];
  for (let i = 0; i < count; i++) {
    lines.push(createLine(width, height, lines));
  }
  return lines;
}

function spawnLine(width, height, otherLines) {
  const line = createLine(width, height, otherLines);
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

      linesRef.current = createLines(width, height);
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const palette = paletteRef.current;
      ctx.clearRect(0, 0, width, height);

      linesRef.current = linesRef.current.map((line, index, allLines) => {
        let { x } = line;
        x += line.speed;

        if (x > width) {
          const others = allLines.filter((_, i) => i !== index);
          return spawnLine(width, height, others);
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
