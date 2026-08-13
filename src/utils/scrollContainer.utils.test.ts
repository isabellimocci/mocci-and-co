import { describe, it, expect, afterEach } from 'vitest';
import { getScrollContainer } from './scrollContainer.utils';

afterEach(() => {
  document.getElementById('root')?.remove();
});

describe('getScrollContainer', () => {
  it('returns #root, which is the element that actually scrolls in this layout', () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    expect(getScrollContainer()).toBe(root);
  });
});
