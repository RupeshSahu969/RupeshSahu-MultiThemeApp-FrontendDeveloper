import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import JobDetail from "./Pages/JobDetail";
import ApplyForm from "./Pages/ApplyForm";
import Admin from "./Pages/Admin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/applications/:id" element={<ApplyForm />} />
      </Routes>
    </>
  );
}

export default App;
