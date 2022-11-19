import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { io } from "socket.io-client";
import { chatApi } from "../api/chatApi";
import { IChat, IMessage } from "../models/IChat";
import { AppStateType } from "./reduxStore";

const chatReducer = createSlice({
    name: 'chatPage',
    initialState: {
        chats: [] as IChat[],
        isConnected: false,
        currentMessages: [] as IMessage[],
        currentChatId: '',
        currentMembers: [] as string[],
        includedMembersIds: [] as string[]
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload
        },
        pushMessage: (state, action) => {
            state.chats[action.payload.chatIndex].messages = [...state.chats[action.payload.chatIndex].messages, action.payload.message]
        },
        setIsConnected: (state, action) => {
            state.isConnected = action.payload
        },
        setCurrentMessages: (state, action) => {
            if(action.payload.length === 0) {state.currentMessages = []}
            else if( Array.isArray(action.payload)) { state.currentMessages = [...state.currentMessages, ...action.payload] }
            else { state.currentMessages = [...state.currentMessages, action.payload] }
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
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

export const getChatsThunk = createAsyncThunk(
    'chat/getChats',
    async function(args: {id: string}, {rejectWithValue, dispatch}) {
        try {
            const response = await chatApi.getChats(args.id)

            const data = await response.data

            dispatch(setChats(data))

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const createChatThunk = createAsyncThunk(
    'users/createChat',
    async (args: {currentUserId: string, otherUserId: string}, {rejectWithValue, dispatch}) => {
        try {
            await chatApi.createChat([args.currentUserId, args.otherUserId])
            
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const connectChatThunk = createAsyncThunk(
    'chat/connectChat',
    async function(args: {socket: any, chatId: string}, {rejectWithValue, dispatch, getState}) {
        try {
            const {socket, chatId} = args
            socket.current = io(`http://localhost:5000/chat/socket`, {
                query: {chatId}
            })

            socket.current.emit('connectChat')
            
            socket.current.on('connected', async () => {
                dispatch(setCurrentChatId(chatId))
                dispatch(setIsConnected(true))
                const response = await chatApi.getChat(chatId)
                const chat = await response.data
                dispatch(setCurrentMessages(chat.messages))
                dispatch(setCurrentMembers(chat.members))
            })
    
            socket.current.on('message', (message: IMessage) => {
                const {chatPage} = getState() as AppStateType
                sendMessage(message, dispatch, chatPage)
            })

            socket.current.on('disconnected', () => {
                dispatch(setIsConnected(false))
                dispatch(setCurrentMessages([]))
                dispatch(setCurrentChatId(''))
                dispatch(setCurrentMembers([]))
                dispatch(setIncludedMembersIds([]))
            })

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

            socket.current.emit('disconnectChat')

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

function sendMessage(message: IMessage, dispatch: Dispatch<any>, chatPage: ChatReducerInitialStateType) {
    dispatch(setCurrentMessages(message))
    const chatIndex = chatPage.chats.findIndex((chat: IChat) => chat._id === chatPage.currentChatId)
    dispatch(pushMessage({chatIndex, message: message}))
}

export const {setChats, pushMessage, setIsConnected, setCurrentMessages, setCurrentChatId, setCurrentMembers, setIncludedMembersIds} = chatReducer.actions

export default chatReducer.reducer