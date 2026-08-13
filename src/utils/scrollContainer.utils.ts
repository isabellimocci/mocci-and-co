export const getScrollContainer = (): HTMLElement =>
  document.getElementById('root') ?? document.documentElement;

export const scrollPageToTop = (): void => {
  const container = getScrollContainer();
  container.scrollTop = 0;
  container.scrollLeft = 0;

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};
