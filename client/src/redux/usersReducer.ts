import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { usersAPI } from "../api/usersApi";
import { imageInterface } from "../components/Profile/ProfileImageChange/ProfileChangeImage";
import { IUser, makeUserImagesObject, makeUserObject } from "../models/IUser";

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        users: [] as IUser[],
        currentUser: {} as IUser
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
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

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const getUserThunk = createAsyncThunk(
    'users/getUser',
    async function(args: {id: String}, {rejectWithValue, dispatch}) {
        try {
            const response = await usersAPI.getCurrentUser(args.id)

            if(!response) {
                throw new Error("Can't get users. Server Error");
            }

            const data = await response.data
            
            return data

        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateUserThunk = createAsyncThunk(
    'users/updateUser',
    async (args: {currentUser: IUser, inputName: string, changedData: String | Number | Boolean | {from: number, to: number}, innerObjectName?: string}, {rejectWithValue, dispatch}) => {
        try {
            const user = makeUserObject(args)

            const response = await usersAPI.updateUser(user)
            
            dispatch(setCurrentUser(response.data))
        } catch (error: any) {
            rejectWithValue(error.message)
        }
    }
)

export const saveUserImage = createAsyncThunk(
    'users/saveUserImage',
    async (args: {picture: any, userId: string, setting: 'avatar' | 'gallery'}, {rejectWithValue, dispatch}) => {
        try {
            const response = await usersAPI.savePicture(args.picture, args.userId, args.setting)
            
            dispatch(setCurrentUser(response.data))
        } catch (error: any) {
            rejectWithValue(error.message)
        }
    }
)

export const deleteUserImage = createAsyncThunk(
    'users/deleteUserImage',
    async (args: {pictureName: string, userId: string, setting: 'avatar' | 'gallery'}, {rejectWithValue, dispatch}) => {
        try {
            const response = await usersAPI.deletePicture(args.pictureName, args.userId, args.setting)
            
            dispatch(setCurrentUser(response.data))
        } catch (error: any) {
            rejectWithValue(error.message)
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
        } catch (error: any) {
            rejectWithValue(error.message)
        }
    }
)

const {setUsers} = usersReducer.actions

export const {setCurrentUser} = usersReducer.actions

export type UsersReducerType = typeof usersReducer

export default usersReducer.reducer