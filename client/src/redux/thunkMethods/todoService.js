import axios from "axios";

// Get All Todo Thunk Method
const createTodo = async (todoInputData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/v1/todo/create-todo`,
    todoInputData,
    config
  );

  return data;
};

// Get All Todo Thunk Method
const getAllTodo = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/v1/todo`,
    config
  );

  return data;
};

// get Single Todo Thunk Method
export const getSingleTodo = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/v1/todo/${id}`,
    config
  );

  return data;
};

// get Update Todo Status Thunk Method
export const updateSingleTodoStatus = async (todoId, subTodoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/todo/update-subTodo-status/${todoId}`,
    subTodoData,
    config
  );

  return data;
};

// get Update Todo Thunk Method
export const updateTodo = async (todoId, todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/v1/todo/update-todo/${todoId}`,
    todoData,
    config
  );

  return data;
};

// Delete SubTodo Thunk Method
const deleteSubTodo = async (todoId, subTodoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(
    `${
      import.meta.env.VITE_BASE_URL
    }/api/v1/todo/delete-todo/${todoId}/${subTodoId}`,
    config
  );

  return data;
};

// Delete Todo Thunk Method
const deleteTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.delete(
    `${import.meta.env.VITE_BASE_URL}/api/v1/todo/delete-todo/${todoId}`,
    config
  );

  return data;
};

const todoService = {
  createTodo,
  getAllTodo,
  getSingleTodo,
  updateSingleTodoStatus,
  updateTodo,
  deleteSubTodo,
  deleteTodo,
};

export default todoService;
