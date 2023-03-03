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
