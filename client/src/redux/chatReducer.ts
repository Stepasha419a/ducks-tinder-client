import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { chatApi } from "../api/chatApi";
import { IDialog, MessageInterface } from "../models/IDialog";
import { AppStateType } from "./reduxStore";

const chatReducer = createSlice({
    name: 'chatPage',
    initialState: {
        dialogs: [] as IDialog[],
        isConnected: false,
        currentMessages: [] as MessageInterface[],
        currentDialogId: '',
        currentMembers: [] as string[],
        includedMembersIds: [] as string[]
    },
    reducers: {
        setDialogs: (state, action) => {
            state.dialogs = action.payload
        },
        pushMessage: (state, action) => {
            state.dialogs[action.payload.dialogIndex].messages = [...state.dialogs[action.payload.dialogIndex].messages, action.payload.message]
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
        },
        setCurrentMembers: (state, action) => {
            state.currentMembers = action.payload
        },
        setIncludedMembersIds: (state, action) => {
            if(action.payload.length === 0) {state.includedMembersIds = []}
            else {state.includedMembersIds = [...state.includedMembersIds, action.payload]}
        }
    }
})

const initialState = chatReducer.getInitialState()
type ChatReducerInitialStateType = typeof initialState

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

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const createDialogThunk = createAsyncThunk(
    'users/createDialogThunk',
    async (args: {currentUserId: string, otherUserId: string}, {rejectWithValue, dispatch}) => {
        try {
            const response = await chatApi.createDialog([args.currentUserId, args.otherUserId])

            if(!response) {
                throw new Error("Can't create dialog. Server Error");
            }
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const connectChatThunk = createAsyncThunk(
    'chat/connectChat',
    async function(args: {socket: any, dialogId: string}, {rejectWithValue, dispatch, getState}) {
        try {
            const {socket, dialogId} = args
            socket.current = new WebSocket(`ws://localhost:5001/${dialogId}`)
            
            socket.current.onopen = async () => {
                dispatch(setCurrentDialogId(dialogId))
                dispatch(setIsConnected(true))
                const response = await chatApi.getDialog(dialogId)
                const dialog = await response.data
                dispatch(setCurrentMessages(dialog.messages))
                dispatch(setCurrentMembers(dialog.members))
            }
    
            socket.current.onmessage = (event: any) => {
                const message: MessageInterface = JSON.parse(event.data)
                const {chatPage} = getState() as AppStateType
                sendMessage(message, dispatch, chatPage)
            }

            socket.current.onclose = () => {
                dispatch(setIsConnected(false))
                dispatch(setCurrentMessages([]))
                dispatch(setCurrentDialogId(''))
                dispatch(setCurrentMembers([]))
                dispatch(setIncludedMembersIds([]))
            }

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const disconnectChatThunk = createAsyncThunk(
    'chat/disconnectChat',
    function(args: {socket: any}, {rejectWithValue}) {
        try {
            const {socket} = args

            socket.current.close()

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

function sendMessage(message: MessageInterface, dispatch: Dispatch<any>, chatPage: ChatReducerInitialStateType) {
    dispatch(setCurrentMessages(message))
    const dialogIndex = chatPage.dialogs.findIndex((dialog: IDialog) => dialog._id === chatPage.currentDialogId)
    dispatch(pushMessage({dialogIndex: dialogIndex, message: message}))
}

export const {setDialogs, pushMessage, setIsConnected, setCurrentMessages, setCurrentDialogId, setCurrentMembers, setIncludedMembersIds} = chatReducer.actions

export default chatReducer.reducer