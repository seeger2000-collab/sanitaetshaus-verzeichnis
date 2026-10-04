export function km(a: { lat?: number; lon?: number }, b: { lat?: number; lon?: number }) {
  if (a.lat == null || b.lat == null || a.lon == null || b.lon == null) return Infinity;
  const r = Math.PI / 180;
  const x = (b.lon - a.lon) * r * Math.cos(((a.lat + b.lat) / 2) * r);
  const y = (b.lat - a.lat) * r;
  return Math.sqrt(x * x + y * y) * 6371;
}
