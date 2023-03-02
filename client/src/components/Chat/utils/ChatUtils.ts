export const isRefElementVisible = (
  ref: React.MutableRefObject<HTMLDivElement | null>
) => {
  const rect = ref.current?.lastElementChild?.getBoundingClientRect();

  if (rect) {
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
};

export const scrollToBottom = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  behaviour?: boolean
) => {
  if (ref.current && !behaviour) {
    ref.current.scrollTop = ref.current.scrollHeight;
  } else {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }
};
