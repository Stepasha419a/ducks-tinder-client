declare module 'policyApp/Policy' {
  import type { PolicyAppDeclaration } from '@ducks-tinder-client/common';

  const component: PolicyAppDeclaration;
  export default component;
}

declare module 'chatApp/ActiveChat' {
  import type { ChatAppActiveChat } from '@ducks-tinder-client/common';

  const component: ChatAppActiveChat;
  export default component;
}

declare module 'chatApp/IndexChat' {
  import type { ChatAppIndexChat } from '@ducks-tinder-client/common';

  const component: ChatAppIndexChat;
  export default component;
}

declare module 'chatApp/chat' {
  import type { ChatAppComponentsDeclaration } from '@ducks-tinder-client/common';

  export const ChatList: ChatAppComponentsDeclaration['ChatList'];
  export const ChatTabTitle: ChatAppComponentsDeclaration['ChatTabTitle'];
}
