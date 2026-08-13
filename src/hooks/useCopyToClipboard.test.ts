import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from './useCopyToClipboard';

const writeText = vi.fn<(text: string) => Promise<void>>();

beforeEach(() => {
  vi.useFakeTimers();
  writeText.mockReset();
  writeText.mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useCopyToClipboard', () => {
  it('writes the text to the clipboard and flags it as copied', async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('chave-pix@teste.com');
    });

    expect(writeText).toHaveBeenCalledWith('chave-pix@teste.com');
    expect(result.current.copied).toBe(true);
  });

  it('clears the copied flag after the delay', async () => {
    const { result } = renderHook(() => useCopyToClipboard(2000));

    await act(async () => {
      await result.current.copy('abc');
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(result.current.copied).toBe(false);
  });

  it('restarts the countdown on a second copy instead of inheriting the first', async () => {
    const { result } = renderHook(() => useCopyToClipboard(2000));

    await act(async () => {
      await result.current.copy('first');
    });
    act(() => {
      vi.advanceTimersByTime(1900);
    });

    await act(async () => {
      await result.current.copy('second');
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.copied).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1800);
    });
    expect(result.current.copied).toBe(false);
  });

  it('reports failure and stays un-copied when the clipboard is unavailable', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    const { result } = renderHook(() => useCopyToClipboard());

    let ok = true;
    await act(async () => {
      ok = await result.current.copy('abc');
    });

    expect(ok).toBe(false);
    expect(result.current.copied).toBe(false);
  });

  it('does not leave a timer running after unmount', async () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { result, unmount } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      await result.current.copy('abc');
    });
    unmount();

    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
