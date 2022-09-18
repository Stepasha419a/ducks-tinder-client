import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { chatApi } from "../api/chatApi";
import { IDialog, MessageInterface } from "../models/IDialog";

const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        dialogs: [] as IDialog[],
        isConnected: false,
        currentMessages: [] as MessageInterface[],
        currentDialogId: ''
    },
    reducers: {
        setDialogs: (state, action) => {
            state.dialogs = action.payload
        },
        setIsConnected: (state, action) => {
            state.isConnected = action.payload
        },
        setCurrentMessages: (state, action) => {
            if(action.payload.length === 0) {state.currentMessages = []}
            else if( Array.isArray(action.payload)) { state.currentMessages = [...state.currentMessages, ...action.payload] }
            else { state.currentMessages = [...state.currentMessages, action.payload] }
        },
        setCurrentDialogId: (state, action) => {
            state.currentDialogId = action.payload
        }
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

export const connectChatThunk = createAsyncThunk(
    'chat/connectChat',
    async function(args: {socket: any, dialogId: string}, {rejectWithValue, dispatch}) {
        try {
            const {socket, dialogId} = args
            socket.current = new WebSocket(`ws://localhost:5001/${dialogId}`)
            
            socket.current.onopen = async () => {
                dispatch(setCurrentDialogId(dialogId))
                dispatch(setIsConnected(true))
                const response = await chatApi.getDialog(dialogId)
                const dialog = await response.data
                dispatch(setCurrentMessages(dialog.messages))
            }
    
            socket.current.onmessage = (event: any) => {
                const message: MessageInterface = JSON.parse(event.data)
                dispatch(setCurrentMessages(message))
            }

            socket.current.onclose = () => {
                console.log('disconnect')
                dispatch(setIsConnected(false))
                dispatch(setCurrentMessages([]))
                dispatch(setCurrentDialogId(''))
            }

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const disconnectChatThunk = createAsyncThunk(
    'chat/disconnectChat',
    function(args: {socket: any}, {rejectWithValue}) {
        try {
            const {socket} = args

            socket.current.close()

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const {setDialogs, setIsConnected, setCurrentMessages, setCurrentDialogId} = chatReducer.actions

export default chatReducer.reducer