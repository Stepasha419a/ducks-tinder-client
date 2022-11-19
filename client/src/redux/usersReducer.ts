import { makeDataObject, makeQuerySortsObj } from './../models/IUser';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/usersApi";
import { imageInterface } from "../components/Profile/ProfileImageChange/ProfileChangeImage";
import { IUser, makeUserImagesObject } from "../models/IUser";

interface INotification {
    id: number
    type: string
    text: string
}

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        users: [] as IUser[],
        currentUser: {} as IUser,
        notifications: [] as INotification[],
        pairs: [] as IUser[],
        tinderUsers: [] as IUser[],
        isReturnUser: false,
        requestedUsers: [] as string[],
        currentTinderUsersIndex: 0,
        isFailed: false
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        createNotification: (state, action) => {
            const notification: INotification = {
                id: Date.now(),
                type: action.payload.type,
                text: action.payload.text
            }

            state.notifications = [...state.notifications, notification]
        },
        deleteNotification: (state, action) => {
            const index = state.notifications.findIndex(item => item.id === action.payload)
            const newNotifications = [...state.notifications]
            newNotifications.splice(index, 1)
            state.notifications = newNotifications
        },
        setPairs: (state, action) => {
            state.pairs = action.payload
        },
        setTinderUsers: (state, action) => {
            state.tinderUsers = [...state.tinderUsers, {...action.payload}]
        },
        setIsReturnUser: (state, action) => {
            state.isReturnUser = action.payload
        },
        setRequestedUsers: (state, action) => {
            state.requestedUsers = [...action.payload]
        },
        setCurrentTinderUsersIndex: (state, action) => {
            state.currentTinderUsersIndex = action.payload
        },
        setIsFailed: (state, action) => {
            state.isFailed = action.payload
        }
    }
})

export const fetchUsersThunk = createAsyncThunk(
    'users/fetchUsers',
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await usersAPI.getUsers()

            if(!response) {
                throw new Error("Can't get users. Server Error");
            }

            const data = await response.data

            dispatch(setUsers(data))

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const getSortedUserThunk = createAsyncThunk(
    'users/getSortedUser',
    async function(args: {user: IUser, requestedUsers?: string[]}, {rejectWithValue, dispatch}) {
        try {
            const querySortsObj = makeQuerySortsObj(args.user, args.requestedUsers)
            
            const response = await usersAPI.getSortedUsers(querySortsObj)

            if(!response) {
                throw new Error("Can't get user. Server Error");
            }

            const data = await response.data
            
            data && dispatch(setTinderUsers(data))

        } catch (error) {
            dispatch(setIsFailed(true))
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const getUserThunk = createAsyncThunk(
    'users/getUser',
    async function(args: {id: String}, {rejectWithValue, dispatch}) {
        try {
            const response = await usersAPI.getCurrentUser(args.id)

            if(!response) {
                throw new Error("Can't get user. Server Error");
            }

            const data = await response.data
            
            return data

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const updateUserThunk = createAsyncThunk(
    'users/updateUser',
    async (args: {currentUser: IUser, inputName: string, changedData: String | Number | Boolean | String[] | {from: number, to: number}, innerObjectName?: string}, {rejectWithValue, dispatch}) => {
        try {
            const data = makeDataObject(args)

            const response = await usersAPI.updateUser(args.currentUser._id, data)
            
            dispatch(setCurrentUser(response.data))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const getUserPairsThunk = createAsyncThunk(
    'users/getUserPairs',
    async (args: {pairsId: string[]}, {rejectWithValue, dispatch}) => {
        try {
            const pairs = []
            for await (const pairId of args.pairsId) {
                const data = await dispatch(getUserThunk({id: pairId}) as any)
                pairs.push(data.payload)
            }

            dispatch(setPairs(pairs))

        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const likeUserThunk = createAsyncThunk(
    'users/likeUser',
    async (args: {currentUser: IUser, tinderUser: IUser}, {rejectWithValue, dispatch}) => {
        try {
            const data = makeDataObject({currentUser: args.currentUser, inputName: 'checkedUsers', changedData: [...args.currentUser.checkedUsers, args.tinderUser._id]})

            const updateResponse = await usersAPI.updateUser(args.currentUser._id, data)
            

            const response = await usersAPI.createPair(args.currentUser._id, args.tinderUser._id)
            
            dispatch(setCurrentUser({...updateResponse.data, pairs: [...response.data.pairs], checkedUsers: [...response.data.checkedUsers]}))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const deletePairThunk = createAsyncThunk(
    'users/deletePair',
    async (args: {userId: string, createUserPairId: string}, {rejectWithValue, dispatch}) => {
        try {
            const response = await usersAPI.deletePair(args.userId, args.createUserPairId)
            
            dispatch(setCurrentUser(response.data))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const saveUserImage = createAsyncThunk(
    'users/saveUserImage',
    async (args: {picture: File, userId: string, setting: 'avatar' | 'gallery'}, {rejectWithValue, dispatch}) => {
        try {
            const response = await usersAPI.savePicture(args.picture, args.userId, args.setting)
            
            dispatch(setCurrentUser(response.data))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const deleteUserImage = createAsyncThunk(
    'users/deleteUserImage',
    async (args: {pictureName: string, userId: string, setting: 'avatar' | 'gallery'}, {rejectWithValue, dispatch}) => {
        try {
            const response = await usersAPI.deletePicture(args.pictureName, args.userId, args.setting)
            
            dispatch(setCurrentUser(response.data))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const mixUserImages = createAsyncThunk(
    'users/mixUserImages',
    async (args: {currentUser: IUser, images: imageInterface[]}, {rejectWithValue, dispatch}) => {
        try {
            const userImages = makeUserImagesObject(args)
            
            const response = await usersAPI.updateUser(args.currentUser._id, userImages)
            dispatch(setCurrentUser(response.data))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

const {setUsers} = usersReducer.actions

export const {setCurrentUser, createNotification, deleteNotification, setPairs, setTinderUsers, setIsReturnUser, setRequestedUsers, setCurrentTinderUsersIndex, setIsFailed} = usersReducer.actions

export type UsersReducerType = typeof usersReducer

export default usersReducer.reducer