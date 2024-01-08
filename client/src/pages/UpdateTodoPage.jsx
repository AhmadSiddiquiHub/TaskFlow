import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSidebar from "../components/UserSidebar";
import { MdDelete, MdOutlineKeyboardBackspace, MdAddBox } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  deleteSubTodo,
  getSingleTodo,
  reset,
  updateTodo,
} from "../redux/slices/todoSlice";
import Loader from "../components/Loader";

const UpdateTodoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todoId } = useParams();
  const { singleTodoData, loading, isSuccess, isError, message } = useSelector(
    (state) => state.todo
  );
  const { user } = useSelector((state) => state.auth);

  const [todoInputData, setTodoInputData] = useState({
    title: "",
    description: "",
    subTodo: [],
  });

  const handleInputData = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setTodoInputData({
      ...todoInputData,
      [name]: value,
    });
  };

  const handleSubTodoChange = (index, value) => {
    const updatedSubTodos = [...todoInputData.subTodo];
    updatedSubTodos[index] = { ...updatedSubTodos[index], title: value };

    setTodoInputData({
      ...todoInputData,
      subTodo: updatedSubTodos,
    });
  };

  const addSubTodo = () => {
    if (todoInputData.subTodo.length < 5) {
      setTodoInputData({
        ...todoInputData,
        subTodo: [...todoInputData.subTodo, { title: "" }],
      });
    } else {
      toast.error("Maximum Limit Reached!");
    }
  };

  const removeSubTodo = (index, subTodoId) => {
    const updatedSubTodos = [...todoInputData.subTodo];
    updatedSubTodos.splice(index, 1);

    // handle Delete
    dispatch(deleteSubTodo({ todoId, subTodoId }));
    setTodoInputData({
      ...todoInputData,
      subTodo: updatedSubTodos,
    });
  };

  const handleSubmit = () => {
    // Dispatch action to update the todo
    dispatch(
      updateTodo({
        todoId,
        // todoData: {
        //   title: todoInputData.title,
        //   description: todoInputData.description,
        //   subTodo: todoInputData.subTodo,
        // },
        todoData: todoInputData,
      })
    );

    console.log("Data: " + JSON.stringify(todoInputData));

    // Your submit logic here

    // Optionally, navigate to another page after successful update
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }

    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [dispatch, singleTodoData, isSuccess, isError, message]);

  useEffect(() => {
    // Set initial state once singleTodoData is available
    if (singleTodoData) {
      setTodoInputData({
        title: singleTodoData.title || "",
        description: singleTodoData.description || "",
        subTodo: singleTodoData.subTodo || [],
      });
    }
  }, [singleTodoData]);

  useEffect(() => {
    dispatch(getSingleTodo(todoId));
  }, [dispatch, todoId]);

  return (
    <>
      <div className="todo-page">
        <div className="container w-full grid grid-cols-1 md:grid-cols-6 h-[83vh] md:h-[80vh]">
          <div className="left-side bg-slate-200  h-[15vh] md:h-auto">
            <UserSidebar />
          </div>

          {loading ? (
            <div className="right-side-loader md:col-span-5 h-[68vh] md:h-auto overflow-y-scroll">
              <Loader />
            </div>
          ) : (
            <>
              {/* Right Side */}
              <div className="right-side md:col-span-5 h-[68vh] md:h-auto overflow-y-auto p-4">
                <div className="head flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-center">
                    My Tasks |
                    <span className="text-green-600"> {user?.name}</span>
                  </h3>

                  <Link to="/todo">
                    <button className="flex items-center justify-center text-lg border-2 py-2 px-3 font-bold border-green-500 text-white bg-green-500 hover:bg-green-600">
                      <span className="text-2xl font-black pr-2">
                        <MdOutlineKeyboardBackspace />
                      </span>
                      Back
                    </button>
                  </Link>
                </div>

                <div className="todo-form my-6 w-full">
                  <h2 className="text-center text-2xl font-bold my-4 text-[#5B80EB]">
                    Update Todo
                  </h2>
                  <div className="todo grid grid-cols-1 space-y-4">
                    <div className="flex flex-col">
                      <label
                        htmlFor="title"
                        className="py-2 text-xl font-bold text-[#5B80EB]"
                      >
                        Title
                      </label>
                      <input
                        className="p-4 w-1/2 border-2 border-[#2ED3D5] outline-none"
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Plz Write Todo Title"
                        value={todoInputData.title}
                        onChange={handleInputData}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="py-2 text-xl font-bold text-[#5B80EB]">
                        Description
                      </label>
                      <input
                        className="p-4 w-1/2 border-2 border-[#2ED3D5] outline-none"
                        type="text"
                        name="description"
                        placeholder="Plz Write Description for Todo..."
                        value={todoInputData.description}
                        onChange={handleInputData}
                      />
                    </div>
                    <div>
                      {todoInputData?.subTodo?.map((sub, index) => (
                        <div className="flex flex-col" key={index}>
                          <div className="flex justify-between w-1/2">
                            <label className="py-2 text-xl font-bold text-[#5B80EB]">
                              Subtask {index + 1}
                            </label>
                            <button
                              className="text-red-500 text-xl hover:text-red-600"
                              onClick={() => removeSubTodo(index, sub._id)}
                            >
                              <MdDelete />
                            </button>
                          </div>
                          <input
                            className="p-4 w-1/2 border-2 border-[#2ED3D5] outline-none"
                            type="text"
                            value={sub.title}
                            onChange={(e) =>
                              handleSubTodoChange(index, e.target.value)
                            }
                          />
                        </div>
                      ))}
                      <button
                        className="text-green-500 text-5xl hover:text-green-600 my-4"
                        onClick={addSubTodo}
                      >
                        <MdAddBox />
                      </button>
                    </div>

                    <button
                      className="w-1/2 text-center m-auto border-2 font-black text-xl py-3 text-white hover:text-white bg-[#2ED3D5] hover:bg-[#5B80EB]"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateTodoPage;
