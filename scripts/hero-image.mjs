// Generates the docs hero illustration: the scrollbar exploded into layers along the Z axis (isometric view).
// usage: node scripts/hero-image.mjs docs/public  (writes hero-light.svg and hero-dark.svg)
// the home page sizes the image by its aspect ratio - keep `aspect-ratio` in docs/.vitepress/theme/custom.css in sync
import { writeFileSync } from "node:fs";

const out = process.argv[2] ?? ".";

// plane size in flat (unprojected) units
const W = 250;
const H = 180;
// flattened axonometric axes (screen vectors of one flat unit): u goes right-down, v goes left-down
const U = [0.92, 0.25];
const V = [-0.72, 0.3];
const GAP = 96; // distance between layers along Z
const OX = 392; // top vertex of the top layer
const OY = 46;

const themes = {
  light: {
    label: "#3c3c43",
    sub: "#6b7280",
    leader: "#d1d5db",
    connector: "#cbd5e1",
    pageFill: "#ffffff",
    pageStroke: "#cbd5e1",
    pageShadow: "rgba(15, 23, 42, 0.10)",
    line: "#e2e8f0",
    lineStrong: "#cbd5e1",
    block: "#e0e7ff",
    frame: "#94a3b8",
    railLayerFill: "rgba(248, 250, 252, 0.6)",
    sheetStroke: "#cbd5e1",
    rail: "#c7d2fe",
    railStroke: "#a5b4fc",
    thumbLayerFill: "rgba(238, 242, 255, 0.35)",
    thumb: "#6366f1",
    arrowFrom: "#6366f1",
    arrowTo: "#a78bfa",
  },
  dark: {
    label: "#dfdfd6",
    sub: "#98989f",
    leader: "#3f3f46",
    connector: "#52525b",
    pageFill: "#1e1e24",
    pageStroke: "#3f3f46",
    pageShadow: "rgba(0, 0, 0, 0.45)",
    line: "#2e2e36",
    lineStrong: "#3f3f46",
    block: "#2b2a4a",
    frame: "#71717a",
    railLayerFill: "rgba(39, 39, 46, 0.55)",
    sheetStroke: "#52525b",
    rail: "#312e81",
    railStroke: "#4338ca",
    thumbLayerFill: "rgba(49, 46, 129, 0.18)",
    thumb: "#818cf8",
    arrowFrom: "#818cf8",
    arrowTo: "#c4b5fd",
  },
};

// flat point (u, v) on the layer `z` (0 - bottom) -> screen point
const layers = 3;
const project = (u, v, z) => {
  const oy = OY + (layers - 1 - z) * GAP;
  return [OX + u * U[0] + v * V[0], oy + u * U[1] + v * V[1]];
};
const n = (x) => Math.round(x * 100) / 100;
// SVG matrix that maps flat coordinates of layer `z` to the screen
const matrix = (z) => {
  const [e, f] = project(0, 0, z);
  return `matrix(${U[0]} ${U[1]} ${V[0]} ${V[1]} ${n(e)} ${n(f)})`;
};
const LABEL_X = 206; // right edge of the labels
const corners = (z) => [project(0, 0, z), project(W, 0, z), project(W, H, z), project(0, H, z)];

