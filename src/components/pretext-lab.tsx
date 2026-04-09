"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  layout,
  layoutNextLine,
  layoutWithLines,
  prepare,
  prepareWithSegments,
  walkLineRanges,
} from "@chenglou/pretext";

const BODY_FONT = '500 15px "Helvetica Neue", Helvetica, Arial, sans-serif';
const BODY_LINE_HEIGHT = 24;
const DISPLAY_FONT = '700 34px "Helvetica Neue", Helvetica, Arial, sans-serif';
const DISPLAY_LINE_HEIGHT = 38;
const BUBBLE_PADDING_X = 16;
const BUBBLE_PADDING_Y = 12;

const composerSeed = `Ship the polished version, not the placeholder.\n\nPretext lets you measure multiline copy before the DOM hot path — even with emoji 🚀, mixed scripts, and preserved line breaks.`;

const bubbleMessages = [
  "Need a chat UI that looks hand-set instead of stretched to the same width every time?",
  "Yep — keep the same wrapping, then shrink each bubble to the widest rendered line.",
  "That means less dead air, tighter rhythm, and still zero DOM measuring in the resize loop.",
  "AGI 春天到了. بدأت الرحلة 🚀 and the bubbles still stay nicely proportioned.",
] as const;

const orbitalHeadline = "Route a headline around geometry without CSS hacks.";
const orbitalBody =
  "Each row can get its own width. That means floating shapes, editorial compositions, adaptive posters, and canvas or SVG renderers that still respect real browser text measurement.";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatPx(value: number) {
  return `${Math.round(value)}px`;
}

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => setWidth(node.clientWidth);
    update();

    const observer = new ResizeObserver(() => update());
    observer.observe(node);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return [ref, width] as const;
}

function DemoSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="ui-panel overflow-hidden rounded-[32px]">
      <div className="border-b border-white/8 px-6 py-5 sm:px-8">
        <div className="ui-label">{eyebrow}</div>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">{title}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-white/60 sm:text-[15px]">{description}</p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-8">{children}</div>
    </section>
  );
}

function StatCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="ui-panel-soft rounded-[22px] p-4">
      <div className="ui-label">{label}</div>
      <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">{value}</div>
      {detail ? <p className="mt-1 text-xs leading-5 text-white/44">{detail}</p> : null}
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (nextValue: number) => void;
}) {
  return (
    <label className="block space-y-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-white/68">{label}</span>
        <span className="font-mono text-xs text-white/46">{value}px</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-white"
      />
    </label>
  );
}

