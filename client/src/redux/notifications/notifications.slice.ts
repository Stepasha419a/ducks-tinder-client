import { createSlice } from '@reduxjs/toolkit';
import type { Notification } from '../../shared/interfaces';

interface InitialState {
  notifications: Notification[];
}

const initialState: InitialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification: (state, action) => {
      const notification: Notification = {
        id: Date.now(),
        type: action.payload.type,
        text: action.payload.text,
      };

      state.notifications = [...state.notifications, notification];
    },
    deleteNotification: (state, action) => {
      const index = state.notifications.findIndex(
        (item) => item.id === action.payload
      );
      const newNotifications = [...state.notifications];
      newNotifications.splice(index, 1);
      state.notifications = newNotifications;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith('rejected'),
      (state, { payload, type }: { payload: string; type: string }) => {
        const signs = type.split('/');
        if (signs[1] !== 'getSortedUser' && signs[1] !== 'disconnectChat') {
          const notification: Notification = {
            id: Date.now(),
            type: 'error',
            text: `${payload} at ${type}`,
          };
          state.notifications = [...state.notifications, notification];
        }
      }
    );
  },
});

export const { createNotification, deleteNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
