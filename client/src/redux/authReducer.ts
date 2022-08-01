import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_URL } from "../api/api";
import { authAPI, UserAuthParams } from "../api/authApi";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";


const authReducer = createSlice({
    name: "auth",
    initialState: {
        user: {} as IUser,
        isAuth: false as boolean,
        isLoading: false as boolean,
        formError: '' as string
    },
    reducers: {
        setAuthUserData: (state, action) => {
            state.user = action.payload
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setFormError(state, action) {
            console.log(action)
            state.formError = action.payload
        }
    }
})

const setAuthData = (params: IUser, dispatch: ThunkDispatch<unknown, unknown, Action>) => {
    if(params) {
        dispatch(setAuthUserData(params))
        dispatch(setAuth(true))
    }
}

export const registerThunk = createAsyncThunk(
    "auth/registerUser",
    async (params: UserAuthParams, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.registration(params.email, params.name, params.password,)
            localStorage.setItem('token', response.data.accessToken)

            setAuthData(response.data.user, dispatch)
        } catch (error: any) {
            dispatch(setFormError(error.response.data.message))
            rejectWithValue(error.message)
        }
    }
)

export const loginThunk = createAsyncThunk(
    "auth/loginUser",
    async (params: UserAuthParams, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.login(params.email, params.password)
            localStorage.setItem('token', response.data.accessToken)
            setAuthData(response.data.user, dispatch)
        } catch (error: any) {
            dispatch(setFormError(error.response.data.message))
            rejectWithValue(error.message)
        }
    }
)

export const checkAuthThunk = createAsyncThunk(
    "auth/checkAuth",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoading(true))
            const response = await axios.get<AuthResponse>(`${API_URL}refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setAuth(true))
            dispatch(setAuthUserData(response.data.user))
        } catch (error: any) {
            rejectWithValue(error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue, dispatch}) => {
        try {
            await authAPI.logout()
            dispatch(setAuthUserData(null))
            dispatch(setAuth(false))
        } catch (error: any) {
            rejectWithValue(error.message)
        }
    }
)

const {setAuthUserData, setAuth, setLoading} = authReducer.actions
export const {setFormError} = authReducer.actions
export default authReducer.reducer