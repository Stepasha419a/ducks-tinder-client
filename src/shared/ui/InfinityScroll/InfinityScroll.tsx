import type { MutableRefObject, FC, PropsWithChildren } from 'react';
import { useRef, useEffect, useState } from 'react';

interface InfinityScrollProps {
  isReversed?: boolean;
  isMore: boolean;
  isLoading: boolean;
  handleLoadMore: () => void;
  listRef: MutableRefObject<HTMLElement | null>;
}

export const InfinityScroll: FC<PropsWithChildren<InfinityScrollProps>> = ({
  children,
  isReversed,
  isMore,
  isLoading,
  handleLoadMore,
  listRef,
}) => {
  const loadRef = useRef<null | HTMLDivElement>(null);
  const lastScroll = useRef(0);

  const [isIntersecting, setIntersecting] = useState(false);
  const [isRequested, setRequested] = useState(false);

  useEffect(() => {
    if (listRef.current && !isLoading) {
      const newScrollTop = getNewScrollTop(
        Boolean(isReversed),
        lastScroll.current,
        listRef.current
      );
      listRef.current.scrollTop = newScrollTop;

      setRequested(false);
      setIntersecting(false);
    } else if (listRef.current && isLoading) {
      if (isReversed) {
        lastScroll.current = listRef.current.scrollHeight;
      } else {
        lastScroll.current = listRef.current.scrollTop;
      }
    }
  }, [isLoading, isReversed, listRef]);

  useEffect(() => {
    if (!isLoading && isIntersecting && !isRequested && isMore) {
      handleLoadMore();
      setRequested(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMore, isIntersecting, isLoading, isRequested]);

  useEffect(() => {
    const child = loadRef.current!;

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    observer.observe(child);

    return () => observer.unobserve(child);
  }, []);

  const loadElement = <div key="load-scroll" ref={loadRef}></div>;

  if (isReversed) {
    return (
      <>
        {loadElement}
        {children}
      </>
    );
  }

  return (
    <>
      {children}
      {loadElement}
    </>
  );
};

function getNewScrollTop(
  isReversed: boolean,
  lastScroll: number,
  listElement: Element
) {
  if (isReversed) {
    return listElement.scrollHeight - lastScroll;
  } else {
    return listElement.scrollTop - (listElement.scrollTop - lastScroll);
  }
}
