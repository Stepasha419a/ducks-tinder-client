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
      distance: null,
      interests: [],
      isActivated: false,
      pictures: [],
      place: null,
    },
  ],
  blocked: false,
  blockedById: null,
};
