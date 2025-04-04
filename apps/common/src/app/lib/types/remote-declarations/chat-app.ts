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
