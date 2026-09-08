import { test } from 'node:test';
import assert from 'node:assert/strict';
import { consumeWheel } from '../lib/wheel-navigation.mjs';

test('small trackpad deltas accumulate into a single deliberate transition', () => {
  let state = { total: 0, last: 0, lockedUntil: 0 };
  for (let time = 1000; time <= 1030; time += 10) state = consumeWheel(state, 20, time, state.lockedUntil);
  assert.equal(state.direction, 1);
  let transitions = 0;
  for (let time = 1040; time < 2500; time += 30) {
    state = consumeWheel(state, 12, time, state.lockedUntil);
    transitions += Math.abs(state.direction);
  }
  assert.equal(transitions, 0, 'momentum must never skip another section');
  state = consumeWheel(state, 100, 3000, state.lockedUntil);
  assert.equal(state.direction, 1, 'a fresh gesture can advance');
});
test('reversing direction discards the prior partial gesture', () => {
  const state = consumeWheel({ total: 50, last: 1000 }, -30, 1010, 0);
  assert.equal(state.direction, 0);
  assert.equal(consumeWheel(state, -40, 1020, 0).direction, -1);
});
test('separate tiny gestures do not accumulate indefinitely', () => {
  const state = consumeWheel({ total: 50, last: 1000 }, 30, 1300, 0);
  assert.equal(state.direction, 0);
  assert.equal(state.total, 30);
});