const render = (t) => {
  const rail = 16; // rail thickness
  const thumb = 9; // thumb thickness
  const pad = (rail - thumb) / 2;
  const railEndV = H - rail; // y rail ends before the corner
  const railEndU = W - rail; // x rail ends before the corner

  const page = `
    <g transform="${matrix(0)}">
      <rect x="6" y="8" width="${W}" height="${H}" rx="10" fill="${t.pageShadow}"/>
      <rect width="${W}" height="${H}" rx="10" fill="${t.pageFill}" stroke="${t.pageStroke}" stroke-width="1.5"/>
      <rect x="18" y="18" width="110" height="10" rx="5" fill="${t.lineStrong}"/>
      <rect x="18" y="40" width="200" height="6" rx="3" fill="${t.line}"/>
      <rect x="18" y="54" width="186" height="6" rx="3" fill="${t.line}"/>
      <rect x="18" y="68" width="196" height="6" rx="3" fill="${t.line}"/>
      <rect x="18" y="86" width="96" height="60" rx="6" fill="${t.block}"/>
      <rect x="126" y="88" width="90" height="6" rx="3" fill="${t.line}"/>
      <rect x="126" y="102" width="80" height="6" rx="3" fill="${t.line}"/>
      <rect x="126" y="116" width="88" height="6" rx="3" fill="${t.line}"/>
      <rect x="126" y="130" width="60" height="6" rx="3" fill="${t.line}"/>
      <rect x="18" y="158" width="170" height="6" rx="3" fill="${t.line}"/>
    </g>`;

  const railLayer = `
    <g transform="${matrix(1)}">
      <rect width="${W}" height="${H}" rx="10" fill="${t.railLayerFill}" stroke="${t.sheetStroke}" stroke-width="1.2"/>
      <rect x="${W - rail}" y="0" width="${rail}" height="${railEndV}" rx="${rail / 2}" fill="${t.rail}" stroke="${t.railStroke}"/>
      <rect x="0" y="${H - rail}" width="${railEndU}" height="${rail}" rx="${rail / 2}" fill="${t.rail}" stroke="${t.railStroke}"/>
    </g>`;

  const thumbLayer = `
    <g transform="${matrix(2)}">
      <rect width="${W}" height="${H}" rx="10" fill="${t.thumbLayerFill}" stroke="${t.sheetStroke}" stroke-width="1.2"/>
      <rect x="${W - rail + pad}" y="30" width="${thumb}" height="64" rx="${thumb / 2}" fill="${t.thumb}"/>
      <rect x="62" y="${H - rail + pad}" width="96" height="${thumb}" rx="${thumb / 2}" fill="${t.thumb}"/>
    </g>`;

  // dashed verticals joining the layer corners - the "exploded" look
  const connectors = [0, 1, 2, 3]
    .map((i) => {
      const [x1, y1] = corners(2)[i];
      const [, y2] = corners(0)[i];
      return `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x1)}" y2="${n(y2)}" stroke="${t.connector}" stroke-width="1" stroke-dasharray="2 4"/>`;
    })
    .join("\n    ");

  // labels on the left, with leader lines to the left vertex of each layer
  const labels = [
    { z: 2, title: "scrollbar", sub: "outer ::before / ::after" },
    { z: 1, title: "rail", sub: "inner ::before / ::after" },
    { z: 0, title: "content", sub: "your scrollable element" },
  ]
    .map(({ z, title, sub }) => {
      const [vx, vy] = corners(z)[3];
      return `
    <line x1="${LABEL_X + 10}" y1="${n(vy)}" x2="${n(vx - 6)}" y2="${n(vy)}" stroke="${t.leader}" stroke-width="1"/>
    <circle cx="${n(vx)}" cy="${n(vy)}" r="3" fill="${t.leader}"/>
    <text x="${LABEL_X}" y="${n(vy - 3)}" text-anchor="end" font-size="21" font-weight="600" fill="${t.label}">${title}</text>
    <text x="${LABEL_X}" y="${n(vy + 17)}" text-anchor="end" font-size="13.5" font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="${t.sub}">${sub}</text>`;
    })
    .join("");

  // Z axis arrow on the right
  const [rx] = corners(0)[1];
  const ax = n(rx + 30);
  const ay1 = n(corners(0)[2][1] - 10);
  const ay2 = n(corners(2)[1][1] - 20);
  const arrow = `
    <line x1="${ax}" y1="${ay1}" x2="${ax}" y2="${n(ay2 + 12)}" stroke="url(#z)" stroke-width="3" stroke-linecap="round"/>
    <path d="M ${n(ax - 8)} ${n(ay2 + 14)} L ${ax} ${ay2} L ${n(ax + 8)} ${n(ay2 + 14)} Z" fill="${t.arrowTo}"/>
    <text x="${ax}" y="${n(ay2 - 8)}" text-anchor="middle" font-size="13" font-weight="600" fill="${t.sub}">z</text>`;

  const width = n(corners(0)[1][0] + 56);
  const height = n(corners(0)[2][1] + 24);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" font-family="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" role="img" aria-label="Light-scrollbar layers: your scrollable content, the rail and the scrollbar thumb drawn on top of each other">
  <defs>
    <linearGradient id="z" gradientUnits="userSpaceOnUse" x1="0" y1="${n(corners(0)[2][1])}" x2="0" y2="${n(corners(2)[1][1] - 20)}">
      <stop offset="0" stop-color="${t.arrowFrom}" stop-opacity="0.2"/>
      <stop offset="1" stop-color="${t.arrowTo}"/>
    </linearGradient>
  </defs>
  ${connectors}
  ${page}
  ${railLayer}
  ${thumbLayer}
  ${labels}
  ${arrow}
</svg>
`;
};

for (const [name, theme] of Object.entries(themes)) {
  writeFileSync(`${out}/hero-${name}.svg`, render(theme));
}
console.log("written to", out);
