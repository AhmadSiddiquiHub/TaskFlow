import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { MdAddBox } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserSidebar from "../components/UserSidebar";
import { createTodo, reset } from "../redux/slices/todoSlice";
import Loader from "../components/Loader";

const CreateTodoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, message, loading } = useSelector(
    (state) => state.todo
  );

  const [todoInputData, setTodoInputData] = useState({
    title: "",
    description: "",
    subTodo: [{ title: "" }], // Initialize with one subTodo
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
    updatedSubTodos[index].title = value;

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

  const removeSubTodo = (index) => {
    const updatedSubTodos = [...todoInputData.subTodo];
    updatedSubTodos.splice(index, 1);

    setTodoInputData({
      ...todoInputData,
      subTodo: updatedSubTodos,
    });
  };

  const handleSubmit = () => {
    // Dispatch action to create the todo
    dispatch(createTodo(todoInputData));
    console.log("Data: " + JSON.stringify(todoInputData));
    // Optionally, navigate to another page after successful creation
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate("/todo");
    }

    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, navigate]);

  return (
    <>
      <div className="create-todo-page">
        <div className="container w-full grid grid-cols-1 md:grid-cols-6 h-[83vh] md:h-[80vh]">
          <div className="left-side bg-slate-200  h-[15vh] md:h-auto">
            <UserSidebar />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              {/* Right Side */}
              <div className="right-side md:col-span-5 h-[68vh] md:h-auto overflow-y-auto p-4">
                <h2 className="text-center text-2xl font-bold my-4 text-[#5B80EB]">
                  Create Todo
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
                      placeholder="Please Write Todo Title"
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
                      placeholder="Please Write Description for Todo..."
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
                            onClick={() => removeSubTodo(index)}
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
                    Create
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateTodoPage;
