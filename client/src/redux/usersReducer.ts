import { IQuerySorts, makeQuerySortsObj } from './../models/IUser';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersAPI } from "../api/usersApi";
import { imageInterface } from "../components/Profile/ProfileImageChange/ProfileChangeImage";
import { IUser, makeUserImagesObject, makeUserObject } from "../models/IUser";

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
        tinderUsers: [] as IUser[]
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
            state.tinderUsers = action.payload
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

export const getSortedUsersThunk = createAsyncThunk(
    'users/getSortedUsers',
    async function(args: {user: IUser}, {rejectWithValue, dispatch}) {
        try {
            const querySortsObj = makeQuerySortsObj(args.user)
            console.log(querySortsObj)
            const response = await usersAPI.getSortedUsers(querySortsObj)

            if(!response) {
                throw new Error("Can't get user. Server Error");
            }

            const data = await response.data
            
            dispatch(setTinderUsers(data))

        } catch (error) {
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
            const user = makeUserObject(args)

            const response = await usersAPI.updateUser(user)
            
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

export const createPairThunk = createAsyncThunk(
    'users/createPair',
    async (args: {userId: string, createUserPairId: string}, {rejectWithValue, dispatch}) => {
        try {
            const response = await usersAPI.createPair(args.userId, args.createUserPairId)
            
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
            
            const response = await usersAPI.updateUser(userImages)
            dispatch(setCurrentUser(response.data))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

const {setUsers} = usersReducer.actions

export const {setCurrentUser, createNotification, deleteNotification, setPairs, setTinderUsers} = usersReducer.actions

export type UsersReducerType = typeof usersReducer

export default usersReducer.reducer