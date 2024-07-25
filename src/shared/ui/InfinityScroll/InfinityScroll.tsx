import type { MutableRefObject, PropsWithChildren, ReactElement } from 'react';
import {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { LoadMore } from './LoadMore';

interface InfinityScrollProps {
  isReversed?: boolean;
  isMore: boolean;
  isLoading: boolean;
  handleLoadMore: () => void;
  listRef: MutableRefObject<HTMLElement | null>;
  loader?: ReactElement;
}

export const InfinityScroll = forwardRef<
  unknown,
  PropsWithChildren<InfinityScrollProps>
>(
  (
    {
      children,
      isReversed,
      isMore,
      isLoading,
      handleLoadMore,
      listRef,
      loader,
    },
    controlRef
  ) => {
    const loadRef = useRef<null | HTMLDivElement>(null);
    const lastScroll = useRef(0);

    const [isIntersecting, setIntersecting] = useState(false);
    const [isRequested, setRequested] = useState(false);
    const [forceReset, setForceReset] = useState(false);

    useImperativeHandle<unknown, { forceReset: () => void }>(
      controlRef,
      () => ({
        forceReset() {
          setForceReset(true);
        },
      }),
      []
    );

    useEffect(() => {
      if (forceReset) {
        setIntersecting(true);
        setRequested(false);
        setForceReset(false);
      }
    }, [forceReset]);

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
        if (isMore) {
          setIntersecting(entry.isIntersecting);
        }
      });

      observer.observe(child);

      return () => {
        observer.unobserve(child);
      };
    }, [isMore]);

    if (isReversed) {
      return (
        <>
          <LoadMore
            key="load-scroll"
            isMore={isMore}
            loader={loader}
            ref={loadRef}
          />
          {children}
        </>
      );
    }

    return (
      <>
        {children}
        <LoadMore
          key="load-scroll"
          isMore={isMore}
          loader={loader}
          ref={loadRef}
        />
      </>
    );
  }
);

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
