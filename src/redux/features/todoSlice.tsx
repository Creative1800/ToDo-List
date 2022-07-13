import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosByListId: any = createAsyncThunk( // nahradit axiosom
	'todo/getTodosByListId',
	async (payload: any) => {
		let lists = {}
    await axios.get(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.id}/task`)
    .then(resp => lists = resp.data)
    return { lists }
	}
);

export const addTodo: any = createAsyncThunk(
  'todo/addTodo',
  async (payload: any) => {
    let todo: any = {}
    await axios.post(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}/task`,{
        "taskName": payload.todoName, 
        "description": payload.description,
        "done": false,
        "ListId": payload.listId,
        "deadline": payload.deadline
    })
    .then(response => todo = response.data)
    return { todo }
  }
)

export const deleteTaskById: any = createAsyncThunk(
  'todo/deleteTaskById',
  async (payload: {'listId': string, 'taskId': string}) => {
    let taskId: number = 0
    await axios.delete(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}/task/${payload.taskId}`)
    .then(res => taskId = res.data.taskId)
    return taskId
  }
)

export const toggleIsTaskDone: any = createAsyncThunk(
  'todo/toggleIsTaskDone',
  async (payload: {'listId': string, 'taskId': string, 'done': boolean}) => {
    let task: {taskId: string, done: boolean} = {
      taskId:"", 
      done:false
    }
    await axios.put(`https://62c88f300f32635590da738f.mockapi.io/Lists/${payload.listId}/task/${payload.taskId}`,{
      done: payload.done
    })
    .then(res => task = res.data)
    return { taskId: task.taskId, done: task.done}
  }
)

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getTodosByListId.fulfilled as any]: (state: any, action: any) => {
      return action.payload.lists
    },
    [addTodo.fulfilled as any]: (state: any, action: any) => {
      state.push(action.payload.todo)
    },
    [deleteTaskById.fulfilled as any]: (state: any, action: any) => {
      return state.filter((task: {"taskId": number}) => task.taskId !== action.payload)
    },
    [toggleIsTaskDone.fulfilled as any]: (state: any, action: any) => {
      const index = state.findIndex(
        (task: {taskId: string}) => task.taskId === action.payload.taskId
      )
      state[index].done = action.payload.done
    }
  }
})

export default todoSlice.reducer;