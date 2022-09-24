import { configureStore } from "@reduxjs/toolkit"
import { Action, combineReducers } from "redux"
import { ThunkAction } from "redux-thunk"
import authReducer from "./authReducer"
import chatReducer from "./chatReducer"
import usersReducer from "./usersReducer"

let rootReducer = combineReducers({
    usersPage: usersReducer,
    authPage: authReducer,
    chatPage: chatReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>

export default store