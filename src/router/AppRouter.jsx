import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Profile from "../features/profile/Profile";

// Optional: layout
import MainLayout from "../components/layouts/MainLayout";
import NotFound from "../components/organisms/NotFound";
import BlogPage from "../features/blogs/BlogPage";
import ArticlePage from "../features/articles/ArticlePage";
import StepUpForm from "../features/stepUpForm/stepUpForm";
import MuiPage from "../mui/MuiPage";

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
          <MainLayout>
            <MuiPage />
          </MainLayout>
        }
      />

      <Route
        path="/form"
        element={
          <MainLayout>
            <StepUpForm />
          </MainLayout>
        }
      />
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
