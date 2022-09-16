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

            const data = await response.data

            dispatch(setDialogs(data))

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getDialogThunk = createAsyncThunk(
    'chat/getDialog',
    async function(args: {id: string}, {rejectWithValue}) {
        try {
            const response = await chatApi.getDialog(args.id)

            if(!response) {
                throw new Error("Can't get dialog. Server Error");
            }

            const data = await response.data

            return data

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

export const connect = createAsyncThunk(
    'chat/connectChat',
    async function (args: {socket: any}, {rejectWithValue, dispatch}) {
        const {socket} = args
        socket.current = new WebSocket('ws://localhost:5001/6321d9c182a36d7a054c36f2')
    
        socket.current.onopen = () => {
            //setConnected(true)
        }
    
        socket.current.onmessage = (event: any) => {
            //const message = JSON.parse(event.data)
            //setMessages((prev: string[]) => [...prev, message])
        }
    
        socket.current.onclose = () => {
            //setConnected(false)
        }   
    }
)

export const {setDialogs} = chatReducer.actions

export default chatReducer.reducer