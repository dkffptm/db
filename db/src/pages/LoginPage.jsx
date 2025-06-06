import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 추가
import InputField from "../components/InputField";

const LoginPage = () => {
  const navigate = useNavigate(); // 추가
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("로그인 성공!");
        console.log("받은 토큰:", data.token);
        navigate("/create-project"); // 로그인 성공 후 이동 ( 추가 )
        localStorage.setItem("token", data.token); // 필요 시 저장
      } else {
        alert(data.error || "로그인 실패");
      }
    } catch (err) {
      console.error("로그인 오류:", err);
      alert("서버 오류");
    }
  }; // handleSubmit 추가
  // ------------------------- Backend --------------------------------

  return (
    <div className="w-screen h-screen bg-[#1e1e1e] text-white flex flex-col">
      {/* 상단 로고 & 언어 선택 */}
      <div className="flex justify-between items-start px-10 pt-10">
        {/* 로고 */}
        <div className="text-5xl font-roboto">
          <span className="text-blue-400 text-7xl">P</span>
          <span className="text-gray-400 text-3xl">roto</span>
          <span className="text-blue-400 text-7xl">S</span>
          <span className="text-gray-400 text-3xl">hare</span>
        </div>

        {/* 언어 선택 */}
        <div className="flex space-x-4 text-xl font-semibold">
          <span className="text-blue-300 opacity-50 cursor-pointer">
            English
          </span>
          <span className="text-blue-500 border-b-2 border-blue-400 cursor-default">
            한국어
          </span>
        </div>
      </div>

      {/* 로그인 폼 */}
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-[#2a2a2a] text-white p-12 rounded-2xl shadow-md w-[600px]"
        >
          <h2 className="text-4xl font-bold text-center mb-10">
            ProtoShare에 로그인
          </h2>

          <InputField
            label="이메일"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="abc@example.com"
            className="text-xl"
          />

          <InputField
            label="비밀번호"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="********"
            className="text-xl"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white w-full py-4 mt-6 rounded-lg font-bold text-xl"
          >
            로그인
          </button>

          <p className="text-lg text-center mt-6">
            계정이 없으신가요?{" "}
            <a href="/signup" className="text-blue-400 underline">
              회원가입
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
