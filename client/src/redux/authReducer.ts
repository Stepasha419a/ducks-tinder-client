import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_URL } from "../api/api";
import { authAPI, UserAuthParams } from "../api/authApi";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import { setCurrentUser } from "./usersReducer";


const authReducer = createSlice({
    name: "auth",
    initialState: {
        user: {} as IUser,
        isAuth: null as boolean | null,
        isLoading: false as boolean,
        formError: '' as string
    },
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload
        },
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setFormError(state, action) {
            state.formError = action.payload
        }
    }
})

const setAuthData = (params: IUser, dispatch: ThunkDispatch<unknown, unknown, Action>) => {
    if(params) {
        dispatch(setUserData(params))
        dispatch(setAuth(true))
    }
}

export const registerThunk = createAsyncThunk(
    "auth/registerUser",
    async (params: UserAuthParams, {rejectWithValue, dispatch}) => {
        try {
            const response = await authAPI.registration(params.email, params.name, params.password)
            localStorage.setItem('token', response.data.accessToken)

            setAuthData(response.data.user, dispatch)
            dispatch(setCurrentUser(response.data.user))
        } catch (error) {
            if(error instanceof AxiosError) {
                rejectWithValue(error.message)
                dispatch(setFormError(error.response?.data.message))
            }
            rejectWithValue(['unexpected error', error])
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
            dispatch(setCurrentUser(response.data.user))
        } catch (error) {
            if(error instanceof AxiosError) {
                rejectWithValue(error.message)
                dispatch(setFormError(error.response?.data.message))
            }
            rejectWithValue(['unexpected error', error])
        }
    }
)

export const checkAuthThunk = createAsyncThunk(
    "auth/checkAuth",
    async (_, {rejectWithValue, dispatch}) => {
        try {
            dispatch(setLoading(true))
            const response = await axios.get<AuthResponse>(`${API_URL}auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            dispatch(setCurrentUser(response.data.user))
            setAuthData(response.data.user, dispatch)
        } catch (error) {
            if(error instanceof Error) {
                dispatch(setAuth(false))
                rejectWithValue(error.message)
            }
            rejectWithValue(['unexpected error', error])
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
            dispatch(setUserData(null))
            dispatch(setAuth(false))
        } catch (error) {
            if(error instanceof Error) rejectWithValue(error.message);
            rejectWithValue(['unexpected error', error])
        }
    }
)

const {setUserData, setAuth, setLoading} = authReducer.actions
export const {setFormError} = authReducer.actions
export default authReducer.reducer