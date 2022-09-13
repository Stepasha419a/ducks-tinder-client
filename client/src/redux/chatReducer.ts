import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { chatApi } from "../api/chatApi";
import { usersAPI } from "../api/usersApi";
import { IDialog } from "../models/IDialog";

const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        dialogs: [] as IDialog[],
        currentConnection: ''
    },
    reducers: {
        setDialogs: (state, action) => {
            state.dialogs = action.payload
        },
        setCurrentConnection: (state, action) => {
            state.currentConnection = action.payload
        }
        /* setUsers: (state, action) => {
            state.users = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        } */
    }
})

export const getDialogsThunk = createAsyncThunk(
    'chat/getDialogs',
    async function(args: {id: string}, {rejectWithValue, dispatch}) {
        try {
            const response = await chatApi.getDialogs(args.id)

            if(!response) {
                throw new Error("Can't get dialogs. Server Error");
            }

            console.log(response)

            //dispatch(setUsers(data))

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const connectChatThunk = createAsyncThunk(
    'chat/connectChat',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await usersAPI.getUsers()

            if(!response) {
                throw new Error("Can't get users. Server Error");
            }

            //const data = await response.data

            //dispatch(setUsers(data))

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export default chatReducer.reducer