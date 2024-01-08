import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { MdIncompleteCircle } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Files
import UserSidebar from "../components/UserSidebar";
import { reset, getAllTodo, deleteTodo } from "../redux/slices/todoSlice";
import Loader from "../components/Loader";

const TodoPage = () => {
  const { todoData, message, isSuccess, isError, loading } = useSelector(
    (state) => state.todo
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleDelete = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  useEffect(() => {
    dispatch(getAllTodo());
    if (isSuccess) {
      toast.success(message);
    }
    if (isError) {
      toast.error(message);
    }

    dispatch(reset());
  }, [dispatch, isSuccess, isError, message]);

  useEffect(() => {
    dispatch(getAllTodo());
  }, [dispatch]);

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
            todoData && (
              <div className="right-side md:col-span-5 h-[68vh] overflow-y-auto md:h-auto p-4">
                <div className="head flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-center">
                    My Tasks |
                    <span className="text-green-600"> {user?.name}</span>
                  </h3>

                  <Link to="/create-todo">
                    <button className="flex items-center justify-center text-lg border-2 py-2 px-3 font-bold border-green-500 text-white bg-green-500 hover:bg-green-600">
                      <span className="text-2xl font-black pr-2">
                        <IoAddOutline />
                      </span>
                      ADD TODO
                    </button>
                  </Link>
                </div>

                <div className="todo-section my-6 w-full">
                  <h2 className="text-center text-2xl font-bold my-4 text-[#5B80EB]">
                    Your All Todos
                  </h2>
                  <div className="todo grid grid-cols-1 space-y-4">
                    {todoData?.map((todo, index) => (
                      <div
                        key={todo._id}
                        className="todo-cont flex justify-between items-center border-2 w-full md:w-[80%] md:m-auto"
                      >
                        <div className="number bg-gray-300 p-4 font-black  text-center">
                          {index + 1}
                        </div>

                        <div className="title py-3 px-4 w-[80%] text-lg flex gap-4 items-center">
                          <span className="font-bold">{todo.title}</span> |
                          Status:
                          {todo.isComplete ? (
                            <span className="text-xl text-green-500">
                              <IoMdDoneAll />
                            </span>
                          ) : (
                            <span className="text-xl text-red-500">
                              <MdIncompleteCircle />
                            </span>
                          )}
                        </div>
                        <div className="buttons py-3 px-4 flex gap-4">
                          <div className="text-xl text-green-500 hover:text-green-600 cursor-pointer">
                            <Link to={`/todo/${todo._id}`}>
                              <FaEye />
                            </Link>
                          </div>
                          <div className="text-xl text-orange-500 hover:text-orange-600 cursor-pointer">
                            <Link to={`/update-todo/${todo._id}`}>
                              <MdEdit />
                            </Link>
                          </div>
                          <div className="text-xl text-red-500 hover:text-red-600 cursor-pointer">
                            <MdDelete onClick={() => handleDelete(todo._id)} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default TodoPage;
