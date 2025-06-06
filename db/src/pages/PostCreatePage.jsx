import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export default function PostCreatePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const post = await res.json();
      navigate(`/posts/${post.id}`);
    } else {
      alert("글 작성 실패");
    }
  };

  return (
    <div className="p-4 text-white bg-[#1e1e1e] min-h-screen">
      <h1 className="text-2xl mb-4">글 작성</h1>
      <form onSubmit={handleSubmit} className="max-w-xl">
        <InputField
          label="제목"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
        />
        <div className="mb-4">
          <label className="block mb-1">내용</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            className="w-full h-40 p-2 text-black rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 rounded text-white"
        >
          등록
        </button>
      </form>
    </div>
  );
}