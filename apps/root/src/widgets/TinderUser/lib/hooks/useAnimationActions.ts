import { useAppDispatch, useAppSelector } from '@ducks-tinder-client/common';
import {
  getMatchUsersThunk,
  TinderActions,
  TinderAnimations,
} from '@entities/user';
import { useMotionValue } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useAnimationActions() {
  const dispatch = useAppDispatch();

  const tinderUsers = useAppSelector((state) => state.tinder.tinderUsers);
  const currentUserId = tinderUsers[0]?.id;

  const [activeUserId, setActiveUserId] = useState<string | null>(null);
  const submittingUserIdRef = useRef<string | null>(null);

  const [overriddenAnimation, setOverriddenAnimation] = useState<{
    userId: string;
    animation: TinderAnimations;
  } | null>(null);
  const [isFullPreview, setIsFullPreview] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // TODO: request new user for every swipe
    if (tinderUsers.length < 3) {
      dispatch(getMatchUsersThunk());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const id = tinderUsers[0]?.id;
    if (activeUserId === null && id) {
      setActiveUserId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tinderUsers]);

  const onBeforeAction = useCallback(
    (action: TinderActions) => {
      let id = tinderUsers[1]?.id || null;

      if (action === TinderActions.Return) {
        id = null;
      }

      setActiveUserId(id);
    },
    [tinderUsers]
  );

  const onSubmit = useCallback(() => {
    const id = tinderUsers[0].id;
    if (id) {
      submittingUserIdRef.current = id;
    }

    setOverriddenAnimation(null);

    x.set(0);
    y.set(0);
  }, [tinderUsers, x, y]);

  const onChangeX = useCallback(
    (value: number, userId: string) => {
      if (submittingUserIdRef.current === userId) {
        return;
      }

      x.set(value);
    },
    [x]
  );

  const onChangeY = useCallback(
    (value: number, userId: string) => {
      if (submittingUserIdRef.current === userId) {
        return;
      }

      y.set(value);
    },
    [y]
  );

  const onAnimation = useCallback(
    (animation: TinderAnimations) => {
      switch (animation) {
        case TinderAnimations.Dislike:
          setOverriddenAnimation({
            userId: currentUserId,
            animation: TinderAnimations.Dislike,
          });
          break;
        case TinderAnimations.Like:
          setOverriddenAnimation({
            userId: currentUserId,
            animation: TinderAnimations.Like,
          });
          break;
        case TinderAnimations.SuperLike:
          setOverriddenAnimation({
            userId: currentUserId,
            animation: TinderAnimations.SuperLike,
          });
          break;
        case TinderAnimations.Center:
        default:
          return;
      }
    },
    [currentUserId]
  );

  return {
    onAnimation,
    onChangeX,
    onChangeY,
    onSubmit,
    onBeforeAction,
    overriddenAnimation,
    isFullPreview,
    setIsFullPreview,
    tinderUsers,
    x,
    y,
    activeUserId,
    currentUserId,
  };
}
