import type { Reducer } from '@reduxjs/toolkit';
import type { ComponentType } from 'react';

export type ChatAppActiveChat = ComponentType;
export type ChatAppIndexChat = ComponentType;

export interface ChatAppComponentsDeclaration {
  ChatTabTitle: ComponentType<{
    handleClick: () => void;
    isActive: boolean;
  }>;
  ChatList: ComponentType<{
    currentUserId: string;
  }>;
}

export type ChatAppSliceResetHook = () => { handleResetChatSlice: () => void };

export type ChatReducer = Reducer<unknown>;
