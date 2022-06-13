import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { usersAPI, UserType } from "../api/usersApi";

const usersReducer = createSlice({
    name: 'users',
    initialState: {
        users: [] as UserType[],
        currentUser: null as null | UserType
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

export const fetchUsers = createAsyncThunk(
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

const {setUsers} = usersReducer.actions

export type UsersReducerType = typeof usersReducer

export default usersReducer.reducer