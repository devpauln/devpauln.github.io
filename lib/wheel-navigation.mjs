// Convert a deliberate vertical gesture into one section change.
export function consumeWheel(state, delta, now, lockedUntil) {
  if (now < lockedUntil) {
    return { total: 0, last: now, lockedUntil: Math.max(lockedUntil, now + 180), direction: 0 };
  }
  const reset = now - state.last > 180 || Math.sign(delta) !== Math.sign(state.total);
  const total = (reset ? 0 : state.total) + delta;
  const direction = Math.abs(total) >= 65 ? Math.sign(total) : 0;
  return { total: direction ? 0 : total, last: now, lockedUntil: direction ? now + 800 : lockedUntil, direction };
}
