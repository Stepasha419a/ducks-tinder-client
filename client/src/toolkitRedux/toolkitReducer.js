import { addTodo } from "./toolkitSlice"

const addAsyncTodo = () => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(addTodo('ASYNC TODO'))
        }, 2000)
    }
}