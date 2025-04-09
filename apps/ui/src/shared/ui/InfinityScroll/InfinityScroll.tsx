import type { HTMLAttributes, PropsWithChildren, ReactElement } from 'react';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { LoadMore } from './LoadMore';

interface InfinityScrollProps extends HTMLAttributes<HTMLDivElement> {
  isReversed?: boolean;
  isMore: boolean;
  isLoading: boolean;
  handleLoadMore: () => void;
  loaderClassName?: string;
  loader?: ReactElement;
}

export interface ControlRef {
  forceReset: () => void;
  scrollToInitial: (smooth: boolean) => void;
  getIsNearWithInitial: (distance: number) => boolean;
}

export const InfinityScroll = forwardRef<
  ControlRef,
  PropsWithChildren<InfinityScrollProps>
>(
  (
    {
      children,
      isReversed,
      isMore,
      isLoading,
      handleLoadMore,
      loader,
      loaderClassName,
      ...divAttributes
    },
    controlRef
  ) => {
    const listRef = useRef<null | HTMLDivElement>(null);
    const loadRef = useRef<null | HTMLDivElement>(null);
    const lastScroll = useRef(0);

    const [isIntersecting, setIntersecting] = useState(false);
    const [isRequested, setRequested] = useState(false);

    useImperativeHandle<ControlRef, ControlRef>(
      controlRef,
      () => ({
        forceReset() {
          setIntersecting(true);
          setRequested(false);
        },
        scrollToInitial(smooth?: boolean) {
          if (listRef.current) {
            listRef.current.scrollTo({
              top: listRef.current.scrollHeight,
              behavior: smooth ? 'smooth' : 'auto',
            });
          }
        },
        getIsNearWithInitial(distance: number): boolean {
          if (listRef.current) {
            return (
              listRef.current.scrollHeight - listRef.current.scrollTop <
              listRef.current.clientHeight + distance
            );
          }

          return false;
        },
      }),
      []
    );

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
    }, [isLoading, isReversed]);

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
        <div {...divAttributes} ref={listRef}>
          {isMore && loader}
          <LoadMore
            className={loaderClassName}
            key="load-scroll"
            ref={loadRef}
          />
          {children}
        </div>
      );
    }

    return (
      <div {...divAttributes} ref={listRef}>
        {children}
        <LoadMore className={loaderClassName} key="load-scroll" ref={loadRef} />
        {isMore && loader}
      </div>
    );
  }
);

InfinityScroll.displayName = 'InfinityScroll';

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
