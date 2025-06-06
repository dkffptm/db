// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BoardListPage from "./pages/BoardListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostCreatePage from "./pages/PostCreatePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/posts" element={<BoardListPage />} />
      <Route path="/posts/new" element={<PostCreatePage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