function ComposerHeightDemo() {
  const [width, setWidth] = useState(360);
  const [message, setMessage] = useState(composerSeed);
  const measuredRef = useRef<HTMLDivElement | null>(null);
  const [browserHeight, setBrowserHeight] = useState<number | null>(null);

  const prepared = useMemo(
    () => prepare(message, BODY_FONT, { whiteSpace: "pre-wrap" }),
    [message],
  );
  const metrics = useMemo(() => layout(prepared, width, BODY_LINE_HEIGHT), [prepared, width]);

  useEffect(() => {
    const node = measuredRef.current;
    if (!node) return;

    const update = () => {
      setBrowserHeight(node.getBoundingClientRect().height);
    };

    update();
    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [message, width]);

  const delta = browserHeight === null ? null : Math.round(browserHeight - metrics.height);

  return (
    <DemoSection
      eyebrow="Demo 01"
      title="Auto-grow composer without DOM reads in the hot path"
      description="Prepare once, then re-layout pure arithmetic on every width change. This demo keeps newlines visible with whiteSpace: 'pre-wrap', which makes it ideal for textareas, notes, and message composers."
    >
      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="space-y-4">
          <div className="ui-panel-soft rounded-[26px] p-4">
            <div className="ui-label">Editor</div>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="mt-3 min-h-[240px] w-full resize-none rounded-[22px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white outline-none placeholder:text-white/28"
              spellCheck={false}
            />
          </div>

          <div className="ui-panel-soft rounded-[26px] p-4">
            <SliderRow label="Preview width" value={width} min={220} max={540} onChange={setWidth} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <StatCard label="Pretext height" value={formatPx(metrics.height)} detail="Computed from cached segment widths." />
            <StatCard label="Line count" value={String(metrics.lineCount)} detail="Measured with preserved line breaks." />
            <StatCard
              label="Browser delta"
              value={delta === null ? "—" : `${delta >= 0 ? "+" : ""}${delta}px`}
              detail="Validation only — not used for the layout itself."
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="ui-panel-soft rounded-[28px] p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="ui-label">Live preview</div>
                <p className="mt-1 text-sm text-white/46">The bubble height is driven by Pretext, not scrollHeight.</p>
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white/46">{width}px</div>
            </div>

            <div className="mt-6 flex min-h-[380px] items-end justify-center rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_50%),rgba(255,255,255,0.03)] p-4">
              <div className="w-full max-w-full rounded-[28px] border border-sky-300/18 bg-sky-400/[0.08] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)]" style={{ width: `${width + 32}px` }}>
                <div className="mb-3 flex items-center justify-between gap-3 text-xs text-white/42">
                  <span>Predicted content height</span>
                  <span className="font-mono">{formatPx(metrics.height)}</span>
                </div>
                <div
                  className="overflow-hidden rounded-[20px] border border-white/10 bg-black/20 px-4 py-3"
                  style={{ height: `${metrics.height + 24}px` }}
                >
                  <div
                    ref={measuredRef}
                    style={{
                      width: `${width}px`,
                      font: BODY_FONT,
                      lineHeight: `${BODY_LINE_HEIGHT}px`,
                      whiteSpace: "pre-wrap",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {message}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-dashed border-white/10 px-4 py-3 text-sm leading-7 text-white/52">
            <span className="text-white/82">Why it matters:</span> once the text is prepared, resize and virtualization code can ask for
            the block height without forcing layout reflow.
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

type BubbleRender = {
  text: string;
  lineCount: number;
  fixedWidth: number;
  tightWidth: number;
  bubbleHeight: number;
  fixedArea: number;
  tightArea: number;
};

function BubbleShrinkDemo() {
  const [requestedWidth, setRequestedWidth] = useState(560);
  const [frameRef, frameWidth] = useElementWidth<HTMLDivElement>();

  const chatWidth = useMemo(() => {
    if (frameWidth === 0) return requestedWidth;
    return clamp(requestedWidth, 320, Math.max(320, Math.floor(frameWidth)));
  }, [frameWidth, requestedWidth]);

  const render = useMemo(() => {
    const bubbleMaxWidth = Math.min(420, Math.floor(chatWidth * 0.72));
    const textWidth = bubbleMaxWidth - BUBBLE_PADDING_X * 2;

    const prepared = bubbleMessages.map((text) => prepareWithSegments(text, BODY_FONT));
    const bubbles: BubbleRender[] = prepared.map((preparedMessage, index) => {
      const lines = layoutWithLines(preparedMessage, textWidth, BODY_LINE_HEIGHT);
      let widestLine = 0;
      walkLineRanges(preparedMessage, textWidth, (line) => {
        widestLine = Math.max(widestLine, line.width);
      });

      const bubbleHeight = Math.ceil(lines.height + BUBBLE_PADDING_Y * 2);
      const tightWidth = clamp(
        Math.ceil(widestLine + BUBBLE_PADDING_X * 2 + 2),
        132,
        bubbleMaxWidth,
      );

      return {
        text: bubbleMessages[index] ?? "",
        lineCount: lines.lineCount,
        fixedWidth: bubbleMaxWidth,
        tightWidth,
        bubbleHeight,
        fixedArea: bubbleMaxWidth * bubbleHeight,
        tightArea: tightWidth * bubbleHeight,
      };
    });

    const fixedArea = bubbles.reduce((sum, bubble) => sum + bubble.fixedArea, 0);
    const tightArea = bubbles.reduce((sum, bubble) => sum + bubble.tightArea, 0);
    const savedPercent = fixedArea === 0 ? 0 : ((fixedArea - tightArea) / fixedArea) * 100;

    return {
      bubbleMaxWidth,
      bubbles,
      fixedArea,
      tightArea,
      savedPercent,
    };
  }, [chatWidth]);

  return (
    <DemoSection
      eyebrow="Demo 02"
      title="Shrink-wrap chat bubbles to the widest rendered line"
      description="Use walkLineRanges() to keep CSS-like wrapping, then tighten each bubble to the actual multiline width. Same line breaks, less waste, much nicer rhythm."
    >
      <div className="space-y-5" ref={frameRef}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="ui-panel-soft rounded-[26px] p-4">
            <SliderRow label="Conversation width" value={chatWidth} min={320} max={760} onChange={setRequestedWidth} />
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
            <StatCard label="Bubble cap" value={formatPx(render.bubbleMaxWidth)} />
            <StatCard label="Area saved" value={`${Math.round(render.savedPercent)}%`} detail="Compared with a fixed max-width bubble." />
            <StatCard label="Same wraps" value="Yes" detail="The shrink width is derived from the laid-out lines." />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="ui-panel-soft rounded-[28px] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="ui-label">CSS max width</div>
                <p className="mt-1 text-sm text-white/46">Every message gets the same widest bubble.</p>
              </div>
              <div className="font-mono text-xs text-white/40">{formatPx(render.bubbleMaxWidth)}</div>
            </div>
            <div className="mt-5 rounded-[24px] border border-white/8 bg-black/20 p-4">
              {render.bubbles.map((bubble, index) => {
                const isRight = index % 2 === 1;
                return (
                  <div key={`fixed-${index}`} className={`mb-3 flex ${isRight ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`rounded-[22px] border px-4 py-3 text-[15px] leading-6 ${
                        isRight
                          ? "border-sky-300/18 bg-sky-400/[0.08] text-white/90"
                          : "border-white/10 bg-white/[0.05] text-white/82"
                      }`}
                      style={{ width: `${bubble.fixedWidth}px`, minHeight: `${bubble.bubbleHeight}px`, font: BODY_FONT }}
                    >
                      {bubble.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ui-panel-soft rounded-[28px] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="ui-label">Pretext shrink-wrap</div>
                <p className="mt-1 text-sm text-white/46">Each bubble width snaps to the widest measured line.</p>
              </div>
              <div className="font-mono text-xs text-white/40">{Math.round(render.savedPercent)}% tighter</div>
            </div>
            <div className="mt-5 rounded-[24px] border border-white/8 bg-black/20 p-4">
              {render.bubbles.map((bubble, index) => {
                const isRight = index % 2 === 1;
                return (
                  <div key={`tight-${index}`} className={`mb-3 flex ${isRight ? "justify-end" : "justify-start"}`}>
                    <div className="space-y-2">
                      <div
                        className={`rounded-[22px] border px-4 py-3 text-[15px] leading-6 ${
                          isRight
                            ? "border-emerald-300/20 bg-emerald-400/[0.08] text-white/92"
                            : "border-white/10 bg-white/[0.05] text-white/82"
                        }`}
                        style={{ width: `${bubble.tightWidth}px`, minHeight: `${bubble.bubbleHeight}px`, font: BODY_FONT }}
                      >
                        {bubble.text}
                      </div>
                      <div className={`px-1 font-mono text-[11px] text-white/34 ${isRight ? "text-right" : "text-left"}`}>
                        {bubble.lineCount} lines · {formatPx(bubble.tightWidth)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

type PositionedLine = {
  text: string;
  x: number;
  y: number;
  maxWidth: number;
  usedWidth: number;
};

function OrbitalLayoutDemo() {
  const [radius, setRadius] = useState(108);
  const [shellRef, shellWidth] = useElementWidth<HTMLDivElement>();

  const poster = useMemo(() => {
    const width = clamp(shellWidth || 640, 320, 680);
    const paddingX = 24;
    const paddingTop = 26;
    const gap = 18;
    const contentWidth = width - paddingX * 2;
    const orbX = width - paddingX - radius;
    const orbY = paddingTop + radius - 6;

    const preparedHeadline = prepareWithSegments(orbitalHeadline, DISPLAY_FONT);
    const preparedBody = prepareWithSegments(orbitalBody, BODY_FONT);

    const lines: PositionedLine[] = [];
    let cursor = { segmentIndex: 0, graphemeIndex: 0 };
    let y = paddingTop;
    let narrowLines = 0;

    for (let guard = 0; guard < 24; guard += 1) {
      const lineMid = y + DISPLAY_LINE_HEIGHT / 2;
      let x = paddingX;
      let maxWidth = contentWidth;

      if (Math.abs(lineMid - orbY) < radius) {
        const chord = Math.sqrt(Math.max(0, radius * radius - (lineMid - orbY) ** 2));
        const leftEdge = orbX - chord - gap;
        maxWidth = Math.max(160, leftEdge - x);
        narrowLines += 1;
      }

      const line = layoutNextLine(preparedHeadline, cursor, maxWidth);
      if (line === null) break;

      lines.push({
        text: line.text,
        x,
        y,
        maxWidth,
        usedWidth: line.width,
      });
      cursor = line.end;
      y += DISPLAY_LINE_HEIGHT;
    }

    const bodyTop = Math.max(y + 18, orbY + radius + 24);
    const bodyLayout = layoutWithLines(preparedBody, contentWidth, BODY_LINE_HEIGHT);

    return {
      width,
      height: bodyTop + bodyLayout.height + 60,
      orbX,
      orbY,
      lines,
      narrowLines,
      bodyTop,
      bodyLines: bodyLayout.lines,
    };
  }, [radius, shellWidth]);

  return (
    <DemoSection
      eyebrow="Demo 03"
      title="Route each line around a live obstacle"
      description="layoutNextLine() lets every row have its own width. That unlocks editorial, poster, canvas, and SVG compositions where text flows around real geometry instead of fake columns."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div className="ui-panel-soft rounded-[30px] p-4 sm:p-5">
          <div ref={shellRef} className="relative overflow-hidden rounded-[26px] border border-white/8 bg-[#0d141b]">
            <div
              className="relative"
              style={{ height: `${poster.height}px` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_26%)]" />
              <div
                className="absolute rounded-full border border-sky-200/20 bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.92),rgba(186,230,253,0.7)_18%,rgba(59,130,246,0.24)_58%,rgba(37,99,235,0.08)_100%)] shadow-[0_30px_90px_rgba(56,189,248,0.16)]"
                style={{
                  width: `${radius * 2}px`,
                  height: `${radius * 2}px`,
                  left: `${poster.orbX - radius}px`,
                  top: `${poster.orbY - radius}px`,
                }}
              />

              <div className="absolute left-6 top-5 right-6 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/30">
                <span>Pretext poster</span>
                <span>{poster.lines.length} headline lines</span>
              </div>

              {poster.lines.map((line, index) => (
                <div
                  key={`${line.text}-${index}`}
                  className="absolute text-white"
                  style={{
                    left: `${line.x}px`,
                    top: `${line.y}px`,
                    maxWidth: `${line.maxWidth}px`,
                    font: DISPLAY_FONT,
                    lineHeight: `${DISPLAY_LINE_HEIGHT}px`,
                    letterSpacing: "-0.05em",
                  }}
                >
                  {line.text}
                </div>
              ))}

              <div className="absolute left-6 right-6 border-t border-white/8" style={{ top: `${poster.bodyTop - 12}px` }} />
              {poster.bodyLines.map((line, index) => (
                <div
                  key={`body-${line.text}-${index}`}
                  className="absolute text-white/66"
                  style={{
                    left: "24px",
                    top: `${poster.bodyTop + index * BODY_LINE_HEIGHT}px`,
                    width: `calc(100% - 48px)`,
                    font: BODY_FONT,
                    lineHeight: `${BODY_LINE_HEIGHT}px`,
                  }}
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="ui-panel-soft rounded-[26px] p-4">
            <SliderRow label="Orb radius" value={radius} min={72} max={132} onChange={setRadius} />
          </div>
          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <StatCard label="Custom rows" value={String(poster.narrowLines)} detail="Lines that received a narrower width beside the orb." />
            <StatCard label="Poster width" value={formatPx(poster.width)} detail="Responsive container measured once by ResizeObserver." />
            <StatCard label="API move" value="layoutNextLine()" detail="Advance the cursor one line at a time as geometry changes." />
          </div>
          <div className="rounded-[24px] border border-dashed border-white/10 px-4 py-3 text-sm leading-7 text-white/52">
            This is the part CSS does not really expose: <span className="text-white/82">different max widths for each successive line</span>, driven by actual text shaping.
          </div>
        </div>
      </div>
    </DemoSection>
  );
}

export function PretextLab() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
      <section className="ui-panel overflow-hidden rounded-[36px] px-6 py-8 sm:px-8 sm:py-10">
        <div className="max-w-4xl">
          <div className="ui-label">Pretext lab</div>
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-white">
            Three demos that make <span className="text-white/56">multiline layout</span> feel like a real primitive.
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-8 text-white/64 sm:text-[17px]">
            I cloned <span className="text-white/82">chenglou/pretext</span> for reference and used the installed
            package in this app to build a mini demo lab. Everything below runs in the browser with real text
            measurement, but the hot layout path stays outside DOM reflow.
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="ui-panel-soft rounded-[24px] p-4 text-sm leading-7 text-white/60">
            <div className="ui-label">prepare()</div>
            Measure and cache the text once.
          </div>
          <div className="ui-panel-soft rounded-[24px] p-4 text-sm leading-7 text-white/60">
            <div className="ui-label">layout()</div>
            Ask for height later with pure arithmetic.
          </div>
          <div className="ui-panel-soft rounded-[24px] p-4 text-sm leading-7 text-white/60">
            <div className="ui-label">layoutNextLine()</div>
            Route text through geometry one row at a time.
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-white/52">
          <a
            href="https://github.com/chenglou/pretext"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
          >
            View repo
          </a>
          <a
            href="https://chenglou.me/pretext/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-white/18 hover:bg-white/[0.05] hover:text-white"
          >
            Original demos
          </a>
        </div>
      </section>

      <ComposerHeightDemo />
      <BubbleShrinkDemo />
      <OrbitalLayoutDemo />
    </div>
  );
}
