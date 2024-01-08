import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import Header from "./components/Header";
import ProtectedRoute from "./utils/ProtectedRoute";
import TodoPage from "./pages/TodoPage";
import Footer from "./components/Footer";
import CreateTodoPage from "./pages/CreateTodoPage";

// React Toastify Notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleTodoPage from "./pages/SingleTodoPage";
import UpdateTodoPage from "./pages/UpdateTodoPage";

function App() {
  return (
    <Router>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/todo" element={<TodoPage />} />
            <Route path="/create-todo" element={<CreateTodoPage />} />
            <Route path="/todo/:todoId" element={<SingleTodoPage />} />
            <Route path="/update-todo/:todoId" element={<UpdateTodoPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
