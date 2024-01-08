import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todoService from "../thunkMethods/todoService";

// Create Todo
export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todoInput, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.createTodo(todoInput, token);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// the first parameter (_) is a convention to indicate that the parameter is intentionally ignored. It allows you to omit the test parameter and still keep access to thunkAPI as the second parameter.
export const getAllTodo = createAsyncThunk(
  "todo/allTodo",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await todoService.getAllTodo(token);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Single Todo
export const getSingleTodo = createAsyncThunk(
  "todo/getSingleTodo",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await todoService.getSingleTodo(id, token);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Single Todo Status
export const updateSingleTodoStatus = createAsyncThunk(
  "todo/updateSingleTodoStatus",
  async ({ todoId, subTodoData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // console.log("Id: " + todoId + " " + "Items: " + checkedItems);
      return await todoService.updateSingleTodoStatus(
        todoId,
        subTodoData,
        token
      );
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Todo Status
export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ todoId, todoData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.updateTodo(todoId, todoData, token);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete SubTodo
export const deleteSubTodo = createAsyncThunk(
  "todo/deleteSubtodo",
  async ({ todoId, subTodoId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.deleteSubTodo(todoId, subTodoId, token);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete SubTodo
export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todoService.deleteTodo(todoId, token);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoData: null,
    singleTodoData: null,
    message: "",
    loading: false,
    isSuccess: false,
    isError: false,
  },
  reducers: {
    reset: (state) => {
      // state.loading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todoData = action.payload.todos;
      })
      .addCase(getAllTodo.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.todoData = null;
      })
      .addCase(getSingleTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.singleTodoData = action.payload.todo;
      })
      .addCase(getSingleTodo.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.singleTodoData = null;
      })
      .addCase(updateSingleTodoStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSingleTodoStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.singleTodoData = action.payload.todo;
      })
      .addCase(updateSingleTodoStatus.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.singleTodoData = null;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.singleTodoData = action.payload.todo;
        state.message = action.payload.msg;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
        state.singleTodoData = null;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSubTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSubTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = true;
        state.singleTodoData = action.payload.todo;
        state.message = action.payload.msg;
      })
      .addCase(deleteSubTodo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.singleTodoData = null;
        state.message = action.payload;
      });
  },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
