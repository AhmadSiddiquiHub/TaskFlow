import React, { useEffect } from "react";
import UserSidebar from "../components/UserSidebar";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

// Import Files
import Loader from "../components/Loader";
import {
  reset,
  getSingleTodo,
  updateSingleTodoStatus,
  updateTodo,
} from "../redux/slices/todoSlice";

const SingleTodoPage = () => {
  const dispatch = useDispatch();

  const { singleTodoData, loading } = useSelector((state) => state.todo);
  const { todoId } = useParams();

  const handleCheckboxChange = (subId) => {
    const subTodoIndex = singleTodoData.subTodo.findIndex(
      (sub) => sub._id === subId
    );

    if (subTodoIndex !== -1) {
      const subStatus = !singleTodoData.subTodo[subTodoIndex].isComplete;

      // Update subTodo status
      dispatch(
        updateSingleTodoStatus({ todoId, subTodoData: { subId, subStatus } })
      );
    }
  };

  const handleSubmit = () => {
    // Check if all subTodos are completed
    const isAllSubTodosComplete = singleTodoData?.subTodo?.every(
      (sub) => sub.isComplete
    );
    console.log("isAllSubTodosComplete " + isAllSubTodosComplete);

    // Update main todo status
    dispatch(
      updateTodo({
        todoId,
        todoData: { isComplete: isAllSubTodosComplete },
      })
    );

    if (isAllSubTodosComplete) {
      toast.success("Todo Completed!");
    } else {
      toast.error("Todo Not Completed!");
    }
  };

  useEffect(() => {
    dispatch(getSingleTodo(todoId));
  }, [dispatch, todoId]);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch, singleTodoData]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="todo-page">
        <div className="container w-full grid grid-cols-1 md:grid-cols-6 h-[83vh] md:h-[80vh]">
          <div className="left-side bg-slate-200  h-[15vh] md:h-auto">
            <UserSidebar />
          </div>

          {/* Right Side */}

          {loading ? (
            <div className="right-side-loader md:col-span-5 h-[68vh] md:h-auto overflow-y-scroll">
              <Loader />
            </div>
          ) : (
            singleTodoData && (
              <div className="right-side md:col-span-5 h-[68vh] md:h-auto overflow-y-scroll p-4">
                <div className="head flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-center ">
                    My Tasks |
                    <span className="text-green-600 pl-2">
                      {singleTodoData?.user?.name}
                    </span>
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

                <div className="todo-cont my-10">
                  <h2 className="text-center text-2xl font-bold my-4 text-[#5B80EB]">
                    Take a look at your Todo
                  </h2>
                  <h2 className="text-xl font-bold text-[#5B80EB]">
                    <span className="font-medium text-[#2ED3D5] pr-2">
                      Todo Title:
                    </span>
                    {singleTodoData.title}
                  </h2>
                  <p className="text-base font-normal">
                    {singleTodoData.description}
                  </p>

                  <div className="my-10">
                    {singleTodoData?.subTodo?.slice(0, 5).map((sub, index) => (
                      <div key={index} className="cursor-pointer">
                        <input
                          className="cursor-pointer"
                          type="checkbox"
                          id={sub._id}
                          name={sub._id}
                          checked={sub.isComplete}
                          onChange={() => handleCheckboxChange(sub._id)}
                        />
                        <label
                          className={
                            sub.isComplete
                              ? "text-xl px-2 line-through"
                              : "text-xl px-2"
                          }
                          htmlFor={sub._id}
                        >
                          {sub.title}
                        </label>
                        <br />
                      </div>
                    ))}
                  </div>
                  <div>
                    <button
                      className="w-1/2 flex items-center justify-center text-center m-auto border-2 font-black text-xl py-3 text-white hover:text-white bg-[#2ED3D5] hover:bg-[#5B80EB]"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Done
                    </button>
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

export default SingleTodoPage;
