import type { CreateNotification } from '@shared/interfaces/Notification';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { Notification } from '@shared/interfaces';

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
    createNotification: (
      state,
      { payload }: PayloadAction<CreateNotification>
    ) => {
      const notification: Notification = {
        id: Date.now(),
        type: payload.type,
        text: payload.text,
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
      (action: PayloadAction) => action.type.endsWith('rejected'),
      (state, action: PayloadAction<string>) => {
        const signs = action.type.split('/');
        if (signs[1] !== 'getSortedUser' && signs[1] !== 'disconnectChat') {
          const notification: Notification = {
            id: Date.now(),
            type: 'error',
            text: `${action.payload || 'error occurred'} at ${action.type}`,
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
