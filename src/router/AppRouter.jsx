import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home.jsx";
import Login from "../features/auth/Login.jsx";
import Register from "../features/auth/Register.jsx";
import Profile from "../features/profile/Profile.jsx";

// Optional: layout
import MainLayout from "../components/layouts/MainLayout.jsx";
import NotFound from "../components/organisms/NotFound.jsx";
import BlogPage from "../features/blogs/BlogPage.jsx";
import ArticlePage from "../features/articles/ArticlePage.jsx";
import MuiPage from "../mui/MuiPage.jsx";


import ChatPage from "../chat/ChatPage.jsx";




const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

<Route path="/chat" element={<ChatPage />} />

      <Route
        path="/blogs"
        element={
          <MainLayout>
            <BlogPage />
          </MainLayout>
        }
      />
      <Route
        path="/mui"
        element={
          
            <MuiPage />
         
        }
      />
      

      {/* <Route
        path="/form"
        element={
          <MainLayout>
            <StepUpForm />
          </MainLayout>
        }
      /> */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/articles"
        element={
          <MainLayout>
            <ArticlePage />
          </MainLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
