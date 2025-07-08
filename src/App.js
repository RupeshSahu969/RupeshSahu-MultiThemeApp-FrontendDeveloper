import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Form from "./Pages/Form";
import Register from "./Pages/Register";
import Sidebar from "./Components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <>
              <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            </>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:id" element={<Form />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
