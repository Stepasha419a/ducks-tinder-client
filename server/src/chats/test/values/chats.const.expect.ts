export const GET_FULL_CHAT_EXPECTED = {
  id: 'chat_get_chat_id',
  messages: [
    {
      id: 'chat_get_message_id',
      text: 'message-text',
      replied: null,
      userId: 'chat_get_current_user_id',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
    },
  ],
  messagesCount: 1,
  users: [
    {
      id: 'chat_get_second_user_id',
      name: 'Loren',
      age: null,
      description: null,
      distance: 31,
      interests: [],
      isActivated: false,
      pictures: [],
      place: {
        name: 'second-user-place-name',
      },
    },
  ],
  blocked: false,
  blockedById: null,
};

export const GET_CHATS_EXPECTED = [
  {
    id: 'chats_get_chat_id',
    messages: [],
    users: [
      {
        age: null,
        description: null,
        id: 'chats_get_second_user_id',
        interests: [],
        isActivated: false,
        name: 'Loren',
        pictures: [],
        place: {
          latitude: 12.5456789,
          longitude: 12.5456789,
          name: 'second-user-place-name',
        },
      },
    ],
    blocked: false,
    blockedById: null,
    chatVisits: [],
  },
];
